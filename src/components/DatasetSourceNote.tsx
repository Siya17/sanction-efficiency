import React from "react";
import type { DatasetSeries } from "../types";

interface DatasetSourceNoteProps {
  series: DatasetSeries;
}

export const DatasetSourceNote: React.FC<DatasetSourceNoteProps> = ({ series }) => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4">
      <div className="flex items-start">
        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-amber-800">Source Note & Caveat</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p className="mb-2"><strong>Caveat:</strong> {series.caveat}</p>
            {series.sourceId && (
              <p className="text-xs text-amber-600 mt-2">
                Source ID: {series.sourceId} 
                <span className="block mt-1 italic">
                  Note: Curated extract — not live data. This indicator can inform your judgment, but it does not prove causation.
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
