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
    "Activity Mode",
    "Case",
    "Track",
    "Policy",
    "Success criterion",
    "Policy aim / Research question",
    "Verdict",
    "Confidence",
    "Strongest/Supporting evidence",
    "Biggest complication",
    "Missing evidence / Remaining uncertainty",
    "Data snapshot reflection",
    "Final explanation",
    "Counterargument",
    "Evidence that would change mind",
    "Student-added evidence count",
    "Citation count",
    "Created at",
  ];

  const rows = submissions.map((submission) => [
    submission.id,
    submission.activityMode || "classroom",
    submission.country,
    submission.track,
    submission.policy,
    submission.successCriterion,
    submission.researchQuestion || submission.policyAim,
    submission.verdict,
    submission.confidence,
    submission.strongestEvidence,
    submission.biggestComplication,
    submission.missingEvidence,
    submission.dataSnapshotReflection || "",
    submission.finalExplanation || "",
    submission.counterargument || "",
    submission.evidenceThatWouldChangeMind || "",
    String(submission.studentEvidenceCards?.length || 0),
    String(submission.citationList?.length || 0),
    submission.createdAt,
  ]);

  return [headers, ...rows]
    .map((row) => row.map((value) => escapeCsvValue(value)).join(","))
    .join("\n");
}
