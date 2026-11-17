import { Check } from "lucide-react";
import { Tile, TileLabel } from "@/components/shared/tile";

const LINES = [
  ["Gross sales (412 orders)", "€19,880.40"],
  ["Shopify fees", "−€578.53"],
  ["Refunds (7)", "−€812.70"],
  ["Rolling reserve", "−€87.00"],
] as const;

/** Static product fragment: one Shopify payout broken down and matched to its bank deposit. */
export function PayoutMatch({ className }: { className?: string }) {
  return (
    <Tile className={className}>
      <div className="flex items-center justify-between">
        <TileLabel>Payout PO-48213 ↔ Bank</TileLabel>
        <span className="rounded-full bg-accent/12 px-2.5 py-1 font-mono text-[11px] text-accent ring-1 ring-inset ring-accent/25">
          Matched in 0.4s
        </span>
      </div>
      <dl className="mt-5 space-y-3 font-mono text-[13px]">
        {LINES.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 border-b border-border pb-3">
            <dt className="truncate text-muted">{k}</dt>
            <dd className="tabular-nums text-foreground">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] text-muted-2">Deposited to Revolut Business</p>
          <p className="mt-1 font-mono text-2xl tabular-nums text-foreground">€18,402.17</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-ink" aria-label="Matched">
          <Check className="size-4" strokeWidth={3} />
        </span>
      </div>
      <p className="mt-5 border-t border-border pt-4 text-sm text-muted">
        Journal ready: 4 lines to Xero, evidence attached. <span className="text-foreground">Approve with one click.</span>
      </p>
    </Tile>
  );
}
