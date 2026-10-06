import type { MouseEventHandler, ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import type { NavLinkItem } from '../../lib/config';

interface SectionLinkProps {
  item: NavLinkItem;
  className?: string;
  children?: ReactNode;
  current?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Link de navegação principal: rota própria (ex.: /produtos), âncora com scroll
 * suave quando já está na home, ou "/#secao" quando está em outra página.
 */
export default function SectionLink({ item, className, children, current, onClick }: SectionLinkProps) {
  const { pathname } = useLocation();
  const content = children ?? item.label;
  const aria = current ? ('page' as const) : undefined;

  if (item.path) {
    return (
      <Link to={item.path} className={className} onClick={onClick} aria-current={aria}>
        {content}
      </Link>
    );
  }
  if (pathname === '/') {
    return (
      <a href={`#${item.id}`} className={className} onClick={onClick} aria-current={aria}>
        {content}
      </a>
    );
  }
  return (
    <Link to={{ pathname: '/', hash: item.id }} className={className} onClick={onClick} aria-current={aria}>
      {content}
    </Link>
  );
}
