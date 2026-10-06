export const routes = {
  home: '/',
  catalog: '/produtos',
  category: (slug: string) => `/produtos/categoria/${slug}`,
  product: (slug: string) => `/produtos/${slug}`,
} as const;
