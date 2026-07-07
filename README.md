# Did Sanctions Work? Evidence Lab

A classroom web app for asking a deceptively simple question: did a sanction or foreign-aid policy actually work?

The app is designed for discussion-first international relations teaching. Students choose a real case, decide what "success" should mean, research their own evidence, and submit a cautious verdict to a class board.

## Who this is for

This app is for teachers running a short investigation in pairs or small groups. It works well for social studies, history, economics, political science, international relations, and public policy lessons.

Students only need a group name. There are no student accounts, passwords, or grades inside the app.

## Current student workflow

1. **Enter a group name** on the login screen. No password, no student account.
2. **Choose one real case** — a sanctions case or a foreign-aid case — from the case grid. If Supabase is connected, a case a group has claimed is locked for everyone else until they move on or release it.
3. Work through the four-step guided investigation for that case:
   1. **Meet the case** — a plain-English briefing (what happened, what was tried, the goal, why it's hard to judge). Hard terms are underlined; hovering or focusing one shows a plain-English definition.
   2. **Define success** — pick one of the case's success tests (e.g. "behavior change," "civilian harm") and optionally explain it in their own words.
   3. **Find evidence** — research at least two findings from outside sources, record what each shows, a key number or quote, the source, a reliability rating, and whether it suggests the policy worked, failed, or complicates the picture.
   4. **Give verdict** — an overall verdict, confidence level, strongest evidence, biggest complication, and what's still missing — plus an auto-built "share-out sentence" summarizing the group's position.
4. Submit the verdict to the **Class Board**.
5. Optionally open **Compare cases** to see patterns across every group's submissions.

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
- chosen success test, and an optional note on what success means in their own words
- at least two self-researched findings, each with:
  - a title and a one-or-two-sentence summary of what it shows
  - an optional key number or quote
  - a source title and optional URL
  - a reliability rating (high / medium / low / not sure yet)
  - what the finding suggests (worked / failed or backfired / complicates the picture)
  - how it connects to the group's success test
  - what the finding cannot prove
- overall verdict (worked / failed / mixed / cannot judge yet)
- confidence level
- strongest evidence (chosen from the group's own findings)
- biggest complication or contrary evidence
- what evidence is still missing to be sure

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

The class board shows every submitted group verdict in one table, with columns for the case, success test, verdict, confidence, strongest evidence, biggest complication, and missing evidence. Each row can also expand to show the group's researched findings.

From the board, anyone can:

- filter by track (sanctions / aid) or verdict
- add another verdict
- open Compare cases
- export the current view as CSV
- print the board

Clearing the board and viewing auto-generated discussion prompts are teacher-only actions — see **Teacher Mode** below.

## Comparative mode

Comparative mode summarizes class submissions across verdicts, confidence, tracks, and success criteria, plus a word cloud of what evidence groups said was still missing. It is reachable by anyone from the class board ("Compare cases") once a few groups have submitted, so students can look for patterns instead of only discussing one case at a time.

## Teacher Mode

Teacher Mode is the app's teacher-facing area. Its actions (editing cases, clearing the board) are kept out of the everyday student views.

**How to open it:** the "Teacher Mode" tab is hidden from the navigation bar by default. To reveal it, add `?teacher=true` to the end of the app's URL and load the page, for example:

- Local dev: `http://localhost:5173/?teacher=true`
- Deployed site: `https://your-site.vercel.app/?teacher=true`

Once the page has loaded with that in the address bar, the tab stays visible while you click around the app (Home, Cases, Class Board, etc.) — you only need to add it once per browser session. Loading the app fresh without `?teacher=true` hides the tab again.

This is a hidden URL, not real access control — anyone who sees the address bar (for example on a projected screen) or guesses the parameter gets full teacher access, including editing cases and clearing the board. Don't project or screen-share while `?teacher=true` is in the address bar.

**Class board controls:**

- clear every submitted verdict from this browser's local class board (destructive; asks for confirmation first)
- see auto-generated discussion prompts once groups have submitted — e.g. the most common verdict, which cases had high confidence, and how success tests changed the picture

**Case claims** (only does something when Supabase live case-claiming is configured):

- release a single claimed case — use this if a group picked the wrong case, or you just want to free it up for someone else, without needing that group's device
- release every claimed case at once with **Release all** — use this between class periods so the next session starts with every case available again

**Case editor** — edit classroom materials without changing code:

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

If Supabase is configured, case claims and class board submissions can sync across devices. The exact database schema it expects lives in **`supabase-schema.sql`** — see the setup guide below.

## Environment variables

Copy `.env.example` to `.env` for local development (or set the same names in your Vercel project's Environment Variables for a deployed site):

- `VITE_APP_TITLE`, `VITE_APP_SUBTITLE` — optional branding text.
- `VITE_BOARD_STORAGE_KEY` — the local storage key for the per-browser fallback board.
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — optional. Set **both** to turn on the shared, real-time class board and live case-claiming; leave either blank and the app quietly falls back to the local per-browser board.

`.env` is gitignored — never commit real Supabase keys to the repository (the anon key is safe to expose in a deployed app, but keep it out of source control regardless).

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

## 🚀 Setting Up the Database and Website (For Beginners)

If you want students on different computers to see the same Class Board and lock cases so no two groups pick the same one, you need a database (Supabase) and a live website (Vercel). Both are free!

Follow these steps exactly.

### Step 1: Create a Free Database (Supabase)
1. Go to [Supabase.com](https://supabase.com/) and click **Start your project**.
2. Sign in (you can use your GitHub account) and create a new project. Name it something like "Evidence Lab". Create a strong database password and save it somewhere. Wait a few minutes for the database to set up.
3. Once your project is ready, look at the left sidebar and click on **SQL Editor** (it looks like a little code window).
4. Click **New query**, then open the file **`supabase-schema.sql`** from this project, copy everything in it, and paste it into the big text box. (That file is the exact, up-to-date setup the app expects; the same SQL is shown below for reference.)

```sql
create table if not exists public.claimed_cases (
  case_id text primary key,
  group_name text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.submissions (
  id text primary key,
  group_name text not null,
  case_id text not null,
  verdict text not null,
  data jsonb not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- Keep Row Level Security ON and allow the public classroom key full access.
-- (More reliable than disabling RLS, which Supabase turns back on by default.)
alter table public.claimed_cases enable row level security;
alter table public.submissions   enable row level security;

drop policy if exists "Public full access to claims" on public.claimed_cases;
create policy "Public full access to claims" on public.claimed_cases
  for all to anon, authenticated using (true) with check (true);

drop policy if exists "Public full access to submissions" on public.submissions;
create policy "Public full access to submissions" on public.submissions
  for all to anon, authenticated using (true) with check (true);

-- Turn on live updates (safe to run more than once)
do $$
begin
  if not exists (select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'claimed_cases')
  then alter publication supabase_realtime add table public.claimed_cases; end if;

  if not exists (select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'submissions')
  then alter publication supabase_realtime add table public.submissions; end if;
end $$;
```
5. Click the green **Run** button at the bottom right. This creates the tables you need! (If you ever re-run it, that's fine — nothing gets erased.)
6. Now, look at the left sidebar again and click on **Project Settings** (the gear icon at the bottom).
7. Click on **API** in the settings menu.
8. Under **Project URL**, copy the `URL` and save it.
9. Under **Project API keys**, copy the `anon` `public` key and save it. 

*You will need both of these keys for Vercel!*

### Step 2: Put the Code on GitHub
1. Create a free account on [GitHub.com](https://github.com/).
2. Create a new repository and upload this project folder to it (you can drag and drop the files or use GitHub Desktop).

### Step 3: Put the Website on the Internet (Vercel)
1. Go to [Vercel.com](https://vercel.com/) and sign up with your GitHub account.
2. Click **Add New** and select **Project**.
3. You will see a list of your GitHub repositories. Click **Import** next to your Evidence Lab project.
4. On the "Configure Project" screen, look for **Environment Variables** and click the little down arrow to open it.
5. You need to add two variables here using the keys you saved from Supabase:
   - Box 1 (Name): type exactly `VITE_SUPABASE_URL`
   - Box 2 (Value): paste your **Project URL** from Supabase
   - Click **Add**
   - Box 1 (Name): type exactly `VITE_SUPABASE_ANON_KEY`
   - Box 2 (Value): paste your **anon public key** from Supabase
   - Click **Add**
6. Click the big **Deploy** button.
7. Wait a couple of minutes, and Vercel will give you a live link to your website! Share this link with your students.

Vercel routing and caching are already configured in **`vercel.json`** (refreshing the page on any screen works, and updates reach students automatically on the next deploy) — you don't need to change anything there.

### Troubleshooting

**"new row violates row-level security policy for table ..."**
This means the table has Row Level Security on with no policy allowing access (common if a table was created in the Supabase Table Editor instead of the SQL Editor). Fix it by opening **SQL Editor -> New query**, pasting the contents of **`supabase-schema.sql`**, and clicking **Run**. It adds the permissive classroom policy and is safe to run again.

**The class board does not update live across devices**
Make sure both tables are in the realtime publication — re-running `supabase-schema.sql` handles this. Also confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in Vercel and that you redeployed after adding them.
