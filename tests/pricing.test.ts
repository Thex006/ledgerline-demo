import { describe, expect, it } from "vitest";
import { PLANS, monthlyPrice, recommendPlan, yearlyPrice } from "@/lib/pricing";

describe("pricing", () => {
  const scale = PLANS.find((p) => p.id === "scale")!;

  it("charges list price monthly", () => {
    expect(monthlyPrice(scale, "monthly")).toBe(749);
  });

  it("applies 20% off on annual billing", () => {
    expect(monthlyPrice(scale, "annual")).toBe(599);
    expect(yearlyPrice(scale, "annual")).toBe(599 * 12);
  });

  it("recommends the smallest plan covering revenue", () => {
    expect(recommendPlan(800_000).id).toBe("launch");
    expect(recommendPlan(3_000_000).id).toBe("launch");
    expect(recommendPlan(3_000_001).id).toBe("scale");
    expect(recommendPlan(12_000_000).id).toBe("plus");
    expect(recommendPlan(50_000_000).id).toBe("plus");
  });
});

import { formatCompactEUR } from "@/lib/utils";

describe("formatCompactEUR", () => {
  it("formats deterministically", () => {
    expect(formatCompactEUR(5_000_000)).toBe("€5M");
    expect(formatCompactEUR(2_500_000)).toBe("€2.5M");
    expect(formatCompactEUR(38_000)).toBe("€38k");
    expect(formatCompactEUR(-1_200)).toBe("-€1.2k");
  });
});
