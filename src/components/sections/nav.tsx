import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "#product", label: "Product" },
  { href: "#roi", label: "ROI" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8" aria-label="Main">
        <Link href="/" aria-label="Ledgerline home">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild size="sm">
          <a href="#demo">Book a demo</a>
        </Button>
      </nav>
    </header>
  );
}
