import type { Product } from '../data/products';
import { company } from './config';
import { formatPrice, type CategorySummary } from './products';
import { routes } from './routes';
import { clampDescription, SITE_NAME, type SeoData } from './seo';
import {
  breadcrumbSchema,
  itemListSchema,
  localBusinessSchema,
  productSchema,
  websiteSchema,
  type BreadcrumbItem,
} from './structuredData';

/**
 * SEO de cada rota, em um só lugar: title, description, canonical e JSON-LD.
 * As páginas apenas escolhem a função correspondente.
 */

const place = company.neighborhood;

export function homeSeo(): SeoData {
  return {
    title: `${SITE_NAME} | Assistência Técnica no ${place}`,
    description: `${SITE_NAME} — assistência técnica especializada em celulares, computadores, acessórios e eletrônicos. Reparo, manutenção e atendimento de confiança no ${place}.`,
    path: routes.home,
    jsonLd: [localBusinessSchema(), websiteSchema()],
  };
}

const categoryDescriptions: Record<string, string> = {
  celulares: `Celulares à venda na ${SITE_NAME}, no ${place}. Veja os modelos, especificações e fale pelo WhatsApp para consultar valores e disponibilidade.`,
  acessorios: `Capinhas, películas, headsets e outros acessórios para celular e computador na ${SITE_NAME}, no ${place}. Consulte modelos pelo WhatsApp.`,
  eletronicos: `Caixas de som, fones Bluetooth, rádios e outros eletrônicos na ${SITE_NAME}, no ${place}. Veja os produtos e consulte valores pelo WhatsApp.`,
};

export function catalogSeo(category: CategorySummary | undefined, products: Product[]): SeoData {
  const path = category ? routes.category(category.slug) : routes.catalog;
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Início', to: routes.home },
    { label: 'Produtos', to: routes.catalog },
    ...(category ? [{ label: category.name, to: path }] : []),
  ];
  const listed = category ? products.filter((p) => p.categorySlug === category.slug) : products;

  return {
    title: category
      ? `${category.name} no ${place} | ${SITE_NAME}`
      : `Celulares, Acessórios e Eletrônicos | ${SITE_NAME}`,
    description: category
      ? (categoryDescriptions[category.slug] ??
        clampDescription(`${category.name} na ${SITE_NAME}, no ${place}. Veja os produtos da categoria e consulte valores e disponibilidade pelo WhatsApp.`))
      : `Celulares, acessórios e eletrônicos da ${SITE_NAME}, no ${place}. Veja os produtos e consulte valores e disponibilidade direto pelo WhatsApp.`,
    path,
    jsonLd: [
      breadcrumbSchema(breadcrumbs, path),
      ...(listed.length ? [itemListSchema(category?.name ?? 'Produtos', listed, routes.product)] : []),
    ],
  };
}

export function productBreadcrumbs(product: Product): BreadcrumbItem[] {
  return [
    { label: 'Início', to: routes.home },
    { label: 'Produtos', to: routes.catalog },
    { label: product.category, to: routes.category(product.categorySlug) },
    { label: product.name },
  ];
}

export function productSeo(product: Product): SeoData {
  const path = routes.product(product.slug);
  const price = product.price === null ? 'Consulte o valor' : `Valor: ${formatPrice(product.price)}`;
  return {
    title: `${product.name} | ${SITE_NAME}`,
    description: clampDescription(`${product.description} ${price} na ${SITE_NAME}, no ${place}. Fale pelo WhatsApp.`),
    path,
    type: 'product',
    image: { url: product.image, alt: product.name },
    jsonLd: [productSchema(product, path), breadcrumbSchema(productBreadcrumbs(product), path)],
  };
}

/** Páginas de erro nunca são indexadas. */
export function notFoundSeo(title: string, message: string): SeoData {
  return { title: `${title} | ${SITE_NAME}`, description: message, noindex: true };
}

/** Enquanto os produtos carregam (o HTML pré-renderizado já traz o SEO final). */
export function loadingSeo(path: string, label: string): SeoData {
  return { title: `${label} | ${SITE_NAME}`, description: homeSeo().description, path };
}
