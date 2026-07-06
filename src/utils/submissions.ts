import type { StudentSubmission, SubmissionDraft } from "../types";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function escapeCsvValue(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export function createSubmission(draft: SubmissionDraft): StudentSubmission {
  return {
    ...draft,
    id: createId(),
    createdAt: new Date().toISOString(),
  };
}

export function submissionsToCsv(submissions: StudentSubmission[]) {
  const headers = [
    "Case",
    "Track",
    "Policy",
    "Success criterion",
    "Policy aim",
    "Verdict",
    "Confidence",
    "Strongest evidence",
    "Biggest complication",
    "Missing evidence",
    "Created at",
  ];

  const rows = submissions.map((submission) => [
    submission.country,
    submission.track,
    submission.policy,
    submission.successCriterion,
    submission.policyAim,
    submission.verdict,
    submission.confidence,
    submission.strongestEvidence,
    submission.biggestComplication,
    submission.missingEvidence,
    submission.createdAt,
  ]);

  return [headers, ...rows]
    .map((row) => row.map((value) => escapeCsvValue(value)).join(","))
    .join("\n");
}
