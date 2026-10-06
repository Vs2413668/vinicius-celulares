import { company } from './config';

/**
 * Domínio oficial (ex.: https://www.viniciuscelulares.com.br), definido em
 * VITE_SITE_URL. É a única fonte para canonical, og:url, sitemap, robots e
 * JSON-LD. Sem ele, as URLs absolutas são omitidas.
 */
export const siteUrl = (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '');

/** Código de verificação do Google Search Console (meta "google-site-verification"). */
export const googleSiteVerification = (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION ?? '').trim();

/** Converte um caminho do site em URL absoluta (mantém URLs externas como estão). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path) || !siteUrl) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export interface SeoImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export type JsonLd = Record<string, unknown>;

export interface SeoData {
  title: string;
  description: string;
  /** Caminho canônico da página (sem parâmetros). Omitido em páginas não indexáveis. */
  path?: string;
  image?: SeoImage;
  type?: 'website' | 'product';
  noindex?: boolean;
  jsonLd?: JsonLd[];
}

export const SITE_NAME = company.name;

export const defaultImage: SeoImage = {
  url: '/images/og-image.jpg',
  alt: `Logo ${company.name} — ${company.tagline}`,
  width: 1200,
  height: 630,
};

/** Limita descrições a ~160 caracteres sem cortar palavras. */
export function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/[\s,.;:—-]+\S*$/, '')}…`;
}

export interface HeadTag {
  tag: 'meta' | 'link' | 'script';
  attrs: Record<string, string>;
  content?: string;
}

/** Tags do <head> de uma página. Usada no build (pré-renderização) e no navegador. */
export function getHeadTags(seo: SeoData): HeadTag[] {
  const image = seo.image ?? defaultImage;
  const canonical = seo.path && siteUrl ? absoluteUrl(seo.path) : '';
  const meta = (key: 'name' | 'property', name: string, content?: string | number): HeadTag[] =>
    content === undefined || content === '' ? [] : [{ tag: 'meta', attrs: { [key]: name, content: String(content) } }];

  return [
    ...meta('name', 'description', seo.description),
    ...meta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
    ...(canonical ? [{ tag: 'link' as const, attrs: { rel: 'canonical', href: canonical } }] : []),
    ...meta('property', 'og:type', seo.type === 'product' ? 'product' : 'website'),
    ...meta('property', 'og:locale', 'pt_BR'),
    ...meta('property', 'og:site_name', SITE_NAME),
    ...meta('property', 'og:title', seo.title),
    ...meta('property', 'og:description', seo.description),
    ...meta('property', 'og:url', canonical),
    ...meta('property', 'og:image', absoluteUrl(image.url)),
    ...meta('property', 'og:image:width', image.width),
    ...meta('property', 'og:image:height', image.height),
    ...meta('property', 'og:image:alt', image.alt),
    ...meta('name', 'twitter:card', 'summary_large_image'),
    ...meta('name', 'twitter:title', seo.title),
    ...meta('name', 'twitter:description', seo.description),
    ...meta('name', 'twitter:image', absoluteUrl(image.url)),
    ...meta('name', 'twitter:image:alt', image.alt),
    ...meta('name', 'google-site-verification', googleSiteVerification),
    ...(seo.jsonLd ?? []).map((data) => ({
      tag: 'script' as const,
      attrs: { type: 'application/ld+json' },
      content: JSON.stringify(data),
    })),
  ];
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeText = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** Impede que o conteúdo do JSON-LD feche a tag <script>. */
export const escapeScriptJson = (json: string) => json.replace(/</g, '\\u003c');

/** HTML do bloco de SEO (title + tags) para o HTML estático. */
export function renderHeadTags(seo: SeoData): string {
  const tags = getHeadTags(seo).map(({ tag, attrs, content }) => {
    const attributes = Object.entries({ ...attrs, 'data-seo': '' })
      .map(([key, value]) => (value === '' ? key : `${key}="${escapeAttr(value)}"`))
      .join(' ');
    return tag === 'script' ? `<script ${attributes}>${escapeScriptJson(content ?? '')}</script>` : `<${tag} ${attributes} />`;
  });
  return [`<title>${escapeText(seo.title)}</title>`, ...tags].join('\n    ');
}

/** Aplica as tags no documento (navegação client-side entre rotas). */
export function applyHeadTags(seo: SeoData) {
  document.title = seo.title;
  document.head.querySelectorAll('[data-seo]').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  for (const { tag, attrs, content } of getHeadTags(seo)) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
    element.setAttribute('data-seo', '');
    if (content) element.textContent = content;
    fragment.append(element);
  }
  document.head.append(fragment);
}
