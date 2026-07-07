import { useMemo, useState } from "react";
import type { StudentSubmission, Track, Verdict } from "../types";
import { confidenceLabels, trackLabels, verdictLabels } from "../utils/labels";
import { submissionsToCsv } from "../utils/submissions";

type ClassBoardProps = {
  submissions: StudentSubmission[];
  onClear: () => void;
  onCompare: () => void;
  onChooseCase: () => void;
};

type Filter = "all" | Track | Verdict;

function matchesFilter(submission: StudentSubmission, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "sanctions" || filter === "aid") return submission.track === filter;
  return submission.verdict === filter;
}

export function ClassBoard({ submissions, onClear, onCompare, onChooseCase }: ClassBoardProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredSubmissions = useMemo(
    () => submissions.filter((submission) => matchesFilter(submission, filter)),
    [filter, submissions],
  );

  const boardCounts = useMemo(
    () => ({
      total: submissions.length,
      sanctions: submissions.filter((submission) => submission.track === "sanctions").length,
      aid: submissions.filter((submission) => submission.track === "aid").length,
    }),
    [submissions],
  );

  function handleClear() {
    const confirmed = window.confirm("Clear all verdicts from this browser's class board?");
    if (confirmed) {
      onClear();
    }
  }

  function handleExport() {
    const csv = submissionsToCsv(filteredSubmissions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "did-it-work-class-board.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="page board-page">
      <div className="board-header">
        <div>
          <p className="eyebrow">Step 5</p>
          <h1>Class Board</h1>
          <div className="discussion-prompts">
            <p>Why is "Did it work?" hard to answer without deciding what success means?</p>
            <p>Which verdict changed most depending on the success test chosen?</p>
            <p>Where did a policy meet its goal but also cause serious harm?</p>
            <p>What missing evidence would make you more confident?</p>
          </div>
        </div>
        <div className="board-actions">
          <select
            aria-label="Filter submissions"
            value={filter}
            onChange={(event) => setFilter(event.target.value as Filter)}
          >
            <option value="all">All</option>
            <option value="sanctions">Sanctions</option>
            <option value="aid">Foreign aid</option>
            <option value="worked">Worked</option>
            <option value="failed">Failed</option>
            <option value="mixed">Mixed</option>
            <option value="cannot_judge">Cannot judge yet</option>
          </select>
          <button className="secondary-button" type="button" onClick={onChooseCase}>
            Add verdict
          </button>
          <button className="secondary-button" type="button" onClick={onCompare}>
            Compare cases
          </button>
          <button
            className="secondary-button"
            type="button"
            disabled={filteredSubmissions.length === 0}
            onClick={handleExport}
          >
            Export CSV
          </button>
          <button className="secondary-button" type="button" onClick={() => window.print()}>
            Print
          </button>
          <button
            className="danger-button"
            type="button"
            disabled={submissions.length === 0}
            onClick={handleClear}
          >
            Clear board
          </button>
        </div>
      </div>

      <section className="board-stats" aria-label="Submission counts">
        <div className="board-stat">
          <span>{boardCounts.total}</span>
          <strong>Total verdicts</strong>
        </div>
        <div className="board-stat">
          <span>{boardCounts.sanctions}</span>
          <strong>Sanctions</strong>
        </div>
        <div className="board-stat">
          <span>{boardCounts.aid}</span>
          <strong>Foreign aid</strong>
        </div>
      </section>

      {filteredSubmissions.length === 0 ? (
        <section className="empty-board">
          <h2>No verdicts yet</h2>
          <p>Submit one group's verdict, then refresh to confirm it stays on the board.</p>
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
                <th>Success test</th>
                <th>Verdict</th>
                <th>Confidence</th>
                <th>Strongest evidence</th>
                <th>Biggest complication</th>
                <th>Missing evidence</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.country}</td>
                  <td>
                    <span className={`track-pill ${submission.track}`}>{trackLabels[submission.track]}</span>
                  </td>
                  <td>{submission.policy}</td>
                  <td>{submission.successLens || "—"}</td>
                  <td>
                    <span className={`verdict-badge ${submission.verdict}`}>
                      {verdictLabels[submission.verdict]}
                    </span>
                  </td>
                  <td>
                    <span className={`confidence-badge ${submission.confidence}`}>
                      {confidenceLabels[submission.confidence]}
                    </span>
                  </td>
                  <td>{submission.strongestEvidence}</td>
                  <td>{submission.biggestComplication}</td>
                  <td>
                    {submission.missingEvidence}
                    {submission.studentEvidenceCards && submission.studentEvidenceCards.length > 0 && (
                      <details className="board-findings">
                        <summary>
                          {submission.studentEvidenceCards.length} findings researched
                        </summary>
                        <ul>
                          {submission.studentEvidenceCards.map((card) => (
                            <li key={card.id}>
                              {card.title} <span className="board-findings-source">({card.sourceTitle})</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
