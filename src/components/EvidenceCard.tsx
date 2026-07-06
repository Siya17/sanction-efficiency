import { evidenceSortChoices } from "../constants/workflow";
import type { EvidenceCard as EvidenceCardType, EvidenceSortCategory } from "../types";
import { categoryLabels, evidenceTypeLabels } from "../utils/labels";

type EvidenceCardProps = {
  card: EvidenceCardType;
  category: EvidenceSortCategory;
  onAssign: (category: EvidenceSortCategory) => void;
  onDelete?: () => void;
};


export function EvidenceCard({ card, category, onAssign, onDelete }: EvidenceCardProps) {
  const isStudentAdded = card.isStudentAdded;

  return (
    <article className={`evidence-card ${category} ${isStudentAdded ? "border-2 border-indigo-400" : ""}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-wrap gap-2">
          {isStudentAdded ? (
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded font-medium">Student-added</span>
          ) : (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-medium">Curated</span>
          )}
          {!isStudentAdded && <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">{evidenceTypeLabels[card.type]}</span>}
          {isStudentAdded && card.reliability && (
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Reliability: {card.reliability}</span>
          )}
          <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-medium">{categoryLabels[category]}</span>
        </div>
        {isStudentAdded && onDelete && (
          <button onClick={onDelete} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{card.title}</h3>
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{card.text}</p>
      
      {card.whyItMatters && (
        <div className="mb-2 bg-blue-50 border border-blue-100 p-2 rounded text-xs text-blue-800">
          <strong className="block mb-1">Why it matters:</strong> {card.whyItMatters}
        </div>
      )}

      {card.limitation && (
        <div className="mb-4 bg-orange-50 border border-orange-100 p-2 rounded text-xs text-orange-800">
          <strong className="block mb-1">Limitation:</strong> {card.limitation}
        </div>
      )}

      {card.sourceUrl && card.sourceTitle ? (
        <a href={card.sourceUrl} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:underline block mb-4">
          Source: {card.sourceTitle}
        </a>
      ) : card.sourceTitle ? (
        <span className="text-sm text-gray-500 block mb-4">Source: {card.sourceTitle}</span>
      ) : null}

      <div className="sort-buttons" aria-label={`Sort ${card.title}`}>
        {evidenceSortChoices.map((choice) => (
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
