import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { ScrollTrigger } from '../lib/gsap';

/** Estado de navegação para trocar de rota sem voltar ao topo (ex.: categorias do catálogo). */
export interface ScrollState {
  preserveScroll?: boolean;
}

/** Ao trocar de rota: rola para a âncora (ex.: "/#servicos") ou para o topo. */
export default function ScrollManager() {
  const location = useLocation();
  const { pathname } = location;
  const locationRef = useRef(location);
  locationRef.current = location;

  useLayoutEffect(() => {
    const { hash, state } = locationRef.current;
    if ((state as ScrollState | null)?.preserveScroll) return;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
