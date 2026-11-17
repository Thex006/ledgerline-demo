"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Tile, TileLabel } from "@/components/shared/tile";
import { cn } from "@/lib/utils";

type Status = "matched" | "fee" | "refund" | "flagged";

interface Txn {
  id: number;
  source: string;
  ref: string;
  amount: string;
  status: Status;
}

const POOL: Omit<Txn, "id">[] = [
  { source: "Shopify Payments", ref: "PO-48213", amount: "€18,402.17", status: "matched" },
  { source: "Klarna", ref: "KL-99120", amount: "€6,118.40", status: "fee" },
  { source: "PayPal", ref: "PP-3J81Q", amount: "−€214.90", status: "refund" },
  { source: "Shopify Payments", ref: "PO-48214", amount: "€22,087.03", status: "matched" },
  { source: "Stripe", ref: "ST-7731A", amount: "€1,940.00", status: "matched" },
  { source: "Shopify Payments", ref: "CB-00412", amount: "−€89.00", status: "flagged" },
  { source: "Amazon EU", ref: "AMZ-5521", amount: "€9,310.55", status: "fee" },
  { source: "PayPal", ref: "PP-3J90X", amount: "€3,402.11", status: "matched" },
  { source: "Shopify Payments", ref: "PO-48215", amount: "€15,771.62", status: "matched" },
  { source: "Klarna", ref: "KL-99131", amount: "−€129.00", status: "refund" },
];

const STATUS: Record<Status, { label: string; className: string }> = {
  matched: { label: "Matched", className: "bg-accent/12 text-accent ring-accent/25" },
  fee: { label: "Fees split", className: "bg-white/[0.06] text-foreground ring-border-strong" },
  refund: { label: "Refund linked", className: "bg-white/[0.06] text-foreground ring-border-strong" },
  flagged: { label: "Chargeback · act in 6d", className: "bg-warn/10 text-warn ring-warn/30" },
};

const VISIBLE = 6;

export function ReconFeed({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [rows, setRows] = useState<Txn[]>(() => POOL.slice(0, VISIBLE).map((t, i) => ({ ...t, id: i })));

  useEffect(() => {
    if (reduce) return;
    let next = VISIBLE;
    const t = setInterval(() => {
      setRows((prev) => [{ ...POOL[next % POOL.length], id: next++ }, ...prev].slice(0, VISIBLE));
    }, 1800);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <Tile className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <TileLabel>Live reconciliation</TileLabel>
        <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Syncing
        </span>
      </div>
      <ul className="relative mt-3 h-[260px] overflow-hidden" aria-label="Recently reconciled transactions">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((r) => (
            <motion.li
              key={r.id}
              layout
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-[52px] items-center justify-between gap-3 border-b border-border text-sm last:border-0"
            >
              <div className="min-w-0">
                <p className="truncate text-foreground">{r.source}</p>
                <p className="font-mono text-xs text-muted-2">{r.ref}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono tabular-nums text-foreground">{r.amount}</span>
                <span
                  className={cn(
                    "hidden rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset sm:inline-block",
                    STATUS[r.status].className,
                  )}
                >
                  {STATUS[r.status].label}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
      </ul>
    </Tile>
  );
}
