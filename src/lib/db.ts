import "server-only";
import { Pool } from "pg";
import type { DemoRequest } from "./validation";
import type { LeadScore } from "./lead-score";

declare global {
  var __ledgerlinePool: Pool | undefined;
}

function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  if (!globalThis.__ledgerlinePool) {
    globalThis.__ledgerlinePool = new Pool({
      connectionString,
      max: 3,
      ssl: /localhost|127\.0\.0\.1/.test(connectionString) ? false : { rejectUnauthorized: false },
    });
  }
  return globalThis.__ledgerlinePool;
}

export async function insertDemoRequest(lead: DemoRequest, score: LeadScore): Promise<{ id: string }> {
  const { rows } = await getPool().query<{ id: string }>(
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
