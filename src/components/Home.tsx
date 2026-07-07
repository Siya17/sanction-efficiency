import type { CaseStudy } from "../types";

type HomeProps = {
  cases: CaseStudy[];
  onStart: () => void;
  onBoard: () => void;
};

const steps = [
  { title: "Meet the case", time: "5 min", detail: "Read what happened, in plain English, with tricky terms explained." },
  { title: "Define success", time: "5 min", detail: "Decide what “working” should actually mean for this case." },
  { title: "Find evidence", time: "15 min", detail: "Research real numbers and facts yourself, and note your sources." },
  { title: "Give a verdict", time: "10 min", detail: "Weigh what you found and defend a careful judgement." },
];

export function Home({ cases, onStart, onBoard }: HomeProps) {
  const caseCount = cases.length;

  return (
    <main className="page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Evidence Lab</p>
          <h1>Did Sanctions Work? Did Foreign Aid Work?</h1>
          <p className="subtitle">Judge whether real sanctions and foreign-aid policies succeeded.</p>
          <p className="intro">
            "Did it work?" sounds simple, but success can mean many things. In this activity, your group will choose a real-world case, define what a successful outcome looks like, and search for evidence to support your conclusion.
          </p>
          <p className="intro">
            You don't need any prior knowledge about these cases. The background information is provided, and you can hover over any underlined term for a quick definition.
          </p>
          <div className="button-row">
            <button type="button" className="primary-button" onClick={onStart}>
              Choose a case
            </button>
          </div>
        </div>

        <aside className="workflow-panel">
          <p className="eyebrow">Four steps · about 35 minutes</p>
          <p className="text-sm text-gray-600 mb-4">There will be no timer, but this is a recommended time allocation.</p>
          {steps.map((step, index) => (
            <div className="workflow-step" key={step.title}>
              <span>{index + 1}</span>
              <div>
                <strong>{step.title}</strong> <small style={{ display: 'inline-block', backgroundColor: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: '4px', marginLeft: '8px', fontSize: '0.875rem' }}>{step.time}</small>
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
