import { useState } from "react";
import { getTimelineForCase } from "../data/timelines";
import type { ActivityMode, CaseStudy, StudentEvidenceCard, StudentEvidenceSelection, StudentIndicator } from "../types";
import { CaseTimeline } from "./CaseTimeline";
import { TeacherNotes } from "./TeacherNotes";
import { RealDataSnapshot } from "./RealDataSnapshot";
import { StudentEvidenceForm } from "./StudentEvidenceForm";
import { EvaluationQuestionBuilder } from "./EvaluationQuestionBuilder";
import { IndicatorBuilder } from "./IndicatorBuilder";
import { EvidenceSelector } from "./EvidenceSelector";

type CaseInvestigationProps = {
  activityMode: ActivityMode;
  caseStudy: CaseStudy;
  canContinue: boolean;
  
  evaluationQuestion: string;
  successGoal: string;
  actorOrGroup: string;
  timePeriod: string;
  studentIndicators: StudentIndicator[];
  selectedEvidence: StudentEvidenceSelection[];
  dataNeeds: string[];
  studentEvidenceCards: StudentEvidenceCard[];
  
  onEvaluationQuestionChange: (val: string) => void;
  onSuccessGoalChange: (val: string) => void;
  onActorOrGroupChange: (val: string) => void;
  onTimePeriodChange: (val: string) => void;
  onIndicatorChange: (indicator: StudentIndicator) => void;
  onUpdateSelection: (selection: StudentEvidenceSelection) => void;
  onRemoveSelection: (cardId: string) => void;
  onDataNeedsChange: (needs: string[]) => void;
  
  onAddStudentEvidence: (card: StudentEvidenceCard) => void;
  onDeleteStudentEvidence: (cardId: string) => void;
  onContinue: () => void;
};

