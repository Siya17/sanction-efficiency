import { appConfig } from "../config/app";
import type { StudentSubmission } from "../types";

function isSubmission(value: unknown): value is StudentSubmission {
  if (!value || typeof value !== "object") {
    return false;
  }

  const submission = value as Record<string, unknown>;

  return (
    typeof submission.id === "string" &&
    typeof submission.caseId === "string" &&
    typeof submission.country === "string" &&
    (submission.track === "sanctions" || submission.track === "aid") &&
    typeof submission.policy === "string" &&
    (submission.verdict === "worked" ||
      submission.verdict === "failed" ||
      submission.verdict === "mixed" ||
      submission.verdict === "cannot_judge") &&
    (submission.confidence === "high" ||
      submission.confidence === "medium" ||
      submission.confidence === "low") &&
    typeof submission.strongestEvidence === "string" &&
    typeof submission.biggestComplication === "string" &&
    typeof submission.missingEvidence === "string" &&
    typeof submission.createdAt === "string"
  );
}

export function getSubmissions(): StudentSubmission[] {
  const raw = window.localStorage.getItem(appConfig.boardStorageKey);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isSubmission) : [];
  } catch {
    return [];
  }
}

export function saveSubmission(submission: StudentSubmission) {
  const submissions = getSubmissions();
  window.localStorage.setItem(appConfig.boardStorageKey, JSON.stringify([submission, ...submissions]));
}

export function clearSubmissions() {
  window.localStorage.removeItem(appConfig.boardStorageKey);
}
