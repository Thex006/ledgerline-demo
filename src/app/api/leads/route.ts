import { NextResponse } from "next/server";
import { listDemoRequests } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Local-only peek at stored leads. Disabled in production builds. */
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ leads: await listDemoRequests() });
}
