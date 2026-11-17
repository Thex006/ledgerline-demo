import { FileSpreadsheet, Puzzle, TrendingDown } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tile } from "@/components/shared/tile";

const PAINS = [
  {
    icon: Puzzle,
    title: "Payouts that never match deposits",
    body: "Shopify batches 400 orders, nets out fees, refunds and reserves, then drops one number into your bank. Someone unpicks it by hand, every day.",
  },
  {
    icon: FileSpreadsheet,
    title: "A controller doing spreadsheet archaeology",
    body: "60+ hours a month in CSV exports, VLOOKUPs and Slack threads asking “what is this €312.40?”, so a senior hire gets paid to copy and paste.",
  },
  {
    icon: TrendingDown,
    title: "Revenue that leaks out unseen",
    body: "Duplicate refunds, gateway overcharges and chargebacks that expire unanswered cost a €5M brand €15–25k a year, based on Ledgerline’s first-month audits.",
  },
];

export function Problem() {
  return (
    <section className="screen">
      <div className="wrap">
        <SectionHeading
          eyebrow="The month-end tax"
          title="Your brand ships thousands of orders. Your books still close by hand."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PAINS.map((p) => (
            <Tile key={p.title} className="h-full">
              <p.icon className="size-5 text-accent" />
              <h3 className="mt-6 text-balance text-xl font-semibold tracking-[-0.02em] text-foreground">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </Tile>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-foreground">
          So inventory, hiring and ad-spend calls get made on numbers three weeks old.{" "}
          <span className="text-accent">That delay is the real cost.</span>
        </p>
      </div>
    </section>
  );
}
