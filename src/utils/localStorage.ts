import type { StudentSubmission } from "../types";

const STORAGE_KEY = "did-it-work-evidence-lab-submissions";

export function getSubmissions(): StudentSubmission[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as StudentSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSubmission(submission: StudentSubmission) {
  const submissions = getSubmissions();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([submission, ...submissions]));
}

export function clearSubmissions() {
  window.localStorage.removeItem(STORAGE_KEY);
}
