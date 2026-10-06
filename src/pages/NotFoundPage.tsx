import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { createWhatsAppLink } from '../lib/whatsapp';
import { routes } from '../lib/routes';
import PageHeader from '../components/PageHeader/PageHeader';
import ButtonLink from '../components/ui/ButtonLink';
import './NotFoundPage.css';

interface NotFoundPageProps {
  title?: string;
  message?: string;
}

export default function NotFoundPage({
  title = 'Página não encontrada',
  message = 'O endereço acessado não existe ou foi alterado.',
}: NotFoundPageProps) {
  useDocumentMeta(`${title} | Vinícius Celulares`, message);
  return (
    <PageHeader breadcrumbs={[{ label: 'Início', to: routes.home }, { label: 'Erro 404' }]} label="Erro 404" title={title} lead={message}>
      <div className="not-found__actions">
        <ButtonLink href={routes.catalog}>Ver produtos</ButtonLink>
        <ButtonLink href={createWhatsAppLink()} variant="secondary" icon="whatsapp">
          Falar no WhatsApp
        </ButtonLink>
      </div>
    </PageHeader>
  );
}
