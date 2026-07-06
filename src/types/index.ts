export type Track = "sanctions" | "aid";

export type EvidenceSortCategory =
  | "unassigned"
  | "supports_worked"
  | "supports_failed"
  | "complicates_or_missing";

export type Verdict = "worked" | "failed" | "mixed" | "cannot_judge";

export type Confidence = "high" | "medium" | "low";

export type AppView = "home" | "selection" | "investigation" | "verdict" | "board" | "compare" | "teacher";

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

export type IndicatorKind =
  | "economic"
  | "civilian_welfare"
  | "violence"
  | "governance"
  | "negotiation"
  | "aid_flow"
  | "sanctions_timeline";

export type IndicatorDataPoint = {
  year: number;
  value: number;
  label?: string;
};

export type CaseIndicator = {
  id: string;
  caseId: string;
  title: string;
  kind: IndicatorKind;
  unit?: string;
  description: string;
  caveat: string;
  data: IndicatorDataPoint[];
  sourceTitle?: string;
  sourceUrl?: string;
};

export type TimelineEvent = {
  id: string;
  caseId: string;
  year: number;
  title: string;
  description: string;
  type:
    | "policy"
    | "conflict"
    | "negotiation"
    | "economic"
    | "social"
    | "political"
    | "aid"
    | "sanction";
  sourceTitle?: string;
  sourceUrl?: string;
};

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
  dataSnapshotReflection?: string;
  createdAt: string;
};

export type DatasetCategory =
  | "sanctions"
  | "aid"
  | "conflict"
  | "development"
  | "governance"
  | "economic"
  | "civilian_welfare";

export type DatasetSource = {
  id: string;
  title: string;
  provider: string;
  url: string;
  note: string;
  lastChecked?: string;
};

export type DatasetDataPoint = {
  year: number;
  value: number;
  label?: string;
};

export type DatasetSeries = {
  id: string;
  caseId: string;
  sourceId: string;
  category: DatasetCategory;
  title: string;
  description: string;
  unit?: string;
  data: DatasetDataPoint[];
  caveat: string;
};

export type CaseDatasetSnapshot = {
  id: string;
  caseId: string;
  title: string;
  description: string;
  series: DatasetSeries[];
};

export type SubmissionDraft = Omit<StudentSubmission, "id" | "createdAt">;
