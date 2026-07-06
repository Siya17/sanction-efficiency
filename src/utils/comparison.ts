import type { Confidence, StudentSubmission, Track, Verdict } from "../types";

export type CountItem = {
  key: string;
  label: string;
  count: number;
  className?: string;
};

export const verdictOrder: Verdict[] = ["worked", "failed", "mixed", "cannot_judge"];
export const confidenceOrder: Confidence[] = ["high", "medium", "low"];
export const trackOrder: Track[] = ["sanctions", "aid"];

export function countWhere<T extends string>(items: StudentSubmission[], values: readonly T[], getValue: (item: StudentSubmission) => T) {
  return values.map((value) => ({ key: value, count: items.filter((item) => getValue(item) === value).length }));
}

export function groupByCriterion(submissions: StudentSubmission[]) {
  const groups = new Map<string, StudentSubmission[]>();

  submissions.forEach((submission) => {
    const key = submission.successCriterion || "Unspecified criterion";
    groups.set(key, [...(groups.get(key) ?? []), submission]);
  });

  return [...groups.entries()]
    .map(([criterion, items]) => ({ criterion, submissions: items }))
    .sort((a, b) => b.submissions.length - a.submissions.length || a.criterion.localeCompare(b.criterion));
}

const stopwords = new Set([
  "about",
  "after",
  "again",
  "also",
  "because",
  "better",
  "could",
  "data",
  "evidence",
  "from",
  "have",
  "more",
  "need",
  "needed",
  "needs",
  "policy",
  "should",
  "students",
  "their",
  "there",
  "these",
  "they",
  "this",
  "what",
  "where",
  "which",
  "would",
]);

export function getMissingEvidenceKeywords(submissions: StudentSubmission[], limit = 12) {
  const counts = new Map<string, number>();

  submissions.forEach((submission) => {
    submission.missingEvidence
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .map((word) => word.trim())
      .filter((word) => word.length > 3 && !stopwords.has(word))
      .forEach((word) => counts.set(word, (counts.get(word) ?? 0) + 1));
  });

  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, limit);
}

export function getMostCommonVerdict(submissions: StudentSubmission[]) {
  const counts = countWhere(submissions, verdictOrder, (submission) => submission.verdict);
  return counts.sort((a, b) => b.count - a.count)[0];
}

export function getHighConfidenceCases(submissions: StudentSubmission[]) {
  return submissions.filter((submission) => submission.confidence === "high").map((submission) => submission.country);
}
