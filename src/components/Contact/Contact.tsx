import { useRef } from 'react';
import { Clock, MapPin, MessageCircle } from 'lucide-react';
import { company } from '../../lib/config';
import { createWhatsAppLink } from '../../lib/whatsapp';
import { reveal } from '../../lib/animations';
import { useGsap } from '../../hooks/useGsap';
import CircuitBackground from '../CircuitBackground/CircuitBackground';
import ButtonLink from '../ui/ButtonLink';
import SectionHeader from '../ui/SectionHeader';
import MapEmbed from './MapEmbed';
import './Contact.css';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reduced, mobile }) => {
    if (reduced) return;
    const section = ref.current!;
    reveal(section.querySelectorAll('.section-header > *'), { trigger: section, stagger: 0.1, y: 40 });
    reveal(section.querySelectorAll('.contact__item'), { trigger: '.contact__list', y: 36, stagger: 0.12 });
    reveal('.contact__cta', { trigger: '.contact__list', y: 30, delay: 0.4 });
    reveal('.map', { trigger: '.contact__grid', y: mobile ? 30 : 60, duration: 1.1, delay: 0.15 });
  });

  return (
    <section id="contato" className="section contact" ref={ref} aria-labelledby="contact-title">
      <CircuitBackground variant="hero" parallax={60} className="contact__circuit" />
      <div className="contact__glow" data-parallax="50" aria-hidden="true" />

      <div className="container">
        <SectionHeader
          index="05"
          label="Contato"
          id="contact-title"
          title={
            <>
              Vamos cuidar da sua <span className="text-silver">tecnologia?</span>
            </>
          }
          lead={`Entre em contato com a ${company.name}.`}
        />

        <div className="contact__grid">
          <div className="contact__info">
            <ul className="contact__list">
              <li className="contact__item">
                <span className="contact__icon">
                  <MapPin size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="contact__label mono">Endereço</h3>
                  <p className="contact__value">{company.address}</p>
                </div>
              </li>
              <li className="contact__item">
                <span className="contact__icon">
                  <MessageCircle size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="contact__label mono">WhatsApp</h3>
                  <a className="contact__value contact__value--link" href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    {company.whatsappDisplay}
                  </a>
                </div>
              </li>
              <li className="contact__item">
                <span className="contact__icon">
                  <Clock size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="contact__label mono">Horário</h3>
                  <p className="contact__value">Segunda a sexta: {company.hours.weekdays}</p>
                  <p className="contact__value">Sábado: {company.hours.saturday}</p>
                </div>
              </li>
            </ul>
            <ButtonLink href={createWhatsAppLink()} icon="whatsapp" className="contact__cta">
              Fale conosco pelo WhatsApp
            </ButtonLink>
          </div>

          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
