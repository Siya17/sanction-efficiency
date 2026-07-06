import type { StudentEvidenceCard } from "../types";

const STORAGE_KEY = "didItWork.studentEvidence";

export function getStudentEvidence(caseId?: string): StudentEvidenceCard[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    const cards = Array.isArray(parsed) ? parsed : [];
    if (caseId) {
      return cards.filter((card: StudentEvidenceCard) => card.caseId === caseId);
    }
    return cards;
  } catch {
    return [];
  }
}

export function saveStudentEvidence(cards: StudentEvidenceCard[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function addStudentEvidence(card: StudentEvidenceCard): void {
  const cards = getStudentEvidence();
  saveStudentEvidence([...cards, card]);
}

export function deleteStudentEvidence(cardId: string): void {
  const cards = getStudentEvidence();
  saveStudentEvidence(cards.filter(c => c.id !== cardId));
}

export function clearStudentEvidence(caseId?: string): void {
  if (caseId) {
    const cards = getStudentEvidence();
    saveStudentEvidence(cards.filter(c => c.caseId !== caseId));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}
