import { useRef, useState } from 'react';
import { gsap, getIntroDuration, introState, useGSAP } from '../../lib/gsap';
import './Intro.css';

/**
 * Introdução curta (~1,3s; ~0,7s no mobile). É apenas uma camada visual com
 * pointer-events: none — nunca bloqueia a navegação. Omitida com reduced motion.
 */
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  // Sempre começa visível (igual ao HTML pré-renderizado); com reduced motion
  // é removida antes da primeira pintura.
  const [visible, setVisible] = useState(() => {
    introState.playing = getIntroDuration() > 0;
    return true;
  });

  useGSAP(
    () => {
      if (!visible) return;
      if (!introState.playing) {
        setVisible(false);
        return;
      }
      const total = getIntroDuration();
      const short = total < 1;
      const tl = gsap.timeline({
        onComplete: () => {
          introState.playing = false;
          setVisible(false);
        },
      });
      tl.from('.intro__word', { autoAlpha: 0, scale: 0.94, letterSpacing: '0.2em', duration: short ? 0.35 : 0.6, stagger: 0.1, ease: 'power3.out' })
        .from('.intro__line', { scaleX: 0, duration: short ? 0.3 : 0.55, ease: 'power2.inOut' }, short ? 0.1 : 0.25)
        .from('.intro__spark', { autoAlpha: 0, scale: 0, duration: 0.3 }, '<0.2')
        .to(ref.current, { autoAlpha: 0, duration: short ? 0.25 : 0.4, ease: 'power2.in' }, total - (short ? 0.25 : 0.4));
    },
    { scope: ref, dependencies: [] },
  );

  if (!visible) return null;

  return (
    <div className="intro" ref={ref} aria-hidden="true">
      <div className="intro__content">
        <span className="intro__word intro__word--main">VINICIUS</span>
        <span className="intro__word intro__word--sub">CELULARES</span>
        <span className="intro__line">
          <span className="intro__spark" />
        </span>
      </div>
    </div>
  );
}
