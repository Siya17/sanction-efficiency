import type { CaseStudy } from "../types";
import { trackLabels } from "../utils/labels";

type CaseCardProps = {
  caseStudy: CaseStudy;
  onSelect: (caseStudy: CaseStudy) => void;
};

export function CaseCard({ caseStudy, onSelect }: CaseCardProps) {
  return (
    <article className="case-card">
      <div className="case-card-header">
        <span className={`track-pill ${caseStudy.track}`}>{trackLabels[caseStudy.track]}</span>
        <span className="period-label">{caseStudy.period}</span>
      </div>
      <h3>{caseStudy.country}</h3>
      <p className="case-policy">{caseStudy.policy}</p>
      <p className="case-question">{caseStudy.question}</p>
      <span className="evidence-count">{caseStudy.evidenceCards.length} evidence cards</span>
      <button className="secondary-button full-width" type="button" onClick={() => onSelect(caseStudy)}>
        Investigate this case
      </button>
    </article>
  );
}
