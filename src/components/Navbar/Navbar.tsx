import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { company, navLinks } from '../../lib/config';
import { createWhatsAppLink } from '../../lib/whatsapp';
import { useScrolled } from '../../hooks/useScrolled';
import { useActiveSection } from '../../hooks/useActiveSection';
import ButtonLink from '../ui/ButtonLink';
import SectionLink from '../ui/SectionLink';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import './Navbar.css';

const sectionIds = navLinks.map((link) => link.id);
const noSections: string[] = [];

export default function Navbar() {
  const scrolled = useScrolled();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const activeSection = useActiveSection(isHome ? sectionIds : noSections);
  const active = isHome ? activeSection : pathname.startsWith('/produtos') ? 'produtos' : null;
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => close(), [pathname, close]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1200px)');
    const onChange = () => desktop.matches && setOpen(false);
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label={`${company.name} — página inicial`} onClick={close}>
          <img src="/images/logo-mark.webp" alt="" width={152} height={118} className="nav__mark" />
          <img src="/images/logo-wordmark.webp" alt="" width={480} height={90} className="nav__wordmark" />
        </Link>

        <nav className="nav__links" aria-label="Navegação principal">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <SectionLink item={link} className="nav__link" current={active === link.id} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <ButtonLink href={createWhatsAppLink()} variant="secondary" size="sm" icon="whatsapp" className="nav__cta">
            WhatsApp
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className="nav__drawer" hidden={!open}>
        <nav aria-label="Navegação mobile">
          <ol>
            {navLinks.map((link, i) => (
              <li key={link.id}>
                <SectionLink item={link} onClick={close} current={active === link.id}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ol>
        </nav>
        <div className="nav__drawer-footer">
          <a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--block">
            <WhatsAppIcon className="btn__icon whatsapp-glyph" />
            <span>{company.whatsappDisplay}</span>
          </a>
          <p className="nav__drawer-meta mono">{company.address}</p>
        </div>
      </div>
    </header>
  );
}
