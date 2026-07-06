import type { StudentEvidenceCard } from "../types";

const STORAGE_KEY = "didItWork.studentEvidence";

export function getStudentEvidence(caseId?: string): StudentEvidenceCard[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    const cards: StudentEvidenceCard[] = Array.isArray(parsed)
      ? parsed.filter(
          (card): card is StudentEvidenceCard =>
            Boolean(card) &&
            typeof card === "object" &&
            typeof (card as StudentEvidenceCard).id === "string" &&
            typeof (card as StudentEvidenceCard).caseId === "string",
        )
      : [];

    return caseId ? cards.filter((card) => card.caseId === caseId) : cards;
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
