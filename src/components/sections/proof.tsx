const FIGURES = [
  { value: "412", label: "Shopify brands close their books on Ledgerline" },
  { value: "9 min", label: "Median month-end close, down from 9 days" },
  { value: "99.7%", label: "Payout lines matched with no human touch" },
  { value: "€38k", label: "Average leakage recovered in year one" },
];

/** Statement section carrying the page's dealt moment: counter-rolls (taste-skill). */
export function Proof() {
  return (
    <section className="screen border-t border-border" aria-labelledby="proof-heading">
      <div className="wrap">
        <h2
          id="proof-heading"
          className="max-w-4xl text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl md:leading-[1.05]"
        >
          The numbers Ledgerline customers close on.
        </h2>
        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" data-moment="counter-rolls">
          {FIGURES.map((f) => (
            <div key={f.label} className="flex flex-col-reverse justify-end border-t border-border-strong pt-6">
              <dt className="mt-4 max-w-[16rem] text-base leading-relaxed text-muted">{f.label}</dt>
              <dd
                data-count
                className="text-4xl font-semibold tabular-nums tracking-[-0.04em] text-foreground md:text-[4rem] md:leading-none"
              >
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
