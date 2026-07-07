import type { CaseStudy } from "../types";
import { trackLabels } from "../utils/labels";

type CaseCardProps = {
  caseStudy: CaseStudy;
  claimedBy?: string;
  disabled?: boolean;
  onSelect: (caseStudy: CaseStudy) => void;
};

export function CaseCard({ caseStudy, claimedBy, disabled, onSelect }: CaseCardProps) {
  return (
    <article className={`case-card ${disabled ? "case-card-disabled" : ""}`}>
      <div className="case-card-header">
        <span className={`track-pill ${caseStudy.track}`}>{trackLabels[caseStudy.track]}</span>
        <span className="period-label">{caseStudy.period}</span>
      </div>
      <h3>{caseStudy.country}</h3>
      <p className="case-policy">{caseStudy.policy}</p>
      <p className="case-question">{caseStudy.question}</p>

      {claimedBy && <div className="claimed-note">Claimed by: {claimedBy}</div>}

      <button
        className="secondary-button full-width"
        type="button"
        disabled={disabled}
        onClick={() => onSelect(caseStudy)}
      >
        {disabled ? "Unavailable" : "Investigate this case"}
      </button>
    </article>
  );
}
