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
    <article className={`case-card ${disabled ? 'opacity-70 grayscale-[0.5]' : ''}`}>
      <div className="case-card-header">
        <span className={`track-pill ${caseStudy.track}`}>{trackLabels[caseStudy.track]}</span>
        <span className="period-label">{caseStudy.period}</span>
      </div>
      <h3>{caseStudy.country}</h3>
      <p className="case-policy">{caseStudy.policy}</p>
      <p className="case-question">{caseStudy.question}</p>
      <span className="evidence-count">{caseStudy.evidenceCards.length} evidence cards</span>
      
      {claimedBy && (
        <div className="mt-3 p-2 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded text-center border border-yellow-200">
          Claimed by: {claimedBy}
        </div>
      )}

      <button 
        className="secondary-button full-width mt-3" 
        type="button" 
        disabled={disabled}
        onClick={() => onSelect(caseStudy)}
      >
        {disabled ? 'Unavailable' : 'Investigate this case'}
      </button>
    </article>
  );
}
