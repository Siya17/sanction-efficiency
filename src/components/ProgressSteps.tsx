import { workflowSteps } from "../constants/workflow";
import type { AppView } from "../types";

const viewStepIndex: Record<AppView, number> = {
  home: 0,
  selection: 0,
  investigation: 1,
  verdict: 3,
  board: 4,
};

type ProgressStepsProps = {
  currentView: AppView;
};

export function ProgressSteps({ currentView }: ProgressStepsProps) {
  const currentStep = viewStepIndex[currentView];

  return (
    <section className="progress-steps" aria-label="Activity progress">
      {workflowSteps.map((step, index) => {
        const status = index < currentStep ? "complete" : index === currentStep ? "current" : "upcoming";

        return (
          <div className={`progress-step ${status}`} key={step}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        );
      })}
    </section>
  );
}
