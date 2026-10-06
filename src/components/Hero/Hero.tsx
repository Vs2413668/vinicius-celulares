import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { company, messages } from '../../lib/config';
import { createWhatsAppLink } from '../../lib/whatsapp';
import { gsap, getIntroDelay, matches, media } from '../../lib/gsap';
import { useGsap } from '../../hooks/useGsap';
import CircuitBackground from '../CircuitBackground/CircuitBackground';
import ButtonLink from '../ui/ButtonLink';
import HeroRings from './HeroRings';
import './Hero.css';

const specialties = ['Celulares', 'Computadores', 'Eletrônicos'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGsap(ref, ({ reduced, mobile }) => {
    if (reduced) {
      gsap.from('.hero__inner, .hero__meta', { autoAlpha: 0, duration: 0.4, ease: 'none' });
      return;
    }

    const tl = gsap.timeline({ delay: getIntroDelay(-0.25), defaults: { ease: 'power3.out' } });
    tl.from('.hero__logo', { autoAlpha: 0, scale: 0.9, duration: mobile ? 0.7 : 1.1 })
      .from('.hero__title .line > span', { yPercent: 110, duration: mobile ? 0.6 : 0.9, stagger: 0.12 }, '-=0.75')
      .from('.hero__sub', { autoAlpha: 0, y: 18, duration: 0.7 }, '-=0.5')
      .from('.hero__label', { autoAlpha: 0, x: -16, duration: 0.6 }, '<')
      .from('.hero__ctas > *', { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.08 }, '-=0.45')
      .from('.hero__rings', { autoAlpha: 0, scale: 0.94, duration: 1.2, ease: 'power2.out' }, '-=0.8')
      .from('.hero .circuit', { autoAlpha: 0, duration: 1.2, ease: 'none' }, '<')
      .from('.hero__meta > *', { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.08 }, '-=0.9');

    // Pontos de conexão acendendo em sequência.
    gsap.fromTo(
      '.hero .c-node',
      { opacity: 0.25 },
      { opacity: 1, duration: 0.6, ease: 'sine.inOut', stagger: { each: 0.35, from: 'random', repeat: -1, yoyo: true, repeatDelay: 1.6 }, delay: 1.6 },
    );

    // Leve resposta ao mouse no desktop.
    if (!mobile && matches(media.finePointer) && visualRef.current) {
      const xTo = gsap.quickTo(visualRef.current, 'x', { duration: 1.2, ease: 'power3.out' });
      const yTo = gsap.quickTo(visualRef.current, 'y', { duration: 1.2, ease: 'power3.out' });
      const onMove = (event: PointerEvent) => {
        xTo((event.clientX / window.innerWidth - 0.5) * 14);
        yTo((event.clientY / window.innerHeight - 0.5) * 14);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      return () => window.removeEventListener('pointermove', onMove);
    }
  });

  return (
    <section id="inicio" className="hero" ref={ref} aria-labelledby="hero-title">
      <CircuitBackground variant="hero" parallax={70} />
      <div className="hero__glow" data-parallax="40" aria-hidden="true" />
      <div className="grid-texture" aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="label hero__label">Assistência técnica · {company.neighborhood}</p>
          <h1 className="hero__title" id="hero-title">
            <span className="line">
              <span>Tecnologia que funciona.</span>
            </span>
            <span className="line">
              <span className="text-silver">Confiança que permanece.</span>
            </span>
          </h1>
          <p className="hero__sub">Assistência técnica especializada em celulares, computadores e eletrônicos.</p>
          <div className="hero__ctas">
            <ButtonLink href={createWhatsAppLink(messages.budget)} icon="whatsapp">
              Fale conosco pelo WhatsApp
            </ButtonLink>
            <ButtonLink href="#servicos" variant="secondary">
              Conheça nossos serviços
            </ButtonLink>
          </div>
        </div>

        <div className="hero__visual" ref={visualRef}>
          <HeroRings />
          <img
            className="hero__logo"
            src="/images/logo.webp"
            alt="Logo Vinícius Celulares — Manutenção e Acessórios"
            width={800}
            height={800}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="container hero__meta">
        <ul className="hero__specialties" aria-label="Especialidades">
          {specialties.map((item, i) => (
            <li key={item}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="hero__years mono">Mais de 5 anos · Mesmo endereço</p>
        <a href="#quem-somos" className="hero__scroll" aria-label="Rolar para Quem Somos">
          <ChevronDown size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
