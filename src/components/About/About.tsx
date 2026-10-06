import { useRef } from 'react';
import { company } from '../../lib/config';
import { gsap } from '../../lib/gsap';
import { parallax, reveal } from '../../lib/animations';
import { useGsap } from '../../hooks/useGsap';
import CircuitBackground from '../CircuitBackground/CircuitBackground';
import SectionHeader from '../ui/SectionHeader';
import StorePhoto from './StorePhoto';
import './About.css';

const paragraphs = [
  `Há mais de 5 anos no ${company.neighborhood}, no mesmo local, construímos nossa história com base em confiança, compromisso e qualidade.`,
  'Somos especializados em reparo de celulares e manutenção de computadores, além de trabalharmos com venda de celulares, acessórios e diversos produtos eletrônicos.',
  'Somos uma assistência requisitada na região, sempre buscando cumprir nossos prazos e entregar um serviço de qualidade em cada atendimento.',
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reduced, mobile }) => {
    if (reduced) return;
    const section = ref.current!;
    reveal('[data-anim="label"]', { trigger: section, y: 0, x: -24 });
    reveal('[data-anim="title"]', { trigger: section, y: 0, x: mobile ? -30 : -80, duration: 1.1 });
    reveal('.about__text p', { trigger: '.about__text', y: 24, stagger: 0.14 });

    gsap.from('.about__years-number', {
      scale: 0.4,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'expo.out',
      transformOrigin: 'left bottom',
      scrollTrigger: { trigger: '.about__years', start: 'top 85%', once: true },
    });
    reveal('.about__years-copy > *', { trigger: '.about__years', y: 16, delay: 0.25, stagger: 0.1 });
    gsap.from('.about__years-line', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.2,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: '.about__years', start: 'top 85%', once: true },
    });

    reveal('.store-photo', { trigger: '.about__media', y: 50, stagger: 0.18, duration: 1.1 });
    if (!mobile) {
      section.querySelectorAll<HTMLElement>('[data-anim="photo"]').forEach((img) => {
        gsap.set(img, { scale: 1.14 });
        parallax(img, 50, img.closest('figure'));
      });
    }
  });

  return (
    <section id="quem-somos" className="section about" ref={ref} aria-labelledby="about-title">
      <CircuitBackground variant="side" parallax={60} className="about__circuit" />
      <div className="container about__grid">
        <div className="about__content">
          <SectionHeader index="01" label="Nossa história" title="Quem somos" id="about-title" />
          <div className="about__text">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>

          <div className="about__years">
            <p className="about__years-number" aria-label="Mais de 5 anos">
              <span className="text-silver" aria-hidden="true">
                {company.yearsLabel}
              </span>
            </p>
            <div className="about__years-copy">
              <p className="about__years-label mono" aria-hidden="true">
                Anos
              </p>
              <span className="about__years-line" aria-hidden="true" />
              <p className="about__years-text">Cuidando da tecnologia dos nossos clientes.</p>
            </div>
          </div>
        </div>

        <div className="about__media">
          <StorePhoto
            src="/images/loja.jpg"
            alt={`Fachada da loja ${company.name}`}
            width={826}
            height={1100}
            className="about__photo about__photo--main"
          />
          <StorePhoto
            src="/images/area-interna.webp"
            alt={`Área interna da loja ${company.name} com vitrines de acessórios`}
            width={900}
            height={1200}
            className="about__photo about__photo--inset"
            placeholderLabel="Área interna"
          />
          <p className="about__tag mono" data-parallax="-40">
            <span>{company.neighborhood}</span>
            <span>Mesmo endereço · +5 anos</span>
          </p>
        </div>
      </div>
    </section>
  );
}
