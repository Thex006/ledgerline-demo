import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ledgerline · Close your books in 9 minutes, not 9 days",
  description:
    "AI reconciliation for Shopify brands doing €1M–€20M. Match every payout, fee, refund and chargeback to your bank and ledger automatically.",
  openGraph: {
    title: "Ledgerline · Close your books in 9 minutes, not 9 days",
    description: "AI bookkeeping reconciliation for Shopify brands doing €1M–€20M.",
    type: "website",
  },
  other: { "page-type": "software", "site-kind": "software" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-type="software">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
