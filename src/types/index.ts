export type Track = "sanctions" | "aid";
export type ActivityMode = "classroom" | "research";
export type EvidenceReliability = "high" | "medium" | "low" | "uncertain";

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
  whyItMatters?: string;
  limitation?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  isStudentAdded?: boolean;
  reliability?: EvidenceReliability;
};

export type Citation = {
  title: string;
  url?: string;
  authorOrOrganization?: string;
  publicationYear?: string;
  note?: string;
};

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
  sortCategory: EvidenceSortCategory; // Kept for backward compatibility
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

export type StudentIndicatorType =
  | "success"
  | "harm_or_cost"
  | "uncertainty_or_alternative";

export type StudentIndicator = {
  id: string;
  caseId: string;
  type: StudentIndicatorType;
  name: string;
  measures: string;
  whyItMatters: string;
  direction: string;
  limitation: string;
};

export type IndicatorSuggestion = {
  id: string;
  track: "sanctions" | "aid";
  caseId?: string;
  type: StudentIndicatorType;
  label: string;
  measures: string;
  whyItMatters: string;
  possibleData?: string;
  limitation: string;
};

export type StudentEvidenceFinding =
  | "supports_success"
  | "shows_failure"
  | "complicates"
  | "irrelevant";

export type StudentEvidenceSelection = {
  cardId: string;
  indicatorId?: string;
  finding: StudentEvidenceFinding;
};

export type StudentSubmission = {
  id: string;
  caseId: string;
  country: string;
  track: Track;
  policy: string;
  successCriterion?: string; // Optional now, since we have evaluationQuestion
  policyAim?: string; // Optional now
  
  // New Stage 9 fields
  evaluationQuestion?: string;
  successGoal?: string;
  actorOrGroup?: string;
  timePeriod?: string;
  studentIndicators?: StudentIndicator[];
  selectedEvidence?: StudentEvidenceSelection[];
  dataNeeds?: string[];
  
  verdict: Verdict;
  confidence: Confidence;
  strongestEvidence: string;
  biggestComplication: string;
  missingEvidence: string;
  dataSnapshotReflection?: string;
  activityMode?: ActivityMode;
  studentEvidenceCards?: StudentEvidenceCard[];
  researchQuestion?: string;
  supportingEvidence?: string;
  complicatingEvidence?: string;
  counterargument?: string;
  evidenceThatWouldChangeMind?: string;
  remainingUncertainty?: string;
  sourceReliabilityNote?: string;
  finalExplanation?: string;
  citationList?: Citation[];
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

