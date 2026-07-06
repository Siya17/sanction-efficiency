import type { CaseStudy } from "../types";
import { CaseCard } from "./CaseCard";

type CaseSelectionProps = {
  cases: CaseStudy[];
  onSelectCase: (caseStudy: CaseStudy) => void;
};

export function CaseSelection({ cases, onSelectCase }: CaseSelectionProps) {
  const sanctions = cases.filter((caseStudy) => caseStudy.track === "sanctions");
  const aid = cases.filter((caseStudy) => caseStudy.track === "aid");

  return (
    <main className="page">
      <div className="page-heading">
        <p className="eyebrow">Step 1</p>
        <h1>Choose a real case</h1>
        <p>Pick one historical case to investigate. There is no trick question—just look at the evidence carefully.</p>
      </div>

      <section className="case-section">
        <h2>Sanctions cases</h2>
        <div className="case-grid">
          {sanctions.map((caseStudy) => (
            <CaseCard caseStudy={caseStudy} key={caseStudy.id} onSelect={onSelectCase} />
          ))}
        </div>
      </section>

      <section className="case-section">
        <h2>Foreign aid cases</h2>
        <div className="case-grid">
          {aid.map((caseStudy) => (
            <CaseCard caseStudy={caseStudy} key={caseStudy.id} onSelect={onSelectCase} />
          ))}
        </div>
      </section>
    </main>
  );
}
