export type Track = "sanctions" | "aid";

export type EvidenceSortCategory =
  | "unassigned"
  | "supports_worked"
  | "supports_failed"
  | "complicates_or_missing";

export type Verdict = "worked" | "failed" | "mixed" | "cannot_judge";

export type Confidence = "high" | "medium" | "low";

export type SourceLink = {
  title: string;
  url: string;
  note?: string;
};

export type EvidenceCard = {
  id: string;
  title: string;
  text: string;
  type:
    | "policy_goal"
    | "supporting_evidence"
    | "complicating_evidence"
    | "data_point"
    | "missing_evidence"
    | "alternative_explanation";
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
