import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="closing border-t border-border">
      <div className="wrap flex flex-col gap-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-muted-2">Reconciliation on autopilot for Shopify brands.</span>
        </div>
        <p className="text-muted-2">© 2026 Ledgerline · Portfolio demo, fictional company</p>
      </div>
    </footer>
  );
}
