import type { PointerEvent } from 'react';
import type { Service } from '../../data/services';

interface ServiceCardProps {
  service: Service;
  index: number;
}

/** Atualiza a posição do glow que segue o cursor dentro do card. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <li className="service-card" onPointerMove={trackPointer}>
      <div className="service-card__top">
        <span className="service-card__icon">
          <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span className="service-card__number mono" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <h4 className="service-card__title">{service.title}</h4>
      <p className="service-card__text">{service.description}</p>
      <span className="service-card__trace" aria-hidden="true" />
    </li>
  );
}
