import { FormEvent, useMemo, useState } from "react";
import { confidenceOptions, evidenceSortCategories, verdictOptions } from "../constants/workflow";
import type { CaseStudy, Confidence, EvidenceSortCategory, SubmissionDraft, Verdict } from "../types";
import { categoryLabels, confidenceLabels, verdictLabels } from "../utils/labels";

type VerdictBuilderProps = {
  caseStudy: CaseStudy;
  successCriterion: string;
  assignments: Record<string, EvidenceSortCategory>;
  onSubmit: (submission: SubmissionDraft) => void;
  onBack: () => void;
};

export function VerdictBuilder({
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

  const evidenceByCategory = useMemo(
    () =>
      evidenceSortCategories.map((category) => ({
        category,
        cards: caseStudy.evidenceCards.filter((card) => assignments[card.id] === category),
      })),
    [assignments, caseStudy.evidenceCards],
  );

  const sentence = `In the case of ${caseStudy.country}, the policy aimed to ${
    policyAim || "..."
  }. We judge success by ${successCriterion || "..."}. Our verdict is ${
    verdictLabels[verdict]
  } with ${confidenceLabels[confidence]} confidence because ${
    strongestEvidence || "..."
  }. But we would need ${missingEvidence || "..."} to be more certain.`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
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
      missingEvidence,
    });
  }

  return (
    <main className="page">
      <div className="verdict-layout">
        <section className="sorted-summary">
          <p className="eyebrow">Step 4</p>
          <h1>Build a cautious verdict</h1>
          <p>
            Use your sorted evidence to make a claim, then name what still keeps the answer
            uncertain.
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
          <label>
            Policy aim
            <input
              required
              value={policyAim}
              onChange={(event) => setPolicyAim(event.target.value)}
              placeholder="Example: pressure the government to negotiate"
            />
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
            Strongest evidence
            <textarea
              required
              value={strongestEvidence}
              onChange={(event) => setStrongestEvidence(event.target.value)}
              placeholder="Which card or detail most supports your verdict?"
            />
          </label>

          <label>
            Biggest complication
            <textarea
              required
              value={biggestComplication}
              onChange={(event) => setBiggestComplication(event.target.value)}
              placeholder="What makes this judgment hard?"
            />
          </label>

          <label>
            Missing evidence
            <textarea
              required
              value={missingEvidence}
              onChange={(event) => setMissingEvidence(event.target.value)}
              placeholder="What would you need to know next?"
            />
          </label>

          <div className="sentence-frame">
            <h2>Sentence frame</h2>
            <p>{sentence}</p>
          </div>

          <div className="button-row">
            <button className="secondary-button" type="button" onClick={onBack}>
              Back to evidence
            </button>
            <button className="primary-button" type="submit">
              Submit to board
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
