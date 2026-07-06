# Did It Work? Evidence Lab

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
- CSV export, print button, and clear-board control
- No backend, authentication, accounts, or live API calls

## Tech Stack

- Vite
- React
- TypeScript
- Static case data
- Browser localStorage

## Getting Started

```powershell
npm.cmd install
npm.cmd run dev
```

Then open the local URL printed by Vite, usually `http://localhost:5173`.

If PowerShell blocks `npm`, use `npm.cmd` rather than `npm`.

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

Submissions are stored in the browser under a localStorage key. They stay after refresh on the same device/browser.

Use **Clear board** in the app to remove all local submissions. Use **Export CSV** to save the currently filtered board.

## Environment

Copy `.env.example` to `.env.local` if you want to adjust display text without touching code:

```powershell
Copy-Item .env.example .env.local
```

All variables must use the `VITE_` prefix to be available in the app.

## Deployment

This app can be deployed as a static Vite site. Build output goes to `dist/`:

```powershell
npm.cmd run build
```
