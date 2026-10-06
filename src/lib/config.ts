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
  hours: {
    weekdays: '08:30 às 18:30',
    saturday: '08:30 às 14:00',
    weekdaysShort: '08:30–18:30',
    saturdayShort: '08:30–14:00',
  },
} as const;

/**
 * Localização do mapa — coordenadas do pin oficial no Google Maps
 * ("Av. Joaquim Gilberto - Jardim Ingá, Quadra 79").
 */
export const mapConfig = {
  lat: -16.1441,
  lng: -47.95868,
  zoom: 17,
  /** Link do pin no Google Maps. */
  googleMapsUrl:
    'https://www.google.com/maps/place/Av.+Joaquim+Gilberto+-+Jardim+Ing%C3%A1,+Quadra+79/@-16.1440385,-47.9590265,18.88z/data=!4m6!3m5!1s0x93599ad70938c68b:0x83c7fdb519c38192!8m2!3d-16.1441!4d-47.95868!16s%2Fg%2F11srglgvrg',
} as const;

export const mapLinks = {
  embed: `https://www.google.com/maps?q=${mapConfig.lat},${mapConfig.lng}&z=${mapConfig.zoom}&output=embed`,
  googleMaps: mapConfig.googleMapsUrl,
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

