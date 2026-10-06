import { useRef, type CSSProperties } from 'react';
import { differentials } from '../../data/differentials';
import { company } from '../../lib/config';
import { gsap } from '../../lib/gsap';
import { reveal } from '../../lib/animations';
import { useGsap } from '../../hooks/useGsap';
import CircuitBackground from '../CircuitBackground/CircuitBackground';
import SectionHeader from '../ui/SectionHeader';
import './WhyUs.css';

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reduced, mobile }) => {
    const section = ref.current!;
    const items = section.querySelectorAll<HTMLElement>('.why__item');

    if (reduced) {
      items.forEach((item) => item.classList.add('is-active'));
      return;
    }

    reveal(section.querySelectorAll('.section-header > *'), { trigger: section, stagger: 0.1 });
    reveal('.why__aside-meta', { trigger: section, y: 20, delay: 0.3 });

    // Trilha de progresso acompanhando o scroll.
    gsap.fromTo(
      '.why__spine-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.why__track', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      },
    );

    items.forEach((item) => {
      gsap.from(item.querySelector('.why__card'), {
        autoAlpha: 0,
        x: mobile ? 20 : 48,
        duration: 0.9,
        scrollTrigger: {
          trigger: item,
          start: 'top 72%',
          once: true,
          onEnter: () => item.classList.add('is-active'),
        },
      });
    });
  });

  return (
    <section id="por-que-nos" className="section why" ref={ref} aria-labelledby="why-title">
      <CircuitBackground variant="hero" mirror parallax={60} className="why__circuit" />
      <div className="grid-texture" aria-hidden="true" />

      <div className="container why__grid">
        <div className="why__aside">
          <SectionHeader
            index="04"
            label="Diferenciais"
            id="why-title"
            title={
              <>
                Por que escolher a <span className="text-silver">{company.name}?</span>
              </>
            }
          />
          <div className="why__aside-meta mono" aria-hidden="true">
            <span>{String(differentials.length).padStart(2, '0')}</span>
            <span className="why__aside-line" />
            <span>Diferenciais</span>
          </div>
        </div>

        <div className="why__track">
          <span className="why__spine" aria-hidden="true">
            <span className="why__spine-fill" />
          </span>
          <ol className="why__list">
          {differentials.map(({ title, description, icon: Icon }, i) => (
            <li key={title} className="why__item" style={{ '--step': i } as CSSProperties}>
              <span className="why__node" aria-hidden="true" />
              <span className="why__connector" aria-hidden="true" />
              <div className="why__card">
                <span className="why__number mono" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="why__body">
                  <h3 className="why__title">
                    <Icon size={20} strokeWidth={1.6} className="why__icon" aria-hidden="true" />
                    {title}
                  </h3>
                  <p className="why__text">{description}</p>
                </div>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
