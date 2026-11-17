import { z } from "zod";

export const ROLES = [
  { value: "founder", label: "Founder / CEO" },
  { value: "finance_lead", label: "CFO / Head of Finance" },
  { value: "controller", label: "Controller / Bookkeeper" },
  { value: "ops", label: "Operations / E-commerce lead" },
  { value: "agency", label: "Accountant or agency partner" },
  { value: "other", label: "Something else" },
] as const;

export const REVENUE_BANDS = [
  { value: "lt_1m", label: "Under €1M" },
  { value: "1_5m", label: "€1M – €5M" },
  { value: "5_10m", label: "€5M – €10M" },
  { value: "10_20m", label: "€10M – €20M" },
  { value: "gt_20m", label: "Over €20M" },
] as const;

export const ORDER_BANDS = [
  { value: "lt_2k", label: "Under 2,000 / month" },
  { value: "2_10k", label: "2,000 – 10,000 / month" },
  { value: "10_50k", label: "10,000 – 50,000 / month" },
  { value: "gt_50k", label: "Over 50,000 / month" },
] as const;

export const LEDGERS = [
  { value: "xero", label: "Xero" },
  { value: "quickbooks", label: "QuickBooks" },
  { value: "netsuite", label: "NetSuite" },
  { value: "other", label: "Other / spreadsheets" },
] as const;

type Values<T extends readonly { value: string }[]> = T[number]["value"];
const values = <T extends readonly { value: string }[]>(arr: T) =>
  arr.map((o) => o.value) as [Values<T>, ...Values<T>[]];

export const demoRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Tell us your name").max(120),
  workEmail: z.string().trim().toLowerCase().email("Use a valid work email").max(200),
  company: z.string().trim().min(2, "Which brand are you with?").max(160),
  role: z.enum(values(ROLES), { message: "Pick your role" }),
  revenueBand: z.enum(values(REVENUE_BANDS), { message: "Pick a revenue range" }),
  ordersBand: z.enum(values(ORDER_BANDS), { message: "Pick an order volume" }),
  storesCount: z.coerce.number().int().min(1).max(100).default(1),
  ledger: z.enum(values(LEDGERS)).optional(),
  utmSource: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  /** Honeypot: must stay empty. */
  website: z.string().max(0).optional(),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;
export type Role = DemoRequest["role"];
export type RevenueBand = DemoRequest["revenueBand"];
export type OrdersBand = DemoRequest["ordersBand"];
