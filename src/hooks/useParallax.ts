import { useGSAP } from '@gsap/react';
import { gsap, media } from '../lib/gsap';
import { parallax } from '../lib/animations';

/**
 * Aplica parallax a todo elemento com `data-parallax="<distância em px>"`.
 * Desativado com prefers-reduced-motion; reduzido pela metade no mobile.
 */
export function useParallax(routeKey: string) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ all: 'all', reduced: media.reduced, mobile: media.mobile }, (context) => {
        const { reduced, mobile } = context.conditions ?? {};
        if (reduced) return;
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((element) => {
          const distance = Number(element.dataset.parallax) || 60;
          parallax(element, mobile ? distance / 2 : distance, element.closest('section, footer'));
        });
      });
      return () => mm.revert();
    },
    { dependencies: [routeKey], revertOnUpdate: true },
  );
}
