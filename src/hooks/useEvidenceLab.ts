import { useEffect, useMemo, useState } from "react";
import { cases } from "../data/cases";
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
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);

  useEffect(() => {
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
    cases,
    selectedCase,
    submissions,
    successCriterion,
    view,
    actions: {
      assignEvidence,
      clearBoard,
      selectCase,
      setSuccessCriterion,
      setView,
      showBoard,
      startCaseSelection,
      submitVerdict,
    },
  };
}
