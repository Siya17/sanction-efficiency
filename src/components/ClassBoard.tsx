import { useMemo, useState } from "react";
import type { StudentSubmission, Track } from "../types";
import { confidenceLabels, trackLabels, verdictLabels } from "../utils/labels";

type ClassBoardProps = {
  submissions: StudentSubmission[];
  onClear: () => void;
  onChooseCase: () => void;
};

type Filter = "all" | Track;

export function ClassBoard({ submissions, onClear, onChooseCase }: ClassBoardProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredSubmissions = useMemo(
    () =>
      submissions.filter((submission) => filter === "all" || submission.track === filter),
    [filter, submissions],
  );

  return (
    <main className="page">
      <div className="board-header">
        <div>
          <p className="eyebrow">Step 5</p>
          <h1>Class Board</h1>
          <p>Across these cases, why is "Did it work?" hard to answer?</p>
        </div>
        <div className="board-actions">
          <select
            aria-label="Filter submissions"
            value={filter}
            onChange={(event) => setFilter(event.target.value as Filter)}
          >
            <option value="all">All tracks</option>
            <option value="sanctions">Sanctions</option>
            <option value="aid">Foreign aid</option>
          </select>
          <button className="secondary-button" type="button" onClick={onChooseCase}>
            Add verdict
          </button>
          <button
            className="danger-button"
            type="button"
            disabled={submissions.length === 0}
            onClick={onClear}
          >
            Clear board
          </button>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <section className="empty-board">
          <h2>No verdicts yet</h2>
          <p>Submit one pair's verdict, then refresh to confirm it stays on the board.</p>
          <button className="primary-button" type="button" onClick={onChooseCase}>
            Choose a case
          </button>
        </section>
      ) : (
        <div className="board-table-wrap">
          <table className="board-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Track</th>
                <th>Policy</th>
                <th>Success criterion</th>
                <th>Verdict</th>
                <th>Confidence</th>
                <th>Strongest evidence</th>
                <th>Missing evidence</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.country}</td>
                  <td>{trackLabels[submission.track]}</td>
                  <td>{submission.policy}</td>
                  <td>{submission.successCriterion}</td>
                  <td>{verdictLabels[submission.verdict]}</td>
                  <td>{confidenceLabels[submission.confidence]}</td>
                  <td>{submission.strongestEvidence}</td>
                  <td>{submission.missingEvidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
