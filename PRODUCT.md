# Product

<!-- impeccable:product-schema 1 -->

> Written from the agency brief without a live interview: Thierry asked for this to be set up
> without his input. Lines marked _(inferred)_ came from the brief, not from him directly.

## Platform

web

## Users

- **Primary:** founders, heads of finance and controllers at Shopify brands with €1M–€20M annual
  revenue. Their job is to close the books each month: match Shopify, PayPal, Klarna, Stripe and
  marketplace payouts (net of fees, refunds, reserves and chargebacks) to bank deposits and to the
  ledger (Xero, QuickBooks, NetSuite).
- **Situation:** month-end close takes days of CSV exports and spreadsheet matching; decisions run on
  numbers weeks old. _(inferred)_
- **Secondary:** outside accountants and bookkeeping firms who do this work for those brands. _(inferred)_

## Product Purpose

Ledgerline is an AI bookkeeping reconciliation SaaS. It matches every payout line to the bank and
the ledger, explains the exceptions, and posts summarised journals after approval. Success is the
hook: **close the books in 9 minutes, not 9 days.**

This repository is the marketing site. It is also a portfolio demo for a web agency, so the site's
own success is making a prospect believe a funded, profitable company ships it.

## Positioning

Built only for Shopify-led brands in the €1M–€20M band, priced flat by revenue band, and judged on
time-to-close plus revenue leakage recovered (duplicate refunds, fee overcharges, missed
chargebacks), not on rows processed.

## Operating Context

- Buyers evaluate through the landing page, an ROI calculator, pricing and a 20-minute demo.
- Demo requests are stored in PostgreSQL (`demo_requests`) with a 0–100 lead score and a
  hot/warm/cold tier that sets the follow-up promise shown to the visitor.

## Capabilities and Constraints

- Stack (agency standard): Next.js App Router, React, TypeScript, Tailwind, shadcn/ui on Radix,
  motion/react, Node, PostgreSQL. Deploys to Vercel; Postgres on Supabase.
- Sections the brief requires: animated product-UI bento hero, ROI calculator, pricing with a
  monthly/annual toggle, objection-handling FAQ, demo signup with lead scoring.
- Motion must animate transform and opacity only, with no layout shift, and must respect reduced motion.
- Pricing (€349 / €749 / €1,490 per month, 20% off annual) is the agency's invented demo pricing.

## Brand Commitments

- Name: **Ledgerline**. Hook line: "Close your books in 9 minutes, not 9 days."
- Voice: direct and confident, StoryBrand/Hormozi-style conversion copy: name the pain in euros
  and hours, make a strong guarantee, answer objections head-on.
- Binding visual constraints from the agency owner (recorded, not expanded): dark mode, strict
  bento grids, minimalist geometry, high-contrast type, smooth 120fps motion.

## Evidence on Hand

- None real. Ledgerline is a fictional company. Customer names, GMV, match rates and leakage
  figures on the page are illustrative demo content, and the footer says the company is fictional.
  Never present them as a real client's results outside this demo.
- No logos, photographs, testimonials or press exist. Do not fabricate testimonials or quotes.

## Product Principles

1. Lead with the outcome in time and euros, never with "AI".
2. Show the product doing the work (real-looking reconciliation UI), not abstract illustration.
3. Every claim about trust (read-only access, approval before posting, audit trail) is shown, not just stated.
4. Qualify honestly: tell sub-€1M brands they are probably too early.

## Accessibility & Inclusion

WCAG 2.2 AA contrast and keyboard access for every control; reduced-motion users get a resting
page with nothing hidden. _(inferred)_
