import type { StudentSubmission } from "../types";
import {
  confidenceOrder,
  countWhere,
  getMissingEvidenceKeywords,
  groupByCriterion,
  trackOrder,
  verdictOrder,
} from "../utils/comparison";
import { confidenceLabels, trackLabels, verdictLabels } from "../utils/labels";
import { CriterionComparison } from "./CriterionComparison";
import { DiscussionPrompts } from "./DiscussionPrompts";
import { MissingEvidenceCloud } from "./MissingEvidenceCloud";
import { VerdictSummaryChart } from "./VerdictSummaryChart";

type ComparativeModeProps = {
  submissions: StudentSubmission[];
  onBackToBoard: () => void;
  onChooseCase: () => void;
};

export function ComparativeMode({ submissions, onBackToBoard, onChooseCase }: ComparativeModeProps) {
  const total = submissions.length;
  const verdictCounts = countWhere(submissions, verdictOrder, (submission) => submission.verdict).map((item) => ({
    ...item,
    label: verdictLabels[item.key],
    className: item.key,
  }));
  const trackCounts = countWhere(submissions, trackOrder, (submission) => submission.track).map((item) => ({
    ...item,
    label: trackLabels[item.key],
    className: item.key,
  }));
  const confidenceCounts = countWhere(submissions, confidenceOrder, (submission) => submission.confidence).map((item) => ({
    ...item,
    label: confidenceLabels[item.key],
    className: item.key,
  }));
  const criterionGroups = groupByCriterion(submissions);
  const missingKeywords = getMissingEvidenceKeywords(submissions);

  return (
    <main className="page compare-page">
      <div className="board-header">
        <div>
          <p className="eyebrow">Comparative Mode</p>
          <h1>Compare Class Results</h1>
          <p>
            Look for patterns across cases, criteria, confidence, and missing evidence. This view extends the Class Board; it does not replace it.
          </p>
        </div>
        <div className="board-actions">
          <button className="secondary-button" type="button" onClick={onBackToBoard}>
            Back to board
          </button>
          <button className="primary-button" type="button" onClick={onChooseCase}>
            Add verdict
          </button>
        </div>
      </div>

      {total === 0 ? (
        <section className="empty-board">
          <h2>No submissions to compare yet</h2>
          <p>Comparative Mode becomes useful after one or more pairs submit verdicts.</p>
          <button className="primary-button" type="button" onClick={onChooseCase}>
            Choose a case
          </button>
        </section>
      ) : (
        <>
          <section className="compare-stats" aria-label="Comparison summary">
            <div className="board-stat">
              <span>{total}</span>
              <strong>Total submissions</strong>
            </div>
            <div className="board-stat">
              <span>{criterionGroups.length}</span>
              <strong>Success criteria used</strong>
            </div>
            <div className="board-stat">
              <span>{missingKeywords.length}</span>
              <strong>Missing-evidence keywords</strong>
            </div>
          </section>

          <section className="comparison-grid">
            <VerdictSummaryChart items={verdictCounts} title="Verdict Overview" total={total} />
            <VerdictSummaryChart items={trackCounts} title="Sanctions vs Aid" total={total} />
            <VerdictSummaryChart items={confidenceCounts} title="Confidence Comparison" total={total} />
            <MissingEvidenceCloud keywords={missingKeywords} />
          </section>

          <CriterionComparison groups={criterionGroups} />
          <DiscussionPrompts submissions={submissions} />
        </>
      )}
    </main>
  );
}
