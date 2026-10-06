import { createContext, useContext, useEffect } from 'react';
import { applyHeadTags, type SeoData } from '../lib/seo';

/** Na pré-renderização, guarda o SEO da página renderizada para gerar o <head>. */
export interface SeoCollector {
  seo: SeoData | null;
}

export const SeoCollectorContext = createContext<SeoCollector | null>(null);

/** Define title, description, canonical, Open Graph, robots e JSON-LD da rota atual. */
export function useSeo(seo: SeoData) {
  const collector = useContext(SeoCollectorContext);
  if (collector) collector.seo = seo;

  const key = JSON.stringify(seo);
  useEffect(() => applyHeadTags(JSON.parse(key) as SeoData), [key]);
}
