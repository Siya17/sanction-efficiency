import type { CaseStudy } from "../types";
import { CaseCard } from "./CaseCard";

import type { ClaimedCase } from "../utils/supabase";

type CaseSelectionProps = {
  cases: CaseStudy[];
  claimedCases: ClaimedCase[];
  groupName: string;
  onSelectCase: (caseStudy: CaseStudy) => void;
};

export function CaseSelection({ cases, claimedCases, groupName, onSelectCase }: CaseSelectionProps) {
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
          {sanctions.map((caseStudy) => {
            const claim = claimedCases.find(c => c.case_id === caseStudy.id);
            const isClaimedByMe = claim?.group_name === groupName;
            const isClaimedByOther = claim && !isClaimedByMe;
            
            return (
              <CaseCard 
                caseStudy={caseStudy} 
                key={caseStudy.id} 
                onSelect={onSelectCase}
                claimedBy={claim?.group_name}
                disabled={!!isClaimedByOther}
              />
            );
          })}
        </div>
      </section>

      <section className="case-section">
        <h2>Foreign aid cases</h2>
        <div className="case-grid">
          {aid.map((caseStudy) => {
            const claim = claimedCases.find(c => c.case_id === caseStudy.id);
            const isClaimedByMe = claim?.group_name === groupName;
            const isClaimedByOther = claim && !isClaimedByMe;

            return (
              <CaseCard 
                caseStudy={caseStudy} 
                key={caseStudy.id} 
                onSelect={onSelectCase}
                claimedBy={claim?.group_name}
                disabled={!!isClaimedByOther}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
