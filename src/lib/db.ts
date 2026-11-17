import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { Pool } from "pg";
import type { DemoRequest } from "./validation";
import type { LeadScore } from "./lead-score";

declare global {
  var __ledgerlinePool: Pool | undefined;
  var __ledgerlineSchema: Promise<void> | undefined;
}

export class DatabaseNotConfiguredError extends Error {}

function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new DatabaseNotConfiguredError("DATABASE_URL is not set");
  if (!globalThis.__ledgerlinePool) {
    globalThis.__ledgerlinePool = new Pool({
      connectionString,
      max: 3,
      ssl: /localhost|127\.0\.0\.1/.test(connectionString) ? false : { rejectUnauthorized: false },
    });
  }
  return globalThis.__ledgerlinePool;
}

/** Applies db/001_demo_requests.sql once per server instance (idempotent: create ... if not exists). */
function ensureSchema(pool: Pool): Promise<void> {
  if (!globalThis.__ledgerlineSchema) {
    const sql = readFileSync(path.join(process.cwd(), "db", "001_demo_requests.sql"), "utf8");
    globalThis.__ledgerlineSchema = pool.query(sql).then(
      () => undefined,
      (err) => {
        globalThis.__ledgerlineSchema = undefined;
        throw err;
      },
    );
  }
  return globalThis.__ledgerlineSchema;
}

export async function insertDemoRequest(lead: DemoRequest, score: LeadScore): Promise<{ id: string }> {
  const pool = getPool();
  await ensureSchema(pool);
  const { rows } = await pool.query<{ id: string }>(
    `insert into demo_requests
       (full_name, work_email, company, role, revenue_band, orders_band, stores_count,
        ledger, lead_score, lead_tier, score_breakdown, utm_source, utm_campaign)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     on conflict (work_email, company) do update set
        full_name = excluded.full_name,
        role = excluded.role,
        revenue_band = excluded.revenue_band,
        orders_band = excluded.orders_band,
        stores_count = excluded.stores_count,
        ledger = excluded.ledger,
        lead_score = excluded.lead_score,
        lead_tier = excluded.lead_tier,
        score_breakdown = excluded.score_breakdown,
        updated_at = now()
     returning id`,
    [
      lead.fullName,
      lead.workEmail,
      lead.company,
      lead.role,
      lead.revenueBand,
      lead.ordersBand,
      lead.storesCount,
      lead.ledger ?? null,
      score.score,
      score.tier,
      JSON.stringify(score.breakdown),
      lead.utmSource ?? null,
      lead.utmCampaign ?? null,
    ],
  );
  return rows[0];
}
