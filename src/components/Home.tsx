import { appConfig } from "../config/app";
import { activityTiming, workflowSteps } from "../constants/workflow";

type HomeProps = {
  onStart: () => void;
  onBoard: () => void;
};

export function Home({ onStart, onBoard }: HomeProps) {
  return (
    <main className="page home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Classroom investigation</p>
          <h1>{appConfig.title}</h1>
          <p className="subtitle">{appConfig.subtitle}</p>
          <p className="intro">
            Your task is not to decide whether a policy was good or bad in general. Your task is to decide
            whether it worked in a specific case, and what evidence would be needed to know.
          </p>
          <div className="button-row">
            <button className="primary-button" type="button" onClick={onStart}>
              Start with a case
            </button>
            <button className="secondary-button" type="button" onClick={onBoard}>
              View class board
            </button>
          </div>
        </div>

        <div className="workflow-panel" aria-label="Class workflow">
          <h2>Activity guide</h2>
          {workflowSteps.map((step, index) => (
            <div className="workflow-step" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
          <div className="timing-guide">
            <h3>Suggested timing</h3>
            {activityTiming.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.time}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
