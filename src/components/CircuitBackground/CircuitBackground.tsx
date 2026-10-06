import { memo, useMemo } from 'react';
import { buildTraces, type Chip, type ViaGrid } from './geometry';
import { layouts, type CircuitVariant } from './layouts';
import './CircuitBackground.css';

interface CircuitBackgroundProps {
  variant?: CircuitVariant;
  /** Espelha horizontalmente (ex.: circuito no lado direito). */
  mirror?: boolean;
  /** Distância de parallax em px (0 desativa). */
  parallax?: number;
  className?: string;
}

function ChipShape({ x, y, size, desktopOnly }: Chip) {
  const pins = 5;
  const step = size / (pins + 1);
  const pinLength = 6;
  const ticks = Array.from({ length: pins }, (_, i) => step * (i + 1));
  return (
    <g className={desktopOnly ? 'c-desktop' : undefined}>
      {ticks.map((t) => (
        <g key={t} className="c-pin">
          <line x1={x + t} y1={y - pinLength} x2={x + t} y2={y} />
          <line x1={x + t} y1={y + size} x2={x + t} y2={y + size + pinLength} />
          <line x1={x - pinLength} y1={y + t} x2={x} y2={y + t} />
          <line x1={x + size} y1={y + t} x2={x + size + pinLength} y2={y + t} />
        </g>
      ))}
      <rect className="c-chip" x={x} y={y} width={size} height={size} rx={3} />
      <circle className="c-chip-dot" cx={x + 7} cy={y + 7} r={1.6} />
    </g>
  );
}

function Vias({ x, y, cols, rows, gap = 14 }: ViaGrid) {
  return (
    <g className="c-desktop">
      {Array.from({ length: cols * rows }, (_, i) => (
        <circle key={i} className="c-via" cx={x + (i % cols) * gap} cy={y + Math.floor(i / cols) * gap} r={2.6} />
      ))}
    </g>
  );
}

/**
 * Fundo de circuitos reutilizável. Puramente decorativo (aria-hidden) e
 * posicionado atrás do conteúdo — não interfere na legibilidade.
 */
function CircuitBackground({ variant = 'hero', mirror = false, parallax = 0, className = '' }: CircuitBackgroundProps) {
  const layout = layouts[variant];
  const traces = useMemo(() => layout.buses.flatMap(buildTraces), [layout]);

  return (
    <div
      className={`circuit circuit--${variant} ${mirror ? 'circuit--mirror' : ''} ${className}`}
      data-parallax={parallax || undefined}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="c-traces">
          {traces.map((trace, i) => (
            <g key={i} className={trace.desktopOnly ? 'c-desktop' : undefined}>
              <path className={trace.lit ? 'c-trace c-trace--lit' : 'c-trace'} d={trace.d} />
              {trace.lit && (
                <path
                  className="c-pulse"
                  d={trace.d}
                  pathLength={100}
                  style={{ animationDelay: `${(i * 1.7) % 6}s` }}
                />
              )}
              <circle
                className={trace.lit ? 'c-pad c-node' : 'c-pad'}
                cx={trace.end[0]}
                cy={trace.end[1]}
                r={trace.lit ? 3.4 : 3}
              />
            </g>
          ))}
        </g>
        {layout.chips.map((chip) => (
          <ChipShape key={`${chip.x}-${chip.y}`} {...chip} />
        ))}
        {layout.vias.map((via) => (
          <Vias key={`${via.x}-${via.y}`} {...via} />
        ))}
      </svg>
    </div>
  );
}

export default memo(CircuitBackground);
