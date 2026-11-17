"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ANNUAL_DISCOUNT, PLANS, monthlyPrice, type BillingCycle } from "@/lib/pricing";
import { cn, formatCompactEUR } from "@/lib/utils";

export function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>("annual");

  return (
    <section id="pricing" className="scroll-mt-16 border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Priced against the hours you get back."
            sub="Flat monthly price by revenue band. No per-transaction fees, no implementation invoice, no surprise “platform” line items."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex items-center gap-4">
            <span className={cn("text-sm transition-colors", cycle === "monthly" ? "text-foreground" : "text-muted")}>Monthly</span>
            <Switch
              aria-label="Bill annually"
              checked={cycle === "annual"}
              onCheckedChange={(on) => setCycle(on ? "annual" : "monthly")}
            />
            <span className={cn("text-sm transition-colors", cycle === "annual" ? "text-foreground" : "text-muted")}>Annual</span>
            <span className="rounded-full bg-accent/12 px-2.5 py-1 font-mono text-[11px] text-accent ring-1 ring-inset ring-accent/25">
              2.4 months free
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const price = monthlyPrice(plan, cycle);
            return (
              <Reveal key={plan.id} delay={i * 0.08}>
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-[var(--radius)] border p-6 md:p-7",
                    plan.featured ? "border-accent/50 bg-card-2" : "border-border bg-card",
                  )}
                >
                  {plan.featured && (
                    <span className="absolute right-6 top-6 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-ink">
                      Most chosen
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-muted">{plan.tagline}</p>

                  <div className="mt-6 flex h-[60px] items-end gap-1.5 overflow-hidden">
                    <span className="pb-1 text-2xl text-muted">€</span>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={price}
                        initial={{ y: 28, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -28, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl font-semibold tabular-nums tracking-[-0.04em] text-foreground"
                      >
                        {price.toLocaleString("en-IE")}
                      </motion.span>
                    </AnimatePresence>
                    <span className="pb-1.5 text-sm text-muted">/ month</span>
                  </div>
                  <p className="mt-2 h-5 text-xs text-muted-2">
                    {cycle === "annual"
                      ? `Billed €${(price * 12).toLocaleString("en-IE")} yearly · save €${Math.round(plan.monthly * 12 * ANNUAL_DISCOUNT).toLocaleString("en-IE")}`
                      : `Up to ${formatCompactEUR(plan.revenueCap)} revenue · cancel anytime`}
                  </p>

                  <Button asChild className="mt-6 w-full" variant={plan.featured ? "default" : "secondary"}>
                    <a href="#demo">{plan.cta}</a>
                  </Button>

                  <ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3 text-muted">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-3 flex flex-col gap-4 rounded-[var(--radius)] border border-border bg-background p-6 md:flex-row md:items-center md:gap-6 md:p-7">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
              <ShieldCheck className="size-5 text-accent" />
            </span>
            <div>
              <p className="text-lg font-semibold text-foreground">The Day-One Close Guarantee.</p>
              <p className="mt-1 text-muted">
                If your second month-end with Ledgerline takes longer than one working day, we refund every cent you&apos;ve
                paid and help you export everything. No forms, no “success criteria” fine print.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
