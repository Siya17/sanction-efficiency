import { useMemo, useState } from "react";
import { indicators as defaultIndicators } from "../data/indicators";
import { timelines as defaultTimelines } from "../data/timelines";
import type { CaseIndicator, CaseStudy, EvidenceCard, EvidenceCardType, SourceLink, TimelineEvent } from "../types";
import { evidenceTypeLabels, trackLabels } from "../utils/labels";
import {
  exportCasesToJson,
  getCustomCases,
  getCustomIndicators,
  getCustomTimelineEvents,
  getDefaultCases,
  importCasesFromJson,
  mergeCustomIndicators,
  mergeCustomTimelineEvents,
  resetCustomCases,
  saveCustomCases,
  saveCustomIndicators,
  saveCustomTimelineEvents,
} from "../utils/caseStorage";

type TeacherModeProps = {
  cases: CaseStudy[];
  onCasesChanged: () => void;
  onChooseCase: () => void;
};

type DraftStatus = "idle" | "editing" | "new";

const evidenceTypes = Object.keys(evidenceTypeLabels) as EvidenceCardType[];

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function cloneCase(caseStudy: CaseStudy): CaseStudy {
  return JSON.parse(JSON.stringify(caseStudy)) as CaseStudy;
}

function createBlankCase(): CaseStudy {
  const id = createId("custom-case");

  return {
    id,
    track: "sanctions",
    country: "New case",
    period: "",
    policy: "",
    question: "Did the policy work in this case?",
    background: "",
    successCriteria: [{ id: "behavior_change", label: "Behavior or outcome changed", explanation: "Default explanation" }],
    evidenceCards: [createBlankEvidenceCard(id)],
    sources: [],
    teacherNote: "",
  };
}

function createBlankEvidenceCard(caseId: string): EvidenceCard {
  return {
    id: createId(`${caseId}-evidence`),
    title: "New evidence card",
    text: "",
    type: "success_evidence",
  };
}

function createBlankSource(): SourceLink {
  return { title: "Source title", url: "TODO_SOURCE_URL", note: "" };
}

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function parseJsonArray<T>(value: string, label: string): T[] {
  const parsed = JSON.parse(value) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error(`${label} must be a JSON array.`);
  }

  return parsed as T[];
}

function getCaseWarnings(caseStudy: CaseStudy) {
  const warnings: string[] = [];

  if (caseStudy.evidenceCards.length < 4) {
    warnings.push("Add at least 4 evidence cards before using this case with students.");
  }

  if (caseStudy.sources.length === 0) {
    warnings.push("Add at least one source link or a clearly marked TODO source.");
  }

  if (caseStudy.evidenceCards.some((card) => card.text.length > 900)) {
    warnings.push("One or more evidence cards are very long. Shorter cards are easier in class.");
  }

  return warnings;
}

