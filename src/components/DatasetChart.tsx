import React from "react";
import type { DatasetSeries } from "../types";

interface DatasetChartProps {
  series: DatasetSeries;
}

export const DatasetChart: React.FC<DatasetChartProps> = ({ series }) => {
  // If there's no data, don't try to render
  if (!series.data || series.data.length === 0) {
    return <div className="text-sm italic text-gray-500">No data available.</div>;
  }

  // To build a simple CSS bar chart, find the max value to calculate widths
  const validValues = series.data.map(d => d.value).filter(v => typeof v === "number" && !isNaN(v));
  const maxVal = validValues.length > 0 ? Math.max(...validValues) : 0;
  
  // Also calculate min if we have negative values, though let's keep it simple and just do 0 to max for now.
  // Using a table structure styled nicely since recharts isn't installed.
  return (
    <div className="dataset-chart mt-4 border rounded p-4 bg-white shadow-sm">
      <h4 className="font-semibold text-gray-800">{series.title}</h4>
      <p className="text-sm text-gray-600 mb-4">{series.description}</p>
      
      {series.unit && (
        <p className="text-xs text-gray-500 mb-2 italic">Unit: {series.unit}</p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 bg-gray-50 uppercase border-b">
            <tr>
              <th scope="col" className="px-3 py-2 w-24">Year</th>
              <th scope="col" className="px-3 py-2 w-32">Value</th>
              <th scope="col" className="px-3 py-2">Trend</th>
            </tr>
          </thead>
          <tbody>
            {series.data.map((point, idx) => {
              const widthPct = maxVal > 0 ? Math.max(1, (point.value / maxVal) * 100) : 1;
              return (
                <tr key={`${point.year}-${idx}`} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{point.year}</td>
                  <td className="px-3 py-2">{point.value.toLocaleString()} {point.label ? `(${point.label})` : ""}</td>
                  <td className="px-3 py-2">
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded" 
                        style={{ width: `${widthPct}%` }}
                        title={`${point.value}`}
                      ></div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
