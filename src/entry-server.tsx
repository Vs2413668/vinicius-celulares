import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import type { Product } from './data/products';
import { SeoCollectorContext, type SeoCollector } from './hooks/useSeo';
import { getCategories, getProducts, seedProducts } from './lib/products';
import { routes } from './lib/routes';
import { homeSeo } from './lib/pageSeo';
import { absoluteUrl, escapeScriptJson, renderHeadTags, siteUrl } from './lib/seo';

/**
 * Entrada da pré-renderização (usada apenas no build por scripts/prerender.mjs).
 * Gera o HTML de cada rota com o mesmo código do navegador.
 */

export { siteUrl, absoluteUrl, renderHeadTags, escapeScriptJson, homeSeo };

export interface RenderedPage {
  html: string;
  head: string;
}

export function render(url: string): RenderedPage {
  const collector: SeoCollector = { seo: null };
  const html = renderToString(
    <StrictMode>
      <SeoCollectorContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </SeoCollectorContext.Provider>
    </StrictMode>,
  );
  return { html, head: renderHeadTags(collector.seo ?? homeSeo()) };
}

export interface SitePage {
  path: string;
  /** Imagens relevantes para o sitemap de imagens. */
  images: string[];
}

/** Carrega os produtos (planilha ou mock) e lista as rotas públicas indexáveis. */
export async function loadSite(): Promise<{ products: Product[] | null; pages: SitePage[] }> {
  let loaded: Product[] | null = null;
  try {
    loaded = await getProducts();
    seedProducts(loaded);
  } catch (error) {
    console.warn('[prerender] Produtos indisponíveis no build; páginas de produto não serão pré-renderizadas.', error);
  }
  const products = loaded ?? [];

  const pages: SitePage[] = [
    { path: routes.home, images: ['/images/logo.jpeg', '/images/loja.jpg', '/images/area-interna.webp'] },
    { path: routes.catalog, images: [] },
    ...getCategories(products).map((category) => ({ path: routes.category(category.slug), images: [] })),
    ...products.map((product) => ({ path: routes.product(product.slug), images: product.images })),
  ];
  return { products: loaded, pages };
}
