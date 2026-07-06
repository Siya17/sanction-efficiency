import { getTimelineForCase } from "../data/timelines";
import type { ActivityMode, CaseStudy, StudentEvidenceCard, StudentEvidenceSelection, StudentIndicator } from "../types";
import { CaseTimeline } from "./CaseTimeline";
import { TeacherNotes } from "./TeacherNotes";
import { RealDataSnapshot } from "./RealDataSnapshot";
import { ResearchGuidance } from "./ResearchGuidance";
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
  const timelineEvents = getTimelineForCase(caseStudy.id);
  const isResearch = activityMode === "research";
  
  const allCards = [
    ...caseStudy.evidenceCards,
    ...studentEvidenceCards
  ];

  return (
    <main className="page">
      <div className="investigation-layout">
        <aside className="case-brief">
          <p className="eyebrow">Step 1</p>
          <h1>Understand the case</h1>
          <p className="student-instruction">Read the background carefully before designing your evaluation.</p>
          
          <div className="space-y-4 text-sm mt-4 text-gray-800">
            <div>
              <strong className="block text-gray-900">What was happening?</strong>
              <p>{caseStudy.summary.whatWasHappening}</p>
            </div>
            <div>
              <strong className="block text-gray-900">What policy was used?</strong>
              <p>{caseStudy.summary.policyUsed}</p>
            </div>
            <div>
              <strong className="block text-gray-900">What was the policy supposed to do?</strong>
              <p>{caseStudy.summary.policyGoal}</p>
            </div>
            <div>
              <strong className="block text-gray-900">Why is it hard to judge?</strong>
              <p>{caseStudy.summary.whyHardToJudge}</p>
            </div>
            <div>
              <strong className="block text-gray-900">Possible ways to judge success:</strong>
              <ul className="list-disc pl-5 mt-1">
                {caseStudy.summary.possibleSuccessAngles.map(angle => <li key={angle}>{angle}</li>)}
              </ul>
            </div>
          </div>

          <div className="source-box mt-6">
            <h2>Sources to inspect later</h2>
            <ul>
              {caseStudy.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                  {source.note ? <span>{source.note}</span> : null}
                </li>
              ))}
            </ul>
          </div>

          <TeacherNotes note={caseStudy.teacherNote} />

          <div className="mt-8 bg-indigo-50 p-4 border border-indigo-100 rounded-lg sticky bottom-4">
            <p className="text-sm text-indigo-900 mb-4">
              {canContinue 
                ? "You have built your evaluation and chosen evidence. Ready for the verdict?"
                : "Complete Steps 2-4 to continue. You need a question, 3 indicators, and at least 3 selected evidence cards."}
            </p>
            <button
              className="primary-button full-width"
              type="button"
              disabled={!canContinue}
              onClick={onContinue}
            >
              Build verdict
            </button>
          </div>
        </aside>

        <section className="evidence-column">
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

          <p className="eyebrow mb-2">Step 3</p>
          <IndicatorBuilder 
            track={caseStudy.track}
            caseId={caseStudy.id}
            studentIndicators={studentIndicators}
            onIndicatorChange={onIndicatorChange}
          />

          {isResearch && <ResearchGuidance />}

          <div className="section-heading-row mb-4">
            <div>
              <p className="eyebrow mb-2">Step 4</p>
              <h2>Select relevant evidence</h2>
              <p>You have selected {selectedEvidence.length} cards. (Minimum 3 required).</p>
            </div>
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

          <details className="mt-12 bg-white rounded-lg shadow p-6 border">
            <summary className="text-xl font-semibold mb-2 cursor-pointer outline-none">Step 5: Optional data check</summary>
            <div className="mt-4">
              <p className="text-gray-600 mb-4">
                Before finalizing your verdict, what data would you want to judge your question?
              </p>
              
              <div className="space-y-3 mb-8">
                {[0, 1, 2].map(index => (
                  <div key={index}>
                    <input 
                      type="text" 
                      placeholder={`Data need ${index + 1}...`}
                      value={dataNeeds[index] || ""}
                      onChange={(e) => {
                        const next = [...dataNeeds];
                        next[index] = e.target.value;
                        onDataNeedsChange(next);
                      }}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>

              <p className="text-gray-600 mb-6 border-t pt-6">
                Now compare your ideas with the suggested data below. Does this indicator support, weaken, or complicate your judgment?
              </p>
              <CaseTimeline events={timelineEvents} />
              <div className="mt-8">
                <RealDataSnapshot caseId={caseStudy.id} />
              </div>
            </div>
          </details>
        </section>
      </div>
    </main>
  );
}
