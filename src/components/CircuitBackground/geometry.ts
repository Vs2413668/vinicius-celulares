export type Point = readonly [number, number];

export interface Bus {
  /** Linha central do barramento; as trilhas são deslocamentos paralelos dela. */
  path: Point[];
  count: number;
  spacing?: number;
  /** Índices das trilhas com glow azul. */
  lit?: number[];
  /** Esconde no mobile para reduzir densidade. */
  desktopOnly?: boolean;
}

export interface Chip {
  x: number;
  y: number;
  size: number;
  desktopOnly?: boolean;
}

export interface ViaGrid {
  x: number;
  y: number;
  cols: number;
  rows: number;
  gap?: number;
}

export interface CircuitLayout {
  buses: Bus[];
  chips: Chip[];
  vias: ViaGrid[];
}

export interface Trace {
  d: string;
  end: Point;
  lit: boolean;
  desktopOnly: boolean;
}

const unit = (a: Point, b: Point): Point => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const length = Math.hypot(dx, dy) || 1;
  return [dx / length, dy / length];
};

const normal = (d: Point): Point => [-d[1], d[0]];

/** Desloca uma polilinha mantendo cantos em esquadria (trilhas paralelas de PCB). */
function offsetPolyline(points: Point[], offset: number): Point[] {
  const dirs = points.slice(1).map((p, i) => unit(points[i], p));
  return points.map((p, i) => {
    if (i === 0 || i === points.length - 1) {
      const n = normal(dirs[Math.min(i, dirs.length - 1)]);
      return [p[0] + n[0] * offset, p[1] + n[1] * offset];
    }
    const n1 = normal(dirs[i - 1]);
    const n2 = normal(dirs[i]);
    const m = unit([0, 0], [n1[0] + n2[0], n1[1] + n2[1]]);
    const scale = offset / (m[0] * n1[0] + m[1] * n1[1]);
    return [p[0] + m[0] * scale, p[1] + m[1] * scale];
  });
}

const round = (n: number) => Math.round(n * 10) / 10;

export function buildTraces(bus: Bus): Trace[] {
  const spacing = bus.spacing ?? 12;
  return Array.from({ length: bus.count }, (_, i) => {
    const offset = (i - (bus.count - 1) / 2) * spacing;
    const points = offsetPolyline(bus.path, offset);
    // Encurta a última perna de forma escalonada, criando terminações irregulares.
    const trim = ((i * 37) % 5) * 22;
    const last = points[points.length - 1];
    const prev = points[points.length - 2];
    const dir = unit(prev, last);
    const available = Math.hypot(last[0] - prev[0], last[1] - prev[1]) - 12;
    const t = Math.min(trim, Math.max(available, 0));
    const end: Point = [round(last[0] - dir[0] * t), round(last[1] - dir[1] * t)];
    const all = [...points.slice(0, -1), end];
    return {
      d: `M${all.map(([x, y]) => `${round(x)} ${round(y)}`).join(' L')}`,
      end,
      lit: bus.lit?.includes(i) ?? false,
      desktopOnly: bus.desktopOnly ?? false,
    };
  });
}
