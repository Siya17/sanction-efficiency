# Did Sanctions Work? Evidence Lab

A classroom-ready Vite + React + TypeScript app for a 30-45 minute pair activity about whether sanctions or foreign aid "worked" in real historical cases.

Students move through a simple inquiry workflow:

1. Choose a case.
2. Define what success means.
3. Sort evidence into claims.
4. Build a cautious verdict.
5. Compare submissions on the class board.

The app does not provide a correct answer. It helps students see that "worked" depends on the policy goal, the success criterion, available evidence, the comparison being made, unintended consequences, and missing information.

## Features

- 8 curated cases in `src/data/cases.ts`
- 8 evidence cards per case
- 5-6 success criteria per case
- Progress indicator across the five-step classroom flow
- Activity timing guide for class pacing
- Button-based evidence sorting, no drag-and-drop
- Verdict builder with sentence-frame preview
- localStorage class-board submissions
- Class-board filters by track and verdict
- Comparative Mode for verdict, track, confidence, criterion, and missing-evidence patterns
- Teacher Mode for local case editing, duplication, JSON import/export, and restoring defaults
- CSV export, print button, and clear-board control
- **Real-time Collaboration:** Optional Supabase integration for first-come, first-served case claiming and syncing the Class Board across devices.

## Tech Stack

- Vite
- React
- TypeScript
- Supabase (Optional, for real-time sync)
- Static case data

## Getting Started

```powershell
npm.cmd install
npm.cmd run dev
```

Then open the local URL printed by Vite, usually `http://localhost:5173`.

If PowerShell blocks `npm`, use `npm.cmd` rather than `npm`.

## Supabase Real-time Setup (Optional)

To enable real-time case claiming and Class Board syncing across different devices:

1. Create a free project at [Supabase](https://supabase.com/).
2. Run the following SQL in the Supabase SQL Editor:

```sql
create table public.claimed_cases (
  case_id text primary key,
  group_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.submissions (
  id uuid primary key,
  group_name text not null,
  case_id text not null,
  verdict text not null,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter publication supabase_realtime add table public.claimed_cases;
alter publication supabase_realtime add table public.submissions;
```
3. Add a `.env` file to the root of your project with your API keys:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
If these variables are missing, the app will gracefully fall back to `localStorage`.

## Scripts

```powershell
npm.cmd run dev
npm.cmd run typecheck
npm.cmd run build
npm.cmd run preview
```

## Editing Cases

Teacher-curated cases live in:

```text
src/data/cases.ts
```

Each case has:

- `successCriteria`
- `evidenceCards`
- source links students can inspect later
- optional `teacherNote`

The app does not fetch source links. They are references only.

## Validation Rules

Students can continue to the verdict builder after they have selected a success criterion and sorted at least 3 evidence cards.

Students can submit after they have filled in the policy aim, strongest evidence, biggest complication, and missing evidence. Verdict and confidence have classroom-friendly defaults but can be changed.

## Class Board Storage

Submissions are stored in the browser under a localStorage key by default. If Supabase is configured, submissions will sync in real-time across all devices.

Use **Clear board** in the app to remove all local submissions. Use **Export CSV** to save the currently filtered board.

## Teacher Mode

Open **Teacher Mode** from the top navigation to edit classroom materials without touching TypeScript files.

Teacher changes are stored in this browser's localStorage. Use **Export JSON** to back up or move edited cases to another device, and **Restore defaults** to remove local edits and recover the original case set.

Teacher Mode supports:

- adding, duplicating, editing, and deleting custom cases
- editing success criteria, evidence cards, sources, and teacher notes
- importing/exporting case JSON
- editing optional timeline and indicator data as JSON arrays

## Environment

Copy `.env.example` to `.env.local` if you want to adjust display text without touching code:

```powershell
Copy-Item .env.example .env.local
```

All variables must use the `VITE_` prefix to be available in the app.

## Deployment (Vercel)

The easiest way to get a sharable link for your classroom is to deploy this to Vercel:

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Vercel's Environment Variables.
4. Deploy!
