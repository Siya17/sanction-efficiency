import { useEffect, useMemo, useState } from "react";
import { getActiveCases } from "../utils/caseStorage";
import type {
  AppView,
  CaseStudy,
  EvidenceSortCategory,
  StudentSubmission,
  SubmissionDraft,
} from "../types";
import { clearSubmissions, getSubmissions, saveSubmission } from "../utils/localStorage";
import { createSubmission } from "../utils/submissions";

function createAssignments(caseStudy: CaseStudy | null): Record<string, EvidenceSortCategory> {
  if (!caseStudy) {
    return {};
  }

  return Object.fromEntries(
    caseStudy.evidenceCards.map((card) => [card.id, "unassigned" as EvidenceSortCategory]),
  );
}

export function useEvidenceLab() {
  const [view, setView] = useState<AppView>("home");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [successCriterion, setSuccessCriterion] = useState("");
  const [assignments, setAssignments] = useState<Record<string, EvidenceSortCategory>>({});
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => getActiveCases());
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);

  useEffect(() => {
    setCaseStudies(getActiveCases());
    setSubmissions(getSubmissions());
  }, []);

  const sortedCount = useMemo(
    () => Object.values(assignments).filter((value) => value !== "unassigned").length,
    [assignments],
  );

  const canBuildVerdict =
    Boolean(selectedCase) &&
    successCriterion.length > 0 &&
    sortedCount >= 3;

  function refreshCases() {
    const nextCases = getActiveCases();
    setCaseStudies(nextCases);

    if (selectedCase) {
      const nextSelectedCase = nextCases.find((caseStudy) => caseStudy.id === selectedCase.id) ?? selectedCase;
      setSelectedCase(nextSelectedCase);
      setAssignments(createAssignments(nextSelectedCase));
    }
  }

  function startCaseSelection() {
    setView("selection");
  }

  function showBoard() {
    setView("board");
  }

  function selectCase(caseStudy: CaseStudy) {
    setSelectedCase(caseStudy);
    setSuccessCriterion("");
    setAssignments(createAssignments(caseStudy));
    setView("investigation");
  }

  function assignEvidence(cardId: string, category: EvidenceSortCategory) {
    setAssignments((current) => ({ ...current, [cardId]: category }));
  }

  function submitVerdict(draft: SubmissionDraft) {
    const submission = createSubmission(draft);

    saveSubmission(submission);
    setSubmissions(getSubmissions());
    setView("board");
  }

  function clearBoard() {
    clearSubmissions();
    setSubmissions([]);
  }

  return {
    assignments,
    canBuildVerdict,
    cases: caseStudies,
    selectedCase,
    submissions,
    successCriterion,
    view,
    actions: {
      assignEvidence,
      clearBoard,
      refreshCases,
      selectCase,
      setSuccessCriterion,
      setView,
      showBoard,
      startCaseSelection,
      submitVerdict,
    },
  };
}
