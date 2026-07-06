import type { CaseStudy, EvidenceSortCategory } from "../types";
import { EvidenceSorter } from "./EvidenceSorter";

type CaseInvestigationProps = {
  caseStudy: CaseStudy;
  successCriterion: string;
  assignments: Record<string, EvidenceSortCategory>;
  onCriterionChange: (criterion: string) => void;
  onAssignEvidence: (cardId: string, category: EvidenceSortCategory) => void;
  onContinue: () => void;
};

export function CaseInvestigation({
  caseStudy,
  successCriterion,
  assignments,
  onCriterionChange,
  onAssignEvidence,
  onContinue,
}: CaseInvestigationProps) {
  const sortedCount = Object.values(assignments).filter((value) => value !== "unassigned").length;
  const canContinue = successCriterion.length > 0 && sortedCount === caseStudy.evidenceCards.length;

  return (
    <main className="page">
      <div className="investigation-layout">
        <aside className="case-brief">
          <p className="eyebrow">Steps 2 and 3</p>
          <h1>{caseStudy.question}</h1>
          <p>{caseStudy.background}</p>

          <dl className="fact-list">
            <div>
              <dt>Policy</dt>
              <dd>{caseStudy.policy}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{caseStudy.period}</dd>
            </div>
          </dl>

          <label className="field-label" htmlFor="criterion">
            Choose a success criterion
          </label>
          <select
            id="criterion"
            value={successCriterion}
            onChange={(event) => onCriterionChange(event.target.value)}
          >
            <option value="">Select one criterion</option>
            {caseStudy.successCriteria.map((criterion) => (
              <option key={criterion} value={criterion}>
                {criterion}
              </option>
            ))}
          </select>

          <div className="source-box">
            <h2>Sources to inspect later</h2>
            <ul>
              {caseStudy.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                  {source.note ? <span>{source.note}</span> : null}
                </li>
              ))}
            </ul>
          </div>

          <button
            className="primary-button full-width"
            type="button"
            disabled={!canContinue}
            onClick={onContinue}
          >
            Build verdict
          </button>
          {!canContinue ? (
            <p className="hint">Choose a success criterion and sort all six evidence cards.</p>
          ) : null}
        </aside>

        <section className="evidence-column">
          <div className="section-heading-row">
            <div>
              <h2>Sort the evidence</h2>
              <p>Assign each card to the claim it best supports.</p>
            </div>
            <span className="progress-chip">
              {sortedCount}/{caseStudy.evidenceCards.length} sorted
            </span>
          </div>
          <EvidenceSorter
            assignments={assignments}
            cards={caseStudy.evidenceCards}
            onAssign={onAssignEvidence}
          />
        </section>
      </div>
    </main>
  );
}
