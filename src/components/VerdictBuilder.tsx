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

  const getFindingLabel = (finding: string) => {
    switch (finding) {
      case "supports_success": return "Shows Success / Policy Worked";
      case "shows_failure": return "Shows Failure / Harm";
      case "complicates": return "Mixed / Complicates";
      case "irrelevant": return "Irrelevant / Context";
      default: return finding;
    }
  };

  const getFindingColor = (finding: string) => {
    switch (finding) {
      case "supports_success": return "bg-green-100 text-green-800 border-green-200";
      case "shows_failure": return "bg-red-100 text-red-800 border-red-200";
      case "complicates": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "irrelevant": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <main className="page">
      <div className="verdict-layout">
        <section className="sorted-summary">
          <p className="eyebrow">Final Step</p>
          <h1>Build a cautious verdict</h1>
          <p className="student-instruction">
            Review your findings by indicator, then determine your final verdict.
          </p>

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-8">
            <h2 className="text-indigo-900 font-bold mb-2">Your Question:</h2>
            <p className="text-indigo-800 italic text-lg">{evaluationQuestion}</p>
          </div>

          <h2 className="font-semibold text-xl border-b pb-2 mb-6">Your Findings Dashboard</h2>
          
          <div className="space-y-8">
            {/* Group evidence by indicator */}
            {studentIndicators.map(indicator => {
              const evidenceForIndicator = selectedEvidence.filter(e => e.indicatorId === indicator.id);
              
              return (
                <div key={indicator.id} className="bg-white rounded-lg shadow-sm border p-5">
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{indicator.name || "Unnamed Indicator"}</h3>
                  <p className="text-sm text-gray-600 mb-4">{indicator.measures}</p>
                  
                  {evidenceForIndicator.length === 0 ? (
                    <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded">No evidence selected for this indicator.</p>
                  ) : (
                    <div className="space-y-3">
                      {evidenceForIndicator.map(sel => {
                        const card = allCards.find(c => c.id === sel.cardId);
                        if (!card) return null;
                        return (
                          <div key={sel.cardId} className={`p-3 rounded border ${getFindingColor(sel.finding)}`}>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold">{card.title}</h4>
                              <span className="text-xs font-bold px-2 py-1 bg-white bg-opacity-50 rounded">
                                {getFindingLabel(sel.finding)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* General Context / Unassigned Evidence */}
            {selectedEvidence.filter(e => !e.indicatorId).length > 0 && (
              <div className="bg-gray-50 rounded-lg shadow-sm border p-5">
                <h3 className="font-bold text-lg mb-3 text-gray-700">General Context</h3>
                <div className="space-y-3">
                  {selectedEvidence.filter(e => !e.indicatorId).map(sel => {
                    const card = allCards.find(c => c.id === sel.cardId);
                    if (!card) return null;
                    return (
                      <div key={sel.cardId} className={`p-3 rounded border bg-white`}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold">{card.title}</h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        <form className="verdict-form sticky top-4" onSubmit={handleSubmit}>
          <label>
            Overall Verdict
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
            Strongest evidence supporting your verdict
            <select 
              required
              value={strongestEvidence}
              onChange={(e) => setStrongestEvidence(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">-- Select from your evidence --</option>
              {selectedEvidence.map(sel => {
                const card = allCards.find(c => c.id === sel.cardId);
                return card ? (
                  <option key={card.id} value={card.title}>{card.title}</option>
                ) : null;
              })}
            </select>
          </label>

          <label>
            Biggest complication or contrary evidence
            <select 
              required
              value={biggestComplication}
              onChange={(e) => setBiggestComplication(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">-- Select from your evidence --</option>
              <option value="none">No major complications</option>
              {selectedEvidence.map(sel => {
                const card = allCards.find(c => c.id === sel.cardId);
                return card ? (
                  <option key={card.id} value={card.title}>{card.title}</option>
                ) : null;
              })}
            </select>
          </label>

          <label>
            What evidence is still missing to be truly confident?
            <textarea
              required
              value={isResearch ? remainingUncertainty : missingEvidence}
              onChange={(event) => isResearch ? setRemainingUncertainty(event.target.value) : setMissingEvidence(event.target.value)}
              placeholder="What data or facts do you wish you had?"
            />
          </label>

          <label>
            Did the real data snapshot affect your verdict? (Optional)
            <textarea
              value={dataSnapshotReflection}
              onChange={(event) => setDataSnapshotReflection(event.target.value)}
              placeholder="If you looked at the real data snapshot, did it confirm or challenge your findings?"
            />
          </label>

          {isResearch && (
            <details className="bg-gray-50 border rounded-md mt-6 mb-6">
              <summary className="font-semibold p-4 cursor-pointer outline-none">
                Research Synthesis (Required for Research Mode)
              </summary>
              <div className="p-4 border-t space-y-4">
                <label>
                  Final Explanation (150–250 words)
                  <textarea
                    required={isResearch}
                    value={finalExplanation}
                    onChange={(event) => setFinalExplanation(event.target.value)}
                    className="h-32 w-full mt-1"
                    placeholder="Synthesize your findings into a final, nuanced explanation..."
                  />
                </label>
                
                <label>
                  Counterargument
                  <textarea
                    value={counterargument}
                    onChange={(event) => setCounterargument(event.target.value)}
                    className="w-full mt-1"
                    placeholder="What is the strongest argument against your verdict?"
                  />
                </label>

                <label>
                  What evidence would change your mind?
                  <textarea
                    value={evidenceThatWouldChangeMind}
                    onChange={(event) => setEvidenceThatWouldChangeMind(event.target.value)}
                    className="w-full mt-1"
                    placeholder="If you found out X, you would change your verdict to Y..."
                  />
                </label>

                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2">Citations (Optional)</h3>
                  <ul className="list-decimal pl-5 mb-4 text-xs">
                    {citations.map((c, i) => (
                      <li key={i} className="mb-1">
                        {c.authorOrOrganization || "Unknown"} ({c.publicationYear || "n.d."}). {c.title}. {c.url}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input type="text" placeholder="Title" value={newCitationTitle} onChange={e => setNewCitationTitle(e.target.value)} className="border p-1" />
                    <input type="text" placeholder="Author/Org" value={newCitationAuthor} onChange={e => setNewCitationAuthor(e.target.value)} className="border p-1" />
                    <input type="text" placeholder="Year" value={newCitationYear} onChange={e => setNewCitationYear(e.target.value)} className="border p-1" />
                    <input type="text" placeholder="URL" value={newCitationUrl} onChange={e => setNewCitationUrl(e.target.value)} className="border p-1" />
                  </div>
                  <button 
                    type="button" 
                    className="mt-2 text-indigo-600 font-medium text-xs"
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
              </div>
            </details>
          )}

          {!canSubmit ? (
            <p className="hint text-red-600">Please fill in all required fields to submit.</p>
          ) : null}

          <div className="button-row mt-6">
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
