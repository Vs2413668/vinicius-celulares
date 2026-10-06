import type { Product } from '../data/products';
import { serviceGroups } from '../data/services';
import { company, mapConfig, mapLinks } from './config';
import { absoluteUrl, siteUrl, SITE_NAME, type JsonLd } from './seo';

/**
 * Dados estruturados (schema.org / JSON-LD). Somente informações reais e
 * visíveis no site — nada de avaliações, estoque ou dados inventados.
 */

const businessId = () => absoluteUrl('/#empresa');
const websiteId = () => absoluteUrl('/#site');

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

function postalAddress(): JsonLd {
  return {
    '@type': 'PostalAddress',
    streetAddress: company.address,
    ...(company.city && { addressLocality: company.city }),
    ...(company.state && { addressRegion: company.state }),
    ...(company.postalCode && { postalCode: company.postalCode }),
    addressCountry: 'BR',
  };
}

/** Assistência técnica com loja física (SEO local). */
export function localBusinessSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ElectronicsStore'],
    '@id': businessId(),
    name: company.name,
    description:
      'Assistência técnica especializada em celulares, computadores e eletrônicos, com venda de celulares, acessórios e produtos eletrônicos.',
    slogan: 'Tecnologia que funciona. Confiança que permanece.',
    ...(siteUrl && { url: `${siteUrl}/` }),
    logo: absoluteUrl('/images/logo.jpeg'),
    image: [absoluteUrl('/images/loja.jpg'), absoluteUrl('/images/area-interna.webp'), absoluteUrl('/images/logo.jpeg')],
    telephone: `+${company.whatsapp}`,
    address: postalAddress(),
    geo: { '@type': 'GeoCoordinates', latitude: mapConfig.lat, longitude: mapConfig.lng },
    hasMap: mapLinks.googleMaps,
    areaServed: company.neighborhood,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '18:30',
      },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:30', closes: '14:00' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${company.whatsapp}`,
      url: `https://wa.me/${company.whatsapp}`,
      availableLanguage: 'pt-BR',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de assistência técnica',
      itemListElement: serviceGroups.map((group) => ({
        '@type': 'OfferCatalog',
        name: group.label,
        itemListElement: group.services.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.title, description: service.description },
        })),
      })),
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(),
    name: SITE_NAME,
    ...(siteUrl && { url: `${siteUrl}/` }),
    inLanguage: 'pt-BR',
    publisher: { '@id': businessId() },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[], currentPath: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.to ?? currentPath),
    })),
  };
}

/** Novo → NewCondition; Seminovo/Usado → UsedCondition; demais casos omitidos. */
function itemCondition(condition: string): string | undefined {
  const value = condition.toLowerCase();
  if (value.startsWith('novo')) return 'https://schema.org/NewCondition';
  if (value.startsWith('seminovo') || value.startsWith('usado')) return 'https://schema.org/UsedCondition';
  return undefined;
}

export function productSchema(product: Product, path: string): JsonLd {
  const condition = itemCondition(product.condition);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.details || product.description,
    image: product.images.map((image) => absoluteUrl(image)),
    sku: product.id,
    category: product.category,
    url: absoluteUrl(path),
    ...(product.brand && { brand: { '@type': 'Brand', name: product.brand } }),
    ...(product.specs.length > 0 && {
      additionalProperty: product.specs.map((spec) => ({ '@type': 'PropertyValue', name: spec.label, value: spec.value })),
    }),
    // Sem disponibilidade: o site não afirma estoque. Sem preço, a oferta é omitida.
    ...(product.price !== null && {
      offers: {
        '@type': 'Offer',
        url: absoluteUrl(path),
        price: product.price.toFixed(2),
        priceCurrency: 'BRL',
        ...(condition && { itemCondition: condition }),
        seller: { '@id': businessId() },
      },
    }),
  };
}

export function itemListSchema(name: string, products: Product[], productPath: (slug: string) => string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(productPath(product.slug)),
      name: product.name,
    })),
  };
}
