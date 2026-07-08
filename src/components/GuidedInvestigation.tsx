import { useState } from "react";
import { getTimelineForCase } from "../data/timelines";
import type { CaseStudy, EvidenceSortCategory, StudentEvidenceCard } from "../types";
import { trackLabels } from "../utils/labels";
import { CaseTimeline } from "./CaseTimeline";
import { GlossaryText } from "./GlossaryText";
import { StudentEvidenceForm } from "./StudentEvidenceForm";

const MIN_FINDINGS = 2;

const stepTitles = ["Meet the case", "Define success", "Find evidence", "Give verdict"];

const findingMeta: Record<Exclude<EvidenceSortCategory, "unassigned">, { label: string; badge: string }> = {
  supports_worked: { label: "Points to it working", badge: "worked" },
  supports_failed: { label: "Points to failure / harm", badge: "failed" },
  complicates_or_missing: { label: "Makes it complicated", badge: "mixed" },
};

type GuidedInvestigationProps = {
  caseStudy: CaseStudy;
  successLens: string;
  successNote: string;
  onSuccessLensChange: (value: string) => void;
  onSuccessNoteChange: (value: string) => void;
  studentEvidenceCards: StudentEvidenceCard[];
  onAddStudentEvidence: (card: StudentEvidenceCard) => void;
  onDeleteStudentEvidence: (cardId: string) => void;
  canContinue: boolean;
  onContinue: () => void;
};

