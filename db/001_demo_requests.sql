-- Ledgerline demo requests with lead scoring.
-- Plain Postgres 13+ only (gen_random_uuid is built in), so it also runs on embedded PGlite locally.

create table if not exists demo_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  full_name       text not null,
  work_email      text not null, -- stored lowercased by the API
  company         text not null,
  role            text not null check (role in ('founder','finance_lead','controller','ops','agency','other')),
  revenue_band    text not null check (revenue_band in ('lt_1m','1_5m','5_10m','10_20m','gt_20m')),
  orders_band     text not null check (orders_band in ('lt_2k','2_10k','10_50k','gt_50k')),
  stores_count    int  not null default 1 check (stores_count between 1 and 100),
  ledger          text check (ledger in ('xero','quickbooks','netsuite','other')),
  lead_score      int  not null check (lead_score between 0 and 100),
  lead_tier       text not null check (lead_tier in ('hot','warm','cold')),
  score_breakdown jsonb not null default '{}'::jsonb,
  utm_source      text,
  utm_campaign    text,
  unique (work_email, company)
);

create index if not exists demo_requests_tier_created_idx
  on demo_requests (lead_tier, created_at desc);

-- Leads are written only by the server (service connection). Block anon/auth roles on Supabase.
alter table demo_requests enable row level security;
