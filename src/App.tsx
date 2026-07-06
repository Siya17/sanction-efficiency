import { CaseInvestigation } from "./components/CaseInvestigation";
import { CaseSelection } from "./components/CaseSelection";
import { ClassBoard } from "./components/ClassBoard";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ProgressSteps } from "./components/ProgressSteps";
import { VerdictBuilder } from "./components/VerdictBuilder";
import { useEvidenceLab } from "./hooks/useEvidenceLab";

export default function App() {
  const lab = useEvidenceLab();
  const { actions } = lab;

  function renderView() {
    if (lab.view === "home") {
      return <Home onBoard={actions.showBoard} onStart={actions.startCaseSelection} />;
    }

    if (lab.view === "selection") {
      return <CaseSelection cases={lab.cases} onSelectCase={actions.selectCase} />;
    }

    if (lab.view === "investigation" && lab.selectedCase) {
      return (
        <CaseInvestigation
          assignments={lab.assignments}
          canContinue={lab.canBuildVerdict}
          caseStudy={lab.selectedCase}
          successCriterion={lab.successCriterion}
          onAssignEvidence={actions.assignEvidence}
          onContinue={() => actions.setView("verdict")}
          onCriterionChange={actions.setSuccessCriterion}
        />
      );
    }

    if (lab.view === "verdict" && lab.selectedCase) {
      return (
        <VerdictBuilder
          assignments={lab.assignments}
          caseStudy={lab.selectedCase}
          successCriterion={lab.successCriterion}
          onBack={() => actions.setView("investigation")}
          onSubmit={actions.submitVerdict}
        />
      );
    }

    return (
      <ClassBoard
        submissions={lab.submissions}
        onChooseCase={actions.startCaseSelection}
        onClear={actions.clearBoard}
      />
    );
  }

  return (
    <div className="app-shell">
      <Header boardCount={lab.submissions.length} currentView={lab.view} onNavigate={actions.setView} />
      <ProgressSteps currentView={lab.view} />
      {renderView()}
    </div>
  );
}
