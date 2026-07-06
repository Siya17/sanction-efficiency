import { FormEvent, useMemo, useState } from "react";
import { confidenceOptions, evidenceSortCategories, verdictOptions } from "../constants/workflow";
import type { CaseStudy, Confidence, EvidenceSortCategory, SubmissionDraft, Verdict, ActivityMode, StudentEvidenceCard, Citation } from "../types";
import { categoryLabels, confidenceLabels, verdictLabels } from "../utils/labels";

type VerdictBuilderProps = {
  activityMode: ActivityMode;
  studentEvidence: StudentEvidenceCard[];
  caseStudy: CaseStudy;
  successCriterion: string;
  assignments: Record<string, EvidenceSortCategory>;
  onSubmit: (submission: SubmissionDraft) => void;
  onBack: () => void;
};

export function VerdictBuilder({
  activityMode,
  studentEvidence,
  caseStudy,
  successCriterion,
  assignments,
  onSubmit,
  onBack,
}: VerdictBuilderProps) {
  const [policyAim, setPolicyAim] = useState("");
  const [verdict, setVerdict] = useState<Verdict>("mixed");
  const [confidence, setConfidence] = useState<Confidence>("medium");
  const [strongestEvidence, setStrongestEvidence] = useState("");
  const [biggestComplication, setBiggestComplication] = useState("");
  const [missingEvidence, setMissingEvidence] = useState("");
  const [dataSnapshotReflection, setDataSnapshotReflection] = useState("");

  const isResearch = activityMode === "research";
  
  // Research fields
  const [researchQuestion, setResearchQuestion] = useState(`Did ${caseStudy.track === "sanctions" ? "sanctions" : "foreign aid"} work in the case of ${caseStudy.country}?`);
  const [counterargument, setCounterargument] = useState("");
  const [evidenceThatWouldChangeMind, setEvidenceThatWouldChangeMind] = useState("");
  const [remainingUncertainty, setRemainingUncertainty] = useState("");
  const [finalExplanation, setFinalExplanation] = useState("");
  const [usingOnlyCurated, setUsingOnlyCurated] = useState(false);
  const [citations, setCitations] = useState<Citation[]>([]);

  const [newCitationTitle, setNewCitationTitle] = useState("");
  const [newCitationAuthor, setNewCitationAuthor] = useState("");
  const [newCitationYear, setNewCitationYear] = useState("");
  const [newCitationUrl, setNewCitationUrl] = useState("");

  const evidenceByCategory = useMemo(() => {
    const allCards = [
      ...caseStudy.evidenceCards,
      ...studentEvidence.map(se => ({
        id: se.id,
        title: se.title,
        text: se.summary,
        type: "success_evidence" as const,
        sourceTitle: se.sourceTitle,
        sourceUrl: se.sourceUrl,
      }))
    ];
    return evidenceSortCategories.map((category) => ({
      category,
      cards: allCards.filter((card) => assignments[card.id] === category),
    }));
  }, [assignments, caseStudy.evidenceCards, studentEvidence]);

  let canSubmit = false;
  
  if (isResearch) {
    canSubmit =
      finalExplanation.trim().length > 0 &&
      strongestEvidence.trim().length > 0 &&
      (remainingUncertainty.trim().length > 0 || missingEvidence.trim().length > 0) &&
      (studentEvidence.length > 0 || usingOnlyCurated);
  } else {
    canSubmit =
      policyAim.trim().length > 0 &&
      strongestEvidence.trim().length > 0 &&
      biggestComplication.trim().length > 0 &&
      missingEvidence.trim().length > 0;
  }

  const sentence = `In the case of ${caseStudy.country}, the policy aimed to ${
    policyAim || "..."
  }. We judge success by ${successCriterion || "..."}. Our verdict is ${
    verdictLabels[verdict]
  } with ${confidenceLabels[confidence]} confidence because ${
    strongestEvidence || "..."
  }. But we would need ${missingEvidence || "..."} to be more certain.`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const draft: SubmissionDraft = {
      caseId: caseStudy.id,
      country: caseStudy.country,
      track: caseStudy.track,
      policy: caseStudy.policy,
      successCriterion,
      policyAim,
      verdict,
      confidence,
      strongestEvidence,
      biggestComplication,
      missingEvidence: isResearch ? remainingUncertainty : missingEvidence,
      dataSnapshotReflection: dataSnapshotReflection.trim() || undefined,
      activityMode,
    };

    if (isResearch) {
      draft.studentEvidenceCards = studentEvidence;
      draft.researchQuestion = researchQuestion;
      draft.supportingEvidence = strongestEvidence;
      draft.complicatingEvidence = biggestComplication;
      draft.counterargument = counterargument;
      draft.evidenceThatWouldChangeMind = evidenceThatWouldChangeMind;
      draft.remainingUncertainty = remainingUncertainty;
      draft.finalExplanation = finalExplanation;
      draft.citationList = citations;
    }

    onSubmit(draft);
  }

  return (
    <main className="page">
      <div className="verdict-layout">
        <section className="sorted-summary">
          <p className="eyebrow">Step 4</p>
          <h1>Build a cautious verdict</h1>
          <p className="student-instruction">
            You may choose Mixed or Cannot judge yet, but you must explain why.
          </p>

          {evidenceByCategory.map(({ category, cards }) => (
            <div className="summary-list" key={category}>
              <h2>{categoryLabels[category]}</h2>
              {cards.length > 0 ? (
                cards.map((card) => (
                  <article key={card.id}>
                    <strong>{card.title}</strong>
                    <p>{card.text}</p>
                  </article>
                ))
              ) : (
                <p className="empty-text">No cards assigned.</p>
              )}
            </div>
          ))}
        </section>

        <form className="verdict-form" onSubmit={handleSubmit}>
          {!isResearch && (
            <label>
              Policy aim
              <input
                required
                value={policyAim}
                onChange={(event) => setPolicyAim(event.target.value)}
                placeholder="Example: pressure the government to negotiate"
              />
            </label>
          )}

          {isResearch && (
            <label>
              Research question
              <input
                required
                value={researchQuestion}
                onChange={(event) => setResearchQuestion(event.target.value)}
              />
            </label>
          )}

          <label>
            Success criterion
            <input value={successCriterion} readOnly />
          </label>

          <label>
            Verdict
            <select value={verdict} onChange={(event) => setVerdict(event.target.value as Verdict)}>
              {verdictOptions.map((option) => (
                <option key={option} value={option}>
                  {verdictLabels[option]}
                </option>
              ))}
            </select>
          </label>

          <label>
            Confidence
            <select
              value={confidence}
              onChange={(event) => setConfidence(event.target.value as Confidence)}
            >
              {confidenceOptions.map((option) => (
                <option key={option} value={option}>
                  {confidenceLabels[option]}
                </option>
              ))}
            </select>
          </label>

          <label>
            {isResearch ? "Main evidence supporting your verdict" : "Strongest evidence"}
            <textarea
              required
              value={strongestEvidence}
              onChange={(event) => setStrongestEvidence(event.target.value)}
              placeholder={isResearch ? "" : "Which card or detail most supports your verdict?"}
            />
          </label>

          <label>
            {isResearch ? "Evidence that complicates your verdict" : "Biggest complication"}
            <textarea
              required={!isResearch}
              value={biggestComplication}
              onChange={(event) => setBiggestComplication(event.target.value)}
              placeholder={isResearch ? "" : "What makes this judgment hard?"}
            />
          </label>

          {isResearch && (
            <>
              <label>
                Counterargument
                <textarea
                  value={counterargument}
                  onChange={(event) => setCounterargument(event.target.value)}
                  placeholder="What is the strongest argument against your verdict?"
                />
              </label>

              <label>
                What evidence would change your mind?
                <textarea
                  value={evidenceThatWouldChangeMind}
                  onChange={(event) => setEvidenceThatWouldChangeMind(event.target.value)}
                  placeholder="If you found out X, you would change your verdict to Y..."
                />
              </label>
            </>
          )}

          <label>
            {isResearch ? "What is still missing? (Remaining Uncertainty)" : "Missing evidence"}
            <textarea
              required
              value={isResearch ? remainingUncertainty : missingEvidence}
              onChange={(event) => isResearch ? setRemainingUncertainty(event.target.value) : setMissingEvidence(event.target.value)}
              placeholder="What would you need to know next?"
            />
          </label>

          <label>
            Did the data snapshot affect your verdict? If yes, how? (Optional)
            <textarea
              value={dataSnapshotReflection}
              onChange={(event) => setDataSnapshotReflection(event.target.value)}
              placeholder="If you looked at the real data snapshot, how did it change your thinking?"
            />
          </label>

          {isResearch && (
            <>
              <label>
                Final Explanation (150–250 words)
                <textarea
                  required
                  value={finalExplanation}
                  onChange={(event) => setFinalExplanation(event.target.value)}
                  className="h-40"
                  placeholder="Synthesize your findings into a final, nuanced explanation..."
                />
              </label>

              <div className="bg-gray-50 p-4 rounded-md border mt-6 mb-6">
                <h3 className="font-semibold mb-2">Citations (Optional)</h3>
                <ul className="list-decimal pl-5 mb-4 text-sm">
                  {citations.map((c, i) => (
                    <li key={i} className="mb-1">
                      {c.authorOrOrganization || "Unknown"} ({c.publicationYear || "n.d."}). {c.title}. {c.url}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <input type="text" placeholder="Title" value={newCitationTitle} onChange={e => setNewCitationTitle(e.target.value)} className="border p-1" />
                  <input type="text" placeholder="Author/Org" value={newCitationAuthor} onChange={e => setNewCitationAuthor(e.target.value)} className="border p-1" />
                  <input type="text" placeholder="Year" value={newCitationYear} onChange={e => setNewCitationYear(e.target.value)} className="border p-1" />
                  <input type="text" placeholder="URL" value={newCitationUrl} onChange={e => setNewCitationUrl(e.target.value)} className="border p-1" />
                </div>
                <button 
                  type="button" 
                  className="mt-2 text-indigo-600 font-medium text-sm"
                  onClick={() => {
                    if (newCitationTitle) {
                      setCitations([...citations, { title: newCitationTitle, authorOrOrganization: newCitationAuthor, publicationYear: newCitationYear, url: newCitationUrl }]);
                      setNewCitationTitle(""); setNewCitationAuthor(""); setNewCitationYear(""); setNewCitationUrl("");
                    }
                  }}
                >
                  + Add Citation
                </button>
              </div>

              {studentEvidence.length === 0 && (
                <label className="flex items-center gap-2 mb-6 p-4 bg-orange-50 border border-orange-200 rounded text-orange-900">
                  <input 
                    type="checkbox" 
                    checked={usingOnlyCurated} 
                    onChange={e => setUsingOnlyCurated(e.target.checked)} 
                    className="w-5 h-5"
                  />
                  I am using only curated evidence for this research submission. (It is highly recommended to add your own evidence).
                </label>
              )}
            </>
          )}

          {!isResearch && (
            <div className="sentence-frame verdict-preview">
              <h2>Final verdict preview</h2>
              <p>{sentence}</p>
            </div>
          )}

          {!canSubmit ? (
            <p className="hint text-red-600">Please fill in all required fields to submit.</p>
          ) : null}

          <div className="button-row">
            <button className="secondary-button" type="button" onClick={onBack}>
              Back to evidence
            </button>
            <button className="primary-button" type="submit" disabled={!canSubmit}>
              Submit to board
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
