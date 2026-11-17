import "server-only";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { Pool } from "pg";
import type { DemoRequest } from "./validation";
import type { LeadScore } from "./lead-score";

/**
 * Minimal query surface shared by real Postgres (pg) and embedded Postgres (PGlite).
 * - DATABASE_URL set   -> pg Pool (Supabase, Neon, local Postgres...)
 * - DATABASE_URL unset -> PGlite, a WASM build of Postgres persisted to ./.data/pglite (free, zero setup)
 */
interface Db {
  exec(sql: string): Promise<void>;
  query<T>(sql: string, params: unknown[]): Promise<T[]>;
}

declare global {
  var __ledgerlineDb: Promise<Db> | undefined;
}

async function createDb(): Promise<Db> {
  const connectionString = process.env.DATABASE_URL;
  if (connectionString) {
    const pool = new Pool({
      connectionString,
      max: 3,
      ssl: /localhost|127\.0\.0\.1/.test(connectionString) ? false : { rejectUnauthorized: false },
    });
    return {
      exec: async (sql) => void (await pool.query(sql)),
      query: async (sql, params) => (await pool.query(sql, params)).rows,
    };
  }
  const { PGlite } = await import("@electric-sql/pglite");
  const dataDir = process.env.PGLITE_DIR ?? path.join(process.cwd(), ".data", "pglite");
  mkdirSync(path.dirname(dataDir), { recursive: true });
  const lite = await PGlite.create(dataDir);
  return {
    exec: async (sql) => void (await lite.exec(sql)),
    query: async <T,>(sql: string, params: unknown[]) => (await lite.query<T>(sql, params)).rows,
  };
}

/** Connects once per server instance and applies db/001_demo_requests.sql (idempotent). */
function getDb(): Promise<Db> {
  if (!globalThis.__ledgerlineDb) {
    globalThis.__ledgerlineDb = (async () => {
      const db = await createDb();
      await db.exec(readFileSync(path.join(process.cwd(), "db", "001_demo_requests.sql"), "utf8"));
      return db;
    })().catch((err) => {
      globalThis.__ledgerlineDb = undefined;
      throw err;
    });
  }
  return globalThis.__ledgerlineDb;
}

export async function insertDemoRequest(lead: DemoRequest, score: LeadScore): Promise<{ id: string }> {
  const db = await getDb();
  const rows = await db.query<{ id: string }>(
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

/** Most recent leads (local dev only, see /api/leads). */
export async function listDemoRequests(limit = 20) {
  const db = await getDb();
  return db.query<Record<string, unknown>>(
    "select created_at, full_name, company, lead_score, lead_tier from demo_requests order by created_at desc limit $1",
    [limit],
  );
}
