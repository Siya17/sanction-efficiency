import { FormEvent, useState } from "react";
import { confidenceOptions, verdictOptions } from "../constants/workflow";
import type { CaseStudy, Confidence, EvidenceSortCategory, StudentEvidenceCard, SubmissionDraft, Verdict } from "../types";
import { confidenceLabels, verdictLabels } from "../utils/labels";

type VerdictBuilderProps = {
  caseStudy: CaseStudy;
  successLens: string;
  successNote: string;
  studentEvidenceCards: StudentEvidenceCard[];
  onSubmit: (submission: SubmissionDraft) => void;
  onBack: () => void;
};

const groupMeta: Record<Exclude<EvidenceSortCategory, "unassigned">, { label: string; badge: string }> = {
  supports_worked: { label: "Points to it working", badge: "worked" },
  supports_failed: { label: "Points to failure / harm", badge: "failed" },
  complicates_or_missing: { label: "Makes it complicated", badge: "mixed" },
};

const groupOrder: Array<Exclude<EvidenceSortCategory, "unassigned">> = [
  "supports_worked",
  "supports_failed",
  "complicates_or_missing",
];

export function VerdictBuilder({
  caseStudy,
  successLens,
  successNote,
  studentEvidenceCards,
  onSubmit,
  onBack,
}: VerdictBuilderProps) {
  const [verdict, setVerdict] = useState<Verdict>("mixed");
  const [confidence, setConfidence] = useState<Confidence>("medium");
  const [strongestEvidence, setStrongestEvidence] = useState("");
  const [biggestComplication, setBiggestComplication] = useState("");
  const [missingEvidence, setMissingEvidence] = useState("");

  const canSubmit =
    strongestEvidence.trim().length > 0 &&
    biggestComplication.trim().length > 0 &&
    missingEvidence.trim().length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const draft: SubmissionDraft = {
      caseId: caseStudy.id,
      country: caseStudy.country,
      track: caseStudy.track,
      policy: caseStudy.policy,
      successLens,
      successNote: successNote.trim() || undefined,
      verdict,
      confidence,
      strongestEvidence,
      biggestComplication,
      missingEvidence,
      studentEvidenceCards,
    };

    onSubmit(draft);
  }

  return (
    <main className="page">
      <div className="verdict-layout">
        <section className="sorted-summary">
          <p className="eyebrow">Step 4 of 4</p>
          <h1>Build a careful verdict</h1>
          <p className="student-instruction">
            Weigh the evidence your group found, then give a verdict you can defend.
          </p>

          {successLens && (
            <p className="success-reminder">
              Your success test: <strong>{successLens}</strong>
            </p>
          )}

          <h2 className="findings-heading">Your findings</h2>
          {studentEvidenceCards.length === 0 ? (
            <p className="empty-text">No findings recorded.</p>
          ) : (
            groupOrder.map((category) => {
              const cards = studentEvidenceCards.filter((card) => card.sortCategory === category);
              if (cards.length === 0) return null;
              const meta = groupMeta[category];
              return (
                <div className="findings-group" key={category}>
                  <span className={`verdict-badge ${meta.badge}`}>{meta.label}</span>
                  <ul>
                    {cards.map((card) => (
                      <li key={card.id}>
                        <strong>{card.title}</strong>
                        {card.quoteOrDataPoint ? ` — “${card.quoteOrDataPoint}”` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </section>

        <form className="verdict-form" onSubmit={handleSubmit}>
          <label>
            Overall verdict
            <select value={verdict} onChange={(event) => setVerdict(event.target.value as Verdict)}>
              {verdictOptions.map((option) => (
                <option key={option} value={option}>
                  {verdictLabels[option]}
                </option>
              ))}
            </select>
          </label>

          <label>
            How confident are you?
            <select value={confidence} onChange={(event) => setConfidence(event.target.value as Confidence)}>
              {confidenceOptions.map((option) => (
                <option key={option} value={option}>
                  {confidenceLabels[option]}
                </option>
              ))}
            </select>
          </label>

          <label>
            Strongest evidence for your verdict *
            <select required value={strongestEvidence} onChange={(event) => setStrongestEvidence(event.target.value)}>
              <option value="">— Choose from your findings —</option>
              {studentEvidenceCards.map((card) => (
                <option key={card.id} value={card.title}>
                  {card.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Biggest complication or contrary evidence *
            <select required value={biggestComplication} onChange={(event) => setBiggestComplication(event.target.value)}>
              <option value="">— Choose from your findings —</option>
              <option value="No major complications">No major complications</option>
              {studentEvidenceCards.map((card) => (
                <option key={card.id} value={card.title}>
                  {card.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            What evidence is still missing to be truly sure? *
            <textarea
              required
              value={missingEvidence}
              onChange={(event) => setMissingEvidence(event.target.value)}
              placeholder="What data or facts do you wish you had?"
            />
          </label>

          <div className="sentence-frame">
            <h2>Your share-out sentence</h2>
            <p>
              Judging success as <strong>{successLens || "[your success test]"}</strong>, we say this policy{" "}
              <strong>{verdictLabels[verdict].toLowerCase()}</strong>, with{" "}
              <strong>{confidenceLabels[confidence].toLowerCase()}</strong> confidence. Our strongest evidence is{" "}
              <strong>{strongestEvidence || "[strongest evidence]"}</strong>
              {biggestComplication === "No major complications" ? (
                <>
                  . We found <strong>no major complications</strong>.
                </>
              ) : (
                <>
                  , but <strong>{biggestComplication || "[biggest complication]"}</strong> makes us cautious.
                </>
              )}
            </p>
          </div>

          {!canSubmit && <p className="hint">Fill in the three required fields (*) to submit.</p>}

          <div className="button-row">
            <button className="secondary-button" type="button" onClick={onBack}>
              Back to evidence
            </button>
            <button className="primary-button" type="submit" disabled={!canSubmit}>
              Submit to class board
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