function downloadJson(filename: string, json: string) {
  const blob = new Blob([json], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function TeacherMode({ cases, onCasesChanged, onChooseCase }: TeacherModeProps) {
  const defaultCaseIds = useMemo(() => new Set(getDefaultCases().map((caseStudy) => caseStudy.id)), []);
  const [customCases, setCustomCasesState] = useState(() => getCustomCases());
  const [draft, setDraft] = useState<CaseStudy | null>(null);
  const [draftStatus, setDraftStatus] = useState<DraftStatus>("idle");
  const [timelineJson, setTimelineJson] = useState("[]");
  const [indicatorJson, setIndicatorJson] = useState("[]");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const customIds = useMemo(() => new Set(customCases.map((caseStudy) => caseStudy.id)), [customCases]);

  function refreshCustomState() {
    setCustomCasesState(getCustomCases());
    onCasesChanged();
  }

  function beginEdit(caseStudy: CaseStudy) {
    const nextDraft = cloneCase(caseStudy);
    setDraft(nextDraft);
    setDraftStatus("editing");
    setTimelineJson(formatJson(mergeCustomTimelineEvents(defaultTimelines).filter((event) => event.caseId === caseStudy.id)));
    setIndicatorJson(formatJson(mergeCustomIndicators(defaultIndicators).filter((indicator) => indicator.caseId === caseStudy.id)));
    setError("");
    setMessage("");
  }

  function beginNewCase() {
    const nextDraft = createBlankCase();
    setDraft(nextDraft);
    setDraftStatus("new");
    setTimelineJson("[]");
    setIndicatorJson("[]");
    setError("");
    setMessage("Draft a new case, then save it as a custom case.");
  }

  function duplicateCase(caseStudy: CaseStudy) {
    const copy = cloneCase(caseStudy);
    const nextId = createId(`${caseStudy.id}-copy`);

    copy.id = nextId;
    copy.country = `${copy.country} copy`;
    copy.evidenceCards = copy.evidenceCards.map((card) => ({ ...card, id: createId(`${nextId}-evidence`) }));

    setDraft(copy);
    setDraftStatus("new");
    setTimelineJson(
      formatJson(
        mergeCustomTimelineEvents(defaultTimelines)
          .filter((event) => event.caseId === caseStudy.id)
          .map((event) => ({ ...event, id: createId(`${nextId}-timeline`), caseId: nextId })),
      ),
    );
    setIndicatorJson(
      formatJson(
        mergeCustomIndicators(defaultIndicators)
          .filter((indicator) => indicator.caseId === caseStudy.id)
          .map((indicator) => ({ ...indicator, id: createId(`${nextId}-indicator`), caseId: nextId })),
      ),
    );
    setMessage("Duplicated into an editable custom draft.");
    setError("");
  }

  function deleteCustomCase(caseId: string) {
    const label = defaultCaseIds.has(caseId) ? "remove this local edit and restore the default case" : "delete this custom case";
    const confirmed = window.confirm(`Do you want to ${label}?`);

    if (!confirmed) {
      return;
    }

    const nextCustomCases = getCustomCases().filter((caseStudy) => caseStudy.id !== caseId);
    saveCustomCases(nextCustomCases);
    saveCustomTimelineEvents(getCustomTimelineEvents().filter((event) => event.caseId !== caseId));
    saveCustomIndicators(getCustomIndicators().filter((indicator) => indicator.caseId !== caseId));
    refreshCustomState();

    if (draft?.id === caseId) {
      setDraft(null);
      setDraftStatus("idle");
    }

    setMessage(defaultCaseIds.has(caseId) ? "Local edit removed. Default case restored." : "Custom case deleted.");
    setError("");
  }

  function updateDraft(changes: Partial<CaseStudy>) {
    setDraft((current) => (current ? { ...current, ...changes } : current));
  }

  function updateCriterion(index: number, value: string, field: "label" | "explanation") {
    setDraft((current) => {
      if (!current) return current;
      const successCriteria = [...current.successCriteria];
      successCriteria[index] = { ...successCriteria[index], [field]: value };
      return { ...current, successCriteria };
    });
  }

  function updateEvidence(index: number, changes: Partial<EvidenceCard>) {
    setDraft((current) => {
      if (!current) return current;
      const evidenceCards = [...current.evidenceCards];
      evidenceCards[index] = { ...evidenceCards[index], ...changes };
      return { ...current, evidenceCards };
    });
  }

  function updateSource(index: number, changes: Partial<SourceLink>) {
    setDraft((current) => {
      if (!current) return current;
      const sources = [...current.sources];
      sources[index] = { ...sources[index], ...changes };
      return { ...current, sources };
    });
  }

  function saveDraft() {
    if (!draft) {
      return;
    }

    if (!draft.country.trim() || !draft.track || !draft.question.trim() || !draft.policy.trim()) {
      setError("Case must have country, track, question, and policy before saving.");
      return;
    }

    try {
      const parsedTimeline = parseJsonArray<TimelineEvent>(timelineJson, "Timeline events").map((event) => ({
        ...event,
        caseId: draft.id,
      }));
      const parsedIndicators = parseJsonArray<CaseIndicator>(indicatorJson, "Indicators").map((indicator) => ({
        ...indicator,
        caseId: draft.id,
      }));
      const nextCustomCases = [...getCustomCases().filter((caseStudy) => caseStudy.id !== draft.id), draft];
      const nextCustomTimelines = [
        ...getCustomTimelineEvents().filter((event) => event.caseId !== draft.id),
        ...parsedTimeline,
      ];
      const nextCustomIndicators = [
        ...getCustomIndicators().filter((indicator) => indicator.caseId !== draft.id),
        ...parsedIndicators,
      ];

      saveCustomCases(nextCustomCases);
      saveCustomTimelineEvents(nextCustomTimelines);
      saveCustomIndicators(nextCustomIndicators);
      refreshCustomState();
      setDraftStatus("editing");
      setMessage(defaultCaseIds.has(draft.id) ? "Saved as a local edit to the default case." : "Custom case saved.");
      setError("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save this case.");
    }
  }

  function exportCurrentCases() {
    const json = exportCasesToJson({
      cases,
      timelines: mergeCustomTimelineEvents(defaultTimelines),
      indicators: mergeCustomIndicators(defaultIndicators),
    });

    downloadJson("did-it-work-cases.json", json);
  }

  async function handleImport(file: File | null) {
    if (!file) {
      return;
    }

    try {
      const imported = await importCasesFromJson(file);
      saveCustomCases(imported.cases);

      if (imported.timelines) {
        saveCustomTimelineEvents(imported.timelines);
      }

      if (imported.indicators) {
        saveCustomIndicators(imported.indicators);
      }

      refreshCustomState();
      setDraft(null);
      setDraftStatus("idle");
      setMessage(`Imported ${imported.cases.length} case${imported.cases.length === 1 ? "" : "s"}.`);
      setError("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not import that JSON file.");
    }
  }

  function restoreDefaults() {
    const confirmed = window.confirm("Restore default cases and remove all local teacher edits?");

    if (!confirmed) {
      return;
    }

    resetCustomCases();
    refreshCustomState();
    setDraft(null);
    setDraftStatus("idle");
    setMessage("Default cases restored.");
    setError("");
  }

  const warnings = draft ? getCaseWarnings(draft) : [];

  return (
    <main className="page teacher-page">
      <div className="board-header">
        <div>
          <p className="eyebrow">Teacher Mode</p>
          <h1>Case editor</h1>
          <p className="student-instruction">
            Edit classroom materials locally, export a backup, or restore the original cases at any time.
          </p>
        </div>
        <div className="board-actions">
          <button className="primary-button" type="button" onClick={beginNewCase}>
            Add case
          </button>
          <button className="secondary-button" type="button" onClick={exportCurrentCases}>
            Export JSON
          </button>
          <label className="import-button secondary-button">
            Import JSON
            <input
              accept="application/json"
              type="file"
              onChange={(event) => void handleImport(event.target.files?.[0] ?? null)}
            />
          </label>
          <button className="secondary-button" type="button" onClick={onChooseCase}>
            Student view
          </button>
          <button className="danger-button" type="button" disabled={customCases.length === 0} onClick={restoreDefaults}>
            Restore defaults
          </button>
        </div>
      </div>

      {message ? <p className="status-message">{message}</p> : null}
      {error ? <p className="error-message">{error}</p> : null}

      <div className="teacher-layout">
        <section className="case-manager-panel">
          <h2>All cases</h2>
          <div className="teacher-case-list">
            {cases.map((caseStudy) => {
              const isCustom = customIds.has(caseStudy.id);
              const isDefault = defaultCaseIds.has(caseStudy.id);

              return (
                <article className={draft?.id === caseStudy.id ? "teacher-case active" : "teacher-case"} key={caseStudy.id}>
                  <div>
                    <span className={`track-pill ${caseStudy.track}`}>{trackLabels[caseStudy.track]}</span>
                    <h3>{caseStudy.country}</h3>
                    <p>{caseStudy.policy}</p>
                    <small>{isDefault ? (isCustom ? "Default case with local edit" : "Default case") : "Custom case"}</small>
                  </div>
                  <div className="case-editor-actions">
                    <button className="secondary-button" type="button" onClick={() => beginEdit(caseStudy)}>
                      Edit
                    </button>
                    <button className="secondary-button" type="button" onClick={() => duplicateCase(caseStudy)}>
                      Duplicate
                    </button>
                    {isCustom ? (
                      <button className="danger-button" type="button" onClick={() => deleteCustomCase(caseStudy.id)}>
                        {isDefault ? "Remove edit" : "Delete"}
                      </button>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="case-editor-panel">
          {!draft ? (
            <div className="empty-editor">
              <h2>Select a case to edit</h2>
              <p>Default cases are safe. Saving an edit creates a local override that can be exported or restored later.</p>
            </div>
          ) : (
            <form className="teacher-form" onSubmit={(event) => event.preventDefault()}>
              <div className="editor-toolbar">
                <div>
                  <p className="eyebrow">{draftStatus === "new" ? "New custom case" : "Editing case"}</p>
                  <h2>{draft.country || "Untitled case"}</h2>
                </div>
                <button className="primary-button" type="button" onClick={saveDraft}>
                  Save case
                </button>
              </div>

              {warnings.length > 0 ? (
                <div className="warning-box">
                  {warnings.map((warning) => (
                    <p key={warning}>{warning}</p>
                  ))}
                </div>
              ) : null}

              <div className="teacher-form-grid">
                <label>
                  Country
                  <input value={draft.country} onChange={(event) => updateDraft({ country: event.target.value })} />
                </label>
                <label>
                  Track
                  <select value={draft.track} onChange={(event) => updateDraft({ track: event.target.value as CaseStudy["track"] })}>
                    <option value="sanctions">Sanctions</option>
                    <option value="aid">Foreign aid</option>
                  </select>
                </label>
                <label>
                  Period
                  <input value={draft.period} onChange={(event) => updateDraft({ period: event.target.value })} />
                </label>
                <label>
                  Policy
                  <input value={draft.policy} onChange={(event) => updateDraft({ policy: event.target.value })} />
                </label>
              </div>

              <label>
                Question
                <input value={draft.question} onChange={(event) => updateDraft({ question: event.target.value })} />
              </label>
              <label>
                Background
                <textarea value={draft.background} onChange={(event) => updateDraft({ background: event.target.value })} />
              </label>
              <label>
                Teacher note
                <textarea value={draft.teacherNote ?? ""} onChange={(event) => updateDraft({ teacherNote: event.target.value })} />
              </label>

              <section className="editor-section">
                <div className="section-heading-row">
                  <h3>Success criteria</h3>
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => updateDraft({ successCriteria: [...draft.successCriteria, { id: createId("criterion"), label: "New criterion", explanation: "" }] })}
                  >
                    Add criterion
                  </button>
                </div>
                {draft.successCriteria.map((criterion, index) => (
                  <div className="editor-row" key={`${criterion.id}-${index}`}>
                    <input value={criterion.label} onChange={(event) => updateCriterion(index, event.target.value, "label")} placeholder="Label" />
                    <input value={criterion.explanation} onChange={(event) => updateCriterion(index, event.target.value, "explanation")} placeholder="Explanation" />
                    <button
                      className="danger-button"
                      type="button"
                      onClick={() => updateDraft({ successCriteria: draft.successCriteria.filter((_, itemIndex) => itemIndex !== index) })}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </section>

              <section className="editor-section">
                <div className="section-heading-row">
                  <h3>Evidence cards</h3>
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => updateDraft({ evidenceCards: [...draft.evidenceCards, createBlankEvidenceCard(draft.id)] })}
                  >
                    Add card
                  </button>
                </div>
                <div className="evidence-editor-list">
                  {draft.evidenceCards.map((card, index) => (
                    <article className="evidence-editor-card" key={card.id}>
                      <div className="teacher-form-grid">
                        <label>
                          Title
                          <input value={card.title} onChange={(event) => updateEvidence(index, { title: event.target.value })} />
                        </label>
                        <label>
                          Type
                          <select value={card.type} onChange={(event) => updateEvidence(index, { type: event.target.value as EvidenceCardType })}>
                            {evidenceTypes.map((type) => (
                              <option key={type} value={type}>
                                {evidenceTypeLabels[type]}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <label>
                        Text
                        <textarea value={card.text} onChange={(event) => updateEvidence(index, { text: event.target.value })} />
                      </label>
                      <div className="teacher-form-grid">
                        <label>
                          Source title
                          <input value={card.sourceTitle ?? ""} onChange={(event) => updateEvidence(index, { sourceTitle: event.target.value })} />
                        </label>
                        <label>
                          Source URL
                          <input value={card.sourceUrl ?? ""} onChange={(event) => updateEvidence(index, { sourceUrl: event.target.value })} />
                        </label>
                      </div>
                      <button
                        className="danger-button"
                        type="button"
                        onClick={() => updateDraft({ evidenceCards: draft.evidenceCards.filter((_, itemIndex) => itemIndex !== index) })}
                      >
                        Delete card
                      </button>
                    </article>
                  ))}
                </div>
              </section>

              <section className="editor-section">
                <div className="section-heading-row">
                  <h3>Source links</h3>
                  <button className="secondary-button" type="button" onClick={() => updateDraft({ sources: [...draft.sources, createBlankSource()] })}>
                    Add source
                  </button>
                </div>
                {draft.sources.map((source, index) => (
                  <div className="source-editor-row" key={`${source.url}-${index}`}>
                    <input aria-label="Source title" value={source.title} onChange={(event) => updateSource(index, { title: event.target.value })} />
                    <input aria-label="Source URL" value={source.url} onChange={(event) => updateSource(index, { url: event.target.value })} />
                    <input aria-label="Source note" value={source.note ?? ""} onChange={(event) => updateSource(index, { note: event.target.value })} />
                    <button className="danger-button" type="button" onClick={() => updateDraft({ sources: draft.sources.filter((_, itemIndex) => itemIndex !== index) })}>
                      Delete
                    </button>
                  </div>
                ))}
              </section>

              <details className="json-editor-section">
                <summary>Timeline JSON</summary>
                <p>Keep this as a JSON array. Each event will be saved for this case.</p>
                <textarea value={timelineJson} onChange={(event) => setTimelineJson(event.target.value)} />
              </details>

              <details className="json-editor-section">
                <summary>Indicator JSON</summary>
                <p>Keep this as a JSON array. Each indicator will be saved for this case.</p>
                <textarea value={indicatorJson} onChange={(event) => setIndicatorJson(event.target.value)} />
              </details>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
