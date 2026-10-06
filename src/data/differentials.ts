import { BadgeCheck, Eye, Handshake, ShieldCheck, UserCog, type LucideIcon } from 'lucide-react';

export interface Differential {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const differentials: Differential[] = [
  { title: 'Atendimento de confiança', description: 'Atendimento próximo e transparente em cada etapa.', icon: Handshake },
  { title: 'Qualidade nos serviços', description: 'Experiência e cuidado em cada reparo.', icon: BadgeCheck },
  { title: 'Transparência', description: 'Você sabe o que está sendo feito no seu equipamento.', icon: Eye },
  { title: 'Atendimento personalizado', description: 'Cada cliente e cada equipamento recebem uma avaliação individual.', icon: UserCog },
  { title: 'Garantia oferecida pela empresa', description: 'Mais segurança depois do serviço realizado.', icon: ShieldCheck },
];
