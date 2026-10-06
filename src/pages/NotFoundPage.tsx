import { useSeo } from '../hooks/useSeo';
import { notFoundSeo } from '../lib/pageSeo';
import { createWhatsAppLink } from '../lib/whatsapp';
import { routes } from '../lib/routes';
import PageHeader from '../components/PageHeader/PageHeader';
import ButtonLink from '../components/ui/ButtonLink';
import './NotFoundPage.css';

interface NotFoundPageProps {
  title?: string;
  message?: string;
}

export const notFoundTexts = {
  page: { title: 'Página não encontrada', message: 'O endereço acessado não existe ou foi alterado.' },
  category: { title: 'Categoria não encontrada', message: 'Esta categoria não existe ou não possui produtos no momento.' },
  product: { title: 'Produto não encontrado', message: 'Este produto não está mais disponível ou o endereço foi alterado.' },
} as const;

export default function NotFoundPage({ title = notFoundTexts.page.title, message = notFoundTexts.page.message }: NotFoundPageProps) {
  useSeo(notFoundSeo(title, message));
  return (
    <PageHeader breadcrumbs={[{ label: 'Início', to: routes.home }, { label: 'Erro 404' }]} label="Erro 404" title={title} lead={message}>
      <div className="not-found__actions">
        <ButtonLink href={routes.home}>Voltar para o início</ButtonLink>
        <ButtonLink href={routes.catalog} variant="secondary">
          Ver produtos
        </ButtonLink>
        <ButtonLink href={createWhatsAppLink()} variant="secondary" icon="whatsapp">
          Falar no WhatsApp
        </ButtonLink>
      </div>
    </PageHeader>
  );
}
