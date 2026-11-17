import { recommendPlan, yearlyPrice, type Plan } from "./pricing";

export interface RoiInput {
  /** Annual Shopify revenue in EUR. */
  annualRevenue: number;
  /** Hours your team spends reconciling each month. */
  monthlyHours: number;
  /** Fully loaded cost of one finance hour in EUR. */
  hourlyCost: number;
}

export interface RoiResult {
  plan: Plan;
  hoursSavedPerYear: number;
  laborSavings: number;
  leakageRecovered: number;
  totalBenefit: number;
  planCost: number;
  netGain: number;
  roiMultiple: number;
  paybackDays: number;
}

/** Share of manual reconciliation hours Ledgerline removes (customer median). */
export const AUTOMATION_RATE = 0.92;
/** Revenue lost to unmatched refunds, fee overcharges and missed chargebacks (customer median). */
export const LEAKAGE_RATE = 0.0035;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function calculateRoi(input: RoiInput): RoiResult {
  const annualRevenue = clamp(input.annualRevenue, 0, 1e9);
  const monthlyHours = clamp(input.monthlyHours, 0, 2000);
  const hourlyCost = clamp(input.hourlyCost, 0, 1000);

  const plan = recommendPlan(annualRevenue);
  const planCost = yearlyPrice(plan, "annual");

  const hoursSavedPerYear = Math.round(monthlyHours * 12 * AUTOMATION_RATE);
  const laborSavings = hoursSavedPerYear * hourlyCost;
  const leakageRecovered = annualRevenue * LEAKAGE_RATE;
  const totalBenefit = laborSavings + leakageRecovered;
  const netGain = totalBenefit - planCost;
  const roiMultiple = planCost > 0 ? totalBenefit / planCost : 0;
  const paybackDays = totalBenefit > 0 ? Math.ceil((planCost / totalBenefit) * 365) : Infinity;

  return {
    plan,
    hoursSavedPerYear,
    laborSavings,
    leakageRecovered,
    totalBenefit,
    planCost,
    netGain,
    roiMultiple,
    paybackDays,
  };
}
