# Did It Work? Evidence Lab

A small classroom web app for investigating whether sanctions or foreign aid "worked" in real historical cases.

The MVP supports a smooth pair-work flow:

1. Choose a case.
2. Define the success criterion.
3. Sort evidence into claims.
4. Submit a cautious verdict.
5. Compare submissions on the class board.

## Tech Stack

- Vite
- React
- TypeScript
- Static case data
- `localStorage` for class-board submissions

No backend, authentication, or live API calls are required.

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
- six `evidenceCards`
- source links students can inspect later
- optional `teacherNote`

The app does not fetch source links. They are references only.

## Class Board Storage

Submissions are stored in the browser under a localStorage key. They stay after refresh on the same device/browser.

Use **Clear board** in the app to remove all local submissions.

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
