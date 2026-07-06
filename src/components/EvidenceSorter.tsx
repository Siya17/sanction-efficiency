import { evidenceSortCategories } from "../constants/workflow";
import type { EvidenceCard as EvidenceCardType, EvidenceSortCategory } from "../types";
import { categoryLabels } from "../utils/labels";
import { EvidenceCard } from "./EvidenceCard";

type EvidenceSorterProps = {
  cards: EvidenceCardType[];
  assignments: Record<string, EvidenceSortCategory>;
  onAssign: (cardId: string, category: EvidenceSortCategory) => void;
};


export function EvidenceSorter({ cards, assignments, onAssign }: EvidenceSorterProps) {
  return (
    <section className="evidence-sorter">
      <div className="sort-summary" aria-label="Evidence sorting summary">
        {evidenceSortCategories.map((category) => {
          const count = Object.values(assignments).filter((value) => value === category).length;

          return (
            <div className="summary-box" key={category}>
              <span>{count}</span>
              <strong>{categoryLabels[category]}</strong>
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
          />
        ))}
      </div>
    </section>
  );
}
