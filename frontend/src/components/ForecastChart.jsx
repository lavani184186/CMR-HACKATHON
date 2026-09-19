const W = 420;
const H = 220;
const PAD = { top: 24, right: 20, bottom: 32, left: 40 };
const Y_MAX = 100;

export default function ForecastChart({ forecast }) {
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  // Lower bound adapts to the data so low-traffic places still show a readable line.
  const lowest = Math.min(...forecast.map((p) => p.value));
  const yMin = Math.max(0, Math.floor((lowest - 10) / 10) * 10);

  const x = (i) => PAD.left + (i * innerW) / (forecast.length - 1);
  const y = (v) => PAD.top + innerH - ((v - yMin) / (Y_MAX - yMin)) * innerH;

  const line = forecast
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.value)}`)
    .join(" ");

  const gridValues = [yMin, (yMin + Y_MAX) / 2, Y_MAX];
  const summary = forecast.map((p) => `${p.value}% at ${p.label}`).join(", ");

  return (
    <section className="card">
      <div className="card-head">
        <h2>Traffic Forecast</h2>
        <span className="muted">Congestion (%)</span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="chart"
        role="img"
        aria-label={`Congestion forecast: ${summary}`}
      >
        {gridValues.map((v) => (
          <g key={v}>
            <line className="grid" x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} />
            <text className="axis" x={PAD.left - 8} y={y(v) + 4} textAnchor="end">
              {v}
            </text>
          </g>
        ))}

        <path className="chart-line" d={line} />

        {forecast.map((p, i) => (
          <g key={p.label}>
            <circle className="chart-dot" cx={x(i)} cy={y(p.value)} r="5" />
            <text className="value-label" x={x(i)} y={y(p.value) - 12} textAnchor="middle">
              {p.value}
            </text>
            <text className="axis" x={x(i)} y={H - 10} textAnchor="middle">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </section>
  );
}
