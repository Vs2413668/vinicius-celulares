import { useEffect } from 'react';

export const DEFAULT_TITLE = 'Vinícius Celulares | Assistência Técnica no Jardim Ingá';
export const DEFAULT_DESCRIPTION =
  'Vinícius Celulares — assistência técnica especializada em celulares, computadores, acessórios e eletrônicos. Reparo, manutenção e atendimento de confiança no Jardim Ingá.';

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute('content', value);
}

/** Atualiza title, description e Open Graph da rota atual. */
export function useDocumentMeta(title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
  }, [title, description]);
}
