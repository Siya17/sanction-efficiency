import { useState } from "react";
import type { EvidenceCard, StudentEvidenceCard, StudentEvidenceSelection, StudentIndicator, StudentEvidenceFinding } from "../types";
import { EvidenceCard as EvidenceCardComponent } from "./EvidenceCard";

type EvidenceSelectorProps = {
  cards: (EvidenceCard | Omit<StudentEvidenceCard, "sortCategory">)[];
  selectedEvidence: StudentEvidenceSelection[];
  studentIndicators: StudentIndicator[];
  onUpdateSelection: (selection: StudentEvidenceSelection) => void;
  onRemoveSelection: (cardId: string) => void;
  onDeleteStudentEvidence: (cardId: string) => void;
};

export function EvidenceSelector({
  cards,
  selectedEvidence,
  studentIndicators,
  onUpdateSelection,
  onRemoveSelection,
  onDeleteStudentEvidence
}: EvidenceSelectorProps) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold mb-2">Choose relevant evidence</h2>
      <p className="text-gray-600 text-sm mb-6">
        You do not need to use every card. Choose the 3–5 evidence cards that best help answer your question. 
        For each selected card, link it to one of your indicators (if applicable) and explain what the data shows.
      </p>

      <div className="space-y-6">
        {cards.map((card) => {
          const selection = selectedEvidence.find((s) => s.cardId === card.id);
          const isSelected = !!selection;
          const isExpanded = expandedCards[card.id] || isSelected;

          return (
            <div 
              key={card.id} 
              className={`border rounded-lg transition-colors ${
                isSelected ? "border-indigo-500 bg-indigo-50/30" : "border-gray-200"
              }`}
            >
              <div className="p-4 flex gap-4">
                <div className="pt-1">
                  <input 
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer text-indigo-600"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onUpdateSelection({
                          cardId: card.id,
                          finding: "supports_success",
                          indicatorId: studentIndicators.length > 0 ? studentIndicators[0].id : undefined
                        });
                        setExpandedCards({ ...expandedCards, [card.id]: true });
                      } else {
                        onRemoveSelection(card.id);
                      }
                    }}
                  />
                </div>
                
                <div className="flex-1">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setExpandedCards({ ...expandedCards, [card.id]: !isExpanded })}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900">{card.title}</h3>
                      <span className="text-sm text-gray-500">{isExpanded ? "▲" : "▼"}</span>
                    </div>
                    {(!isExpanded && !isSelected) && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {('text' in card) ? card.text : card.summary}
                      </p>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <EvidenceCardComponent
                        card={card as EvidenceCard}
                        onDelete={
                          'isStudentAdded' in card && card.isStudentAdded
                            ? () => onDeleteStudentEvidence(card.id)
                            : undefined
                        }
                      />

                      {isSelected && selection && (
                        <div className="mt-4 p-4 bg-white border border-indigo-200 rounded-md">
                          <h4 className="font-semibold text-indigo-900 mb-3">How does this evidence help your evaluation?</h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Which indicator does this answer? (Optional)</label>
                              <select 
                                value={selection.indicatorId || "none"}
                                onChange={(e) => onUpdateSelection({ 
                                  ...selection, 
                                  indicatorId: e.target.value === "none" ? undefined : e.target.value 
                                })}
                                className="w-full p-2 border rounded-md bg-white text-sm"
                              >
                                <option value="none">General Context (No specific indicator)</option>
                                {studentIndicators.map(ind => (
                                  <option key={ind.id} value={ind.id}>
                                    Indicator: {ind.name || "(Unnamed)"}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">What does this evidence show? *</label>
                              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                <label className={`border p-3 rounded-lg flex items-start gap-2 cursor-pointer transition-colors ${selection.finding === 'supports_success' ? 'bg-green-50 border-green-500' : 'hover:bg-gray-50'}`}>
                                  <input type="radio" name={`finding-${card.id}`} value="supports_success" checked={selection.finding === 'supports_success'} onChange={() => onUpdateSelection({ ...selection, finding: 'supports_success' })} className="mt-1" />
                                  <span className="text-sm font-medium">Relevant: Shows success/policy worked</span>
                                </label>
                                
                                <label className={`border p-3 rounded-lg flex items-start gap-2 cursor-pointer transition-colors ${selection.finding === 'shows_failure' ? 'bg-red-50 border-red-500' : 'hover:bg-gray-50'}`}>
                                  <input type="radio" name={`finding-${card.id}`} value="shows_failure" checked={selection.finding === 'shows_failure'} onChange={() => onUpdateSelection({ ...selection, finding: 'shows_failure' })} className="mt-1" />
                                  <span className="text-sm font-medium">Relevant: Shows failure/harm</span>
                                </label>

                                <label className={`border p-3 rounded-lg flex items-start gap-2 cursor-pointer transition-colors ${selection.finding === 'complicates' ? 'bg-yellow-50 border-yellow-500' : 'hover:bg-gray-50'}`}>
                                  <input type="radio" name={`finding-${card.id}`} value="complicates" checked={selection.finding === 'complicates'} onChange={() => onUpdateSelection({ ...selection, finding: 'complicates' })} className="mt-1" />
                                  <span className="text-sm font-medium">Relevant: Complicates/Mixed</span>
                                </label>

                                <label className={`border p-3 rounded-lg flex items-start gap-2 cursor-pointer transition-colors ${selection.finding === 'irrelevant' ? 'bg-gray-100 border-gray-400' : 'hover:bg-gray-50'}`}>
                                  <input type="radio" name={`finding-${card.id}`} value="irrelevant" checked={selection.finding === 'irrelevant'} onChange={() => onUpdateSelection({ ...selection, finding: 'irrelevant' })} className="mt-1" />
                                  <span className="text-sm font-medium">Irrelevant / Just Context</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
