import { describe, expect, it } from "vitest";
import { AUTOMATION_RATE, LEAKAGE_RATE, calculateRoi } from "@/lib/roi";

describe("calculateRoi", () => {
  it("computes labour savings, leakage and payback for a €5M brand", () => {
    const r = calculateRoi({ annualRevenue: 5_000_000, monthlyHours: 60, hourlyCost: 55 });
    expect(r.plan.id).toBe("scale");
    expect(r.hoursSavedPerYear).toBe(Math.round(60 * 12 * AUTOMATION_RATE));
    expect(r.laborSavings).toBe(r.hoursSavedPerYear * 55);
    expect(r.leakageRecovered).toBeCloseTo(5_000_000 * LEAKAGE_RATE);
    expect(r.planCost).toBe(599 * 12);
    expect(r.netGain).toBeCloseTo(r.totalBenefit - r.planCost);
    expect(r.roiMultiple).toBeGreaterThan(1);
    expect(r.paybackDays).toBeGreaterThan(0);
    expect(r.paybackDays).toBeLessThan(365);
  });

  it("clamps negative inputs and never returns NaN", () => {
    const r = calculateRoi({ annualRevenue: -10, monthlyHours: -5, hourlyCost: -1 });
    expect(r.totalBenefit).toBe(0);
    expect(r.paybackDays).toBe(Infinity);
    expect(Number.isNaN(r.roiMultiple)).toBe(false);
  });
});
