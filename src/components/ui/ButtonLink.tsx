import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  /** `whatsapp` exibe o glifo da marca; `arrow` a seta animada. */
  icon?: 'arrow' | 'whatsapp' | 'none';
  size?: 'md' | 'sm';
  block?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  icon = 'arrow',
  size = 'md',
  block = false,
  className = '',
  ariaLabel,
}: ButtonLinkProps) {
  const external = href.startsWith('http');
  const classes = ['btn', `btn--${variant}`, size === 'sm' && 'btn--sm', block && 'btn--block', className].filter(Boolean).join(' ');

  const content = (
    <>
      {icon === 'whatsapp' && <WhatsAppIcon className="btn__icon whatsapp-glyph" size={size === 'sm' ? 16 : 18} />}
      <span>{children}</span>
      {icon === 'arrow' && <ArrowRight className="btn__icon btn__icon--arrow" size={18} aria-hidden="true" />}
    </>
  );

  // Rotas internas usam o router (sem recarregar a página).
  if (href.startsWith('/')) {
    return (
      <Link className={classes} to={href} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <a className={classes} href={href} aria-label={ariaLabel} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
      {content}
    </a>
  );
}
