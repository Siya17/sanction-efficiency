import { useState } from "react";
import type { EvidenceCard, SelectedEvidenceUse, StudentEvidenceCard, StudentEvidenceSelection } from "../types";
import { EvidenceCard as EvidenceCardComponent } from "./EvidenceCard";

type EvidenceSelectorProps = {
  cards: (EvidenceCard | Omit<StudentEvidenceCard, "sortCategory">)[];
  selectedEvidence: StudentEvidenceSelection[];
  onUpdateSelection: (selection: StudentEvidenceSelection) => void;
  onRemoveSelection: (cardId: string) => void;
  onDeleteStudentEvidence: (cardId: string) => void;
};

export function EvidenceSelector({
  cards,
  selectedEvidence,
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
        For each selected card, explain why it is relevant.
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
                          use: "success_evidence",
                          relevanceExplanation: ""
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
                        card={card as EvidenceCard} // Type casting for the component
                        onDelete={
                          'isStudentAdded' in card && card.isStudentAdded
                            ? () => onDeleteStudentEvidence(card.id)
                            : undefined
                        }
                      />

                      {isSelected && selection && (
                        <div className="mt-4 p-4 bg-white border border-indigo-200 rounded-md">
                          <h4 className="font-semibold text-indigo-900 mb-3">How are you using this evidence?</h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Classification *</label>
                              <select 
                                required
                                value={selection.use}
                                onChange={(e) => onUpdateSelection({ ...selection, use: e.target.value as SelectedEvidenceUse })}
                                className="w-full p-2 border rounded-md bg-white"
                              >
                                <option value="success_evidence">Evidence of success</option>
                                <option value="failure_or_harm_evidence">Evidence of failure or harm</option>
                                <option value="complication">Complication or uncertainty</option>
                                <option value="not_relevant">Not relevant</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Why is this evidence relevant to your indicator or question? *
                              </label>
                              <textarea 
                                required
                                value={selection.relevanceExplanation}
                                onChange={(e) => onUpdateSelection({ ...selection, relevanceExplanation: e.target.value })}
                                className="w-full p-2 border rounded-md h-20"
                                placeholder="Explain how this connects to your success criterion or harm indicator..."
                              />
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
