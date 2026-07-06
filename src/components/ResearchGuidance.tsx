export function ResearchGuidance() {
  return (
    <div className="space-y-4 mb-8">
      <details className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 group">
        <summary className="font-semibold text-indigo-900 cursor-pointer list-none flex justify-between items-center">
          How to judge a source
          <span className="text-indigo-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="mt-4 text-sm text-indigo-800">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Who produced this source?</strong> Is it primary, academic, official, journalistic, or advocacy-based?</li>
            <li><strong>Does it provide evidence or only opinion?</strong> Look for specific data points or facts.</li>
            <li><strong>What time period does it cover?</strong> Make sure it aligns with your case study period.</li>
            <li><strong>Could it be biased or incomplete?</strong> Who funded the research? What might they be omitting?</li>
            <li><strong>Does it measure the same outcome you chose?</strong> Ensure the evidence directly relates to your success criterion.</li>
          </ul>
        </div>
      </details>

      <details className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 group">
        <summary className="font-semibold text-emerald-900 cursor-pointer list-none flex justify-between items-center">
          What evidence can and cannot prove
          <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="mt-4 text-sm text-emerald-800">
          <ul className="list-disc pl-5 space-y-2">
            <li>A <strong>GDP trend</strong> may show economic pressure, but not whether leaders changed behavior because of sanctions.</li>
            <li><strong>Aid spending</strong> may show donor effort, but not whether aid improved state capacity.</li>
            <li>A <strong>violence trend</strong> may show improvement or deterioration, but not necessarily causation.</li>
            <li><strong>Official statements</strong> may show policy goals, but not always real motives or effects.</li>
          </ul>
        </div>
      </details>
    </div>
  );
}
