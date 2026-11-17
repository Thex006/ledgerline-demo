import type { DemoRequest, OrdersBand, RevenueBand, Role } from "./validation";

export type LeadTier = "hot" | "warm" | "cold";

export interface LeadScore {
  score: number;
  tier: LeadTier;
  breakdown: Record<"revenue" | "role" | "orders" | "stores" | "email", number>;
}

const REVENUE_POINTS: Record<RevenueBand, number> = {
  lt_1m: 5,
  "1_5m": 30,
  "5_10m": 40,
  "10_20m": 40,
  gt_20m: 20,
};

const ROLE_POINTS: Record<Role, number> = {
  founder: 20,
  finance_lead: 20,
  controller: 12,
  ops: 10,
  agency: 12,
  other: 0,
};

const ORDER_POINTS: Record<OrdersBand, number> = {
  lt_2k: 3,
  "2_10k": 10,
  "10_50k": 15,
  gt_50k: 15,
};

export const FREE_MAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.de",
  "gmx.net",
  "web.de",
  "mail.com",
  "yandex.com",
]);

export function isWorkEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return Boolean(domain) && !FREE_MAIL_DOMAINS.has(domain!);
}

export function tierFor(score: number): LeadTier {
  if (score >= 70) return "hot";
  if (score >= 40) return "warm";
  return "cold";
}

type ScoreInput = Pick<DemoRequest, "revenueBand" | "role" | "ordersBand" | "storesCount" | "workEmail">;

/** Scores a demo request 0–100 against Ledgerline's ICP (€1M–€20M Shopify brands). */
export function scoreLead(lead: ScoreInput): LeadScore {
  const breakdown = {
    revenue: REVENUE_POINTS[lead.revenueBand],
    role: ROLE_POINTS[lead.role],
    orders: ORDER_POINTS[lead.ordersBand],
    stores: lead.storesCount >= 3 ? 15 : lead.storesCount === 2 ? 8 : 0,
    email: isWorkEmail(lead.workEmail) ? 10 : 0,
  };
  const score = Math.min(100, Object.values(breakdown).reduce((a, b) => a + b, 0));
  return { score, tier: tierFor(score), breakdown };
}
