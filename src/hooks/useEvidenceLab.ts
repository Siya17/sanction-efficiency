import { useCallback, useEffect, useState } from "react";
import { getActiveCases } from "../utils/caseStorage";
import type {
  AppView,
  CaseStudy,
  StudentEvidenceCard,
  StudentSubmission,
  SubmissionDraft,
} from "../types";
import { clearSubmissions, deleteSubmission as deleteLocalSubmission, getSubmissions as getLocalSubmissions, saveSubmission as saveLocalSubmission } from "../utils/localStorage";
import { getStudentEvidence } from "../utils/studentEvidenceStorage";
import { createSubmission } from "../utils/submissions";
import { supabase, ClaimedCase, claimCase as supabaseClaimCase, releaseCase as supabaseReleaseCase, releaseAllClaims as supabaseReleaseAllClaims, getClaimedCases, saveSubmission as supabaseSaveSubmission, getSubmissions as supabaseGetSubmissions, deleteAllSubmissions as supabaseDeleteAllSubmissions, deleteSubmission as supabaseDeleteSubmission } from "../utils/supabase";

// Minimum number of self-researched findings before a group can give a verdict.
export const MIN_FINDINGS = 2;

// Realtime events fire on every insert/claim from any group. These signatures let
// us skip state updates when the data is unchanged, so a student typing a verdict
// is never interrupted by a needless re-render.
const submissionSignature = (list: StudentSubmission[]) => list.map((item) => item.id).join("|");
const claimedSignature = (list: ClaimedCase[]) =>
  list
    .map((item) => `${item.case_id}:${item.group_name}`)
    .sort()
    .join("|");

export function useEvidenceLab() {
  const [groupName, setGroupName] = useState<string>("");
  // If no group name, default to login view
  const [view, setView] = useState<AppView | "login">("login");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Real-time states
  const [claimedCases, setClaimedCases] = useState<ClaimedCase[]>([]);

  // What the group decided "success" should mean for this case.
  const [successLens, setSuccessLens] = useState("");
  const [successNote, setSuccessNote] = useState("");
  
  const [editingDraft, setEditingDraft] = useState<StudentSubmission | null>(null);

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => getActiveCases());
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [studentEvidence, setStudentEvidence] = useState<StudentEvidenceCard[]>([]);

  // Only replace state when the data actually changed, so realtime echoes of a
  // group's own submission (or duplicate events) never trigger a re-render.
  const applySubmissions = useCallback((next: StudentSubmission[]) => {
    setSubmissions((prev) => (submissionSignature(prev) === submissionSignature(next) ? prev : next));
  }, []);
  const applyClaimed = useCallback((next: ClaimedCase[]) => {
    setClaimedCases((prev) => (claimedSignature(prev) === claimedSignature(next) ? prev : next));
  }, []);

  // Initial load
  useEffect(() => {
    setCaseStudies(getActiveCases());

    // Load submissions (prefer Supabase if available)
    const loadSubmissions = async () => {
      if (supabase) {
        const { data } = await supabaseGetSubmissions();
        if (data) applySubmissions(data);
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
      if (data) applyClaimed(data);
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
        if (data) applySubmissions(data);
      })
      .subscribe();

    return () => {
      supabase?.removeChannel(claimedChannel);
      supabase?.removeChannel(submissionsChannel);
    };
  }, []);

  const canBuildVerdict = Boolean(
    selectedCase &&
    successLens.trim().length > 0 &&
    studentEvidence.length >= MIN_FINDINGS
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

    // Reset the group's working state for the new case.
    setSuccessLens("");
    setSuccessNote("");
    setEditingDraft(null);

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

  // Teacher override: free up a specific case (e.g. a group picked the wrong one)
  // without needing that group's device.
  async function releaseClaimedCase(caseId: string, claimGroupName: string) {
    if (!supabase) return;

    await supabaseReleaseCase(caseId, claimGroupName);
    const { data } = await getClaimedCases();
    if (data) applyClaimed(data);
  }

  function refreshStudentEvidence() {
    if (selectedCase) {
      setStudentEvidence(getStudentEvidence(selectedCase.id));
    }
  }

  async function submitVerdict(draft: SubmissionDraft) {
    // Reuse the original id/createdAt when editing so the save overwrites the
    // existing row in place, instead of deleting it up front (which would lose
    // the verdict for good if the group abandoned the edit before resubmitting).
    const submission = editingDraft
      ? { ...draft, id: editingDraft.id, createdAt: editingDraft.createdAt }
      : createSubmission(draft);

    if (supabase) {
      await supabaseSaveSubmission(submission, groupName);
      // It will auto-update via subscription, but let's update local immediately
      const { data } = await supabaseGetSubmissions();
      if (data) applySubmissions(data);
    } else {
      saveLocalSubmission(submission);
      setSubmissions(getLocalSubmissions());
    }

    setEditingDraft(null);
    setView("board");
  }

  function editSubmission(submissionId: string) {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return;

    // Pre-populate form state. The existing submission is left untouched until
    // the group actually resubmits, so navigating away mid-edit doesn't lose it.
    setEditingDraft(sub);
    setSuccessLens(sub.successLens || "");
    setSuccessNote(sub.successNote || "");
    setStudentEvidence(getStudentEvidence(sub.caseId));

    // Be sure we have the case selected
    const c = caseStudies.find(c => c.id === sub.caseId);
    if (c) setSelectedCase(c);

    setView("verdict");
  }

  // Teacher override: remove a single group's verdict from the board without
  // touching anyone else's claims or submissions.
  async function removeSubmission(submissionId: string) {
    if (supabase) {
      await supabaseDeleteSubmission(submissionId);
      const { data } = await supabaseGetSubmissions();
      applySubmissions(data ?? []);
    } else {
      deleteLocalSubmission(submissionId);
      setSubmissions(getLocalSubmissions());
    }
  }

  async function endSession() {
    clearSubmissions();
    setSubmissions([]);
    
    if (supabase) {
      await supabaseReleaseAllClaims();
      await supabaseDeleteAllSubmissions();
      
      const { data: claimData } = await getClaimedCases();
      applyClaimed(claimData ?? []);
      
      const { data: subData } = await supabaseGetSubmissions();
      applySubmissions(subData ?? []);
    }
  }

  return {
    groupName,
    claimedCases,
    studentEvidence,
    canBuildVerdict,
    cases: caseStudies,
    selectedCase,
    submissions,
    view,
    editingDraft,

    successLens,
    successNote,

    actions: {
      handleLogin,
      refreshStudentEvidence,
      endSession,
      editSubmission,
      removeSubmission,
      refreshCases,
      selectCase,
      releaseCurrentCase,
      releaseClaimedCase,
      setView,
      showBoard,
      startCaseSelection,
      submitVerdict,

      setSuccessLens,
      setSuccessNote,
    },
  };
}
