import { CaseSelection } from "./components/CaseSelection";
import { ClassBoard } from "./components/ClassBoard";
import { ComparativeMode } from "./components/ComparativeMode";
import { GuidedInvestigation } from "./components/GuidedInvestigation";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ProgressSteps } from "./components/ProgressSteps";
import { TeacherMode } from "./components/TeacherMode";
import { VerdictBuilder } from "./components/VerdictBuilder";
import { useEvidenceLab } from "./hooks/useEvidenceLab";
import type { AppView } from "./types";

import { Login } from "./components/Login";

export default function App() {
  const lab = useEvidenceLab();
  const { actions } = lab;

  function renderView() {
    if (lab.view === "login") {
      return <Login onLogin={actions.handleLogin} />;
    }

    if (lab.view === "home") {
      return <Home cases={lab.cases} onBoard={actions.showBoard} onStart={actions.startCaseSelection} />;
    }

    if (lab.view === "selection") {
      return <CaseSelection cases={lab.cases} claimedCases={lab.claimedCases} groupName={lab.groupName} onSelectCase={actions.selectCase} />;
    }

    if (lab.view === "investigation" && lab.selectedCase) {
      return (
        <GuidedInvestigation
          caseStudy={lab.selectedCase}
          successLens={lab.successLens}
          successNote={lab.successNote}
          onSuccessLensChange={actions.setSuccessLens}
          onSuccessNoteChange={actions.setSuccessNote}
          studentEvidenceCards={lab.studentEvidence}
          canContinue={lab.canBuildVerdict}
          onAddStudentEvidence={(card) => {
            import("./utils/studentEvidenceStorage").then((m) => {
              m.addStudentEvidence(card);
              actions.refreshStudentEvidence();
            });
          }}
          onDeleteStudentEvidence={(cardId) => {
            import("./utils/studentEvidenceStorage").then((m) => {
              m.deleteStudentEvidence(cardId);
              actions.refreshStudentEvidence();
            });
          }}
          onContinue={() => actions.setView("verdict")}
        />
      );
    }

    if (lab.view === "verdict" && lab.selectedCase) {
      return (
        <VerdictBuilder
          caseStudy={lab.selectedCase}
          successLens={lab.successLens}
          successNote={lab.successNote}
          studentEvidenceCards={lab.studentEvidence}
          onBack={() => actions.setView("investigation")}
          onSubmit={actions.submitVerdict}
        />
      );
    }

    if (lab.view === "teacher") {
      return (
        <TeacherMode
          cases={lab.cases}
          onCasesChanged={actions.refreshCases}
          onChooseCase={actions.startCaseSelection}
        />
      );
    }
    if (lab.view === "compare") {
      return (
        <ComparativeMode
          submissions={lab.submissions}
          onBackToBoard={() => actions.setView("board")}
          onChooseCase={actions.startCaseSelection}
        />
      );
    }

    return (
      <ClassBoard
        submissions={lab.submissions}
        onChooseCase={actions.startCaseSelection}
        onClear={actions.clearBoard}
        onCompare={() => actions.setView("compare")}
      />
    );
  }

  return (
    <div className="app-shell">
      {lab.view !== "login" && (
        <>
          <Header
            boardCount={lab.submissions.length}
            currentView={lab.view as AppView}
            onNavigate={(view) => {
              if (lab.selectedCase && view !== "investigation" && view !== "verdict") {
                actions.releaseCurrentCase(view);
              } else {
                actions.setView(view);
              }
            }}
          />
          <ProgressSteps currentView={lab.view as AppView} />
        </>
      )}
      {renderView()}
    </div>
  );
}
