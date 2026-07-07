import type { StudentSubmission } from "../types";
import { getHighConfidenceCases, getMostCommonVerdict } from "../utils/comparison";
import { verdictLabels } from "../utils/labels";

type DiscussionPromptsProps = {
  submissions: StudentSubmission[];
};

export function DiscussionPrompts({ submissions }: DiscussionPromptsProps) {
  const mostCommon = submissions.length > 0 ? getMostCommonVerdict(submissions) : null;
  const highConfidenceCases = getHighConfidenceCases(submissions);
  const hasCivilianCriterion = submissions.some((submission) => {
    const text = (submission.successLens || submission.successNote || "").toLowerCase();
    return text.includes("civilian") || text.includes("welfare") || text.includes("harm");
  });

  const prompts = [
    mostCommon && mostCommon.count > 0
      ? `Most groups chose ${verdictLabels[mostCommon.key as keyof typeof verdictLabels]}. What makes these cases hard to judge?`
      : "What verdict do you expect will be most common once groups submit?",
    highConfidenceCases.length > 0
      ? `Which cases had high confidence, such as ${highConfidenceCases.slice(0, 3).join(", ")}? Why?`
      : "Which evidence would make a group more confident?",
    hasCivilianCriterion
      ? "Did groups judging civilian welfare reach different verdicts from groups judging strategic success?"
      : "What might change if more groups judged civilian welfare or harm?",
    "Where did a policy appear successful by one criterion but harmful by another?",
    "What evidence was most often missing?",
  ].filter(Boolean);

  return (
    <section className="comparison-panel wide">
      <h2>Discussion Prompts</h2>
      <div className="generated-prompts">
        {prompts.map((prompt) => (
          <p key={prompt}>{prompt}</p>
        ))}
      </div>
    </section>
  );
}
