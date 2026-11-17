const STATS = [
  { value: "€2.1B", label: "GMV reconciled" },
  { value: "412", label: "Shopify brands closing with us" },
  { value: "99.7%", label: "Transactions auto-matched" },
  { value: "€38k", label: "Avg. leakage recovered, year one" },
];

const BRANDS = ["Nordhaus", "Ember & Oat", "Velomade", "Saltmere", "Lumen Skin", "Forge Supply Co."];

export function ProofStrip() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-background p-5 md:p-6">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-semibold tracking-[-0.02em] text-muted-2">
          {BRANDS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
