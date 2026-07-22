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

-- ============================================================
-- Admin CMS: Users, Jobs & Events
-- Run the section below to enable the /admin dashboard
-- ============================================================

-- Admin users table (multi-user login with roles)
create table if not exists admin_users (
  id               uuid     primary key default gen_random_uuid(),
  name             text     not null,
  email            text     unique not null,
  role             text     not null default 'editor', -- 'super_admin' | 'editor'
  password_hash    text,                               -- null until invite accepted
  invite_token     text     unique,
  invite_expires   timestamptz,
  invite_accepted  boolean  not null default false,
  created_at       timestamptz not null default now()
);

-- Jobs table
create table if not exists jobs (
  id               uuid     primary key default gen_random_uuid(),
  title            text     not null,
  type             text     not null default 'Full-time',
  location         text     not null default 'Remote / Hybrid',
  salary           text     not null default '',
  department       text     not null default '',
  summary          text     not null default '',
  responsibilities text[]   not null default '{}',
  requirements     text[]   not null default '{}',
  desirable        text[]   not null default '{}',
  is_active        boolean  not null default true,
  created_at       timestamptz not null default now()
);

-- Events table
create table if not exists events (
  id          uuid     primary key default gen_random_uuid(),
  title       text     not null,
  type        text     not null default '',
  date_label  text     not null default '',
  time_label  text     not null default '',
  location    text     not null default '',
  description text     not null default '',
  speakers    text[]   not null default '{}',
  price       text     not null default 'Free',
  seats       text     not null default '',
  tags        text[]   not null default '{}',
  is_active   boolean  not null default true,
  sort_order  integer  not null default 0,
  created_at  timestamptz not null default now()
);

-- ── Seed: Jobs ────────────────────────────────────────────────────────────

insert into jobs (title, type, location, salary, department, summary, responsibilities, requirements, desirable) values
(
  'Administrative Manager',
  'Full-time',
  'Remote / Hybrid',
  '₦30,000 per month',
  'Operations',
  'We are seeking a highly organised and proactive Administrative Manager to oversee the day-to-day operations of the BUE Foundation. This is a pivotal role that ensures our programmes run smoothly and our team has the support they need to serve communities effectively.',
  array[
    'Manage daily administrative operations of the foundation',
    'Coordinate schedules, meetings, and correspondence for the CEO and senior leadership',
    'Maintain accurate records, databases, and filing systems for beneficiaries and donors',
    'Oversee procurement of office supplies and manage vendor relationships',
    'Support programme teams with logistical planning and event coordination',
    'Prepare reports, presentations, and documentation for board and stakeholder meetings',
    'Manage volunteer and staff onboarding processes',
    'Ensure compliance with NGO regulations and internal policies'
  ],
  array[
    'Minimum of 3 years'' administrative or office management experience',
    'Excellent written and verbal communication skills',
    'Strong proficiency in Microsoft Office Suite (Word, Excel, Outlook, PowerPoint)',
    'Experience in an NGO, charity, or public sector organisation preferred',
    'Ability to prioritise and manage multiple tasks in a fast-paced environment',
    'High level of integrity, discretion, and attention to detail',
    'OND, HND, or BSc in Business Administration, Management, or related field'
  ],
  array[
    'Experience with project management tools',
    'Knowledge of Nigerian NGO regulatory requirements',
    'Fluency in Igbo and English'
  ]
),
(
  'Fundraising & Marketing Manager',
  'Full-time',
  'Remote / Hybrid',
  '₦50,000 per month',
  'Fundraising & Development',
  'The BUE Foundation is looking for a passionate and strategic Fundraising Manager to lead our income generation and donor engagement efforts. You will develop and implement fundraising campaigns, build lasting relationships with donors, and help ensure the sustainability of our programmes.',
  array[
    'Develop and execute comprehensive fundraising strategies across individual giving, corporate partnerships, events, and grants',
    'Identify, cultivate, and steward relationships with individual donors, corporate sponsors, and grant-making organisations',
    'Plan and manage fundraising events, campaigns, and digital appeals',
    'Write compelling grant proposals, reports, and donor communication materials',
    'Track fundraising income and manage the donor database',
    'Represent the foundation at networking events and stakeholder engagements',
    'Collaborate with the communications team to align fundraising with brand messaging',
    'Provide regular fundraising performance reports to senior leadership'
  ],
  array[
    'Minimum of 2 years'' experience in fundraising, business development, or donor relations',
    'Proven track record of meeting or exceeding fundraising targets',
    'Exceptional written and verbal communication and persuasion skills',
    'Experience writing grant applications or donor proposals',
    'Strong networking ability and relationship management skills',
    'Self-motivated with the ability to work independently and manage own workload',
    'BSc in Communications, Business, Development Studies, or related field'
  ],
  array[
    'Experience in the Nigerian or African NGO sector',
    'Familiarity with Paystack, GoFundMe, or other digital fundraising platforms',
    'Existing network of corporate donors or philanthropic contacts'
  ]
);

-- ── Seed: Events ──────────────────────────────────────────────────────────

insert into events (title, type, date_label, time_label, location, description, speakers, price, seats, tags, sort_order) values
(
  'Business Foundations Seminar',
  'Business Seminar',
  'Saturday, 1 August 2026',
  '9:00 AM – 2:00 PM',
  'BUE Foundation Hall, Afikpo-North, Ebonyi State',
  'A practical, hands-on seminar covering the fundamentals of starting and running a profitable business in Nigeria. Topics include business registration, pricing, bookkeeping, customer acquisition, and digital marketing.',
  array['Beatrice Uchenna Egwu – BUE Foundation', 'TBA – Business Development Expert'],
  'Free',
  'Limited to 80 attendees',
  array['Business', 'Free Entry'],
  1
),
(
  'Enterprise Fund Bootcamp',
  'Workshop',
  'Saturday, 15 August 2026',
  '10:00 AM – 4:00 PM',
  'Afikpo Community Centre, Ebonyi State',
  'A full-day bootcamp for applicants and recipients of the BUE Enterprise Fund. Covers business planning, financial management, profit reporting, and mentorship pairing. Mandatory for approved Enterprise Fund recipients.',
  array['BUE Enterprise Committee', 'Guest Mentors'],
  'Free (Enterprise Fund applicants only)',
  'Invitation-only for shortlisted applicants',
  array['Enterprise Fund', 'Workshop'],
  2
),
(
  'Community Outreach Day',
  'Community Event',
  'Saturday, 29 August 2026',
  '8:00 AM – 1:00 PM',
  'Ezi Agha-Orie Ukpa, Afikpo-North',
  'Join us as we distribute food packages, school supplies, and hygiene kits to families in need. Volunteers welcome. Come and be a Joybringer!',
  array[]::text[],
  'Free',
  'Open to all',
  array['Community', 'Volunteer', 'Free Entry'],
  3
),
(
  'Annual Joybringers Gala',
  'Fundraising Gala',
  'Saturday, 26 September 2026',
  '6:00 PM – 10:00 PM',
  'Venue TBC — Ebonyi State',
  'Our flagship annual fundraising dinner celebrating our impact and raising funds for the year ahead. Includes awards, live music, testimonies from beneficiaries, and a charity auction.',
  array['Beatrice Uchenna Egwu – CEO', 'Guest of Honour TBA'],
  '₦5,000 per ticket',
  '150 seats available',
  array['Fundraising', 'Gala', 'Ticketed'],
  4
);
