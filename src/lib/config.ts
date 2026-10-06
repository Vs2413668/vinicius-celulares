/**
 * Informações oficiais da empresa. Fonte única: não duplicar em componentes.
 */
export const company = {
  name: 'Vinícius Celulares',
  tagline: 'Manutenção e Acessórios',
  neighborhood: 'Jardim Ingá',
  yearsLabel: '5+',
  whatsapp: '5561991391350',
  whatsappDisplay: '(61) 99139-1350',
  address: 'Av. Joaquim Gilberto, Quadra 79 lote 21',
  /**
   * Complementos do endereço usados nos dados estruturados (SEO local).
   * Preencher somente com dados confirmados pelo cliente; vazios são omitidos.
   */
  city: '' as string,
  state: '' as string,
  postalCode: '' as string,
  hours: {
    weekdays: '08:30 às 18:30',
    saturday: '08:30 às 14:00',
    weekdaysShort: '08:30–18:30',
    saturdayShort: '08:30–14:00',
  },
} as const;

/**
 * Localização do mapa — coordenadas do pin da loja (16°08'38.8"S 47°57'31.7"W).
 */
export const mapConfig = {
  lat: -16.144099,
  lng: -47.9588,
  zoom: 18,
} as const;

export const mapLinks = {
  embed: `https://www.google.com/maps?q=${mapConfig.lat},${mapConfig.lng}&z=${mapConfig.zoom}&output=embed`,
  googleMaps: `https://www.google.com/maps/search/?api=1&query=${mapConfig.lat},${mapConfig.lng}`,
  waze: `https://waze.com/ul?ll=${mapConfig.lat},${mapConfig.lng}&navigate=yes`,
} as const;

export const messages = {
  budget: 'Olá! Gostaria de solicitar um orçamento.',
  contact: 'Olá! Gostaria de entrar em contato com a Vinícius Celulares.',
  product: (name: string) => `Olá! Tenho interesse no produto: ${name}. Gostaria de saber mais informações.`,
} as const;

export interface NavLinkItem {
  /** Id da seção na home. */
  id: string;
  label: string;
  /** Quando definido, o link leva a uma rota própria em vez da seção. */
  path?: string;
}

export const navLinks: readonly NavLinkItem[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'quem-somos', label: 'Quem Somos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'produtos', label: 'Produtos', path: '/produtos' },
  { id: 'por-que-nos', label: 'Por Que Nós' },
  { id: 'contato', label: 'Contato' },
];

