import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Enter } from "@/components/shared/enter";
import { ReconFeed } from "@/components/hero/recon-feed";
import { CloseTimer } from "@/components/hero/close-timer";
import { MatchRate } from "@/components/hero/match-rate";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden py-10">
      <div className="wrap relative">
        <Enter>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            AI reconciliation for Shopify brands doing €1M–€20M
          </p>
        </Enter>
        <Enter delay={0.05}>
          <h1 className="mt-5 text-balance text-[3rem] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.5rem]">
            Close your books in 9 minutes, <span className="text-muted-2">not 9 days.</span>
          </h1>
        </Enter>
        <Enter delay={0.1}>
          <p className="mt-5 max-w-[46rem] text-pretty text-lg leading-relaxed text-muted">
            Ledgerline matches every Shopify payout, fee, refund and chargeback to your bank and your Xero or
            QuickBooks ledger. Month-end stops eating your finance team’s first week.
          </p>
        </Enter>
        <Enter delay={0.15}>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button asChild size="lg">
              <a href="#demo">
                Book a demo <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#roi">Calculate your savings</a>
            </Button>
            <p className="inline-flex items-center gap-2 text-sm text-muted-2">
              <ShieldCheck className="size-4 text-muted" />
              SOC 2 Type II · EU-hosted · Read-only access
            </p>
          </div>
        </Enter>

        <Enter delay={0.2} className="mt-10">
          <div id="product" className="grid scroll-mt-24 grid-cols-1 gap-6 md:grid-cols-12">
            <ReconFeed className="md:col-span-5" />
            <CloseTimer className="md:col-span-4" />
            <MatchRate className="md:col-span-3" />
          </div>
        </Enter>
      </div>
    </section>
  );
}
