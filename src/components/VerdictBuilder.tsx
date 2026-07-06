import { FormEvent, useState } from "react";
import { confidenceOptions, verdictOptions } from "../constants/workflow";
import type { CaseStudy, Confidence, SubmissionDraft, Verdict, ActivityMode, StudentEvidenceCard, Citation, StudentIndicator, StudentEvidenceSelection } from "../types";
import { confidenceLabels, verdictLabels } from "../utils/labels";
import { EvidenceCard as EvidenceCardComponent } from "./EvidenceCard";

type VerdictBuilderProps = {
  activityMode: ActivityMode;
  caseStudy: CaseStudy;
  evaluationQuestion: string;
  studentIndicators: StudentIndicator[];
  selectedEvidence: StudentEvidenceSelection[];
  studentEvidenceCards: StudentEvidenceCard[];
  onSubmit: (submission: SubmissionDraft) => void;
  onBack: () => void;
};

export function VerdictBuilder({
  activityMode,
  caseStudy,
  evaluationQuestion,
  studentIndicators,
  selectedEvidence,
  studentEvidenceCards,
  onSubmit,
  onBack,
}: VerdictBuilderProps) {
  const [verdict, setVerdict] = useState<Verdict>("mixed");
  const [confidence, setConfidence] = useState<Confidence>("medium");
  const [strongestEvidence, setStrongestEvidence] = useState("");
  const [biggestComplication, setBiggestComplication] = useState("");
  const [missingEvidence, setMissingEvidence] = useState("");
  const [dataSnapshotReflection, setDataSnapshotReflection] = useState("");

  const isResearch = activityMode === "research";
  
  // Research fields
  const [counterargument, setCounterargument] = useState("");
  const [evidenceThatWouldChangeMind, setEvidenceThatWouldChangeMind] = useState("");
  const [remainingUncertainty, setRemainingUncertainty] = useState("");
  const [finalExplanation, setFinalExplanation] = useState("");
  const [citations, setCitations] = useState<Citation[]>([]);

  const [newCitationTitle, setNewCitationTitle] = useState("");
  const [newCitationAuthor, setNewCitationAuthor] = useState("");
  const [newCitationYear, setNewCitationYear] = useState("");
  const [newCitationUrl, setNewCitationUrl] = useState("");

  const allCards = [
    ...caseStudy.evidenceCards,
    ...studentEvidenceCards
  ];

  let canSubmit = false;
  
  if (isResearch) {
    canSubmit =
      finalExplanation.trim().length > 0 &&
      strongestEvidence.trim().length > 0 &&
      (remainingUncertainty.trim().length > 0 || missingEvidence.trim().length > 0);
  } else {
    canSubmit =
      strongestEvidence.trim().length > 0 &&
      biggestComplication.trim().length > 0 &&
      missingEvidence.trim().length > 0;
  }

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
      evaluationQuestion,
      studentIndicators,
      selectedEvidence,
      
      verdict,
      confidence,
      strongestEvidence,
      biggestComplication,
      missingEvidence: isResearch ? remainingUncertainty : missingEvidence,
      dataSnapshotReflection: dataSnapshotReflection.trim() || undefined,
      activityMode,
    };

    if (isResearch) {
      draft.studentEvidenceCards = studentEvidenceCards;
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
          <p className="eyebrow">Final Step</p>
          <h1>Build a cautious verdict</h1>
          <p className="student-instruction">
            Review the evidence you selected before answering your evaluation question.
          </p>

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
            <h2 className="text-indigo-900 font-bold mb-2">Your Question:</h2>
            <p className="text-indigo-800 italic">{evaluationQuestion}</p>
          </div>

          <div className="space-y-6">
            <h2 className="font-semibold text-lg border-b pb-2">Your Selected Evidence</h2>
            {selectedEvidence.map((sel) => {
              const card = allCards.find(c => c.id === sel.cardId);
              if (!card) return null;
              
              return (
                <div key={sel.cardId} className="bg-white p-4 rounded border">
                  <h3 className="font-bold">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Used as: <span className="font-medium capitalize">{sel.use.replace(/_/g, ' ')}</span>
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    {('text' in card) ? card.text : card.summary}
                  </div>
                  <div className="text-sm">
                    <strong>Your explanation:</strong> {sel.relevanceExplanation}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <form className="verdict-form" onSubmit={handleSubmit}>
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
              placeholder={isResearch ? "" : "Which evidence most supports your verdict?"}
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
            </>
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
