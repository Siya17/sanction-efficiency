import { useEffect, useState } from "react";
import { getActiveCases } from "../utils/caseStorage";
import type {
  ActivityMode,
  AppView,
  CaseStudy,
  StudentEvidenceCard,
  StudentSubmission,
  SubmissionDraft,
  StudentIndicator,
  StudentEvidenceSelection,
} from "../types";
import { getActivityMode, saveActivityMode } from "../utils/activityModeStorage";
import { clearSubmissions, getSubmissions, saveSubmission } from "../utils/localStorage";
import { getStudentEvidence } from "../utils/studentEvidenceStorage";
import { createSubmission } from "../utils/submissions";

export function useEvidenceLab() {
  const [activityMode, setActivityModeState] = useState<ActivityMode>("classroom");
  const [view, setView] = useState<AppView>("home");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  
  // Legacy field, kept for classroom mode compatibility if needed
  const [successCriterion, setSuccessCriterion] = useState("");
  
  // New Stage 9 fields
  const [evaluationQuestion, setEvaluationQuestion] = useState("");
  const [successGoal, setSuccessGoal] = useState("");
  const [actorOrGroup, setActorOrGroup] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  
  const [studentIndicators, setStudentIndicators] = useState<StudentIndicator[]>([]);
  const [selectedEvidence, setSelectedEvidence] = useState<StudentEvidenceSelection[]>([]);
  const [dataNeeds, setDataNeeds] = useState<string[]>([]);

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => getActiveCases());
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [studentEvidence, setStudentEvidence] = useState<StudentEvidenceCard[]>([]);

  useEffect(() => {
    setActivityModeState(getActivityMode());
    setCaseStudies(getActiveCases());
    setSubmissions(getSubmissions());
  }, []);

  const canBuildVerdict = Boolean(
    selectedCase &&
    evaluationQuestion.length > 0 &&
    studentIndicators.length >= 3 &&
    selectedEvidence.length >= 3
  );

  function refreshCases() {
    const nextCases = getActiveCases();
    setCaseStudies(nextCases);

    if (selectedCase) {
      const nextSelectedCase = nextCases.find((caseStudy) => caseStudy.id === selectedCase.id) ?? selectedCase;
      setSelectedCase(nextSelectedCase);
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
    
    // Reset all state for the new case
    setSuccessCriterion("");
    setEvaluationQuestion("");
    setSuccessGoal("");
    setActorOrGroup("");
    setTimePeriod("");
    setStudentIndicators([]);
    setSelectedEvidence([]);
    setDataNeeds([]);
    
    setStudentEvidence(getStudentEvidence(caseStudy.id));
    setView("investigation");
  }

  function setActivityMode(mode: ActivityMode) {
    saveActivityMode(mode);
    setActivityModeState(mode);
  }

  function refreshStudentEvidence() {
    if (selectedCase) {
      setStudentEvidence(getStudentEvidence(selectedCase.id));
    }
  }

  function updateSelectedEvidence(selection: StudentEvidenceSelection) {
    setSelectedEvidence((current) => {
      const existing = current.findIndex(s => s.cardId === selection.cardId);
      if (existing >= 0) {
        const next = [...current];
        next[existing] = selection;
        return next;
      }
      return [...current, selection];
    });
  }

  function removeSelectedEvidence(cardId: string) {
    setSelectedEvidence((current) => current.filter(s => s.cardId !== cardId));
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
    activityMode,
    studentEvidence,
    canBuildVerdict,
    cases: caseStudies,
    selectedCase,
    submissions,
    view,
    
    // Legacy
    successCriterion,
    
    // New state
    evaluationQuestion,
    successGoal,
    actorOrGroup,
    timePeriod,
    studentIndicators,
    selectedEvidence,
    dataNeeds,
    
    actions: {
      setActivityMode,
      refreshStudentEvidence,
      clearBoard,
      refreshCases,
      selectCase,
      setSuccessCriterion,
      setView,
      showBoard,
      startCaseSelection,
      submitVerdict,
      
      // New actions
      setEvaluationQuestion,
      setSuccessGoal,
      setActorOrGroup,
      setTimePeriod,
      setStudentIndicators,
      setSelectedEvidence,
      setDataNeeds,
      updateSelectedEvidence,
      removeSelectedEvidence,
    },
  };
}
