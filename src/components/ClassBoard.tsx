import { useMemo, useState } from "react";
import type { StudentSubmission, Track, Verdict } from "../types";
import { confidenceLabels, trackLabels, verdictLabels } from "../utils/labels";
import { submissionsToCsv } from "../utils/submissions";
import { exportResearchAsJson, exportResearchAsMarkdown } from "../utils/exportResearch";

type ClassBoardProps = {
  submissions: StudentSubmission[];
  onClear: () => void;
  onCompare: () => void;
  onChooseCase: () => void;
};

type Filter = "all" | Track | Verdict | "classroom" | "research";

function matchesFilter(submission: StudentSubmission, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "sanctions" || filter === "aid") return submission.track === filter;
  if (filter === "classroom" || filter === "research") return (submission.activityMode || "classroom") === filter;
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
            <p>Across the cases, why is "Did it work?" hard to answer?</p>
            <p>Which verdict changed most depending on the success criterion?</p>
            <p>Where did a policy produce both success and harm?</p>
            <p>What information was most often missing?</p>
          </div>
        </div>
        <div className="board-actions">
          <select
            aria-label="Filter submissions"
            value={filter}
            onChange={(event) => setFilter(event.target.value as Filter)}
          >
            <option value="all">All</option>
            <option value="classroom">Classroom Mode</option>
            <option value="research">Research Mode</option>
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
                  <td>{submission.successCriterion}</td>
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
                    {submission.dataSnapshotReflection && (
                      <details className="mt-2 text-sm text-gray-600 border p-2 bg-gray-50 rounded">
                        <summary className="cursor-pointer font-medium text-indigo-600">Data Snapshot Reflection</summary>
                        <p className="mt-1 pt-1 border-t border-gray-200">{submission.dataSnapshotReflection}</p>
                      </details>
                    )}
                    {submission.activityMode === "research" && (
                      <details className="mt-2 text-sm text-gray-800 border p-2 bg-indigo-50 rounded">
                        <summary className="cursor-pointer font-bold text-indigo-800 mb-1">Research Details</summary>
                        <div className="mt-2 space-y-3 pt-2 border-t border-indigo-100">
                          {submission.researchQuestion && (
                            <div>
                              <strong className="block text-indigo-900">Research Question:</strong>
                              <p>{submission.researchQuestion}</p>
                            </div>
                          )}
                          {submission.finalExplanation && (
                            <div>
                              <strong className="block text-indigo-900">Final Explanation:</strong>
                              <p>{submission.finalExplanation}</p>
                            </div>
                          )}
                          {submission.counterargument && (
                            <div>
                              <strong className="block text-indigo-900">Counterargument:</strong>
                              <p>{submission.counterargument}</p>
                            </div>
                          )}
                          {submission.evidenceThatWouldChangeMind && (
                            <div>
                              <strong className="block text-indigo-900">What would change mind:</strong>
                              <p>{submission.evidenceThatWouldChangeMind}</p>
                            </div>
                          )}
                          {submission.studentEvidenceCards && submission.studentEvidenceCards.length > 0 && (
                            <div>
                              <strong className="block text-indigo-900 mb-1">Student Evidence ({submission.studentEvidenceCards.length}):</strong>
                              <ul className="list-disc pl-4 space-y-1">
                                {submission.studentEvidenceCards.map((c, i) => (
                                  <li key={i}>{c.title} <span className="text-gray-500">({c.reliability})</span></li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="flex gap-2 mt-4 pt-2 border-t border-indigo-100">
                            <button onClick={() => exportResearchAsMarkdown(submission)} className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700">Export MD</button>
                            <button onClick={() => exportResearchAsJson(submission)} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded hover:bg-indigo-200">Export JSON</button>
                          </div>
                        </div>
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
