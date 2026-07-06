import type { CaseIndicator } from "../types";
import { IndicatorChart } from "./IndicatorChart";

type IndicatorCardProps = {
  indicator: CaseIndicator;
};

export function IndicatorCard({ indicator }: IndicatorCardProps) {
  const latest = indicator.data[indicator.data.length - 1];

  return (
    <article className="indicator-card">
      <div className="indicator-card-header">
        <span>{indicator.kind.replace(/_/g, " ")}</span>
        {latest ? <strong>{latest.year}</strong> : null}
      </div>
      <h3>{indicator.title}</h3>
      <p>{indicator.description}</p>
      {latest ? (
        <p className="indicator-latest">
          Latest shown: <strong>{latest.value}</strong>
          {indicator.unit ? ` ${indicator.unit}` : ""}
          {latest.label ? ` (${latest.label})` : ""}
        </p>
      ) : null}
      <IndicatorChart indicator={indicator} />
      <p className="data-caveat">{indicator.caveat}</p>
      <p className="data-caveat">This indicator does not prove causation. The same case may look different under another success criterion.</p>
      {indicator.sourceUrl && indicator.sourceTitle ? (
        <a href={indicator.sourceUrl} target="_blank" rel="noreferrer">
          {indicator.sourceTitle}
        </a>
      ) : null}
    </article>
  );
}
