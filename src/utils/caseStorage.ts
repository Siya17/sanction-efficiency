import { cases as defaultCases } from "../data/cases";
import type { CaseIndicator, CaseStudy, TimelineEvent } from "../types";

const CUSTOM_CASES_KEY = "did-it-work-custom-cases";
const CUSTOM_TIMELINES_KEY = "did-it-work-custom-timelines";
const CUSTOM_INDICATORS_KEY = "did-it-work-custom-indicators";

export type CaseImportBundle = {
  cases: CaseStudy[];
  timelines?: TimelineEvent[];
  indicators?: CaseIndicator[];
};

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function cloneCases(cases: CaseStudy[]) {
  return JSON.parse(JSON.stringify(cases)) as CaseStudy[];
}

function readJsonArray<T>(key: string, isValid: (value: unknown) => value is T): T[] {
  if (!canUseStorage()) {
    return [];
  }

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValid) : [];
  } catch {
    return [];
  }
}

function writeJsonArray<T>(key: string, values: T[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(values));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isCaseStudy(value: unknown): value is CaseStudy {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    (value.track === "sanctions" || value.track === "aid") &&
    typeof value.country === "string" &&
    typeof value.period === "string" &&
    typeof value.policy === "string" &&
    typeof value.question === "string" &&
    typeof value.background === "string" &&
    isStringArray(value.successCriteria) &&
    Array.isArray(value.evidenceCards) &&
    Array.isArray(value.sources)
  );
}

function isTimelineEvent(value: unknown): value is TimelineEvent {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.caseId === "string" &&
    typeof value.year === "number" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.type === "string"
  );
}

function isCaseIndicator(value: unknown): value is CaseIndicator {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.caseId === "string" &&
    typeof value.title === "string" &&
    typeof value.kind === "string" &&
    typeof value.description === "string" &&
    typeof value.caveat === "string" &&
    Array.isArray(value.data)
  );
}

function mergeById<T extends { id: string }>(defaults: T[], custom: T[]) {
  const customById = new Map(custom.map((item) => [item.id, item]));
  const merged = defaults.map((item) => customById.get(item.id) ?? item);
  const defaultIds = new Set(defaults.map((item) => item.id));
  const additions = custom.filter((item) => !defaultIds.has(item.id));

  return [...merged, ...additions];
}

export function getDefaultCases() {
  return cloneCases(defaultCases);
}

export function getCustomCases() {
  return readJsonArray(CUSTOM_CASES_KEY, isCaseStudy);
}

export function getActiveCases() {
  return mergeById(getDefaultCases(), getCustomCases());
}

export function saveCustomCases(cases: CaseStudy[]) {
  writeJsonArray(CUSTOM_CASES_KEY, cases);
}

export function resetCustomCases() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(CUSTOM_CASES_KEY);
  window.localStorage.removeItem(CUSTOM_TIMELINES_KEY);
  window.localStorage.removeItem(CUSTOM_INDICATORS_KEY);
}

export function getCustomTimelineEvents() {
  return readJsonArray(CUSTOM_TIMELINES_KEY, isTimelineEvent);
}

export function saveCustomTimelineEvents(events: TimelineEvent[]) {
  writeJsonArray(CUSTOM_TIMELINES_KEY, events);
}

export function getCustomIndicators() {
  return readJsonArray(CUSTOM_INDICATORS_KEY, isCaseIndicator);
}

export function saveCustomIndicators(indicators: CaseIndicator[]) {
  writeJsonArray(CUSTOM_INDICATORS_KEY, indicators);
}

export function mergeCustomTimelineEvents(defaultEvents: TimelineEvent[]) {
  return mergeById(defaultEvents, getCustomTimelineEvents());
}

export function mergeCustomIndicators(defaultIndicators: CaseIndicator[]) {
  return mergeById(defaultIndicators, getCustomIndicators());
}

export function exportCasesToJson(bundle: CaseImportBundle) {
  return JSON.stringify(
    {
      app: "Did It Work? Evidence Lab",
      version: 1,
      exportedAt: new Date().toISOString(),
      ...bundle,
    },
    null,
    2,
  );
}

export async function importCasesFromJson(file: File): Promise<CaseImportBundle> {
  const text = await file.text();
  const parsed = JSON.parse(text) as unknown;
  const rawCases = Array.isArray(parsed)
    ? parsed
    : isRecord(parsed) && Array.isArray(parsed.cases)
      ? parsed.cases
      : [];

  if (!Array.isArray(rawCases)) {
    throw new Error("The JSON file must contain a cases array.");
  }

  const importedCases = rawCases.filter(isCaseStudy);

  if (importedCases.length === 0) {
    throw new Error("No valid cases were found in the JSON file.");
  }

  const timelines = isRecord(parsed) && Array.isArray(parsed.timelines) ? parsed.timelines.filter(isTimelineEvent) : undefined;
  const indicators = isRecord(parsed) && Array.isArray(parsed.indicators) ? parsed.indicators.filter(isCaseIndicator) : undefined;

  return { cases: importedCases, timelines, indicators };
}
