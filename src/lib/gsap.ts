import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.defaults({ ease: 'power3.out', duration: 0.9 });

export const media = {
  reduced: '(prefers-reduced-motion: reduce)',
  mobile: '(max-width: 767px)',
  finePointer: '(hover: hover) and (pointer: fine)',
} as const;

export const matches = (query: string) => typeof window !== 'undefined' && window.matchMedia(query).matches;

/** Duração total da intro (s). O Hero inicia sua timeline logo após. */
export function getIntroDuration(): number {
  if (matches(media.reduced)) return 0;
  return matches(media.mobile) ? 0.7 : 1.3;
}

/** A intro só toca no primeiro carregamento da home. */
export const introState = { playing: false };

/** Atraso para elementos que devem entrar depois da intro (0 se ela não estiver tocando). */
export const getIntroDelay = (offset = 0) => (introState.playing ? Math.max(getIntroDuration() + offset, 0) : 0);

export { gsap, ScrollTrigger, useGSAP };
