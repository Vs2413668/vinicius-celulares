import type { RefObject } from 'react';
import { gsap, media, useGSAP } from '../lib/gsap';

export interface MotionConditions {
  /** Usuário pediu redução de movimento: nada de parallax nem efeitos complexos. */
  reduced: boolean;
  /** Viewport mobile: animações mais curtas e simples. */
  mobile: boolean;
}

type Setup = (conditions: MotionConditions) => void | (() => void);

/**
 * Hook padrão de animações do projeto.
 * Executa `setup` dentro de um gsap.context (via useGSAP) com escopo na seção
 * e um gsap.matchMedia — tweens e ScrollTriggers são revertidos
 * automaticamente ao desmontar ou quando as media queries mudam.
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: Setup, dependencies: unknown[] = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ all: 'all', reduced: media.reduced, mobile: media.mobile }, (context) => {
        const { reduced = false, mobile = false } = context.conditions ?? {};
        return setup({ reduced, mobile });
      });
      return () => mm.revert();
    },
    { scope, dependencies },
  );
}
