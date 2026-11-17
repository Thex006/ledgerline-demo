import { Bot, FileCheck2, Globe2, Inbox, Plug, Radar } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tile, TileLabel } from "@/components/shared/tile";

const STEPS = [
  {
    n: "01",
    icon: Plug,
    title: "Connect in 4 minutes.",
    body: "Shopify, Shopify Payments, PayPal, Klarna, Stripe, Amazon, your bank via open banking, and Xero, QuickBooks or NetSuite. Read-only. No engineers, no CSVs.",
  },
  {
    n: "02",
    icon: Bot,
    title: "AI matches every line.",
    body: "Deterministic rules first, AI for the messy 20%. Payouts split into orders, fees, refunds, FX and reserves, then tied to the exact bank deposit. Backfills 12 months in under an hour.",
  },
  {
    n: "03",
    icon: FileCheck2,
    title: "Approve and post.",
    body: "Review exceptions, not rows. One click posts clean, summarised journals to your ledger, with evidence attached to every number your auditor will ever ask about.",
  },
];

const FEATURES = [
  { icon: Inbox, title: "Exceptions inbox", body: "Every unmatched line arrives explained in plain English, with a suggested fix." },
  { icon: Radar, title: "Leakage Radar", body: "Flags duplicate refunds, fee overcharges and chargebacks before the response deadline." },
  { icon: Globe2, title: "Multi-store, multi-currency", body: "EU, UK and US storefronts in one close. FX gains and losses posted automatically." },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="From 9 days of reconciliation to one coffee."
            sub="Ledgerline sits between your sales channels, your bank and your ledger, and does the matching your team does today, at 400x the speed."
          />
        </Reveal>
        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <Tile className="h-full">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-accent">{s.n}</span>
                  <s.icon className="size-5 text-muted" />
                </div>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em] text-foreground">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
              </Tile>
            </Reveal>
          ))}
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={0.1 + i * 0.06}>
              <Tile className="flex h-full items-start gap-4 bg-background">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card-2">
                  <f.icon className="size-4 text-accent" />
                </span>
                <div>
                  <TileLabel className="text-foreground">{f.title}</TileLabel>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                </div>
              </Tile>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
