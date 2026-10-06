import {
  mockProductRows,
  productCategories,
  type Product,
  type ProductCategory,
  type ProductSheetRow,
  type ProductSpec,
} from '../data/products';

/**
 * Camada de dados de produtos.
 *
 *   Google Sheets → CSV publicado → getProducts() → interface
 *
 * `getProducts()` é o ÚNICO ponto de entrada para produtos. Os componentes
 * nunca acessam a planilha diretamente. Para trocar a origem dos dados basta
 * configurar VITE_PRODUCTS_CSV_URL (veja GOOGLE_SHEETS.md).
 */

const CSV_URL = import.meta.env.VITE_PRODUCTS_CSV_URL?.trim() ?? '';
const FALLBACK_IMAGE = '/images/logo.jpeg';

const isYes = (value: string) => ['sim', 's', 'yes', 'true', '1', 'x'].includes(normalize(value));

function normalize(value: string): string {
  return value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/** Aceita "2999.90", "2.999,90", "R$ 2.999,90". Vazio ou inválido → null. */
export function parsePrice(raw: string): number | null {
  const cleaned = raw.replace(/[^\d.,-]/g, '');
  if (!cleaned) return null;
  const normalized = cleaned.includes(',') ? cleaned.replace(/\./g, '').replace(',', '.') : cleaned;
  const value = Number(normalized);
  return Number.isFinite(value) && value > 0 ? value : null;
}

/** "Acessórios" → "acessorios"; usado em URLs de produtos e categorias. */
export function slugify(value: string): string {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * O Google Drive não serve imagens para sites: limita requisições (429) e o
 * navegador bloqueia a resposta. As fotos do Drive passam por um proxy de
 * imagens com cache (wsrv.nl), que também redimensiona e converte para WebP.
 */
const DRIVE_IMAGE_PROXY = 'https://wsrv.nl/?w=900&output=webp&q=80&url=';

/**
 * Aceita o link de compartilhamento do Google Drive ("…/file/d/ID/view",
 * "open?id=ID", "uc?id=ID") e o converte em um endereço de imagem.
 * Outros endereços são mantidos como estão.
 */
export function toImageUrl(raw: string): string {
  const url = raw.trim();
  if (!/drive\.google\.com|docs\.google\.com/.test(url)) return url;
  const id = url.match(/\/d\/([\w-]+)/)?.[1] ?? url.match(/[?&]id=([\w-]+)/)?.[1];
  if (!id) return url;
  const source = `https://drive.usercontent.google.com/download?id=${id}&export=view`;
  return DRIVE_IMAGE_PROXY + encodeURIComponent(source);
}

const splitList = (raw = '') =>
  raw
    .split(/\s*[|\n]\s*/)
    .map((item) => item.trim())
    .filter(Boolean);

function parseSpecs(raw = ''): ProductSpec[] {
  return splitList(raw).flatMap((pair) => {
    const index = pair.indexOf(':');
    if (index === -1) return [];
    const label = pair.slice(0, index).trim();
    const value = pair.slice(index + 1).trim();
    return label && value ? [{ label, value }] : [];
  });
}

export function mapRowToProduct(row: ProductSheetRow): Product {
  const order = Number.parseInt(row.ordem, 10);
  const name = row.nome.trim();
  const category = row.categoria.trim();
  const description = row.descricao.trim();
  const mainImage = toImageUrl(row.imagem) || FALLBACK_IMAGE;
  return {
    id: row.id.trim() || name,
    slug: slugify(name),
    name,
    category,
    categorySlug: slugify(category),
    description,
    details: row.detalhes?.trim() || description,
    price: parsePrice(row.preco),
    image: mainImage,
    images: [...new Set([mainImage, ...splitList(row.imagens).map(toImageUrl)])],
    brand: row.marca?.trim() ?? '',
    condition: row.condicao?.trim() ?? '',
    specs: parseSpecs(row.especificacoes),
    featured: isYes(row.destaque),
    active: isYes(row.ativo),
    order: Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER,
  };
}

/** Garante slugs únicos (produtos com o mesmo nome recebem o id no final). */
function ensureUniqueSlugs(products: Product[]): Product[] {
  const seen = new Set<string>();
  return products.map((product) => {
    const slug = seen.has(product.slug) ? `${product.slug}-${slugify(product.id)}` : product.slug;
    seen.add(slug);
    return slug === product.slug ? product : { ...product, slug };
  });
}

/** Parser CSV (RFC 4180): suporta aspas, vírgulas e quebras de linha dentro de campos. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

const COLUMNS: (keyof ProductSheetRow)[] = [
  'id',
  'nome',
  'categoria',
  'descricao',
  'preco',
  'imagem',
  'destaque',
  'ativo',
  'ordem',
  'marca',
  'condicao',
  'detalhes',
  'imagens',
  'especificacoes',
];

function csvToRows(text: string): ProductSheetRow[] {
  const [header, ...lines] = parseCsv(text);
  if (!header) return [];
  const index = new Map(header.map((name, i) => [normalize(name), i]));
  return lines.map((cells) => {
    const entry = {} as ProductSheetRow;
    for (const column of COLUMNS) {
      const i = index.get(column);
      entry[column] = i === undefined ? '' : (cells[i] ?? '');
    }
    return entry;
  });
}

const STORAGE_KEY = 'vc-products-csv';

/** Endereço alternativo do mesmo CSV (a API "gviz" não redireciona). */
function alternativeCsvUrl(url: string): string | null {
  const id = url.match(/\/spreadsheets\/d\/([\w-]+)/)?.[1];
  return id && url.includes('/export') ? `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv` : null;
}

async function fetchCsv(url: string): Promise<string> {
  const response = await fetch(url);
  const text = await response.text();
  // Em caso de bloqueio, o Google pode responder 200 com uma página HTML.
  if (!response.ok || /^\s*</.test(text)) throw new Error(`Falha ao carregar produtos (${response.status})`);
  return text;
}

function readStoredCsv(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeCsv(text: string) {
  try {
    localStorage.setItem(STORAGE_KEY, text);
  } catch {
    // Armazenamento indisponível (modo privado, cota): segue sem cache.
  }
}

/**
 * Lê a planilha. Se o Google recusar (ex.: limite de requisições), tenta o
 * endereço alternativo e, por fim, a última versão carregada neste navegador.
 */
async function fetchSheetRows(): Promise<ProductSheetRow[]> {
  const urls = [CSV_URL, alternativeCsvUrl(CSV_URL)].filter((url): url is string => Boolean(url));
  let lastError: unknown;
  for (const url of urls) {
    try {
      const text = await fetchCsv(url);
      storeCsv(text);
      return csvToRows(text);
    } catch (error) {
      lastError = error;
      console.error('[produtos] Não foi possível ler a planilha:', url, error);
    }
  }
  const stored = readStoredCsv();
  if (stored) {
    console.warn('[produtos] Exibindo a última versão salva da planilha.');
    return csvToRows(stored);
  }
  throw lastError instanceof Error ? lastError : new Error('Falha ao carregar produtos');
}

export const usingMockProducts = CSV_URL === '';

let cache: Promise<Product[]> | null = null;
let resolved: Product[] | null = null;

/** Produtos já carregados nesta sessão (evita estado de loading ao trocar de página). */
export const getCachedProducts = () => resolved;

async function loadProducts(): Promise<Product[]> {
  const rows = usingMockProducts ? mockProductRows : await fetchSheetRows();
  return ensureUniqueSlugs(
    rows
      .map(mapRowToProduct)
      .filter((product) => product.active && product.name)
      .sort((a, b) => a.order - b.order),
  );
}

/**
 * Retorna os produtos ativos, ordenados pela coluna `ordem`.
 * O resultado fica em cache durante a sessão para que a navegação entre
 * páginas não repita a requisição. `refresh` força uma nova leitura.
 */
export function getProducts({ refresh = false } = {}): Promise<Product[]> {
  if (!cache || refresh) {
    cache = loadProducts().then(
      (products) => (resolved = products),
    );
    cache.catch(() => {
      cache = null;
    });
  }
  return cache;
}

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatPrice = (price: number | null) => (price === null ? 'Consulte' : currency.format(price));

export interface CategorySummary {
  name: string;
  slug: string;
  count: number;
}

/** Categorias presentes nos produtos, na ordem padrão (demais categorias ao final). */
export function getCategories(products: Product[]): CategorySummary[] {
  const counts = new Map<string, CategorySummary>();
  for (const product of products) {
    const current = counts.get(product.categorySlug);
    if (current) current.count++;
    else counts.set(product.categorySlug, { name: product.category, slug: product.categorySlug, count: 1 });
  }
  const rank = (name: string) => {
    const index = productCategories.indexOf(name as ProductCategory);
    return index === -1 ? productCategories.length : index;
  };
  return [...counts.values()].sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name, 'pt-BR'));
}

export type ProductSort = 'relevancia' | 'menor-preco' | 'maior-preco' | 'nome';

export const productSortOptions: { value: ProductSort; label: string }[] = [
  { value: 'relevancia', label: 'Destaques' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'nome', label: 'Nome (A–Z)' },
];

export const isProductSort = (value: string | null): value is ProductSort =>
  productSortOptions.some((option) => option.value === value);

/** Ordena sem alterar o array original. Produtos sem preço vão para o final. */
export function sortProducts(products: Product[], sort: ProductSort): Product[] {
  const byPrice = (direction: 1 | -1) => (a: Product, b: Product) => {
    if (a.price === null) return b.price === null ? a.order - b.order : 1;
    if (b.price === null) return -1;
    return (a.price - b.price) * direction;
  };
  const list = [...products];
  switch (sort) {
    case 'menor-preco':
      return list.sort(byPrice(1));
    case 'maior-preco':
      return list.sort(byPrice(-1));
    case 'nome':
      return list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    default:
      return list.sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);
  }
}

/** Busca por nome, categoria, marca e descrição, ignorando acentos. */
export function searchProducts(products: Product[], query: string): Product[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return products;
  return products.filter((product) => {
    const haystack = normalize([product.name, product.category, product.brand, product.description].join(' '));
    return terms.every((term) => haystack.includes(term));
  });
}

export function getRelatedProducts(products: Product[], product: Product, limit = 4): Product[] {
  const others = products.filter((p) => p.id !== product.id);
  const sameCategory = others.filter((p) => p.categorySlug === product.categorySlug);
  const rest = others.filter((p) => p.categorySlug !== product.categorySlug && p.featured);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** A condição (Novo / Seminovo) só é exibida para celulares. */
export const getDisplayedCondition = (product: Product) =>
  product.categorySlug === 'celulares' ? product.condition : '';
