import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "SEO & Performance Marketing | Digital Marketing Agency | The Bharat Digital",
  description:
    "SEO, PPC, and performance marketing services for Noida, Delhi NCR businesses. Technical SEO, content strategy, Google Ads, and conversion optimization.",
};

const SERVICE_DATA = {
  title: "SEO & Marketing",
  subtitle: "SEO & Performance Marketing — Rank Higher, Convert Better",
  description: `Get found by the right customers at the right time. We combine technical SEO, content strategy, and paid advertising to drive qualified traffic that converts. Our approach is data-driven — we measure everything and optimize relentlessly.

For local businesses in Noida, Delhi NCR, we focus on local SEO strategies that put you in the Google Map Pack and capture high-intent "near me" searches. For SaaS and e-commerce, we target competitive keywords with a combination of content depth, technical excellence, and strategic PPC.`,
  subServices: [
    { title: "Technical SEO", description: "Core Web Vitals, site speed, crawl optimization, schema markup, sitemaps" },
    { title: "Content SEO", description: "Keyword research, content strategy, blog writing, internal linking" },
    { title: "Local SEO", description: "Google Business Profile, local citations, review management, map pack optimization" },
    { title: "Google Ads (PPC)", description: "Search, display, shopping, and remarketing campaigns with ROAS tracking" },
    { title: "Conversion Rate Optimization", description: "A/B testing, funnel analysis, heatmaps, UX improvements" },
    { title: "SEO Audit Pro", description: "Our proprietary SEO audit tool — crawl, analyze, and fix SEO issues" },
  ],
  techStack: ["Google Search Console", "Google Analytics 4", "SEMrush", "Ahrefs", "Screaming Frog", "Lighthouse", "SEO Audit Pro"],
  process: [
    { step: "01", title: "Audit", desc: "Full technical and content audit. Identify quick wins and long-term opportunities." },
    { step: "02", title: "Strategy", desc: "Keyword roadmap, content calendar, and channel plan aligned with your goals." },
    { step: "03", title: "Implementation", desc: "Fix technical issues, create content, set up campaigns, optimize pages." },
    { step: "04", title: "Monitor", desc: "Track rankings, traffic, conversions. Weekly reporting with actionable insights." },
    { step: "05", title: "Iterate", desc: "Double down on what works. Pivot what doesn't. Continuous improvement." },
  ],
  portfolioItems: [
    { name: "Local SEO Campaign", desc: "Moved 12 local businesses to Google Map Pack top 3 positions" },
  ],
  slug: "seo-marketing" as const,
};

export default function SeoMarketingPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["seo-marketing"]} />;
}
