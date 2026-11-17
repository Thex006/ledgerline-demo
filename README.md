# Ledgerline

Marketing site for Ledgerline, a fictional AI reconciliation SaaS for Shopify brands doing €1M–€20M. It's an agency portfolio demo.

## Run it locally (free, no accounts needed)

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The demo form stores leads in **embedded Postgres (PGlite)** under `.data/pglite`, so you don't need to install or pay for anything. The table creates itself on the first signup. To see stored leads with their score and tier while `npm run dev` is running, open http://localhost:3000/api/leads (this only works in dev).

To use a real Postgres instead (local, Supabase, Neon...), set `DATABASE_URL` in `.env.local`.

## Checks

```bash
npx vitest run   # pricing, ROI, lead scoring, validation
npm run lint
npm run build
```

## Where things live

- `src/components/sections/*`: page sections (hero, problem, how it works, ROI, pricing, FAQ, demo signup)
- `src/components/hero/*`: animated product-UI tiles
- `src/lib/*`: pure logic (`roi.ts`, `pricing.ts`, `lead-score.ts`, `validation.ts`) and `db.ts`
- `src/app/api/demo/route.ts`: validates, scores and stores demo requests
- `db/001_demo_requests.sql`: schema
- `PRODUCT.md`: product context for the Impeccable design skill
