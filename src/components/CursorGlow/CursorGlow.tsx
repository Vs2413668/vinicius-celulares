import { useRef } from 'react';
import { gsap, media, useGSAP } from '../../lib/gsap';
import './CursorGlow.css';

/** Glow azul discreto que acompanha o cursor. Só em desktop com mouse e sem reduced motion. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${media.finePointer} and (prefers-reduced-motion: no-preference) and (min-width: 1024px)`, () => {
      const element = ref.current!;
      const xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3.out' });
      const onMove = (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
        element.classList.add('is-visible');
        const interactive = (event.target as Element | null)?.closest('a, button');
        element.classList.toggle('is-hovering', Boolean(interactive));
      };
      const onLeave = () => element.classList.remove('is-visible');
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      return () => {
        window.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
      };
    });
    return () => mm.revert();
  });

  return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
}
