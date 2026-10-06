import { useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useGsap } from '../../hooks/useGsap';
import './SectionDivider.css';

/** Transição entre seções: uma trilha de 1px percorre a tela durante o scroll. */
export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(ref, ({ reduced }) => {
    if (reduced) return;
    gsap.fromTo(
      '.divider__beam',
      { xPercent: -100 },
      {
        xPercent: 100,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 95%', end: 'top 25%', scrub: 0.8 },
      },
    );
  });

  return (
    <div className="divider" ref={ref} aria-hidden="true">
      <div className="divider__line">
        <span className="divider__beam" />
      </div>
      <span className="divider__node" />
    </div>
  );
}
