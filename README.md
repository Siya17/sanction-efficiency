# Did Sanctions Work? Evidence Lab

A classroom web app for asking a deceptively simple question: did a sanction or foreign-aid policy actually work?

The app is designed for discussion-first international relations teaching. Students choose a real case, decide what "success" should mean, research their own evidence, and submit a cautious verdict to a class board.

## Who this is for

This app is for teachers running a short investigation in pairs or small groups. It works well for social studies, history, economics, political science, international relations, and public policy lessons.

Students only need a group name. There are no student accounts, passwords, or grades inside the app.

## Current student workflow

Students move through a guided four-step activity:

1. Enter a group name.
2. Choose one real sanctions or foreign-aid case.
3. Read a plain-English case briefing with glossary help for difficult terms.
4. Choose a success test from the case-specific options.
5. Research and record at least two findings from outside sources.
6. Classify each finding as evidence that the policy worked, failed/backfired, or remains complicated.
7. Submit a verdict, confidence level, strongest evidence, biggest complication, and missing evidence.
8. Compare group verdicts on the class board.

The key classroom question is not "what is the right answer?" It is: what goal are we judging, what evidence supports the judgment, and how confident should we be about causation?

## Simple classroom prompt

For a very short version, put this on the board:

| Case | Goal | Outcome | Causal link | Verdict |
| --- | --- | --- | --- | --- |
| Sanctions case |  |  |  |  |
| Aid case |  |  |  |  |

Ask groups to answer:

- What was the stated goal?
- What evidence suggests success or failure?
- Was the policy itself responsible for the outcome?
- What is your short verdict and one piece of evidence?

The app's guided workflow supports this same logic in more structured form.

## What students submit

Each group submits:

- selected case
- chosen success test
- optional note explaining what success means in their own words
- at least two self-researched findings
- source title and optional URL for each finding
- source reliability rating
- explanation of how each finding connects to the success test
- limitation for each finding
- overall verdict
- confidence level
- strongest evidence
- biggest complication or contrary evidence
- missing evidence or remaining uncertainty

## Cases and materials

The app includes sanctions and foreign-aid cases in `src/data/cases.ts`.

Each case includes:

- case summary
- policy used
- stated policy goal
- why the case is hard to judge
- possible success criteria
- optional tailored guidance
- source links
- teacher note
- editable evidence cards, timelines, and indicator data for teacher use

The current student flow emphasizes student-researched findings. Curated case materials still exist for teacher editing, case design, source guidance, timelines, and future extensions.

## Glossary support

Important IR terms, organizations, and case-specific names are defined in `src/data/glossary.ts`.

The `GlossaryText` component highlights terms in case briefings and shows plain-English definitions on hover or focus. This is meant to reduce front-loaded lecture time and let students start the investigation faster.

## Class board

The class board shows submitted group verdicts. It helps the teacher lead discussion around:

- which verdicts were most common
- whether sanctions and aid cases produced different patterns
- how success tests changed the verdict
- where confidence was high or low
- what evidence groups still wanted
- which findings were strongest or most contested

The board can be filtered and exported as CSV.

## Comparative mode

Comparative mode summarizes class submissions across verdicts, confidence, tracks, success criteria, and missing-evidence keywords. Use it after several groups submit so students can compare patterns instead of only presenting one case at a time.

## Teacher Mode

Teacher Mode lets you edit classroom materials without changing code.

You can:

- add a custom case
- duplicate an existing case
- edit case summaries
- edit success criteria
- edit evidence cards
- edit source links and teacher notes
- edit timeline JSON
- edit indicator JSON
- import or export case JSON
- restore the default cases

Teacher Mode changes are saved in the browser's local storage. Use Export JSON if you want to back up edited cases or move them to another computer.

## What is saved where

By default, the app saves work inside the current browser using local storage.

That means:

- refreshing the page usually keeps the local class board
- using a different browser may show a different board
- using a different computer will not show the same local board
- clearing browser data may remove local submissions and teacher edits

If Supabase is configured, case claims and class board submissions can sync across devices.

## Teacher quick start

