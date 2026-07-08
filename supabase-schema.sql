-- ============================================================================
-- Did It Work? Evidence Lab — Supabase schema
-- ============================================================================
-- This sets up the shared class board and live case-claiming used when the app
-- is configured with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
--
-- HOW TO USE:
--   1. Open your Supabase project -> SQL Editor -> New query.
--   2. Paste this whole file and click Run.
-- It is safe to run more than once (nothing is dropped or overwritten).
--
-- This file is the single source of truth for the backend. The app code that
-- depends on it lives in src/utils/supabase.ts. If you change columns here,
-- update that file too.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: claimed_cases
-- One row per case a group has claimed. case_id is the PRIMARY KEY, which makes
-- claiming atomic: a second group inserting the same case_id gets a duplicate
-- error (code 23505) that the app treats as "already taken".
--   Used by: claimCase(), releaseCase(), getClaimedCases()
-- ---------------------------------------------------------------------------
create table if not exists public.claimed_cases (
  case_id text primary key,
  group_name text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- ---------------------------------------------------------------------------
-- Table: submissions
-- One row per group verdict. The full verdict object is stored in `data`
-- (JSONB); the top-level columns are just for quick filtering/inspection.
-- NOTE: `id` is text (not uuid) on purpose — the app generates crypto.randomUUID()
-- when available but falls back to a non-UUID string in older/non-HTTPS browsers,
-- and text accepts both so a verdict never silently fails to save.
--   Used by: saveSubmission(), getSubmissions()
-- ---------------------------------------------------------------------------
create table if not exists public.submissions (
  id text primary key,
  group_name text not null,
  case_id text not null,
  verdict text not null,
  data jsonb not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Students have no accounts (they just type a group name), so the anon key
-- must be able to read/insert/update freely for the claim-a-case and
-- submit-a-verdict flows to work. Teachers sign in with real Supabase Auth
-- accounts (see "Teacher accounts" below), and get the `authenticated` role.
--
-- claimed_cases: stays fully open to anon. A group must be able to delete its
-- OWN claim when it finishes a case, and since there is no per-student
-- identity, RLS can't tell "my claim" from "someone else's claim" — locking
-- deletes to `authenticated` would also block that normal student flow.
-- Worst case if abused: a claim gets released early, which just frees the
-- case up again — mildly annoying, not destructive.
--
-- submissions: reading/creating/updating stays open to anon (a group must be
-- able to save and edit its own verdict), but DELETE is restricted to
-- `authenticated` (teachers only). Deleting a verdict is destructive and
-- unrecoverable, and unlike claims, the app never needs to delete a
-- submission as a student — editing a verdict now overwrites the existing
-- row (upsert by id) instead of delete-then-recreate. So only the Teacher
-- Mode "Remove verdict" / "End & Clear Session" actions need delete access,
-- and those are the actions we want to require a real teacher login for.
--
-- Policies are recreated (drop-if-exists) so re-running this file is safe.
-- ---------------------------------------------------------------------------
alter table public.claimed_cases enable row level security;
alter table public.submissions   enable row level security;

drop policy if exists "Public full access to claims" on public.claimed_cases;
create policy "Public full access to claims" on public.claimed_cases
  for all to anon, authenticated using (true) with check (true);

drop policy if exists "Public full access to submissions" on public.submissions;
drop policy if exists "Anyone can read submissions" on public.submissions;
drop policy if exists "Anyone can save submissions" on public.submissions;
drop policy if exists "Anyone can update submissions" on public.submissions;
drop policy if exists "Only teachers can delete submissions" on public.submissions;

create policy "Anyone can read submissions" on public.submissions
  for select to anon, authenticated using (true);

create policy "Anyone can save submissions" on public.submissions
  for insert to anon, authenticated with check (true);

create policy "Anyone can update submissions" on public.submissions
  for update to anon, authenticated using (true) with check (true);

create policy "Only teachers can delete submissions" on public.submissions
  for delete to authenticated using (true);

-- ---------------------------------------------------------------------------
-- Teacher accounts
-- Teacher Mode uses real Supabase Auth (email + password) instead of a shared
-- PIN once this project is configured, so each teacher gets their own login.
-- There is no self-service sign-up screen — create each teacher's account
-- yourself:
--   1. In the Supabase dashboard: Authentication -> Users -> Add user.
--   2. Enter their email + a temporary password.
--   3. Check "Auto Confirm User" (there is no email step in this flow, so an
--      unconfirmed account can never sign in otherwise).
--   4. Share the password with them; they can change it later from the
--      Supabase dashboard's "reset password" flow, or you can rotate it here.
-- No SQL is required for this — Supabase Auth manages its own users table.
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- Realtime
-- The app subscribes to postgres_changes on both tables so the class board and
-- case-claiming update live across devices. Add each table to the realtime
-- publication only if it is not already there (so re-running this is safe).
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'claimed_cases'
  ) then
    alter publication supabase_realtime add table public.claimed_cases;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'submissions'
  ) then
    alter publication supabase_realtime add table public.submissions;
  end if;
end $$;
