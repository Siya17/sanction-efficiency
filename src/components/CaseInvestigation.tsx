import { getIndicatorsForCase } from "../data/indicators";
import { getTimelineForCase } from "../data/timelines";
import type { CaseStudy, EvidenceSortCategory } from "../types";
import { CaseTimeline } from "./CaseTimeline";
import { EvidenceSorter } from "./EvidenceSorter";
import { IndicatorCard } from "./IndicatorCard";
import { TeacherNotes } from "./TeacherNotes";
import { RealDataSnapshot } from "./RealDataSnapshot";

type CaseInvestigationProps = {
  caseStudy: CaseStudy;
  successCriterion: string;
  assignments: Record<string, EvidenceSortCategory>;
  canContinue: boolean;
  onCriterionChange: (criterion: string) => void;
  onAssignEvidence: (cardId: string, category: EvidenceSortCategory) => void;
  onContinue: () => void;
};

export function CaseInvestigation({
  caseStudy,
  successCriterion,
  assignments,
  canContinue,
  onCriterionChange,
  onAssignEvidence,
  onContinue,
}: CaseInvestigationProps) {
  const sortedCount = Object.values(assignments).filter((value) => value !== "unassigned").length;
  const timelineEvents = getTimelineForCase(caseStudy.id);
  const indicators = getIndicatorsForCase(caseStudy.id);

  return (
    <main className="page">
      <div className="investigation-layout">
        <aside className="case-brief">
          <p className="eyebrow">Steps 2 and 3</p>
          <h1>{caseStudy.question}</h1>
          <p className="student-instruction">
            First, choose what "worked" means. Your verdict should be based on this one success criterion.
          </p>
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

          <TeacherNotes note={caseStudy.teacherNote} />

          <button
            className="primary-button full-width"
            type="button"
            disabled={!canContinue}
            onClick={onContinue}
          >
            Build verdict
          </button>
          {!canContinue ? (
            <p className="hint">Choose a success criterion and sort at least 3 evidence cards.</p>
          ) : null}
        </aside>

        <section className="evidence-column">
          <details className="optional-data-check" open>
            <summary>Optional data check</summary>
            <p className="student-instruction">
              Which indicator you choose affects your judgment. Use this as a prompt, not proof.
            </p>
            <CaseTimeline events={timelineEvents} />
            <div className="indicator-grid">
              {indicators.map((indicator) => (
                <IndicatorCard indicator={indicator} key={indicator.id} />
              ))}
            </div>
          </details>

          <div className="section-heading-row">
            <div>
              <h2>Sort the evidence</h2>
              <p>Sort each evidence card into the category where it best belongs.</p>
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

          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Optional data check</h2>
            <p className="text-gray-600 mb-6">
              Before finalizing your verdict, inspect one real-data snapshot. Does this indicator support, weaken, or complicate your judgment?
            </p>
            <RealDataSnapshot caseId={caseStudy.id} />
          </div>
        </section>
      </div>
    </main>
  );
}
