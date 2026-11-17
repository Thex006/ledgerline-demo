"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { ArrowRight, CalendarCheck2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LEDGERS, ORDER_BANDS, REVENUE_BANDS, ROLES } from "@/lib/validation";
import type { LeadTier } from "@/lib/lead-score";

type FieldErrors = Partial<Record<string, string>>;

const SUCCESS: Record<LeadTier, { title: string; body: string }> = {
  hot: {
    title: "You're in the fast lane.",
    body: "A reconciliation specialist will email you within 2 business hours with calendar slots, and we'll bring a live walkthrough built on a brand your size.",
  },
  warm: {
    title: "Request received.",
    body: "We'll email you within one business day to book your 20-minute demo. Have last month's Shopify payout report handy and we'll reconcile it live.",
  },
  cold: {
    title: "Thanks, it's on its way.",
    body: "We'll send our recorded walkthrough and the free Shopify month-end checklist our customers used before Ledgerline. Reply anytime to book a live demo.",
  },
};

const PROMISES = [
  "We reconcile one of your real payouts live, on the call",
  "You leave with your leakage estimate, in euros",
  "20 minutes with one specialist, start to finish",
];

const initial = {
  fullName: "",
  workEmail: "",
  company: "",
  role: "",
  revenueBand: "",
  ordersBand: "",
  storesCount: "1",
  ledger: "",
  website: "",
};

export function DemoSignup() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [tier, setTier] = useState<LeadTier | null>(null);

  const set = (k: keyof typeof initial) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setFormError(null);
    const params = new URLSearchParams(window.location.search);
    const payload = {
      ...form,
      ledger: form.ledger || undefined,
      website: form.website || undefined,
      utmSource: params.get("utm_source") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
    };
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setTier(data.tier as LeadTier);
        return;
      }
      if (data.fieldErrors) setErrors(data.fieldErrors);
      setFormError(data.error ?? "Please check the highlighted fields.");
      setStatus("error");
    } catch {
      setFormError("Network hiccup. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="demo" className="screen scroll-mt-16 border-t border-border bg-card/30">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5 md:pr-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Book a demo</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.035em] text-foreground md:text-6xl md:leading-[1.02]">
            Your next close could take 9 minutes.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Every month you wait costs another week of spreadsheet work and another slice of revenue lost in your
            payouts. Book the call before your next month-end.
          </p>
          <ul className="mt-8 space-y-3">
            {PROMISES.map((p) => (
              <li key={p} className="flex gap-3 text-foreground">
                <Check className="mt-1 size-4 shrink-0 text-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-7">
          <div className="relative rounded-[var(--radius)] border border-border-strong bg-card p-6 md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {tier ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[520px] flex-col justify-center"
                  role="status"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-ink">
                    <CalendarCheck2 className="size-5" />
                  </span>
                  <h3 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-foreground">{SUCCESS[tier].title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{SUCCESS[tier].body}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field id="fullName" label="Full name" error={errors.fullName}>
                    <Input id="fullName" autoComplete="name" value={form.fullName} onChange={(e) => set("fullName")(e.target.value)} aria-invalid={!!errors.fullName} placeholder="Lena Brandt" />
                  </Field>
                  <Field id="workEmail" label="Work email" error={errors.workEmail}>
                    <Input id="workEmail" type="email" autoComplete="email" value={form.workEmail} onChange={(e) => set("workEmail")(e.target.value)} aria-invalid={!!errors.workEmail} placeholder="lena@yourbrand.com" />
                  </Field>
                  <Field id="company" label="Brand" error={errors.company}>
                    <Input id="company" autoComplete="organization" value={form.company} onChange={(e) => set("company")(e.target.value)} aria-invalid={!!errors.company} placeholder="Saltmere" />
                  </Field>
                  <Field id="role" label="Your role" error={errors.role}>
                    <Choice id="role" value={form.role} onChange={set("role")} options={ROLES} placeholder="Select role" invalid={!!errors.role} />
                  </Field>
                  <Field id="revenueBand" label="Annual revenue" error={errors.revenueBand}>
                    <Choice id="revenueBand" value={form.revenueBand} onChange={set("revenueBand")} options={REVENUE_BANDS} placeholder="Select range" invalid={!!errors.revenueBand} />
                  </Field>
                  <Field id="ordersBand" label="Monthly orders" error={errors.ordersBand}>
                    <Choice id="ordersBand" value={form.ordersBand} onChange={set("ordersBand")} options={ORDER_BANDS} placeholder="Select volume" invalid={!!errors.ordersBand} />
                  </Field>
                  <Field id="storesCount" label="Shopify stores" error={errors.storesCount}>
                    <Input id="storesCount" type="number" inputMode="numeric" min={1} max={100} value={form.storesCount} onChange={(e) => set("storesCount")(e.target.value)} aria-invalid={!!errors.storesCount} />
                  </Field>
                  <Field id="ledger" label="Accounting software" error={errors.ledger}>
                    <Choice id="ledger" value={form.ledger} onChange={set("ledger")} options={LEDGERS} placeholder="Optional" />
                  </Field>

                  <div className="hidden" aria-hidden>
                    <label htmlFor="website">Website</label>
                    <input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website")(e.target.value)} />
                  </div>

                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="animate-spin" /> Booking your slot
                        </>
                      ) : (
                        <>
                          Book my demo <ArrowRight />
                        </>
                      )}
                    </Button>
                    <p className="mt-3 h-5 text-center text-sm text-danger" aria-live="polite">
                      {formError}
                    </p>
                    <p className="text-center text-xs text-muted-2">We reply within one business day.</p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <p className="h-4 text-xs text-danger">{error}</p>
    </div>
  );
}

function Choice({
  id,
  value,
  onChange,
  options,
  placeholder,
  invalid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
  placeholder: string;
  invalid?: boolean;
}) {
  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger id={id} aria-invalid={invalid}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
