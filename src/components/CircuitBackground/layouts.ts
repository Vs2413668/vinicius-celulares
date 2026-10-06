import type { CircuitLayout } from './geometry';

/** Composições em viewBox 1440×900, inspiradas nas trilhas da logo. */
export const layouts = {
  hero: {
    buses: [
      { path: [[-20, 560], [150, 560], [300, 410], [300, 190], [390, 100]], count: 7, lit: [2, 5] },
      { path: [[-20, 720], [210, 720], [290, 800], [520, 800]], count: 5, lit: [1], desktopOnly: true },
      { path: [[1460, 340], [1290, 340], [1140, 490], [1140, 720], [1050, 810]], count: 7, lit: [1, 4] },
      { path: [[1460, 180], [1270, 180], [1210, 120], [1010, 120]], count: 4, lit: [2], desktopOnly: true },
    ],
    chips: [
      { x: 396, y: 52, size: 44 },
      { x: 990, y: 796, size: 48, desktopOnly: true },
    ],
    vias: [
      { x: 540, y: 150, cols: 3, rows: 4 },
      { x: 880, y: 720, cols: 4, rows: 3 },
      { x: 1240, y: 600, cols: 2, rows: 3 },
    ],
  },
  side: {
    buses: [
      { path: [[-20, 300], [120, 300], [240, 180], [240, -20]], count: 6, lit: [3] },
      { path: [[-20, 640], [90, 640], [190, 740], [190, 920]], count: 4, lit: [1], desktopOnly: true },
    ],
    chips: [{ x: 300, y: 380, size: 36, desktopOnly: true }],
    vias: [{ x: 300, y: 260, cols: 2, rows: 3 }],
  },
  minimal: {
    buses: [{ path: [[-20, 180], [200, 180], [320, 60], [620, 60]], count: 4, lit: [2] }],
    chips: [],
    vias: [{ x: 680, y: 40, cols: 3, rows: 2 }],
  },
} satisfies Record<string, CircuitLayout>;

export type CircuitVariant = keyof typeof layouts;
