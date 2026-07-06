import type { StudentSubmission, Verdict } from "../types";
import { verdictOrder } from "../utils/comparison";
import { verdictLabels } from "../utils/labels";

type CriterionComparisonProps = {
  groups: Array<{ criterion: string; submissions: StudentSubmission[] }>;
};

function countVerdict(submissions: StudentSubmission[], verdict: Verdict) {
  return submissions.filter((submission) => submission.verdict === verdict).length;
}

export function CriterionComparison({ groups }: CriterionComparisonProps) {
  return (
    <section className="comparison-panel wide">
      <h2>Success Criterion Comparison</h2>
      {groups.length === 0 ? (
        <p className="empty-text">No criteria to compare yet.</p>
      ) : (
        <div className="criterion-table-wrap">
          <table className="criterion-table">
            <thead>
              <tr>
                <th>Success criterion</th>
                <th>Submissions</th>
                {verdictOrder.map((verdict) => (
                  <th key={verdict}>{verdictLabels[verdict]}</th>
                ))}
                <th>Cases represented</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => {
                const cases = [...new Set(group.submissions.map((submission) => submission.country))];

                return (
                  <tr key={group.criterion}>
                    <td>{group.criterion}</td>
                    <td>{group.submissions.length}</td>
                    {verdictOrder.map((verdict) => (
                      <td key={verdict}>{countVerdict(group.submissions, verdict)}</td>
                    ))}
                    <td>{cases.join(", ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
