import { AlertTriangle, PackageOpen, RefreshCw } from 'lucide-react';
import { createWhatsAppLink } from '../../lib/whatsapp';
import ButtonLink from '../ui/ButtonLink';

export function ProductsSkeleton() {
  return (
    <div className="products-skeleton" role="status" aria-label="Carregando produtos">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton--media" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line skeleton--short" />
        </div>
      ))}
    </div>
  );
}

interface ProductsMessageProps {
  kind: 'empty' | 'error';
  onRetry?: () => void;
}

export function ProductsMessage({ kind, onRetry }: ProductsMessageProps) {
  const isError = kind === 'error';
  const Icon = isError ? AlertTriangle : PackageOpen;
  return (
    <div className="products-message" role={isError ? 'alert' : 'status'}>
      <span className="products-message__icon">
        <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <h3 className="products-message__title">
        {isError ? 'Não foi possível carregar os produtos.' : 'Nenhum produto disponível no momento.'}
      </h3>
      <p className="products-message__text">
        {isError
          ? 'Tente novamente em instantes ou fale conosco pelo WhatsApp para consultar disponibilidade.'
          : 'Nossa vitrine está sendo atualizada. Fale conosco pelo WhatsApp para consultar produtos disponíveis.'}
      </p>
      <div className="products-message__actions">
        {isError && onRetry && (
          <button type="button" className="btn btn--secondary btn--sm" onClick={onRetry}>
            <RefreshCw size={16} className="btn__icon" aria-hidden="true" />
            <span>Tentar novamente</span>
          </button>
        )}
        <ButtonLink href={createWhatsAppLink()} size="sm" icon="whatsapp">
          Consultar pelo WhatsApp
        </ButtonLink>
      </div>
    </div>
  );
}
