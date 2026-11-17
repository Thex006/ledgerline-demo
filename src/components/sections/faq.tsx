import { SectionHeading } from "@/components/shared/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQS = [
  {
    q: "Our accountant already handles reconciliation. Why would we need this?",
    a: "Keep them. Ledgerline makes them roughly 10x faster: they review 30 explained exceptions instead of 40,000 rows. Their accountants end up our biggest fans, because they spend billable hours on advice instead of data entry. We also have a partner program for firms.",
  },
  {
    q: "Can I actually trust AI with my books?",
    a: "You don’t have to trust it blindly. Deterministic rules handle the obvious 80%, AI proposes matches for the messy remainder, and nothing posts to your ledger without your approval. Every match carries its evidence (order IDs, payout lines, bank references) so you or your auditor can trace any number in two clicks.",
  },
  {
    q: "How long does setup take? We don’t have engineers to spare.",
    a: "Connecting takes about four minutes and needs zero engineering. We backfill the last 12 months in under an hour, and on Scale and Plus a reconciliation specialist runs your first close with you live. The median team finishes its first Ledgerline close 6 days after signing up.",
  },
  {
    q: "We have multiple stores, currencies or entities. Will it cope?",
    a: "That’s exactly where spreadsheets break and Ledgerline shines. Scale handles up to 3 stores with multi-currency and FX posting. Plus handles unlimited stores and legal entities, intercompany flows and NetSuite or Sage Intacct.",
  },
  {
    q: "Is our financial data secure?",
    a: "SOC 2 Type II audited, GDPR compliant, hosted in Frankfurt, encrypted at rest and in transit. Bank and store connections are read-only, so Ledgerline cannot move money. We sign a DPA with every customer, and Plus customers get SSO and custom retention.",
  },
  {
    q: "What if it doesn’t work for our business?",
    a: "Then you don’t pay. Our Day-One Close Guarantee refunds every cent if your second month-end takes longer than one working day. Monthly plans cancel anytime; annual plans are fully refundable in the first 60 days.",
  },
  {
    q: "We’re under €1M in revenue. Is Ledgerline for us?",
    a: "Honestly, probably not yet. Below roughly 2,000 orders a month a good bookkeeper and a spreadsheet is still cheaper. Book a demo anyway and we’ll send you our free month-end checklist, then come back when you’ve outgrown it.",
  },
];

const STATS = [
  { value: "€2.1B", label: "GMV reconciled" },
  { value: "99.7%", label: "Lines auto-matched" },
  { value: "9 min", label: "Median monthly close" },
  { value: "€38k", label: "Avg. leakage found, year one" },
];

export function Faq() {
  return (
    <section id="faq" className="screen scroll-mt-16">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5 md:pr-10">
          <SectionHeading
            eyebrow="Objections, answered"
            title="The questions finance leads ask before switching."
          />
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border">
            {STATS.map((s) => (
              <div key={s.label} className="bg-card p-5">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Accordion type="single" collapsible className="border-t border-border md:col-span-7">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
