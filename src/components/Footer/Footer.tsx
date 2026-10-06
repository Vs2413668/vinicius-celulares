import { company, navLinks } from '../../lib/config';
import { createWhatsAppLink } from '../../lib/whatsapp';
import CircuitBackground from '../CircuitBackground/CircuitBackground';
import SectionLink from '../ui/SectionLink';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <CircuitBackground variant="minimal" mirror parallax={30} className="footer__circuit" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/images/logo-mark.webp" alt="" width={152} height={118} className="footer__mark" loading="lazy" />
          <div>
            <p className="footer__name">{company.name}</p>
            <p className="footer__tagline mono">{company.tagline}</p>
          </div>
        </div>

        <nav className="footer__col" aria-label="Links do rodapé">
          <h2 className="footer__heading mono">Navegação</h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <SectionLink item={link} className="footer__link" />
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading mono">Contato</h2>
          <ul>
            <li>
              <a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="footer__link">
                {company.whatsappDisplay}
              </a>
            </li>
            <li className="footer__muted">{company.address}</li>
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading mono">Horário</h2>
          <ul>
            <li>Segunda a sexta: {company.hours.weekdaysShort}</li>
            <li>Sábado: {company.hours.saturdayShort}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© 2026 {company.name}. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por{' '}
          <a href="http://www.iggormodesto.com.br" target="_blank" rel="noopener noreferrer" className="footer__link footer__credit">
            Iggor Modesto
          </a>
        </p>
      </div>
    </footer>
  );
}
