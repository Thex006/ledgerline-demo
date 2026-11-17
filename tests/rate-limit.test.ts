import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit per window, then blocks, then resets", () => {
    const allow = createRateLimiter({ limit: 3, windowMs: 1000 });
    expect([allow("a", 0), allow("a", 1), allow("a", 2)]).toEqual([true, true, true]);
    expect(allow("a", 3)).toBe(false);
    expect(allow("b", 3)).toBe(true);
    expect(allow("a", 1000)).toBe(true);
  });
});
