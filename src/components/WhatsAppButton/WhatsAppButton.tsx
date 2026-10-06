import { useRef } from 'react';
import { createWhatsAppLink } from '../../lib/whatsapp';
import { gsap, getIntroDelay, useGSAP } from '../../lib/gsap';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import './WhatsAppButton.css';

export default function WhatsAppButton({ hideOnMobile = false }: { hideOnMobile?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from(ref.current, { autoAlpha: 0, scale: 0.6, y: 20, duration: 0.7, ease: 'back.out(1.8)', delay: getIntroDelay(1.2) || 0.8 });
    },
    { scope: ref },
  );

  return (
    <a
      ref={ref}
      className={`wa-float ${hideOnMobile ? 'wa-float--hide-mobile' : ''}`}
      href={createWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
    >
      <span className="wa-float__pulse" aria-hidden="true" />
      <WhatsAppIcon size={26} className="whatsapp-glyph" />
      <span className="wa-float__tooltip" aria-hidden="true">
        Fale conosco
      </span>
    </a>
  );
}
