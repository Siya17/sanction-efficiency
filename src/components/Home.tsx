import type { CaseStudy } from "../types";

type HomeProps = {
  cases: CaseStudy[];
  onStart: () => void;
  onBoard: () => void;
};

const steps = [
  { title: "Meet the case", detail: "Read what happened, in plain English, with tricky terms explained." },
  { title: "Define success", detail: "Decide what “working” should actually mean for this case." },
  { title: "Find evidence", detail: "Research real numbers and facts yourself, and note your sources." },
  { title: "Give a verdict", detail: "Weigh what you found and defend a careful judgement." },
];

export function Home({ cases, onStart, onBoard }: HomeProps) {
  const caseCount = cases.length;

  return (
    <main className="page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Evidence Lab</p>
          <h1>Did it actually work?</h1>
          <p className="subtitle">Judge whether real sanctions and foreign-aid policies succeeded.</p>
          <p className="intro">
            "Did it work?" sounds simple, but it hides a hard question: <strong>work at what?</strong> In this activity
            your group picks one real case, decides what success should mean, and then goes and finds the evidence
            yourselves. You will not be handed the answer — you will build it.
          </p>
          <p className="intro">
            You do not need to know these cases already. Everything you need to understand them is explained as you go,
            and you can hover any underlined term for a quick definition.
          </p>
          <div className="button-row">
            <button type="button" className="primary-button" onClick={onStart}>
              Choose a case
            </button>
            <button type="button" className="secondary-button" onClick={onBoard}>
              View class board
            </button>
          </div>
        </div>

        <aside className="workflow-panel">
          <p className="eyebrow">Four steps · about 35 minutes</p>
          {steps.map((step, index) => (
            <div className="workflow-step" key={step.title}>
              <span>{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            </div>
          ))}
          <p className="hint">{caseCount} real cases to choose from — sanctions and foreign aid.</p>
        </aside>
      </section>
    </main>
  );
}
