import { useEffect } from "react";
import { InlineHelp } from "./InlineHelp";

type EvaluationQuestionBuilderProps = {
  policy: string;
  successGoal: string;
  actorOrGroup: string;
  timePeriod: string;
  onSuccessGoalChange: (val: string) => void;
  onActorOrGroupChange: (val: string) => void;
  onTimePeriodChange: (val: string) => void;
  onEvaluationQuestionChange: (val: string) => void;
};

export function EvaluationQuestionBuilder({
  policy,
  successGoal,
  actorOrGroup,
  timePeriod,
  onSuccessGoalChange,
  onActorOrGroupChange,
  onTimePeriodChange,
  onEvaluationQuestionChange
}: EvaluationQuestionBuilderProps) {

  useEffect(() => {
    if (successGoal || actorOrGroup || timePeriod) {
      const g = successGoal ? successGoal : "[goal]";
      const a = actorOrGroup ? actorOrGroup : "[actor/group]";
      const t = timePeriod ? timePeriod : "[time period]";
      const question = `Did ${policy} work if success means ${g} for ${a} over ${t}?`;
      onEvaluationQuestionChange(question);
    } else {
      onEvaluationQuestionChange("");
    }
  }, [policy, successGoal, actorOrGroup, timePeriod, onEvaluationQuestionChange]);

  const previewQuestion = (successGoal || actorOrGroup || timePeriod)
    ? `Did ${policy} work if success means ${successGoal || "[goal]"} for ${actorOrGroup || "[actor/group]"} over ${timePeriod || "[time period]"}?`
    : `Did ${policy} work if success means [goal] for [actor/group] over [time period]?`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold mb-2">Build your evaluation question</h2>
      <p className="text-gray-600 text-sm mb-6">
        "Did it work?" is too broad. Make the question specific by choosing the goal, the group or actor, and the time period.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Policy
          </label>
          <input 
            type="text" 
            value={policy} 
            disabled 
            className="w-full p-2 border rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Success goal *
            <InlineHelp term="Success goal">
              What exactly are you trying to achieve? (e.g., stopping violence, reducing poverty, forcing negotiations)
            </InlineHelp>
          </label>
          <input 
            type="text" 
            required
            value={successGoal} 
            onChange={(e) => onSuccessGoalChange(e.target.value)} 
            placeholder="e.g., reducing poverty or stopping violence"
            className="w-full p-2 border rounded-md" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Actor or group *
            <InlineHelp term="Actor or group">
              Who is the policy aimed at or who is it trying to help? (e.g., the target government, rural farmers, the military)
            </InlineHelp>
          </label>
          <input 
            type="text" 
            required
            value={actorOrGroup} 
            onChange={(e) => onActorOrGroupChange(e.target.value)} 
            placeholder="e.g., the target government or local communities"
            className="w-full p-2 border rounded-md" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time period *
            <InlineHelp term="Time period">
              When should we judge this? Immediately, after 5 years, or over the long term?
            </InlineHelp>
          </label>
          <input 
            type="text" 
            required
            value={timePeriod} 
            onChange={(e) => onTimePeriodChange(e.target.value)} 
            placeholder="e.g., the first 5 years, or after the withdrawal"
            className="w-full p-2 border rounded-md" 
          />
        </div>
      </div>

      <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-md">
        <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">Your Question Preview</h3>
        <p className="text-indigo-900 font-medium">{previewQuestion}</p>
      </div>
    </div>
  );
}
