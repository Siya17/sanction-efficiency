import type { CaseIndicator } from "../types";

type IndicatorChartProps = {
  indicator: CaseIndicator;
};

function scale(value: number, min: number, max: number, height: number) {
  if (max === min) {
    return height / 2;
  }

  return height - ((value - min) / (max - min)) * height;
}

export function IndicatorChart({ indicator }: IndicatorChartProps) {
  const width = 420;
  const height = 150;
  const padding = 24;
  const data = indicator.data;

  if (data.length === 0) {
    return <p className="empty-text">No indicator data available.</p>;
  }

  const values = data.map((point) => point.value);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const useBars = data.length <= 4;

  const points = data.map((point, index) => {
    const x = padding + (data.length === 1 ? chartWidth / 2 : (index / (data.length - 1)) * chartWidth);
    const y = padding + scale(point.value, min, max, chartHeight);
    return { ...point, x, y };
  });

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");

  return (
    <svg className="indicator-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={indicator.title}>
      <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} />
      <line x1={padding} x2={padding} y1={padding} y2={height - padding} />
      {useBars
        ? points.map((point) => {
            const barWidth = Math.max(26, chartWidth / data.length - 18);
            const barHeight = height - padding - point.y;
            return (
              <g key={point.year}>
                <rect x={point.x - barWidth / 2} y={point.y} width={barWidth} height={barHeight} rx="4" />
                <text x={point.x} y={height - 6} textAnchor="middle">
                  {point.year}
                </text>
              </g>
            );
          })
        : null}
      {!useBars ? <path d={linePath} /> : null}
      {!useBars
        ? points.map((point) => (
            <g key={point.year}>
              <circle cx={point.x} cy={point.y} r="4" />
              <text x={point.x} y={height - 6} textAnchor="middle">
                {point.year}
              </text>
            </g>
          ))
        : null}
    </svg>
  );
}
