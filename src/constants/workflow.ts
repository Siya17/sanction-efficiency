import type { Confidence, EvidenceSortCategory, Verdict } from "../types";

export const evidenceSortCategories = [
  "supports_worked",
  "supports_failed",
  "complicates_or_missing",
] as const satisfies readonly EvidenceSortCategory[];

export const evidenceSortChoices = [
  ...evidenceSortCategories,
  "unassigned",
] as const satisfies readonly EvidenceSortCategory[];

export const verdictOptions = [
  "worked",
  "failed",
  "mixed",
  "cannot_judge",
] as const satisfies readonly Verdict[];

export const confidenceOptions = ["high", "medium", "low"] as const satisfies readonly Confidence[];

export const workflowSteps = [
  "Choose case",
  "Define success",
  "Sort evidence",
  "Build verdict",
  "Compare results",
];

export const activityTiming = [
  { label: "Choose case", time: "2 min" },
  { label: "Define success", time: "5 min" },
  { label: "Sort evidence", time: "10 min" },
  { label: "Build verdict", time: "5 min" },
  { label: "Class discussion", time: "10-12 min" },
];
