import type { EvidenceCard as EvidenceCardType, EvidenceSortCategory } from "../types";
import { categoryLabels, evidenceTypeLabels } from "../utils/labels";

type EvidenceCardProps = {
  card: EvidenceCardType;
  category: EvidenceSortCategory;
  onAssign: (category: EvidenceSortCategory) => void;
};

const choices: EvidenceSortCategory[] = [
  "supports_worked",
  "supports_failed",
  "complicates_or_missing",
  "unassigned",
];

export function EvidenceCard({ card, category, onAssign }: EvidenceCardProps) {
  return (
    <article className={`evidence-card ${category}`}>
      <div className="evidence-meta">
        <span>{evidenceTypeLabels[card.type]}</span>
        <strong>{categoryLabels[category]}</strong>
      </div>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      {card.sourceUrl && card.sourceTitle ? (
        <a href={card.sourceUrl} target="_blank" rel="noreferrer">
          {card.sourceTitle}
        </a>
      ) : null}
      <div className="sort-buttons" aria-label={`Sort ${card.title}`}>
        {choices.map((choice) => (
          <button
            className={category === choice ? "sort-button active" : "sort-button"}
            key={choice}
            type="button"
            onClick={() => onAssign(choice)}
          >
            {choice === "unassigned" ? "Reset" : categoryLabels[choice]}
          </button>
        ))}
      </div>
    </article>
  );
}
