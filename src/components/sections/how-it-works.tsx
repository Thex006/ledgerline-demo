import { Bot, FileCheck2, Plug } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tile } from "@/components/shared/tile";
import { PayoutMatch } from "@/components/hero/payout-match";

const STEPS = [
  {
    n: "01",
    icon: Plug,
    title: "Connect your stack in 4 minutes",
    body: "Shopify, PayPal, Klarna, Stripe, Amazon, your bank via open banking, and Xero, QuickBooks or NetSuite. Read-only access, set up by whoever owns the logins.",
  },
  {
    n: "02",
    icon: Bot,
    title: "Let the AI match every line",
    body: "Rules take the obvious 80%, AI proposes the messy rest. Each payout splits into orders, fees, refunds, FX and reserves, tied to its exact bank deposit.",
  },
  {
    n: "03",
    icon: FileCheck2,
    title: "Approve the journal and post",
    body: "Review 30 explained exceptions instead of 40,000 rows. One click posts summarised journals, with evidence on every number your auditor will ask about.",
  },
];

export function HowItWorks() {
  return (
    <section className="screen border-t border-border bg-card/30">
      <div className="wrap">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps from bank feed to closed books."
          sub="Ledgerline sits between your sales channels, your bank and your ledger, and does the matching your team does today."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-12">
          <ol className="grid gap-6 md:col-span-7">
            {STEPS.map((s) => (
              <li key={s.n}>
                <Tile className="flex gap-5">
                  <span className="font-mono text-sm text-accent">{s.n}</span>
                  <div>
                    <h3 className="flex items-center gap-3 text-lg font-semibold tracking-[-0.02em] text-foreground">
                      <s.icon className="size-4 text-muted" />
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </Tile>
              </li>
            ))}
          </ol>
          <PayoutMatch className="md:col-span-5" />
        </div>
      </div>
    </section>
  );
}
