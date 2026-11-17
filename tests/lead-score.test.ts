import { describe, expect, it } from "vitest";
import { isWorkEmail, scoreLead, tierFor } from "@/lib/lead-score";
import { demoRequestSchema } from "@/lib/validation";

describe("lead scoring", () => {
  it("scores an ideal ICP lead as hot", () => {
    const s = scoreLead({
      revenueBand: "5_10m",
      role: "finance_lead",
      ordersBand: "10_50k",
      storesCount: 3,
      workEmail: "cfo@nordhaus.eu",
    });
    expect(s.score).toBe(100);
    expect(s.tier).toBe("hot");
  });

  it("penalises free-mail, sub-€1M, single-store leads", () => {
    const s = scoreLead({
      revenueBand: "lt_1m",
      role: "other",
      ordersBand: "lt_2k",
      storesCount: 1,
      workEmail: "someone@gmail.com",
    });
    expect(s.score).toBe(8);
    expect(s.tier).toBe("cold");
    expect(s.breakdown.email).toBe(0);
  });

  it("lands a mid-fit lead in warm", () => {
    const s = scoreLead({
      revenueBand: "1_5m",
      role: "ops",
      ordersBand: "2_10k",
      storesCount: 1,
      workEmail: "ops@brand.com",
    });
    expect(s.score).toBe(60);
    expect(s.tier).toBe("warm");
  });

  it("tier thresholds are inclusive", () => {
    expect(tierFor(70)).toBe("hot");
    expect(tierFor(69)).toBe("warm");
    expect(tierFor(40)).toBe("warm");
    expect(tierFor(39)).toBe("cold");
  });

  it("detects work email", () => {
    expect(isWorkEmail("a@acme.io")).toBe(true);
    expect(isWorkEmail("a@Gmail.com")).toBe(false);
    expect(isWorkEmail("broken")).toBe(false);
  });
});

describe("demoRequestSchema", () => {
  const valid = {
    fullName: "Lena Brandt",
    workEmail: "  Lena@Saltmere.com ",
    company: "Saltmere",
    role: "founder",
    revenueBand: "1_5m",
    ordersBand: "2_10k",
    storesCount: "2",
  };

  it("normalises email and coerces stores", () => {
    const r = demoRequestSchema.parse(valid);
    expect(r.workEmail).toBe("lena@saltmere.com");
    expect(r.storesCount).toBe(2);
  });

  it("rejects bad enum values and filled honeypot", () => {
    expect(demoRequestSchema.safeParse({ ...valid, role: "ceo" }).success).toBe(false);
    expect(demoRequestSchema.safeParse({ ...valid, website: "spam.com" }).success).toBe(false);
  });
});
