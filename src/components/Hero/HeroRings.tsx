/** Anéis técnicos concêntricos ao redor da logo (decorativo). */
export default function HeroRings() {
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  return (
    <div className="hero__rings" data-parallax="-30" aria-hidden="true">
      <svg viewBox="0 0 600 600" focusable="false">
        <circle className="ring ring--outer" cx="300" cy="300" r="292" />
        <g className="ring-ticks">
          {ticks.map((deg) => (
            <line
              key={deg}
              x1="300"
              y1="14"
              x2="300"
              y2={deg % 45 === 0 ? 26 : 20}
              transform={`rotate(${deg} 300 300)`}
            />
          ))}
        </g>
        <circle className="ring ring--dashed" cx="300" cy="300" r="270" />
        <circle className="ring ring--arc" cx="300" cy="300" r="270" pathLength={100} />
        <circle className="ring ring--inner" cx="300" cy="300" r="246" />
      </svg>
    </div>
  );
}
