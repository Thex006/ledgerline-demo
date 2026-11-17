export type BillingCycle = "monthly" | "annual";

export type PlanId = "launch" | "scale" | "plus";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  /** Price per month when billed monthly, in EUR. */
  monthly: number;
  /** Upper bound of annual revenue this plan is built for, in EUR. */
  revenueCap: number;
  features: string[];
  cta: string;
  featured?: boolean;
}

/** Annual billing discount (20%). */
export const ANNUAL_DISCOUNT = 0.2;

export const PLANS: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    tagline: "For brands crossing €1M who are done with spreadsheet closes.",
    monthly: 349,
    revenueCap: 3_000_000,
    features: [
      "1 Shopify store, up to 3 payment gateways",
      "Daily auto-reconciliation of payouts, fees & refunds",
      "Xero or QuickBooks sync",
      "Exceptions inbox with plain-English explanations",
      "Email support, 1 business-day response",
    ],
    cta: "Start with Launch",
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For €3M–€10M brands selling across stores, markets and currencies.",
    monthly: 749,
    revenueCap: 10_000_000,
    features: [
      "Up to 3 stores and unlimited gateways",
      "Multi-currency & FX gain/loss posting",
      "Leakage Radar: duplicate refunds, fee overcharges, lost chargebacks",
      "Klarna, PayPal, Amazon & marketplace payouts",
      "Guided first close with a specialist, Slack support",
    ],
    cta: "Book a Scale demo",
    featured: true,
  },
  {
    id: "plus",
    name: "Plus",
    tagline: "For €10M–€20M operators with entities, auditors and a CFO to impress.",
    monthly: 1490,
    revenueCap: 20_000_000,
    features: [
      "Unlimited stores and legal entities",
      "NetSuite & Sage Intacct sync",
      "Intercompany & consolidation-ready journals",
      "Auditor portal with line-level evidence",
      "Dedicated account manager, SSO and DPA",
    ],
    cta: "Talk to us about Plus",
  },
];

/** Effective monthly price for a plan in the given billing cycle. */
export function monthlyPrice(plan: Pick<Plan, "monthly">, cycle: BillingCycle): number {
  return cycle === "annual" ? Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT)) : plan.monthly;
}

/** Total yearly spend for a plan in the given billing cycle. */
export function yearlyPrice(plan: Pick<Plan, "monthly">, cycle: BillingCycle): number {
  return monthlyPrice(plan, cycle) * 12;
}

/** Smallest plan whose revenue cap covers the given annual revenue. */
export function recommendPlan(annualRevenue: number): Plan {
  return PLANS.find((p) => annualRevenue <= p.revenueCap) ?? PLANS[PLANS.length - 1];
}