If you are using this on this computer:

1. Make sure Node.js LTS is installed from https://nodejs.org/.
2. Open this project folder.
3. Double-click `install.cmd` the first time only.
4. Double-click `start.cmd` whenever you want to run the app.
5. Open the address shown in the terminal, usually `http://localhost:5173`.

Keep the terminal window open while using the app. Closing it stops the local app.

## If `npm.cmd` is not recognized

This means Windows cannot find Node.js/npm.

Try this first:

1. Install Node.js LTS from https://nodejs.org/.
2. Close and reopen PowerShell or the terminal.
3. Double-click `install.cmd` again.

The helper files `install.cmd` and `start.cmd` look for Node.js in the normal Windows location: `C:\Program Files\nodejs\npm.cmd`.

## Using the app with students

For one teacher computer or projector, no online setup is needed. Run `start.cmd`, open the app, and use the class board from that same browser.

For many student devices, you have two easier options:

- Deploy the app online, for example with Vercel.
- Add Supabase if you want live case claiming and a shared class board across devices.

Without Supabase, each browser keeps its own local class board. That is fine for demos, one-computer use, or testing, but it will not automatically combine submissions from different student laptops.

## Optional Supabase setup

Skip this section unless you want multiple devices to share case claims and class board submissions live.

Create a Supabase project, open the SQL Editor, and run this SQL:

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

Then create a file named `.env.local` in the project folder:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Restart the app after changing environment settings.

## Data and source files

Important files:

- `src/App.tsx`: top-level app routing between login, home, case selection, investigation, verdict, board, compare, and teacher views
- `src/hooks/useEvidenceLab.ts`: main app state, local/Supabase submission handling, case claims, and the minimum finding requirement
- `src/components/GuidedInvestigation.tsx`: four-step student investigation flow
- `src/components/StudentEvidenceForm.tsx`: self-researched finding form
- `src/components/VerdictBuilder.tsx`: final verdict form and share-out sentence
- `src/components/ClassBoard.tsx`: submitted verdict table, filters, print, and CSV export
- `src/components/ComparativeMode.tsx`: aggregate comparison view
- `src/components/TeacherMode.tsx`: local case editor and JSON import/export tools
- `src/data/cases.ts`: default sanctions and aid cases
- `src/data/glossary.ts`: hover/focus glossary terms
- `src/data/timelines.ts`: optional case timelines
- `src/data/indicators.ts`: optional indicator series for teacher materials and extensions
- `public/datasets`: local data snapshots retained for offline reliability and future classroom use

## Technical helper notes

Install dependencies:

```powershell
npm.cmd install
```

Start the local development server:

```powershell
npm.cmd run dev
```

Check TypeScript:

```powershell
npm.cmd run typecheck
```

Build the app:

```powershell
npm.cmd run build
```

Preview the built app:

```powershell
npm.cmd run preview
```

Environment variables:

```env
VITE_APP_TITLE="Did Sanctions Work? Evidence Lab"
VITE_APP_SUBTITLE="A classroom investigation of sanctions and foreign aid."
VITE_BOARD_STORAGE_KEY="did-it-work-evidence-lab-submissions"
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Only variables that begin with `VITE_` are available to the app.

## Troubleshooting

If the app does not start, install Node.js LTS, reopen the terminal, and run `install.cmd` again.

If the browser says the page cannot be reached, make sure the terminal running `start.cmd` is still open.

If students cannot pick a case, another group may have claimed it. Choose a different case, or have the original group leave the case. With Supabase, old claims may need to be cleared between classes.

If the class board is empty on another computer, Supabase is probably not configured. Local boards stay inside each browser.

If teacher edits disappear, check whether the browser's local storage was cleared or whether you switched browsers/computers. Export JSON from Teacher Mode to keep a backup.

## Deployment

The simplest classroom deployment is Vercel:

1. Push the project to GitHub.
2. Import the GitHub repository into Vercel.
3. Add any needed `VITE_` environment variables in Vercel.
4. Deploy.

If you use Supabase, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel before using the deployed classroom link.
