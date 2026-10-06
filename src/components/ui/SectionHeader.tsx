import type { ReactNode } from 'react';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: 'start' | 'center';
}

export default function SectionHeader({ index, label, title, lead, id, align = 'start' }: SectionHeaderProps) {
  return (
    <header className={`section-header section-header--${align}`}>
      <p className="label section-header__label" data-anim="label">
        <span className="mono">{index}</span>
        <span aria-hidden="true">/</span>
        {label}
      </p>
      <h2 className="section-title section-header__title" id={id} data-anim="title">
        {title}
      </h2>
      {lead && (
        <p className="section-lead section-header__lead" data-anim="lead">
          {lead}
        </p>
      )}
    </header>
  );
}
