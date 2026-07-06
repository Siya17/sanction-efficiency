import type { Confidence, EvidenceCard, EvidenceSortCategory, Track, Verdict } from "../types";

export const trackLabels: Record<Track, string> = {
  sanctions: "Sanctions",
  aid: "Foreign aid",
};

export const categoryLabels: Record<EvidenceSortCategory, string> = {
  unassigned: "Unassigned",
  supports_worked: 'Supports "worked"',
  supports_failed: 'Supports "failed"',
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

export const evidenceTypeLabels: Record<EvidenceCard["type"], string> = {
  policy_goal: "Policy goal",
  supporting_evidence: "Suggests success",
  complicating_evidence: "Complicates",
  data_point: "Impact evidence",
  missing_evidence: "Missing evidence",
  alternative_explanation: "Alternative explanation",
};
