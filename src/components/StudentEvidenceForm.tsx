import { useState } from "react";
import type { EvidenceReliability, EvidenceSortCategory, StudentEvidenceCard } from "../types";
import { categoryLabels } from "../utils/labels";

type Props = {
  caseId: string;
  onAddEvidence: (card: StudentEvidenceCard) => void;
};

export function StudentEvidenceForm({ caseId, onAddEvidence }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [sourceTitle, setSourceTitle] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [authorOrOrganization, setAuthorOrOrganization] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [quoteOrDataPoint, setQuoteOrDataPoint] = useState("");
  const [reliability, setReliability] = useState<EvidenceReliability>("uncertain");
  const [sortCategory, setSortCategory] = useState<EvidenceSortCategory>("unassigned");
  const [explanation, setExplanation] = useState("");
  const [limitation, setLimitation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !summary || !sourceTitle || !explanation || !limitation) {
      alert("Please fill in all required fields.");
      return;
    }

    const newCard: StudentEvidenceCard = {
      id: `student-evidence-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      caseId,
      title,
      summary,
      sourceTitle,
      sourceUrl,
      authorOrOrganization,
      publicationYear,
      quoteOrDataPoint,
      reliability,
      sortCategory,
      explanation,
      limitation,
      notes,
      createdAt: new Date().toISOString(),
    };

    onAddEvidence(newCard);

    // Reset form
    setTitle("");
    setSummary("");
    setSourceTitle("");
    setSourceUrl("");
    setAuthorOrOrganization("");
    setPublicationYear("");
    setQuoteOrDataPoint("");
    setReliability("uncertain");
    setSortCategory("unassigned");
    setExplanation("");
    setLimitation("");
    setNotes("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
      >
        + Add your own evidence
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Add your own evidence</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Find one additional piece of evidence that helps judge whether this policy worked. Summarize it, cite it, and explain what it can and cannot show.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 border-b pb-2">The Evidence</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Evidence title *</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g., Rise in child mortality 1995-1998" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Evidence summary *</label>
            <textarea required value={summary} onChange={e => setSummary(e.target.value)} className="w-full p-2 border rounded-md h-24" placeholder="Briefly summarize what this evidence says..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short quote or data point (Optional)</label>
            <input type="text" value={quoteOrDataPoint} onChange={e => setQuoteOrDataPoint(e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g., 'Infant mortality rose by 25%'" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 border-b pb-2">The Source</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source title *</label>
            <input required type="text" value={sourceTitle} onChange={e => setSourceTitle(e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g., UNICEF Annual Report" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author / Organization (Optional)</label>
              <input type="text" value={authorOrOrganization} onChange={e => setAuthorOrOrganization(e.target.value)} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publication Year (Optional)</label>
              <input type="text" value={publicationYear} onChange={e => setPublicationYear(e.target.value)} className="w-full p-2 border rounded-md" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source URL (Optional)</label>
            <input type="url" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} className="w-full p-2 border rounded-md" placeholder="https://" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reliability *</label>
            <select value={reliability} onChange={e => setReliability(e.target.value as EvidenceReliability)} className="w-full p-2 border rounded-md bg-white">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="uncertain">Uncertain</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 border-b pb-2">Evaluation</h4>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort category *</label>
            <select value={sortCategory} onChange={e => setSortCategory(e.target.value as EvidenceSortCategory)} className="w-full p-2 border rounded-md bg-white">
              <option value="unassigned">-- Select --</option>
              <option value="supports_worked">Supports worked</option>
              <option value="supports_failed">Supports failed</option>
              <option value="complicates_or_missing">Complicates / missing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Why did you sort it this way? *</label>
            <textarea required value={explanation} onChange={e => setExplanation(e.target.value)} className="w-full p-2 border rounded-md h-20" placeholder="Explain how this connects to your success criterion..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What can this evidence NOT prove? (Limitations) *</label>
            <textarea required value={limitation} onChange={e => setLimitation(e.target.value)} className="w-full p-2 border rounded-md h-20" placeholder="e.g., 'This shows prices went up, but not whether the leadership cared.'" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2 border rounded-md h-16" />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 shadow-sm">Save Evidence</button>
        </div>
      </form>
    </div>
  );
}
