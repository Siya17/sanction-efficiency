import { useEffect, useState } from "react";
import { CaseInvestigation } from "./components/CaseInvestigation";
import { CaseSelection } from "./components/CaseSelection";
import { ClassBoard } from "./components/ClassBoard";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { VerdictBuilder } from "./components/VerdictBuilder";
import { cases } from "./data/cases";
import type { CaseStudy, EvidenceSortCategory, StudentSubmission } from "./types";
import { clearSubmissions, getSubmissions, saveSubmission } from "./utils/localStorage";

export type View = "home" | "selection" | "investigation" | "verdict" | "board";

function createAssignments(caseStudy: CaseStudy | null): Record<string, EvidenceSortCategory> {
  if (!caseStudy) {
    return {};
  }

  return Object.fromEntries(
    caseStudy.evidenceCards.map((card) => [card.id, "unassigned" as EvidenceSortCategory]),
  );
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [successCriterion, setSuccessCriterion] = useState("");
  const [assignments, setAssignments] = useState<Record<string, EvidenceSortCategory>>({});
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  function handleSelectCase(caseStudy: CaseStudy) {
    setSelectedCase(caseStudy);
    setSuccessCriterion("");
    setAssignments(createAssignments(caseStudy));
    setView("investigation");
  }

  function handleAssignEvidence(cardId: string, category: EvidenceSortCategory) {
    setAssignments((current) => ({ ...current, [cardId]: category }));
  }

  function handleSubmit(submission: StudentSubmission) {
    saveSubmission(submission);
    setSubmissions(getSubmissions());
    setView("board");
  }

  function handleClearBoard() {
    clearSubmissions();
    setSubmissions([]);
  }

  function renderView() {
    if (view === "home") {
      return <Home onBoard={() => setView("board")} onStart={() => setView("selection")} />;
    }

    if (view === "selection") {
      return <CaseSelection cases={cases} onSelectCase={handleSelectCase} />;
    }

    if (view === "investigation" && selectedCase) {
      return (
        <CaseInvestigation
          assignments={assignments}
          caseStudy={selectedCase}
          successCriterion={successCriterion}
          onAssignEvidence={handleAssignEvidence}
          onContinue={() => setView("verdict")}
          onCriterionChange={setSuccessCriterion}
        />
      );
    }

    if (view === "verdict" && selectedCase) {
      return (
        <VerdictBuilder
          assignments={assignments}
          caseStudy={selectedCase}
          successCriterion={successCriterion}
          onBack={() => setView("investigation")}
          onSubmit={handleSubmit}
        />
      );
    }

    return (
      <ClassBoard
        submissions={submissions}
        onChooseCase={() => setView("selection")}
        onClear={handleClearBoard}
      />
    );
  }

  return (
    <div className="app-shell">
      <Header boardCount={submissions.length} currentView={view} onNavigate={setView} />
      {renderView()}
    </div>
  );
}
