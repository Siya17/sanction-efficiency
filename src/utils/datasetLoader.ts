import { datasetRegistry } from "../data/datasetRegistry";
import type { CaseDatasetSnapshot } from "../types";

export function getDatasetPathsForCase(caseId: string): string[] {
  return datasetRegistry
    .filter((entry) => entry.caseId === caseId)
    .map((entry) => entry.datasetPath);
}

export function validateDatasetSnapshot(snapshot: unknown): CaseDatasetSnapshot | null {
  if (!snapshot || typeof snapshot !== "object") return null;
  const s = snapshot as any;

  if (typeof s.id !== "string" || typeof s.caseId !== "string" || typeof s.title !== "string" || typeof s.description !== "string" || !Array.isArray(s.series)) {
    console.warn("Dataset snapshot failed basic validation", s);
    return null;
  }

  // Very basic validation for series to ensure it won't crash the app
  const validSeries = s.series.every((series: any) => {
    return (
      typeof series.id === "string" &&
      typeof series.title === "string" &&
      typeof series.description === "string" &&
      typeof series.caveat === "string" &&
      Array.isArray(series.data)
    );
  });

  if (!validSeries) {
    console.warn("Dataset series failed basic validation", s);
    return null;
  }

  return s as CaseDatasetSnapshot;
}

export async function loadDatasetSnapshot(caseId: string): Promise<CaseDatasetSnapshot | null> {
  const paths = getDatasetPathsForCase(caseId);
  if (paths.length === 0) {
    return null;
  }

  // We load the first dataset mapped to the case for simplicity
  const path = paths[0];

  // Prefix with Vite's BASE_URL so this works when deployed under a subpath.
  const url = `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch dataset from ${url}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return validateDatasetSnapshot(data);
  } catch (error) {
    console.warn(`Error loading dataset from ${url}:`, error);
    return null;
  }
}
