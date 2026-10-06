import { useRef, type ReactNode } from 'react';
import { gsap } from '../../lib/gsap';
import { useGsap } from '../../hooks/useGsap';
import Breadcrumbs, { type Crumb } from '../Breadcrumbs/Breadcrumbs';
import CircuitBackground from '../CircuitBackground/CircuitBackground';
import './PageHeader.css';

interface PageHeaderProps {
  breadcrumbs: Crumb[];
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}

/** Cabeçalho das páginas internas, no mesmo sistema visual do Hero. */
export default function PageHeader({ breadcrumbs, label, title, lead, children }: PageHeaderProps) {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reduced }) => {
    if (reduced) return;
    gsap.from(ref.current!.querySelectorAll('.page-header__inner > *'), {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.08,
    });
    gsap.from('.page-header__line', { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power2.inOut', delay: 0.2 });
  });

  return (
    <header className="page-header" ref={ref}>
      <CircuitBackground variant="minimal" mirror parallax={30} className="page-header__circuit" />
      <div className="grid-texture" aria-hidden="true" />
      <div className="container page-header__inner">
        <Breadcrumbs items={breadcrumbs} />
        <p className="label">{label}</p>
        <h1 className="page-header__title">{title}</h1>
        {lead && <p className="section-lead">{lead}</p>}
        {children}
      </div>
      <span className="page-header__line" aria-hidden="true" />
    </header>
  );
}
