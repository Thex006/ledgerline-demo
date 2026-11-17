"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Tile, TileLabel } from "@/components/shared/tile";

const LINES = [
  ["Gross sales (412 orders)", "€19,880.40"],
  ["Shopify fees", "−€578.53"],
  ["Refunds (7)", "−€812.70"],
  ["Rolling reserve", "−€87.00"],
] as const;

export function PayoutMatch({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <Tile className={className}>
      <TileLabel>Payout ↔ Bank</TileLabel>
      <dl className="mt-4 space-y-2 font-mono text-[12px]">
        {LINES.map(([k, v], i) => (
          <motion.div
            key={k}
            className="flex justify-between gap-3"
            initial={reduce ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
          >
            <dt className="truncate text-muted">{k}</dt>
            <dd className="tabular-nums text-foreground">{v}</dd>
          </motion.div>
        ))}
      </dl>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="font-mono text-[11px] text-muted-2">Deposited · Revolut Business</p>
          <p className="font-mono text-lg tabular-nums text-foreground">€18,402.17</p>
        </div>
        <motion.span
          className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-ink"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.9 }}
          aria-label="Matched"
        >
          <Check className="size-4" strokeWidth={3} />
        </motion.span>
      </div>
    </Tile>
  );
}
