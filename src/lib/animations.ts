import { gsap } from './gsap';

type Targets = gsap.TweenTarget;

interface RevealOptions {
  trigger: Element | string;
  start?: string;
  y?: number;
  x?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
}

/** Entrada padrão: opacity + translate, disparada uma vez pelo ScrollTrigger. */
export function reveal(targets: Targets, { trigger, start = 'top 82%', y = 32, x = 0, stagger = 0.08, duration = 0.9, delay = 0 }: RevealOptions) {
  return gsap.from(targets, {
    autoAlpha: 0,
    y,
    x,
    stagger,
    duration,
    delay,
    scrollTrigger: { trigger, start, once: true },
  });
}

/** Parallax sutil, sempre com scrub e apenas transform. */
export function parallax(target: Element, distance: number, trigger?: Element | null) {
  return gsap.fromTo(
    target,
    { y: -distance / 2 },
    {
      y: distance / 2,
      ease: 'none',
      scrollTrigger: { trigger: trigger ?? target, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    },
  );
}
