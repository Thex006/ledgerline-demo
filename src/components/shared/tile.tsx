import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Base bento tile: hairline border, flat surface, consistent padding. */
export function Tile({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[var(--radius)] border border-border bg-card p-5 md:p-6", className)}>
      {children}
    </div>
  );
}

export function TileLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs uppercase tracking-[0.14em] text-muted", className)}>{children}</p>
  );
}
