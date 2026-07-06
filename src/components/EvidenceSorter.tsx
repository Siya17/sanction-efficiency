import { evidenceSortCategories } from "../constants/workflow";
import type { EvidenceCard as EvidenceCardType, EvidenceSortCategory } from "../types";
import { categoryLabels } from "../utils/labels";
import { EvidenceCard } from "./EvidenceCard";
import { InlineHelp } from "./InlineHelp";

type EvidenceSorterProps = {
  cards: EvidenceCardType[];
  assignments: Record<string, EvidenceSortCategory>;
  onAssign: (cardId: string, category: EvidenceSortCategory) => void;
  onDeleteStudentEvidence?: (cardId: string) => void;
};


export function EvidenceSorter({ cards, assignments, onAssign, onDeleteStudentEvidence }: EvidenceSorterProps) {
  return (
    <section className="evidence-sorter">
      <div className="sort-summary" aria-label="Evidence sorting summary">
        {evidenceSortCategories.map((category) => {
          const count = Object.values(assignments).filter((value) => value === category).length;

          const explanations: Record<string, string> = {
            supports_success: "Evidence that the policy achieved its goal or had positive effects.",
            supports_failure: "Evidence that the policy failed its goal or caused harm.",
            complicates: "Evidence that makes it hard to give a simple yes or no answer.",
          };

          return (
            <div className="summary-box" key={category}>
              <span>{count}</span>
              <strong>
                {categoryLabels[category]}
                <InlineHelp term={categoryLabels[category]}>
                  {explanations[category]}
                </InlineHelp>
              </strong>
            </div>
          );
        })}
      </div>

      <div className="evidence-grid">
        {cards.map((card) => (
          <EvidenceCard
            card={card}
            category={assignments[card.id] ?? "unassigned"}
            key={card.id}
            onAssign={(category) => onAssign(card.id, category)}
            onDelete={card.isStudentAdded && onDeleteStudentEvidence ? () => onDeleteStudentEvidence(card.id) : undefined}
          />
        ))}
      </div>
    </section>
  );
}
