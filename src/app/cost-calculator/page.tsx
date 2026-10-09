import type { Metadata } from "next";
import { headers } from "next/headers";
import { Calculator } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import CostCalculatorClient, { Region } from "./client";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebharatdigi.com";

export const metadata: Metadata = {
  title: "Project Cost Calculator | Web & App Development Pricing | The Bharat Digital",
  description:
    "Instant transparent cost calculator for websites, SaaS web apps, mobile apps, e-commerce stores, and AI automations. Automatically calibrated for your region.",
  openGraph: {
    title: "Project Cost Calculator | The Bharat Digital",
    description:
      "Instant transparent cost calculator for websites, SaaS web apps, mobile apps, e-commerce stores, and AI automations. Automatically calibrated for your region.",
    url: `${SITE_URL}/cost-calculator`,
    siteName: "The Bharat Digital",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/cost-calculator` },
};

export default async function CostCalculatorPage() {
  const headerList = await headers();
  const countryHeader =
    headerList.get("x-vercel-ip-country") ||
    headerList.get("cf-ipcountry") ||
    headerList.get("x-country-code") ||
    "";

  // If country is India ("IN"), use INR, otherwise default to GLOBAL (USD)
  const initialRegion: Region = countryHeader.toUpperCase() === "IN" ? "IN" : "GLOBAL";

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
        }}
      />

      <main className="relative min-h-screen overflow-hidden bg-[#070b14] text-slate-100 selection:bg-indigo-500 selection:text-white pt-24 pb-20">
        {/* Gradient mesh bg */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
          <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[140px]" />
        </div>

        <section className="relative px-4 pb-20 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-400">
              <Calculator className="h-3.5 w-3.5" />
              Instant 60-Second Estimator
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Development{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cost Calculator
              </span>
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
              Configure your project scope below to see transparent ballpark budgets, included tech capabilities, and delivery sprint timelines.
            </p>
          </div>

          <CostCalculatorClient initialRegion={initialRegion} />
        </section>
      </main>
    </>
  );
}
