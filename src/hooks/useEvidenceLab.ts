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
import { clearSubmissions, getSubmissions as getLocalSubmissions, saveSubmission as saveLocalSubmission } from "../utils/localStorage";
import { getStudentEvidence } from "../utils/studentEvidenceStorage";
import { createSubmission } from "../utils/submissions";
import { supabase, ClaimedCase, claimCase as supabaseClaimCase, releaseCase as supabaseReleaseCase, getClaimedCases, saveSubmission as supabaseSaveSubmission, getSubmissions as supabaseGetSubmissions } from "../utils/supabase";

export function useEvidenceLab() {
  const [groupName, setGroupName] = useState<string>("");
  const [activityMode, setActivityModeState] = useState<ActivityMode>("classroom");
  // If no group name, default to login view
  const [view, setView] = useState<AppView | "login">("login");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  
  // Real-time states
  const [claimedCases, setClaimedCases] = useState<ClaimedCase[]>([]);

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

  // Initial load
  useEffect(() => {
    setActivityModeState(getActivityMode());
    setCaseStudies(getActiveCases());
    
    // Load submissions (prefer Supabase if available)
    const loadSubmissions = async () => {
      if (supabase) {
        const { data } = await supabaseGetSubmissions();
        if (data) setSubmissions(data);
      } else {
        setSubmissions(getLocalSubmissions());
      }
    };
    
    loadSubmissions();
  }, []);

  // Supabase real-time subscriptions
  useEffect(() => {
    if (!supabase) return;

    const fetchClaimed = async () => {
      const { data } = await getClaimedCases();
      if (data) setClaimedCases(data);
    };
    
    fetchClaimed();

    // Subscribe to claimed_cases
    const claimedChannel = supabase
      .channel('claimed_cases_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'claimed_cases' }, () => {
        fetchClaimed();
      })
      .subscribe();

    // Subscribe to submissions
    const submissionsChannel = supabase
      .channel('submissions_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'submissions' }, async () => {
        const { data } = await supabaseGetSubmissions();
        if (data) setSubmissions(data);
      })
      .subscribe();

    return () => {
      supabase?.removeChannel(claimedChannel);
      supabase?.removeChannel(submissionsChannel);
    };
  }, []);

  const canBuildVerdict = Boolean(
    selectedCase &&
    evaluationQuestion.length > 0 &&
    studentIndicators.length >= 3 &&
    selectedEvidence.length >= 3
  );

  function handleLogin(name: string) {
    setGroupName(name);
    setView("home");
  }

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

  async function selectCase(caseStudy: CaseStudy) {
    // If Supabase is connected, attempt to claim it
    if (supabase) {
      const isClaimedByOther = claimedCases.some(c => c.case_id === caseStudy.id && c.group_name !== groupName);
      if (isClaimedByOther) {
        alert("This case has already been claimed by another group!");
        return;
      }
      
      const { error } = await supabaseClaimCase(caseStudy.id, groupName);
      if (error && (error as any).code !== '23505') { // Ignore unique violation if we already claimed it
        alert("Error claiming case: " + error.message);
        return;
      }
    }

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

  async function releaseCurrentCase(targetView: AppView | "login" = "selection") {
    if (selectedCase && supabase) {
      await supabaseReleaseCase(selectedCase.id, groupName);
    }
    setSelectedCase(null);
    setView(targetView);
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

  async function submitVerdict(draft: SubmissionDraft) {
    const submission = createSubmission(draft);

    if (supabase) {
      await supabaseSaveSubmission(submission, groupName);
      // It will auto-update via subscription, but let's update local immediately
      const { data } = await supabaseGetSubmissions();
      if (data) setSubmissions(data);
    } else {
      saveLocalSubmission(submission);
      setSubmissions(getLocalSubmissions());
    }
    
    setView("board");
  }

  function clearBoard() {
    clearSubmissions();
    setSubmissions([]);
    // Optionally: clear Supabase (left out for safety, usually teacher only)
  }

  return {
    groupName,
    claimedCases,
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
      handleLogin,
      setActivityMode,
      refreshStudentEvidence,
      clearBoard,
      refreshCases,
      selectCase,
      releaseCurrentCase,
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
