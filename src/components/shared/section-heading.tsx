import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl md:leading-[1.05]">
        {title}
      </h2>
      {sub && <p className="mt-5 text-pretty text-base leading-relaxed text-muted md:text-lg">{sub}</p>}
    </div>
  );
}
