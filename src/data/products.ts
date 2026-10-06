/**
 * PRODUTOS DEMONSTRATIVOS (MOCK)
 *
 * Estes registros existem apenas para desenvolvimento e demonstração do layout.
 * Eles NÃO representam estoque real e serão substituídos pela planilha do
 * Google Sheets (veja GOOGLE_SHEETS.md). O formato é idêntico ao das colunas
 * da planilha, para que ambas as fontes passem pelo mesmo mapeamento.
 * As informações foram extraídas das artes e fotos fornecidas pelo cliente.
 */

export type ProductCategory = 'Celulares' | 'Acessórios' | 'Eletrônicos';

export const productCategories: readonly ProductCategory[] = ['Celulares', 'Acessórios', 'Eletrônicos'];

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  /** Identificador usado na URL: /produtos/:slug */
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  /** Resumo curto, exibido nos cards. */
  description: string;
  /** Texto completo da página do produto. */
  details: string;
  /** `null` quando o valor não é informado — a interface exibe "Consulte". */
  price: number | null;
  /** Imagem principal (primeira da galeria). */
  image: string;
  images: string[];
  brand: string;
  condition: string;
  specs: ProductSpec[];
  featured: boolean;
  active: boolean;
  order: number;
}

/** Linha bruta, com os mesmos nomes de colunas da planilha. */
export interface ProductSheetRow {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  preco: string;
  imagem: string;
  destaque: string;
  ativo: string;
  ordem: string;
  marca?: string;
  condicao?: string;
  detalhes?: string;
  /** URLs extras separadas por "|". */
  imagens?: string;
  /** Pares "Rótulo: valor" separados por "|". */
  especificacoes?: string;
}

const img = (file: string) => `/images/produtos/${file}.webp`;

