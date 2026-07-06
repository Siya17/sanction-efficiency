import { CaseInvestigation } from "./components/CaseInvestigation";
import { CaseSelection } from "./components/CaseSelection";
import { ClassBoard } from "./components/ClassBoard";
import { ComparativeMode } from "./components/ComparativeMode";
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
      return <Home onBoard={actions.showBoard} onStart={actions.startCaseSelection} />;
    }

    if (lab.view === "selection") {
      return <CaseSelection cases={lab.cases} claimedCases={lab.claimedCases} groupName={lab.groupName} onSelectCase={actions.selectCase} />;
    }

    if (lab.view === "investigation" && lab.selectedCase) {
      return (
        <CaseInvestigation
          activityMode={lab.activityMode}
          canContinue={lab.canBuildVerdict}
          caseStudy={lab.selectedCase}
          
          evaluationQuestion={lab.evaluationQuestion}
          successGoal={lab.successGoal}
          actorOrGroup={lab.actorOrGroup}
          timePeriod={lab.timePeriod}
          studentIndicators={lab.studentIndicators}
          selectedEvidence={lab.selectedEvidence}
          dataNeeds={lab.dataNeeds}
          studentEvidenceCards={lab.studentEvidence}
          
          onEvaluationQuestionChange={actions.setEvaluationQuestion}
          onSuccessGoalChange={actions.setSuccessGoal}
          onActorOrGroupChange={actions.setActorOrGroup}
          onTimePeriodChange={actions.setTimePeriod}
          onIndicatorChange={(indicator) => {
            const next = [...lab.studentIndicators];
            const idx = next.findIndex(i => i.type === indicator.type);
            if (idx >= 0) next[idx] = indicator;
            else next.push(indicator);
            actions.setStudentIndicators(next);
          }}
          onUpdateSelection={actions.updateSelectedEvidence}
          onRemoveSelection={actions.removeSelectedEvidence}
          onDataNeedsChange={actions.setDataNeeds}
          
          onAddStudentEvidence={(card) => {
            import("./utils/studentEvidenceStorage").then((m) => {
              m.addStudentEvidence(card);
              actions.refreshStudentEvidence();
            });
          }}
          onDeleteStudentEvidence={(cardId) => {
            import("./utils/studentEvidenceStorage").then((m) => {
              m.deleteStudentEvidence(cardId);
              actions.removeSelectedEvidence(cardId);
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
          activityMode={lab.activityMode}
          caseStudy={lab.selectedCase}
          
          evaluationQuestion={lab.evaluationQuestion}
          studentIndicators={lab.studentIndicators}
          selectedEvidence={lab.selectedEvidence}
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
            activityMode={lab.activityMode} 
            onSetActivityMode={actions.setActivityMode} 
          />
          <ProgressSteps currentView={lab.view as AppView} />
        </>
      )}
      {renderView()}
    </div>
  );
}
