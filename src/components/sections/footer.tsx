import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-muted-2">Reconciliation on autopilot for Shopify brands.</span>
        </div>
        <p className="text-muted-2">© {new Date().getFullYear()} Ledgerline GmbH · Berlin · Portfolio demo</p>
      </div>
    </footer>
  );
}
