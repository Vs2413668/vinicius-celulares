import { useRef } from 'react';
import { serviceGroups } from '../../data/services';
import { gsap } from '../../lib/gsap';
import { reveal } from '../../lib/animations';
import { useGsap } from '../../hooks/useGsap';
import CircuitBackground from '../CircuitBackground/CircuitBackground';
import SectionHeader from '../ui/SectionHeader';
import ServiceCard from './ServiceCard';
import ServicesCta from './ServicesCta';
import './Services.css';

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reduced, mobile }) => {
    if (reduced) return;
    const section = ref.current!;
    reveal(section.querySelectorAll('.section-header > *'), { trigger: section, stagger: 0.1 });

    section.querySelectorAll('.services__group').forEach((group) => {
      reveal(group.querySelector('.services__group-head'), { trigger: group, y: 0, x: -20 });
      gsap.from(group.querySelector('.services__group-line'), {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      });
      reveal(group.querySelectorAll('.service-card'), {
        trigger: group,
        start: 'top 80%',
        y: mobile ? 24 : 48,
        stagger: mobile ? 0.06 : 0.1,
      });
    });
  });

  let counter = 0;

  return (
    <section id="servicos" className="section services" ref={ref} aria-labelledby="services-title">
      <CircuitBackground variant="side" mirror parallax={50} className="services__circuit" />
      <div className="container">
        <SectionHeader
          index="02"
          label="Serviços"
          id="services-title"
          title={
            <>
              Diagnóstico preciso.
              <br />
              <span className="text-silver">Reparo especializado.</span>
            </>
          }
        />

        <div className="services__groups">
          {serviceGroups.map((group) => {
            const start = counter + 1;
            counter += group.services.length;
            return (
              <div className="services__group" key={group.label}>
                <div className="services__group-head">
                  <h3 className="services__group-title">{group.label}</h3>
                  <span className="services__group-line" aria-hidden="true" />
                  <span className="services__group-range mono" aria-hidden="true">
                    {String(start).padStart(2, '0')} — {String(counter).padStart(2, '0')}
                  </span>
                </div>
                <ul className="services__grid">
                  {group.services.map((service, i) => (
                    <ServiceCard key={service.title} service={service} index={start + i} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <ServicesCta />
      </div>
    </section>
  );
}
