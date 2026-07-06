import { useState } from "react";
import type { IndicatorSuggestion, StudentIndicator, StudentIndicatorType } from "../types";
import { indicatorSuggestions } from "../data/indicatorSuggestions";
import { InlineHelp } from "./InlineHelp";

type IndicatorBuilderProps = {
  track: "sanctions" | "aid";
  caseId: string;
  studentIndicators: StudentIndicator[];
  onIndicatorChange: (indicator: StudentIndicator) => void;
};

const indicatorTypes: { type: StudentIndicatorType; title: string; prompt: string }[] = [
  { type: "success", title: "1. Success Indicator", prompt: "What would show that the policy worked?" },
  { type: "harm_or_cost", title: "2. Harm/Cost Indicator", prompt: "What would show that the policy caused serious costs or harm?" },
  { type: "uncertainty_or_alternative", title: "3. Uncertainty Indicator", prompt: "What would you still need to know, or what else might explain the outcome?" }
];

export function IndicatorBuilder({ track, caseId, studentIndicators, onIndicatorChange }: IndicatorBuilderProps) {
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold mb-2">Build your indicators</h2>
      <p className="text-gray-600 text-sm mb-6">
        How will you measure success, harm, and uncertainty? These are possible indicators. You can use one, change it, or create your own.
      </p>

      <div className="space-y-8">
        {indicatorTypes.map((config) => {
          const suggestions = indicatorSuggestions.filter(s => s.track === track && s.type === config.type);
          const currentVal = studentIndicators.find(i => i.type === config.type) || {
            id: `ind-${config.type}-${Date.now()}`,
            caseId,
            type: config.type,
            name: "",
            measures: "",
            whyItMatters: "",
            direction: "",
            limitation: ""
          };

          return (
            <div key={config.type} className="border p-4 rounded-md bg-gray-50">
              <h3 className="font-bold text-gray-800">{config.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{config.prompt}</p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select a suggestion (or write your own below)</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => {
                    const selected = suggestions.find(s => s.id === e.target.value);
                    if (selected) {
                      onIndicatorChange({
                        ...currentVal,
                        name: selected.label,
                        measures: selected.measures,
                        whyItMatters: selected.whyItMatters,
                        limitation: selected.limitation
                      });
                    }
                  }}
                  value={suggestions.find(s => s.label === currentVal.name)?.id || ""}
                >
                  <option value="">-- Choose a suggestion or write your own --</option>
                  {suggestions.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 bg-white p-4 border rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Indicator Name *</label>
                  <input 
                    type="text" 
                    required
                    value={currentVal.name}
                    onChange={(e) => onIndicatorChange({ ...currentVal, name: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g., Behavior change"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What it measures *</label>
                  <textarea 
                    required
                    value={currentVal.measures}
                    onChange={(e) => onIndicatorChange({ ...currentVal, measures: e.target.value })}
                    className="w-full p-2 border rounded-md h-16"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Why it matters *</label>
                  <textarea 
                    required
                    value={currentVal.whyItMatters}
                    onChange={(e) => onIndicatorChange({ ...currentVal, whyItMatters: e.target.value })}
                    className="w-full p-2 border rounded-md h-16"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What this indicator cannot prove (Limitations) *</label>
                  <textarea 
                    required
                    value={currentVal.limitation}
                    onChange={(e) => onIndicatorChange({ ...currentVal, limitation: e.target.value })}
                    className="w-full p-2 border rounded-md h-16"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
