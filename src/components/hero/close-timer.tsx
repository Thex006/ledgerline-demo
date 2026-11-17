"use client";

import { motion, useMotionValueEvent, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { Tile, TileLabel } from "@/components/shared/tile";

const ease = [0.22, 1, 0.36, 1] as const;
const TOTAL = 48213;

export function CloseTimer({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const countRef = useRef<HTMLSpanElement>(null);
  const count = useSpring(0, { stiffness: 40, damping: 20 });
  useMotionValueEvent(count, "change", (v) => {
    if (countRef.current) countRef.current.textContent = Math.round(v).toLocaleString("en-IE");
  });

  // Runs once on load as part of the hero entrance.
  useEffect(() => {
    if (reduce) count.jump(TOTAL);
    else count.set(TOTAL);
  }, [reduce, count]);

  return (
    <Tile className={className}>
      <div className="flex h-full flex-col justify-between gap-5">
        <div className="flex items-start justify-between gap-4">
          <TileLabel>October close</TileLabel>
          <span className="font-mono text-xs text-accent">Closed ✓</span>
        </div>
        <div className="space-y-4">
          <Bar label="Before Ledgerline" value="9 days" scale={1} muted reduce={!!reduce} />
          <Bar label="With Ledgerline" value="9 min" scale={0.04} reduce={!!reduce} delay={0.35} />
        </div>
        <p className="text-sm text-muted">
          <span ref={countRef} className="inline-block min-w-[3.6em] font-mono tabular-nums text-foreground">0</span> transactions
          matched to the ledger. 31 exceptions explained. 0 spreadsheets opened.
        </p>
      </div>
    </Tile>
  );
}

function Bar({
  label,
  value,
  scale,
  muted,
  reduce,
  delay = 0,
}: {
  label: string;
  value: string;
  scale: number;
  muted?: boolean;
  reduce: boolean;
  delay?: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className={muted ? "font-mono text-muted" : "font-mono text-2xl font-semibold text-accent"}>{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.05]">
        <motion.div
          className={muted ? "h-full w-full origin-left rounded-full bg-white/20" : "h-full w-full origin-left rounded-full bg-accent"}
          initial={reduce ? { scaleX: scale } : { scaleX: 0 }}
          animate={{ scaleX: scale }}
          transition={{ duration: muted ? 1.4 : 0.5, delay: 0.6 + delay, ease }}
        />
      </div>
    </div>
  );
}
