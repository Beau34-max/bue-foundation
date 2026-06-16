-- ============================================================
-- BUE Foundation – Supabase Database Setup
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

create table if not exists submissions (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  type        text        not null,
  name        text,
  email       text,
  phone       text,
  data        jsonb       not null default '{}'::jsonb
);

-- Index for fast filtering by type
create index if not exists submissions_type_idx on submissions(type);

-- Index for searching by email
create index if not exists submissions_email_idx on submissions(email);

-- Enable Row Level Security (RLS) — inserts allowed from server only
alter table submissions enable row level security;

-- Allow anyone to insert (our server uses the service role key, which bypasses RLS anyway)
-- This policy is here in case you ever use the anon key client-side
create policy "Allow inserts" on submissions
  for insert with check (true);

-- Deny all selects from anon/public — only your service role key can read data
-- (You will view data through the Supabase Dashboard)
create policy "Deny public reads" on submissions
  for select using (false);

-- ============================================================
-- Types stored in the 'type' column:
--   career_application        → job applications (with CV filename)
--   scholarship_application   → scholarship form
--   event_registration        → event sign-ups
--   training_registration     → course enrolments
--   enterprise_application    → enterprise fund applications
--   volunteer_application     → volunteer sign-ups
--   contact_message           → contact form messages
-- ============================================================
