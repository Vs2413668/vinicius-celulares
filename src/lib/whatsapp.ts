import { company } from './config';

/** Cria um link do WhatsApp para o número oficial. Sem mensagem, abre a conversa vazia. */
export function createWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${company.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
