export type Track = "sanctions" | "aid";
export type EvidenceReliability = "high" | "medium" | "low" | "uncertain";

// How a student classified a piece of evidence they found.
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

// Curated indicator series, still editable in Teacher Mode (not shown to students).
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

// Curated evidence, still editable in Teacher Mode (not shown to students).
export type EvidenceCard = {
  id: string;
  title: string;
  text: string;
  type: EvidenceCardType;
  whyItMatters?: string;
  limitation?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  isStudentAdded?: boolean;
  reliability?: EvidenceReliability;
};

// A piece of evidence a student found and recorded themselves.
export type StudentEvidenceCard = {
  id: string;
  caseId: string;
  title: string;
  summary: string;
  sourceTitle: string;
  sourceUrl?: string;
  authorOrOrganization?: string;
  publicationYear?: string;
  quoteOrDataPoint?: string;
  reliability: EvidenceReliability;
  sortCategory: EvidenceSortCategory; // worked / failed / complicated
  explanation: string;
  limitation: string;
  notes?: string;
  createdAt: string;
};

export type SuccessCriterion = {
  id: string;
  label: string;
  explanation: string;
};

export type CaseSummary = {
  quickSummary: string;
  whatWasHappening: string;
  policyUsed: string;
  policyGoal: string;
  whyHardToJudge: string;
  possibleSuccessAngles: string[];
  tailoredGuidance?: string[];
};

export type CaseStudy = {
  id: string;
  track: Track;
  country: string;
  period: string;
  policy: string;
  question: string;
  background?: string; // Optional for backward compatibility
  summary: CaseSummary;
  successCriteria: SuccessCriterion[];
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

  // What the group decided "success" should mean for this case.
  successLens?: string;
  successNote?: string;

  verdict: Verdict;
  confidence: Confidence;
  strongestEvidence: string;
  biggestComplication: string;
  missingEvidence: string;

  // The evidence the group found and recorded themselves.
  studentEvidenceCards?: StudentEvidenceCard[];

  createdAt: string;
};

export type SubmissionDraft = Omit<StudentSubmission, "id" | "createdAt">;
