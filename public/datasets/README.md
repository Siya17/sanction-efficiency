# Cleaned Local Datasets for Did It Work? Evidence Lab

This directory contains cleaned, local dataset snapshots used by the "Real Data Integration" stage of the classroom activity. 

## What are these datasets?
These are curated JSON extracts containing small data series relevant to the specific historical cases investigated in the app.

## Why not use live APIs?
This application prioritizes classroom safety and reliability. By using local datasets, we ensure:
- The app does not require internet access during class.
- The app will not break if an external API changes or goes offline.
- We do not need to manage or expose API keys.
- Students interact with a stable, predictable subset of data curated for pedagogical value.

## How to add a new dataset file
1. Identify reliable data for a case (e.g., World Bank, UN, reputable academic sources).
2. Clean and simplify the data into a small time series.
3. Save it as a `.json` file in the appropriate subfolder (`sanctions/`, `aid/`, `conflict/`, etc.).
4. Register the file path in `src/data/datasetRegistry.ts`.

## Required JSON Structure
The JSON file must conform to the `CaseDatasetSnapshot` TypeScript interface.
```json
{
  "id": "unique-dataset-id",
  "caseId": "must-match-case-id",
  "title": "Dataset Title",
  "description": "Short description of what the dataset shows.",
  "series": [
    {
      "id": "series-1",
      "caseId": "must-match-case-id",
      "sourceId": "source-1",
      "category": "economic",
      "title": "Indicator Title",
      "description": "What this indicator measures",
      "unit": "Percentage / USD / Count",
      "data": [
        { "year": 1990, "value": 100 },
        { "year": 1991, "value": 120 }
      ],
      "caveat": "Important contextual warning about this data."
    }
  ]
}
```

## Data Sourcing and Placeholders
**WARNING:** Do not include unsourced precise statistics. If data are placeholders for testing, mark the file and series clearly with `PLACEHOLDER_DATA_NEEDS_VERIFICATION`.

Placeholder data should only be used to test the interface structure before definitive curated classroom datasets are added.

## How to cite the original source
Include the source information in a `DatasetSourceNote` or within the series metadata itself (e.g., "provider", "url" in a `DatasetSource` object if expanded, or just noted in the caveat/description). The current schema requires you to be explicit about caveats.
