import {
  BatteryCharging,
  Cable,
  CircuitBoard,
  Gauge,
  HardDriveDownload,
  Laptop,
  MemoryStick,
  MonitorSmartphone,
  ScanSearch,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceGroup {
  label: string;
  services: Service[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    label: 'Celulares',
    services: [
      { title: 'Manutenção de celulares', description: 'Diagnóstico e manutenção para devolver o funcionamento ideal ao seu aparelho.', icon: Smartphone },
      { title: 'Reparo de placas de celulares', description: 'Análise técnica e reparos especializados em placas e componentes eletrônicos.', icon: CircuitBoard },
      { title: 'Troca e reparo de conectores de carga', description: 'Troca e reparo de conectores com diagnóstico preciso do problema.', icon: Cable },
      { title: 'Troca de baterias', description: 'Substituição de baterias para recuperar autonomia e desempenho.', icon: BatteryCharging },
      { title: 'Troca de telas e componentes', description: 'Troca de telas e componentes danificados com cuidado técnico.', icon: MonitorSmartphone },
    ],
  },
  {
    label: 'Computadores',
    services: [
      { title: 'Manutenção de computadores', description: 'Manutenção preventiva e corretiva para computadores e notebooks.', icon: Laptop },
      { title: 'Formatação e instalação de sistemas', description: 'Formatação, instalação e configuração de sistemas operacionais.', icon: HardDriveDownload },
      { title: 'Configuração e otimização de computadores', description: 'Configuração para melhorar desempenho, estabilidade e utilização.', icon: Gauge },
      { title: 'Diagnóstico e reparos em equipamentos', description: 'Identificação de falhas e análise técnica dos equipamentos.', icon: ScanSearch },
      { title: 'Atualizações e substituição de componentes', description: 'Atualização e substituição de componentes para melhorar o equipamento.', icon: MemoryStick },
    ],
  },
];
