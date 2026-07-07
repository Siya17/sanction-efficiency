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
-- This is a public classroom app with no user accounts, so the anon key must be
-- able to read, insert, and delete freely. We keep RLS ENABLED and add a fully
-- permissive policy for the anon (and authenticated) roles. This is more robust
-- than disabling RLS: Supabase enables RLS by default on tables made in the UI
-- and warns about disabled RLS, so an explicit policy avoids the
-- "new row violates row-level security policy" error in every setup path.
--
-- Trade-off: anyone with the public anon key can read/edit the board. That is
-- fine for a classroom — do not store sensitive data here.
--
-- Policies are recreated (drop-if-exists) so re-running this file is safe.
-- `for all` covers select/insert/update/delete; using(true)+with check(true)
-- allow every row.
-- ---------------------------------------------------------------------------
alter table public.claimed_cases enable row level security;
alter table public.submissions   enable row level security;

drop policy if exists "Public full access to claims" on public.claimed_cases;
create policy "Public full access to claims" on public.claimed_cases
  for all to anon, authenticated using (true) with check (true);

drop policy if exists "Public full access to submissions" on public.submissions;
create policy "Public full access to submissions" on public.submissions
  for all to anon, authenticated using (true) with check (true);

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
