import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const eur0 = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const formatEUR = (n: number) => eur0.format(Math.round(n));

/** Deterministic compact euro format (Intl compact output differs between Node and browsers). */
export function formatCompactEUR(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  const trim = (v: number) => String(Math.round(v * 10) / 10);
  if (abs >= 1e9) return `${sign}€${trim(abs / 1e9)}B`;
  if (abs >= 1e6) return `${sign}€${trim(abs / 1e6)}M`;
  if (abs >= 1e3) return `${sign}€${trim(abs / 1e3)}k`;
  return `${sign}€${Math.round(abs)}`;
}
