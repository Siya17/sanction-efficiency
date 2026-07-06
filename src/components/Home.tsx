import { appConfig } from "../config/app";
import { workflowSteps } from "../constants/workflow";

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
            Your task is not to guess whether a policy was good or bad. Your task is to decide
            what evidence would be needed to judge whether it worked.
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
          {workflowSteps.map((step, index) => (
            <div className="workflow-step" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