export const mockProductRows: ProductSheetRow[] = [
  {
    id: '1',
    nome: 'iPhone 13 Pro 128GB',
    categoria: 'Celulares',
    descricao: 'Smartphone Apple com 128GB de armazenamento.',
    preco: '',
    imagem: img('celular-2'),
    destaque: 'SIM',
    ativo: 'SIM',
    ordem: '1',
    marca: 'Apple',
    condicao: 'Seminovo',
    detalhes: 'iPhone 13 Pro com todas as peças originais, Face ID funcionando e sem detalhes. Aparelho revisado e pronto para uso.',
    especificacoes: 'Armazenamento: 128GB | Saúde da bateria: 76% | Peças: Originais | Face ID: Funcionando',
  },
  {
    id: '2',
    nome: 'Redmi 15C',
    categoria: 'Celulares',
    descricao: 'Smartphone Xiaomi com 256GB de armazenamento.',
    preco: '',
    imagem: img('celular-1'),
    destaque: 'SIM',
    ativo: 'SIM',
    ordem: '2',
    marca: 'Xiaomi',
    condicao: 'Seminovo — 2 meses de uso',
    detalhes: 'Redmi 15C seminovo, com apenas 2 meses de uso. Tela grande e imersiva, bateria de longa duração e Android atualizado.',
    especificacoes: 'Armazenamento: 256GB | Memória RAM: 8GB (com expansão) | Tela: 6,9" | Bateria: 6000mAh | Sistema: Android',
  },
  {
    id: '3',
    nome: 'Caixa de som Karaokê',
    categoria: 'Eletrônicos',
    descricao: 'Caixa de som Bluetooth com microfone duplo e luzes LED.',
    preco: '70.00',
    imagem: img('caixa-de-som-karaoke'),
    destaque: 'SIM',
    ativo: 'SIM',
    ordem: '3',
    condicao: 'Novo',
    detalhes: 'Caixa de som com dois microfones sem fio, ideal para festas, reuniões e momentos em família. Conecte o celular por Bluetooth e cante com quem quiser.',
    especificacoes: 'Conexão: Bluetooth | Microfones: 2 | Iluminação: LED RGB | Bateria: Recarregável | Entradas: USB / Tipo C',
  },
  {
    id: '4',
    nome: 'Fone Bluetooth',
    categoria: 'Eletrônicos',
    descricao: 'Fone sem fio com estojo de carregamento e visor.',
    preco: '',
    imagem: img('fone-bluetooth'),
    destaque: 'SIM',
    ativo: 'SIM',
    ordem: '4',
    condicao: 'Novo',
    detalhes: 'Fone sem fio com estojo de carregamento que exibe o nível de bateria no visor.',
    especificacoes: 'Conexão: Bluetooth | Estojo: Com visor de bateria',
  },
  {
    id: '5',
    nome: 'Caixa de som Powerbank',
    categoria: 'Eletrônicos',
    descricao: 'Caixa de som portátil que também carrega o seu celular.',
    preco: '90.00',
    imagem: img('caixa-de-som-powerbank'),
    destaque: 'SIM',
    ativo: 'SIM',
    ordem: '5',
    marca: 'Peining',
    condicao: 'Novo',
    detalhes: 'Música e bateria extra em um só produto. Caixa de som portátil que funciona como powerbank e acompanha adaptador Lightning para iPhone.',
    especificacoes: 'Bateria: 4000mAh | Conexão: Bluetooth | Função: Powerbank | Cartão TF: Até 32GB | Extras: Rádio FM, reprodução USB, adaptador Lightning',
  },
  {
    id: '6',
    nome: 'Caixa de som portátil com LED',
    categoria: 'Eletrônicos',
    descricao: 'Som portátil com luzes LED, entrada USB e cartão.',
    preco: '50.00',
    imagem: img('caixa-de-som-portatil-com-lede'),
    destaque: 'NÃO',
    ativo: 'SIM',
    ordem: '6',
    marca: 'Eletro',
    condicao: 'Novo',
    detalhes: 'Caixa de som portátil, leve e prática, com luzes LED coloridas e alça para transporte.',
    especificacoes: 'Modelo: EL-1055 | Iluminação: LED colorido | Bateria: Recarregável | Entradas: USB e cartão TF | Extras: Rádio FM',
  },
  {
    id: '7',
    nome: 'Rádio portátil',
    categoria: 'Eletrônicos',
    descricao: 'Rádio FM/AM com bateria recarregável e entrada USB.',
    preco: '80.00',
    imagem: img('radio-portatil'),
    destaque: 'NÃO',
    ativo: 'SIM',
    ordem: '7',
    marca: 'Kapbom',
    condicao: 'Novo',
    detalhes: 'Rádio portátil com display de frequência e antena telescópica. Leve, prático e completo.',
    especificacoes: 'Modelo: KA-8816 | Faixas: FM / AM / SW | Bateria: Recarregável | Entradas: USB e cartão TF | Carregamento: Via USB',
  },
  {
    id: '8',
    nome: 'Capinha com borda colorida',
    categoria: 'Acessórios',
    descricao: 'Capinha com fundo transparente e proteção de câmera.',
    preco: '',
    imagem: img('capinha'),
    destaque: 'NÃO',
    ativo: 'SIM',
    ordem: '8',
    condicao: 'Novo',
    detalhes: 'Capinha com fundo transparente, borda colorida e proteção individual para as lentes da câmera.',
    especificacoes: 'Compatibilidade: iPhone 14',
  },
  {
    id: '9',
    nome: 'Capinha com suporte magnético',
    categoria: 'Acessórios',
    descricao: 'Capinha com anel de suporte e proteção de câmera.',
    preco: '',
    imagem: img('capinha2'),
    destaque: 'NÃO',
    ativo: 'SIM',
    ordem: '9',
    condicao: 'Novo',
    detalhes: 'Capinha com anel que funciona como suporte e proteção para as lentes da câmera.',
  },
  {
    id: '10',
    nome: 'Capinha de silicone',
    categoria: 'Acessórios',
    descricao: 'Capinha de silicone em diversas cores.',
    preco: '',
    imagem: img('capinha-3'),
    destaque: 'NÃO',
    ativo: 'SIM',
    ordem: '10',
    condicao: 'Novo',
    detalhes: 'Capinha de silicone disponível em diversas cores. Consulte os modelos disponíveis para o seu aparelho.',
  },
  {
    id: '11',
    nome: 'Película 3D',
    categoria: 'Acessórios',
    descricao: 'Película de vidro 3D para proteção da tela.',
    preco: '',
    imagem: img('peliculas'),
    destaque: 'NÃO',
    ativo: 'SIM',
    ordem: '11',
    marca: 'X-Mart',
    condicao: 'Novo',
    detalhes: 'Película de vidro 3D para proteção da tela. Consulte os modelos disponíveis para o seu aparelho.',
  },
  {
    id: '12',
    nome: 'Headset Elogin HS18',
    categoria: 'Acessórios',
    descricao: 'Headset com microfone para computador.',
    preco: '',
    imagem: img('headset'),
    destaque: 'NÃO',
    ativo: 'SIM',
    ordem: '12',
    marca: 'Elogin',
    condicao: 'Novo',
    detalhes: 'Headset com microfone, ideal para jogos, chamadas e reuniões no computador.',
    especificacoes: 'Modelo: HS18 | Microfone: Sim | Garantia do fabricante: 1 ano',
  },
  {
    id: '13',
    nome: 'Headset Kapbom KA-9007',
    categoria: 'Acessórios',
    descricao: 'Headphone estéreo com microfone e conexão USB.',
    preco: '',
    imagem: img('headset-2'),
    destaque: 'NÃO',
    ativo: 'SIM',
    ordem: '13',
    marca: 'Kapbom',
    condicao: 'Novo',
    detalhes: 'Headphone estéreo com microfone para jogos e chamadas.',
    especificacoes: 'Modelo: KA-9007 | Áudio: Estéreo | Microfone: Sim | Conexão: USB',
  },
];
