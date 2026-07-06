import type { Confidence, EvidenceCardType, EvidenceSortCategory, Track, Verdict } from "../types";

export const trackLabels: Record<Track, string> = {
  sanctions: "Sanctions",
  aid: "Foreign aid",
};

export const categoryLabels: Record<EvidenceSortCategory, string> = {
  unassigned: "Unassigned",
  supports_worked: "Supports worked",
  supports_failed: "Supports failed",
  complicates_or_missing: "Complicates / missing",
};

export const verdictLabels: Record<Verdict, string> = {
  worked: "Worked",
  failed: "Failed",
  mixed: "Mixed",
  cannot_judge: "Cannot judge yet",
};

export const confidenceLabels: Record<Confidence, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const evidenceTypeLabels: Record<EvidenceCardType, string> = {
  policy_goal: "Policy goal",
  success_evidence: "Success evidence",
  failure_or_harm: "Failure / harm",
  civilian_or_social_impact: "Civilian / social impact",
  mechanism: "Mechanism",
  alternative_explanation: "Alternative explanation",
  comparison_problem: "Comparison problem",
  missing_evidence: "Missing evidence",
  timeline: "Timeline",
  implementation_problem: "Implementation problem",
  long_term_consequence: "Long-term consequence",
};
