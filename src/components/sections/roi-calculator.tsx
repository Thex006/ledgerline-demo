"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tile, TileLabel } from "@/components/shared/tile";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { calculateRoi, AUTOMATION_RATE, LEAKAGE_RATE } from "@/lib/roi";
import { formatCompactEUR, formatEUR } from "@/lib/utils";

interface Field {
  key: "annualRevenue" | "monthlyHours" | "hourlyCost";
  label: string;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
}

const FIELDS: Field[] = [
  { key: "annualRevenue", label: "Annual Shopify revenue", min: 1_000_000, max: 20_000_000, step: 500_000, format: formatCompactEUR },
  { key: "monthlyHours", label: "Hours spent reconciling / month", min: 10, max: 200, step: 5, format: (n) => `${n} h` },
  { key: "hourlyCost", label: "Loaded cost per finance hour", min: 30, max: 120, step: 5, format: (n) => `€${n}` },
];

export function RoiCalculator() {
  const [values, setValues] = useState({ annualRevenue: 5_000_000, monthlyHours: 60, hourlyCost: 55 });
  const r = useMemo(() => calculateRoi(values), [values]);

  return (
    <section id="roi" className="screen scroll-mt-16">
      <div className="wrap">
        <SectionHeading
          eyebrow="ROI calculator"
          title="What manual reconciliation costs your brand."
          sub="Move the sliders to match your numbers. Results use median outcomes across Ledgerline customers."
        />

      <div className="mt-12">
        <div className="grid gap-6 md:grid-cols-12">
          <Tile className="md:col-span-5">
            <div className="space-y-8">
              {FIELDS.map((f) => (
                <div key={f.key}>
                  <div className="mb-4 flex items-baseline justify-between gap-4">
                    <label id={`roi-${f.key}`} className="text-sm text-muted">
                      {f.label}
                    </label>
                    <span className="min-w-[5.5rem] text-right font-mono text-lg tabular-nums text-foreground">
                      {f.format(values[f.key])}
                    </span>
                  </div>
                  <Slider
                    aria-labelledby={`roi-${f.key}`}
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={[values[f.key]]}
                    onValueChange={([v]) => setValues((s) => ({ ...s, [f.key]: v }))}
                  />
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-2">
              Assumes Ledgerline automates {Math.round(AUTOMATION_RATE * 100)}% of reconciliation hours and recovers{" "}
              {(LEAKAGE_RATE * 100).toFixed(2)}% of revenue in missed refunds, fee overcharges and lost chargebacks.
              Plan cost uses annual billing.
            </p>
          </Tile>

          <div className="grid gap-6 sm:grid-cols-2 md:col-span-7">
            <Tile className="sm:col-span-2 bg-accent text-accent-ink border-transparent">
              <TileLabel className="text-accent-ink/70">Net gain in year one</TileLabel>
              <p className="mt-3 text-4xl font-semibold tabular-nums tracking-[-0.04em] md:text-6xl" aria-live="polite">
                {formatEUR(r.netGain)}
              </p>
              <p className="mt-3 text-sm font-medium text-accent-ink/80">
                {r.roiMultiple.toFixed(1)}x return on the {r.plan.name} plan ({formatEUR(r.planCost)}/yr).
              </p>
            </Tile>
            <Metric label="Hours handed back / year" value={`${r.hoursSavedPerYear.toLocaleString("en-IE")} h`} note={`Worth ${formatEUR(r.laborSavings)} in finance time`} />
            <Metric label="Leakage recovered / year" value={formatEUR(r.leakageRecovered)} note="Refunds, fees and chargebacks you're currently eating" />
            <Metric label="Payback period" value={Number.isFinite(r.paybackDays) ? `${r.paybackDays} days` : "—"} note="Most customers pay it back inside their first close" />
            <Tile className="flex flex-col justify-between gap-5">
              <div>
                <TileLabel>Recommended</TileLabel>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">{r.plan.name}</p>
              </div>
              <Button asChild variant="secondary" size="sm" className="self-start">
                <a href="#demo">
                  Claim these numbers <ArrowRight />
                </a>
              </Button>
            </Tile>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Tile>
      <TileLabel>{label}</TileLabel>
      <p className="mt-3 text-3xl font-semibold tabular-nums tracking-[-0.03em] text-foreground">{value}</p>
      <p className="mt-2 text-sm text-muted">{note}</p>
    </Tile>
  );
}
