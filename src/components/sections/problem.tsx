import { FileSpreadsheet, Puzzle, TrendingDown } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tile } from "@/components/shared/tile";

const PAINS = [
  {
    icon: Puzzle,
    title: "Payouts never match deposits.",
    body: "Shopify batches 400 orders, nets out fees, refunds and reserves, then drops one number into your bank. Someone has to unpick it. By hand. Every single day.",
  },
  {
    icon: FileSpreadsheet,
    title: "Your controller is doing spreadsheet archaeology.",
    body: "60+ hours a month in CSV exports, VLOOKUPs and Slack threads asking “what is this €312.40?”. That's a senior hire paid to copy and paste.",
  },
  {
    icon: TrendingDown,
    title: "Money leaks out and nobody sees it.",
    body: "Duplicate refunds. Gateway overcharges. Chargebacks that expire before anyone responds. At €5M revenue that's typically €15–25k a year, gone quietly.",
  },
];

export function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <SectionHeading
          eyebrow="The month-end tax"
          title={
            <>
              You built a brand that ships thousands of orders.{" "}
              <span className="text-muted-2">Your books still close like it&apos;s 2009.</span>
            </>
          }
        />
      </Reveal>
      <div className="mt-14 grid gap-3 md:grid-cols-3">
        {PAINS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <Tile className="h-full">
              <p.icon className="size-5 text-accent" />
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-foreground">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </Tile>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-foreground">
          The result: you make inventory, hiring and ad-spend calls on numbers that are three weeks stale.{" "}
          <span className="text-accent">That&apos;s the real cost.</span>
        </p>
      </Reveal>
    </section>
  );
}
