export type Track = "sanctions" | "aid";

export type EvidenceSortCategory =
  | "unassigned"
  | "supports_worked"
  | "supports_failed"
  | "complicates_or_missing";

export type Verdict = "worked" | "failed" | "mixed" | "cannot_judge";

export type Confidence = "high" | "medium" | "low";

export type AppView = "home" | "selection" | "investigation" | "verdict" | "board";

export type EvidenceCardType =
  | "policy_goal"
  | "success_evidence"
  | "failure_or_harm"
  | "civilian_or_social_impact"
  | "mechanism"
  | "alternative_explanation"
  | "comparison_problem"
  | "missing_evidence"
  | "timeline"
  | "implementation_problem"
  | "long_term_consequence";

export type SourceLink = {
  title: string;
  url: string;
  note?: string;
};

export type EvidenceCard = {
  id: string;
  title: string;
  text: string;
  type: EvidenceCardType;
  sourceTitle?: string;
  sourceUrl?: string;
};

export type CaseStudy = {
  id: string;
  track: Track;
  country: string;
  period: string;
  policy: string;
  question: string;
  background: string;
  successCriteria: string[];
  evidenceCards: EvidenceCard[];
  sources: SourceLink[];
  teacherNote?: string;
};

export type StudentSubmission = {
  id: string;
  caseId: string;
  country: string;
  track: Track;
  policy: string;
  successCriterion: string;
  policyAim: string;
  verdict: Verdict;
  confidence: Confidence;
  strongestEvidence: string;
  biggestComplication: string;
  missingEvidence: string;
  createdAt: string;
};

export type SubmissionDraft = Omit<StudentSubmission, "id" | "createdAt">;
