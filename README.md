# Did Sanctions Work? Evidence Lab

A classroom web app for asking a hard question in a careful way: did a sanction or foreign aid policy actually work?

Students do not hunt for the one correct answer. They choose a real case, decide what "success" should mean, pick evidence, explain what the evidence shows, submit a verdict, and then compare their reasoning with the class.

## Who this is for

This app is designed for teachers running a short classroom investigation in pairs or small groups. It works especially well for social studies, history, economics, political science, international relations, and public policy lessons.

Students only need a group name. There are no student accounts, passwords, or grades inside the app.

## The student workflow

Students move through the lab in this order:

1. Enter a group name.
2. Choose an available case.
3. Read the case summary.
4. Build an evaluation question.
5. Create three indicators:
   - one indicator for success
   - one indicator for harm or cost
   - one indicator for uncertainty
6. Select at least three evidence cards.
7. Explain how each selected evidence card connects to an indicator.
8. Optionally check supporting data snapshots.
9. Submit a verdict and confidence level.
10. Compare all group verdicts on the class board.

The point is to help students see that "Did it work?" depends on the goal, the people affected, the time period, the evidence available, and the uncertainty that remains.

## What students submit

Each group submits:

- its evaluation question
- its three indicators
- selected evidence cards
- notes on what the evidence shows
- an overall verdict
- a confidence level
- strongest evidence
- biggest complication
- missing evidence or remaining uncertainty

In Research mode, students can also add their own evidence and citations.

## Classroom Mode and Research Mode

The app has two activity modes.

Classroom mode is best for a normal class period. Students use the provided cases and evidence cards. This is the recommended starting mode.

Research mode is for a longer assignment. Students can add outside evidence, write fuller explanations, and include citation details.

You can switch modes from the top navigation after entering the app.

## Recommended lesson plan

A simple 35-45 minute version:

1. Opening question, 3 minutes: What would count as success for this policy?
2. Choose case, 3 minutes: Groups enter a name and claim a case.
3. Read case, 5 minutes: Students identify the policy, goal, and difficulty of judging success.
4. Build question and indicators, 8 minutes: Students define success, harm, and uncertainty.
5. Select evidence, 10 minutes: Students choose at least three cards and explain how each one helps answer the question.
6. Submit verdict, 7 minutes: Students choose a verdict and confidence level.
7. Class board discussion, 7-10 minutes: Compare verdicts, confidence, and missing evidence.

For a shorter class, skip the optional data check. For a longer class, use Research mode and ask students to add one outside source.

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

## Class board

The class board shows submitted group verdicts. It helps the teacher lead discussion around:

- which verdicts were most common
- which cases produced disagreement
- whether groups used different definitions of success
- where confidence was high or low
- what evidence students still wanted

The board can also export submissions as CSV for later review.

## Teacher Mode

Teacher Mode lets you edit classroom materials without changing code.

You can:

- add a custom case
- duplicate an existing case
- edit case summaries
- edit success criteria
- edit evidence cards
- edit sources and teacher notes
- import or export case JSON
- restore the default cases

Important: Teacher Mode changes are saved inside the browser you are using. Use Export JSON if you want to back up your edited cases or move them to another computer.

## What is saved where

By default, the app saves work inside the browser on the current computer. This is called local browser storage.

That means:

- refreshing the page usually keeps the local class board
- using a different browser may show a different board
- using a different computer will not show the same local board
- clearing browser data may remove local submissions and teacher edits

If Supabase is configured, case claims and class board submissions can sync across devices.

## Optional Supabase setup

Skip this section unless you want multiple devices to share case claims and class board submissions live.

A technical helper can create a free Supabase project, open the SQL Editor, and run this SQL:

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

Note: The in-app Clear board button clears the local browser board. If you are using Supabase, a technical helper may need to clear remote classroom data in Supabase between classes.

## Data and sources

The app includes curated case materials, evidence cards, source links, timelines, indicators, and a few local data snapshots.

The source links are references for students and teachers. The app does not automatically fetch every linked source during class.

Local data snapshots are stored in `public/datasets`. They are included so the app stays reliable even if the classroom internet is slow or an outside data website changes.

## Troubleshooting

If the app does not start, install Node.js LTS, reopen the terminal, and run `install.cmd` again.

If the browser says the page cannot be reached, make sure the terminal running `start.cmd` is still open.

If students cannot pick a case, another group may have claimed it. Choose a different case, or have the original group leave the case. With Supabase, old claims may need to be cleared between classes.

If the class board is empty on another computer, Supabase is probably not configured. Local boards stay inside each browser.

If data snapshots are missing for a case, students can still complete the activity using the case summary and evidence cards.

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

## Deployment

The simplest classroom deployment is Vercel:

1. Push the project to GitHub.
2. Import the GitHub repository into Vercel.
3. Add any needed `VITE_` environment variables in Vercel.
4. Deploy.

If you use Supabase, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel before using the deployed classroom link.
