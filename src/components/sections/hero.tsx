import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { ReconFeed } from "@/components/hero/recon-feed";
import { CloseTimer } from "@/components/hero/close-timer";
import { MatchRate } from "@/components/hero/match-rate";
import { PayoutMatch } from "@/components/hero/payout-match";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            For Shopify brands doing €1M–€20M
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-4xl text-balance text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Close your books in 9 minutes, <span className="text-muted-2">not 9 days.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
            Ledgerline&apos;s AI matches every Shopify payout, fee, refund and chargeback to your bank and your Xero
            or QuickBooks ledger, automatically. Month-end stops eating your finance team&apos;s first week, and the
            money leaking out of your payouts finally shows up.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <a href="#demo">
                Book a 20-minute demo <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#roi">Calculate what you&apos;re losing</a>
            </Button>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-2">
            <ShieldCheck className="size-4 text-muted" />
            SOC 2 Type II · GDPR · EU-hosted in Frankfurt · Read-only bank access
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-14 md:mt-20">
          <div id="product" className="grid scroll-mt-24 grid-cols-1 gap-3 md:grid-cols-4 md:grid-rows-[auto_auto]">
            <ReconFeed className="md:col-span-2 md:row-span-2" />
            <CloseTimer className="md:col-span-2" />
            <MatchRate className="md:col-span-1" />
            <PayoutMatch className="md:col-span-1" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
