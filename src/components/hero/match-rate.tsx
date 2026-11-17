"use client";

import { motion, useReducedMotion } from "motion/react";
import { Tile, TileLabel } from "@/components/shared/tile";

const CELLS = 48;
const FLAGGED = new Set([37]);

export function MatchRate({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <Tile className={className}>
      <TileLabel>Auto-match rate</TileLabel>
      <p className="mt-3 text-4xl font-semibold md:text-5xl tracking-[-0.04em] text-foreground">
        99.7<span className="text-muted">%</span>
      </p>
      <div className="mt-4 grid grid-cols-12 gap-1" aria-hidden>
        {Array.from({ length: CELLS }, (_, i) => (
          <motion.span
            key={i}
            className={FLAGGED.has(i) ? "aspect-square rounded-[3px] bg-warn" : "aspect-square rounded-[3px] bg-accent/80"}
            initial={reduce ? false : { opacity: 0.08 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.018 }}
          />
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">The 0.3% lands in your exceptions inbox, already explained.</p>
    </Tile>
  );
}
