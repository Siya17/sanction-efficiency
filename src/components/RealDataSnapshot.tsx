import React, { useEffect, useState } from "react";
import type { CaseDatasetSnapshot } from "../types";
import { loadDatasetSnapshot } from "../utils/datasetLoader";
import { DatasetChart } from "./DatasetChart";
import { DatasetSourceNote } from "./DatasetSourceNote";

interface RealDataSnapshotProps {
  caseId: string;
}

export const RealDataSnapshot: React.FC<RealDataSnapshotProps> = ({ caseId }) => {
  const [snapshot, setSnapshot] = useState<CaseDatasetSnapshot | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    
    loadDatasetSnapshot(caseId)
      .then(data => {
        if (mounted) {
          setSnapshot(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Error fetching dataset snapshot:", err);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [caseId]);

  if (loading) {
    return <div className="p-4 text-gray-500 animate-pulse">Loading dataset snapshot...</div>;
  }

  if (!snapshot) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-md text-center text-gray-600">
        <p>No cleaned dataset has been added for this case yet.</p>
        <p className="mt-2 text-sm">You can still complete the activity using the evidence cards.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 mb-8 border-t pt-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{snapshot.title}</h3>
        <p className="text-gray-700">{snapshot.description}</p>
      </div>

      <div className="space-y-8">
        {snapshot.series.map((series) => (
          <div key={series.id} className="bg-white">
            <DatasetChart series={series} />
            <DatasetSourceNote series={series} />
            
            <div className="mt-4 p-4 bg-indigo-50 rounded-md border border-indigo-100">
              <h4 className="text-sm font-semibold text-indigo-900 mb-2">Reflection Prompts:</h4>
              <ul className="list-disc list-inside text-sm text-indigo-800 space-y-1">
                <li>Does this indicator measure your chosen success criterion?</li>
                <li>What does this data fail to show?</li>
                <li>What other data would you need?</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
