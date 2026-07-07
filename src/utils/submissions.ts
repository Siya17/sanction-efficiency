import type { StudentSubmission, SubmissionDraft } from "../types";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function escapeCsvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
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
    "ID",
    "Case",
    "Track",
    "Policy",
    "Success test",
    "Success (own words)",
    "Verdict",
    "Confidence",
    "Strongest evidence",
    "Biggest complication",
    "Missing evidence",
    "Findings researched",
    "Created at",
  ];

  const rows = submissions.map((submission) => [
    submission.id,
    submission.country,
    submission.track,
    submission.policy,
    submission.successLens || "",
    submission.successNote || "",
    submission.verdict,
    submission.confidence,
    submission.strongestEvidence,
    submission.biggestComplication,
    submission.missingEvidence,
    String(submission.studentEvidenceCards?.length || 0),
    submission.createdAt,
  ]);

  return [headers, ...rows]
    .map((row) => row.map((value) => escapeCsvValue(value)).join(","))
    .join("\n");
}
