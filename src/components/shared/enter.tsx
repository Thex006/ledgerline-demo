import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** One-time hero entrance on page load. Pure CSS (transform/opacity), disabled under reduced motion. */
export function Enter({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={cn("enter", className)} style={{ "--enter-delay": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
