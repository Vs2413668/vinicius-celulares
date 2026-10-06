import { useEffect, useRef, useState } from 'react';
import { ExternalLink, MapPin, MousePointerClick, Navigation } from 'lucide-react';
import { company, mapLinks } from '../../lib/config';

/**
 * Mapa carregado sob demanda (apenas quando se aproxima do viewport).
 * Fica bloqueado para interação até o usuário ativá-lo — assim o mapa
 * nunca "prende" o scroll da página no mobile.
 */
export default function MapEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="map tech-frame" ref={ref}>
      <div className="map__frame">
        {inView && (
          <iframe
            title={`Mapa de localização — ${company.address}`}
            src={mapLinks.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={interactive ? 'is-interactive' : undefined}
          />
        )}
        {!interactive && (
          <button type="button" className="map__activate" onClick={() => setInteractive(true)}>
            <span className="map__activate-label">
              <MousePointerClick size={16} aria-hidden="true" />
              Toque para interagir com o mapa
            </span>
          </button>
        )}
      </div>
      <div className="map__footer">
        <p>
          <MapPin size={15} aria-hidden="true" />
          {company.address}
        </p>
        <div className="map__actions">
          <a href={mapLinks.googleMaps} target="_blank" rel="noopener noreferrer" className="map__link">
            Google Maps
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <a href={mapLinks.waze} target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--sm map__waze">
            <Navigation size={16} className="btn__icon" aria-hidden="true" />
            <span>Rota no Waze</span>
          </a>
        </div>
      </div>
    </div>
  );
}