export function CaseInvestigation({
  activityMode,
  caseStudy,
  canContinue,
  evaluationQuestion,
  successGoal,
  actorOrGroup,
  timePeriod,
  studentIndicators,
  selectedEvidence,
  dataNeeds,
  studentEvidenceCards,
  onEvaluationQuestionChange,
  onSuccessGoalChange,
  onActorOrGroupChange,
  onTimePeriodChange,
  onIndicatorChange,
  onUpdateSelection,
  onRemoveSelection,
  onDataNeedsChange,
  onAddStudentEvidence,
  onDeleteStudentEvidence,
  onContinue,
}: CaseInvestigationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const timelineEvents = getTimelineForCase(caseStudy.id);
  const isResearch = activityMode === "research";
  
  const allCards = [
    ...caseStudy.evidenceCards,
    ...studentEvidenceCards
  ];

  return (
    <main className="page max-w-4xl mx-auto py-8">
      
      {/* Progress Header */}
      <div className="mb-8 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex space-x-2 text-sm font-medium">
          <span className={currentStep === 1 ? "text-indigo-600 font-bold" : "text-gray-500"}>1. Background</span>
          <span className="text-gray-300">→</span>
          <span className={currentStep === 2 ? "text-indigo-600 font-bold" : "text-gray-500"}>2. Question</span>
          <span className="text-gray-300">→</span>
          <span className={currentStep === 3 ? "text-indigo-600 font-bold" : "text-gray-500"}>3. Indicators</span>
          <span className="text-gray-300">→</span>
          <span className={currentStep === 4 ? "text-indigo-600 font-bold" : "text-gray-500"}>4. Evidence</span>
        </div>
      </div>

      {currentStep === 1 && (
        <section className="bg-white p-8 rounded-lg shadow-sm border animation-fade-in">
          <p className="eyebrow">Step 1</p>
          <h1 className="text-3xl font-bold mb-4">Understand the case</h1>
          <p className="text-lg text-gray-700 mb-8">Read the background carefully before designing your evaluation.</p>
          
          <div className="space-y-6 text-gray-800 bg-gray-50 p-6 rounded-lg border">
            <div>
              <strong className="block text-gray-900 text-lg mb-1">What was happening?</strong>
              <p>{caseStudy.summary.whatWasHappening}</p>
            </div>
            <div>
              <strong className="block text-gray-900 text-lg mb-1">What policy was used?</strong>
              <p>{caseStudy.summary.policyUsed}</p>
            </div>
            <div>
              <strong className="block text-gray-900 text-lg mb-1">What was the policy supposed to do?</strong>
              <p>{caseStudy.summary.policyGoal}</p>
            </div>
            <div>
              <strong className="block text-gray-900 text-lg mb-1">Why is it hard to judge?</strong>
              <p>{caseStudy.summary.whyHardToJudge}</p>
            </div>
          </div>

          <div className="mt-8 bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-3">Academic Framework Guidance</h3>
            {caseStudy.summary.tailoredGuidance && caseStudy.summary.tailoredGuidance.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-indigo-800">
                {caseStudy.summary.tailoredGuidance.map((guide, idx) => (
                  <li key={idx}>{guide}</li>
                ))}
              </ul>
            ) : (
              <p className="text-indigo-800">
                {caseStudy.track === "sanctions" 
                  ? "Think about Coercion (did they change course?), Constraint (was their capacity degraded?), and Signaling (was a message sent?)."
                  : "Think about Outcomes (did things improve?), Attribution (was aid the cause?), and Local Ownership (did it build capacity?)."
                }
              </p>
            )}
          </div>

          <TeacherNotes note={caseStudy.teacherNote} />

          <div className="mt-8 flex justify-end">
            <button 
              className="primary-button text-lg px-8 py-3" 
              onClick={() => setCurrentStep(2)}
            >
              Next: Build your Question
            </button>
          </div>
        </section>
      )}

      {currentStep === 2 && (
        <section className="animation-fade-in">
          <p className="eyebrow mb-2">Step 2</p>
          <EvaluationQuestionBuilder 
            policy={caseStudy.policy}
            successGoal={successGoal}
            actorOrGroup={actorOrGroup}
            timePeriod={timePeriod}
            onSuccessGoalChange={onSuccessGoalChange}
            onActorOrGroupChange={onActorOrGroupChange}
            onTimePeriodChange={onTimePeriodChange}
            onEvaluationQuestionChange={onEvaluationQuestionChange}
          />

          <div className="mt-8 flex justify-between bg-white p-4 rounded-lg shadow-sm border">
            <button className="secondary-button" onClick={() => setCurrentStep(1)}>Back</button>
            <button 
              className="primary-button" 
              onClick={() => setCurrentStep(3)}
              disabled={evaluationQuestion.trim().length === 0}
            >
              Next: Choose Indicators
            </button>
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section className="animation-fade-in">
          <p className="eyebrow mb-2">Step 3</p>
          <IndicatorBuilder 
            track={caseStudy.track}
            caseId={caseStudy.id}
            studentIndicators={studentIndicators}
            onIndicatorChange={onIndicatorChange}
          />

          <div className="mt-8 flex justify-between bg-white p-4 rounded-lg shadow-sm border">
            <button className="secondary-button" onClick={() => setCurrentStep(2)}>Back</button>
            <button 
              className="primary-button" 
              onClick={() => setCurrentStep(4)}
              disabled={studentIndicators.length === 0}
            >
              Next: Select Evidence
            </button>
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section className="animation-fade-in">
          <div className="mb-4">
            <p className="eyebrow mb-2">Step 4</p>
            <h2 className="text-2xl font-bold">Select relevant evidence</h2>
            <p className="text-gray-600 mt-1">You have selected {selectedEvidence.length} cards. (Minimum 3 required).</p>
          </div>

          {isResearch && (
            <div className="mb-8">
              <StudentEvidenceForm caseId={caseStudy.id} onAddEvidence={onAddStudentEvidence} />
            </div>
          )}

          <EvidenceSelector 
            cards={allCards}
            selectedEvidence={selectedEvidence}
            studentIndicators={studentIndicators}
            onUpdateSelection={onUpdateSelection}
            onRemoveSelection={onRemoveSelection}
            onDeleteStudentEvidence={onDeleteStudentEvidence}
          />

          <details className="mt-8 bg-white rounded-lg shadow-sm p-6 border">
            <summary className="text-xl font-semibold mb-2 cursor-pointer outline-none">Optional: Data check & Timeline</summary>
            <div className="mt-4">
              <CaseTimeline events={timelineEvents} />
              <div className="mt-8">
                <RealDataSnapshot caseId={caseStudy.id} />
              </div>
            </div>
          </details>

          <div className="mt-8 flex justify-between items-center bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <button className="secondary-button" onClick={() => setCurrentStep(3)}>Back</button>
            
            <div className="flex flex-col items-end">
              {!canContinue && (
                <p className="text-sm text-red-600 mb-2 font-medium">Please select at least 3 evidence cards to continue.</p>
              )}
              <button
                className="primary-button text-lg px-8 py-3"
                type="button"
                disabled={!canContinue}
                onClick={onContinue}
              >
                Proceed to Verdict
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
