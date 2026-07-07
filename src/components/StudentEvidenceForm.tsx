import { useState } from "react";
import type React from "react";
import type { EvidenceReliability, EvidenceSortCategory, StudentEvidenceCard } from "../types";
import { InlineHelp } from "./InlineHelp";

type Props = {
  caseId: string;
  onAddEvidence: (card: StudentEvidenceCard) => void;
};

const emptyForm = {
  title: "",
  summary: "",
  quoteOrDataPoint: "",
  sourceTitle: "",
  sourceUrl: "",
  authorOrOrganization: "",
  publicationYear: "",
  reliability: "uncertain" as EvidenceReliability,
  sortCategory: "unassigned" as EvidenceSortCategory,
  explanation: "",
  limitation: "",
};

export function StudentEvidenceForm({ caseId, onAddEvidence }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const set = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.summary || !form.sourceTitle || !form.explanation || !form.limitation) {
      alert("Please fill in the required fields (marked with *).");
      return;
    }
    if (form.sortCategory === "unassigned") {
      alert("Please choose what this finding suggests (worked, backfired, or complicated).");
      return;
    }

    const newCard: StudentEvidenceCard = {
      id: `student-evidence-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      caseId,
      ...form,
      createdAt: new Date().toISOString(),
    };

    onAddEvidence(newCard);
    setForm(emptyForm);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button type="button" className="add-finding-button" onClick={() => setIsOpen(true)}>
        + Add a finding you researched
      </button>
    );
  }

  return (
    <form className="finding-form" onSubmit={handleSubmit}>
      <div className="finding-form-head">
        <h3>Record what you found</h3>
        <button type="button" className="finding-close" aria-label="Close" onClick={() => setIsOpen(false)}>
          ✕
        </button>
      </div>
      <p className="hint">
        Add one real thing you found while researching — ideally a number or a direct quote. Say where it came from and what it can (and cannot) tell you.
      </p>

      <label className="field-label">
        What did you find? *
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Child mortality doubled during the sanctions"
        />
      </label>

      <label className="field-label">
        In one or two sentences, what does it show? *
        <textarea
          required
          value={form.summary}
          onChange={(e) => set("summary", e.target.value)}
          placeholder="Summarise the fact or finding in your own words."
        />
      </label>

      <label className="field-label">
        Key number or quote
        <InlineHelp term="Key number or quote">
          A specific figure or short quote makes your evidence much stronger than a general claim.
        </InlineHelp>
        <input
          type="text"
          value={form.quoteOrDataPoint}
          onChange={(e) => set("quoteOrDataPoint", e.target.value)}
          placeholder="e.g. 'Rose from 56 to 131 deaths per 1,000'"
        />
      </label>

      <div className="finding-form-grid">
        <label className="field-label">
          Where did you find it? *
          <input
            type="text"
            required
            value={form.sourceTitle}
            onChange={(e) => set("sourceTitle", e.target.value)}
            placeholder="e.g. UNICEF report / BBC News"
          />
        </label>
        <label className="field-label">
          Link (if you have one)
          <input
            type="url"
            value={form.sourceUrl}
            onChange={(e) => set("sourceUrl", e.target.value)}
            placeholder="https://"
          />
        </label>
      </div>

      <div className="finding-form-grid">
        <label className="field-label">
          How trustworthy is the source? *
          <InlineHelp term="How trustworthy?">
            Official statistics and major institutions are usually more reliable than a random blog or a party with something to gain.
          </InlineHelp>
          <select value={form.reliability} onChange={(e) => set("reliability", e.target.value as EvidenceReliability)}>
            <option value="high">High — official data or respected institution</option>
            <option value="medium">Medium — reputable but second-hand</option>
            <option value="low">Low — opinion or unclear source</option>
            <option value="uncertain">Not sure yet</option>
          </select>
        </label>
        <label className="field-label">
          What does it suggest? *
          <select value={form.sortCategory} onChange={(e) => set("sortCategory", e.target.value as EvidenceSortCategory)}>
            <option value="unassigned">Choose one…</option>
            <option value="supports_worked">The policy worked</option>
            <option value="supports_failed">It failed or backfired</option>
            <option value="complicates_or_missing">It makes the picture complicated</option>
          </select>
        </label>
      </div>

      <label className="field-label">
        How does this connect to your success test? *
        <InlineHelp term="Success test">
          Tie the finding back to the meaning of "success" you chose in the previous step.
        </InlineHelp>
        <textarea
          required
          value={form.explanation}
          onChange={(e) => set("explanation", e.target.value)}
          placeholder="e.g. If success means avoiding civilian harm, this points strongly to failure."
        />
      </label>

      <label className="field-label">
        What can this finding NOT prove? *
        <InlineHelp term="Limitations">
          Good researchers admit the limits of their evidence. A drop in trade proves economic pain, not a change of mind.
        </InlineHelp>
        <textarea
          required
          value={form.limitation}
          onChange={(e) => set("limitation", e.target.value)}
          placeholder="e.g. This shows harm, but not whether the leadership cared."
        />
      </label>

      <div className="button-row">
        <button type="button" className="secondary-button" onClick={() => setIsOpen(false)}>
          Cancel
        </button>
        <button type="submit" className="primary-button">
          Save finding
        </button>
      </div>
    </form>
  );
}