export function GuidedInvestigation({
  caseStudy,
  successLens,
  successNote,
  onSuccessLensChange,
  onSuccessNoteChange,
  studentEvidenceCards,
  onAddStudentEvidence,
  onDeleteStudentEvidence,
  canContinue,
  onContinue,
}: GuidedInvestigationProps) {
  const [step, setStep] = useState(1);
  const timelineEvents = getTimelineForCase(caseStudy.id);
  const findingCount = studentEvidenceCards.length;

  return (
    <main className="page guided-page">
      <ol className="guided-stepper" aria-label="Activity steps">
        {stepTitles.map((title, index) => {
          const number = index + 1;
          const status = number < step ? "complete" : number === step ? "current" : "upcoming";
          return (
            <li className={`guided-stepper-item ${status}`} key={title}>
              <span>{number}</span>
              <strong>{title}</strong>
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <section className="guided-card">
          <p className="eyebrow">Step 1 of 4</p>
          <div className="guided-case-head">
            <span className={`track-pill ${caseStudy.track}`}>{trackLabels[caseStudy.track]}</span>
            <span className="period-label">{caseStudy.period}</span>
          </div>
          <h1>Meet the case: {caseStudy.country}</h1>
          <GlossaryText as="p" className="guided-lead" text={caseStudy.summary.quickSummary} />

          <dl className="fact-list guided-facts">
            <div>
              <dt>What was happening?</dt>
              <GlossaryText as="dd" text={caseStudy.summary.whatWasHappening} />
            </div>
            <div>
              <dt>What was tried?</dt>
              <GlossaryText as="dd" text={caseStudy.summary.policyUsed} />
            </div>
            <div>
              <dt>What was it meant to achieve?</dt>
              <GlossaryText as="dd" text={caseStudy.summary.policyGoal} />
            </div>
            <div>
              <dt>Why is it hard to judge?</dt>
              <GlossaryText as="dd" text={caseStudy.summary.whyHardToJudge} />
            </div>
          </dl>

          <div className="guided-guidance">
            <h2>How to think about it</h2>
            <p className="hint">Hover any underlined term for a plain-English explanation.</p>
            <ul>
              {(caseStudy.summary.tailoredGuidance && caseStudy.summary.tailoredGuidance.length > 0
                ? caseStudy.summary.tailoredGuidance
                : caseStudy.summary.possibleSuccessAngles
              ).map((guide, index) => (
                <li key={index}>
                  <GlossaryText text={guide} />
                </li>
              ))}
            </ul>
          </div>

          {timelineEvents.length > 0 && (
            <details className="guided-timeline">
              <summary>Optional: quick timeline of key events</summary>
              <CaseTimeline events={timelineEvents} />
            </details>
          )}

          <div className="button-row guided-nav space-between">
            <button type="button" className="secondary-button" onClick={() => window.print()}>
              Print worksheet
            </button>
            <button type="button" className="primary-button" onClick={() => setStep(2)}>
              Next: what would success mean?
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="guided-card">
          <p className="eyebrow">Step 2 of 4</p>
          <h1>What would "success" mean here?</h1>
          <p className="guided-lead">
            "Did it work?" has no single answer until you decide what counts as working. Pick the meaning of success
            your group will test. There is no single right choice — but be clear about the one you pick.
          </p>

          <div className="success-options">
            {caseStudy.successCriteria.map((criterion) => {
              const checked = successLens === criterion.label;
              return (
                <label className={`success-option ${checked ? "checked" : ""}`} key={criterion.id}>
                  <input
                    type="radio"
                    name="success-lens"
                    value={criterion.label}
                    checked={checked}
                    onChange={() => onSuccessLensChange(criterion.label)}
                  />
                  <span>
                    <strong>{criterion.label}</strong>
                    <GlossaryText as="span" className="success-option-note" text={criterion.explanation} />
                  </span>
                </label>
              );
            })}
          </div>

          <label className="field-label guided-note">
            In your own words, what does success look like for this case? (optional)
            <textarea
              value={successNote}
              onChange={(event) => onSuccessNoteChange(event.target.value)}
              placeholder="e.g. Success means the pressure changed the government's behaviour without starving ordinary people."
            />
          </label>

          <div className="button-row guided-nav space-between">
            <button type="button" className="secondary-button" onClick={() => setStep(1)}>
              Back
            </button>
            <button
              type="button"
              className="primary-button"
              disabled={successLens.trim().length === 0}
              onClick={() => setStep(3)}
            >
              Next: go find evidence
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="guided-card">
          <p className="eyebrow">Step 3 of 4</p>
          <h1>Go find your evidence</h1>

          {successLens && (
            <p className="success-reminder">
              Your success test: <strong>{successLens}</strong>
            </p>
          )}

          <div className="guided-guidance">
            <h2>Instructions</h2>
            <p>
              Search for <strong>real numbers and facts</strong> that help judge
              whether this policy met your success test, and record what you find below.
            </p>
            <ul>
              <li>Look for hard figures: rates, percentages, amounts, before-and-after comparisons.</li>
              <li>Note <strong>where</strong> each fact comes from and how much you trust it.</li>
              <li>Try to find at least one fact that <em>challenges</em> your first impression.</li>
            </ul>
            <p className="hint">
              Good places to start: government statistics offices, academic reports, and reporting from
              established news organisations.
            </p>
          </div>

          <div className="finding-list">
            {findingCount === 0 ? (
              <p className="empty-text">No findings yet. Add your first one below.</p>
            ) : (
              studentEvidenceCards.map((card) => {
                const meta = card.sortCategory !== "unassigned" ? findingMeta[card.sortCategory] : null;
                return (
                  <article className="finding-card" key={card.id}>
                    <div className="finding-card-head">
                      <h3>{card.title}</h3>
                      <button
                        type="button"
                        className="finding-delete"
                        aria-label={`Delete ${card.title}`}
                        onClick={() => onDeleteStudentEvidence(card.id)}
                      >
                        Delete
                      </button>
                    </div>
                    <p>{card.summary}</p>
                    {card.quoteOrDataPoint && <p className="finding-quote">“{card.quoteOrDataPoint}”</p>}
                    <div className="finding-tags">
                      {meta && <span className={`verdict-badge ${meta.badge}`}>{meta.label}</span>}
                      <span className={`confidence-badge ${card.reliability === "high" ? "high" : card.reliability === "low" ? "low" : "medium"}`}>
                        Reliability: {card.reliability}
                      </span>
                    </div>
                    <p className="finding-source">
                      Source:{" "}
                      {card.sourceUrl ? (
                        <a href={card.sourceUrl} target="_blank" rel="noreferrer">
                          {card.sourceTitle}
                        </a>
                      ) : (
                        card.sourceTitle
                      )}
                    </p>
                  </article>
                );
              })
            )}
          </div>

          <StudentEvidenceForm caseId={caseStudy.id} onAddEvidence={onAddStudentEvidence} />

          <div className="finding-progress">
            <strong>{findingCount}</strong> {findingCount === 1 ? "finding" : "findings"} recorded — you need at least{" "}
            {MIN_FINDINGS} to continue.
          </div>

          <div className="button-row guided-nav space-between">
            <button type="button" className="secondary-button" onClick={() => setStep(2)}>
              Back
            </button>
            <div className="guided-nav-end">
              {!canContinue && (
                <p className="hint">Record at least {MIN_FINDINGS} findings to build your verdict.</p>
              )}
              <button type="button" className="primary-button" disabled={!canContinue} onClick={onContinue}>
                Next: build your verdict
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
