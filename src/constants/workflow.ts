import type { Confidence, EvidenceSortCategory, Verdict } from "../types";

export const evidenceSortCategories = [
  "supports_worked",
  "supports_failed",
  "complicates_or_missing",
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
  "Understand it",
  "Find evidence",
  "Give verdict",
  "Compare results",
];

export const activityTiming = [
  { label: "Meet the case", time: "8 min" },
  { label: "Define success", time: "5 min" },
  { label: "Find evidence", time: "12 min" },
  { label: "Give verdict", time: "5 min" },
  { label: "Class discussion", time: "5 min" },
];
