import type { CountItem } from "../utils/comparison";

type VerdictSummaryChartProps = {
  items: CountItem[];
  title: string;
  total: number;
};

export function VerdictSummaryChart({ items, title, total }: VerdictSummaryChartProps) {
  const max = Math.max(...items.map((item) => item.count), 1);

  return (
    <section className="comparison-panel">
      <h2>{title}</h2>
      <div className="count-bars">
        {items.map((item) => {
          const width = `${Math.max((item.count / max) * 100, item.count > 0 ? 8 : 0)}%`;
          const percent = total > 0 ? Math.round((item.count / total) * 100) : 0;

          return (
            <div className="count-bar-row" key={item.key}>
              <div className="count-bar-label">
                <strong>{item.label}</strong>
                <span>
                  {item.count} ({percent}%)
                </span>
              </div>
              <div className="count-bar-track" aria-hidden="true">
                <div className={`count-bar-fill ${item.className ?? ""}`} style={{ width }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
