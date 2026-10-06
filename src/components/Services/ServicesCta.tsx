import { useRef } from 'react';
import { reveal } from '../../lib/animations';
import { gsap } from '../../lib/gsap';
import { useGsap } from '../../hooks/useGsap';
import { createWhatsAppLink } from '../../lib/whatsapp';
import CircuitBackground from '../CircuitBackground/CircuitBackground';
import ButtonLink from '../ui/ButtonLink';

export default function ServicesCta() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reduced }) => {
    if (reduced) return;
    gsap.fromTo(
      ref.current,
      { clipPath: 'inset(0% 50% 0% 50% round 12px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 12px)',
        duration: 1.2,
        ease: 'power3.inOut',
        clearProps: 'clipPath',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      },
    );
    reveal(ref.current!.querySelectorAll('.services-cta__content > *'), { trigger: ref.current!, y: 20, delay: 0.4, stagger: 0.1 });
  });

  return (
    <aside className="services-cta" ref={ref} aria-labelledby="services-cta-title">
      <CircuitBackground variant="minimal" className="services-cta__circuit" />
      <div className="services-cta__content">
        <p className="label">Orçamento</p>
        <h3 className="services-cta__title" id="services-cta-title">
          Precisa de um reparo?
        </h3>
        <p className="services-cta__text">Entre em contato conosco e solicite seu orçamento pelo WhatsApp.</p>
      </div>
      <ButtonLink href={createWhatsAppLink()} icon="whatsapp" className="services-cta__button">
        Solicitar orçamento
      </ButtonLink>
    </aside>
  );
}
