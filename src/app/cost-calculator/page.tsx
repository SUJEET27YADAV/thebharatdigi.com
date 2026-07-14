import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import CostCalculatorClient from "./client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebharatdigi.com";

export const metadata: Metadata = {
  title: "Cost Calculator | Estimate Your Web Development Project Cost | The Bharat Digital",
  description:
    "Get an instant estimate for your web development project. Calculate costs for websites, web apps, e-commerce stores, mobile apps, and AI integrations.",
  openGraph: {
    title: "Cost Calculator | The Bharat Digital",
    description:
      "Get an instant estimate for your web development project. Calculate costs for websites, web apps, e-commerce stores, mobile apps, and AI integrations.",
    url: `${SITE_URL}/cost-calculator`,
    siteName: "The Bharat Digital",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/cost-calculator` },
};

export default function CostCalculatorPage() {
  return (
    <>
      <JsonLd
        type="WebApplication"
        data={{
          name: "Project Cost Calculator — The Bharat Digital",
          description:
            "Instant cost estimate for web development projects — websites, web apps, e-commerce, mobile apps, and AI integrations.",
          url: `${SITE_URL}/cost-calculator`,
          applicationCategory: "BusinessApplication",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
          },
        }}
      />

      <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)]">
        {/* Gradient mesh bg */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-indigo-100 blur-[120px] dark:bg-indigo-500/5" />
          <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-purple-100 blur-[120px] dark:bg-purple-500/5" />
        </div>

        <section className="relative px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Calculator className="h-3 w-3" />
                Instant Estimate
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                Project Cost{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                  Calculator
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Get a ballpark estimate for your project in under 60 seconds. Select your project type, add features, and see the range.
              </p>
            </div>

            <CostCalculatorClient />
          </div>
        </section>
      </main>
    </>
  );
}
