import { NextResponse } from "next/server";
import { demoRequestSchema } from "@/lib/validation";
import { scoreLead } from "@/lib/lead-score";
import { insertDemoRequest } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      parsed.error.issues.map((i) => [String(i.path[0] ?? "form"), i.message]),
    );
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  // Honeypot filled: pretend success, store nothing.
  if (parsed.data.website) return NextResponse.json({ ok: true, tier: "cold" });

  const score = scoreLead(parsed.data);
  try {
    await insertDemoRequest(parsed.data, score);
  } catch (err) {
    console.error("[demo] insert failed", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your request. Please try again in a minute." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, tier: score.tier });
}
