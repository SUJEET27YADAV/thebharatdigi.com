import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Website Performance Optimization Services | The Bharat Digital",
  description:
    "Speed up your website, fix Core Web Vitals, and improve conversions. Caching, CDN, image optimization, and code splitting experts.",
};

const SERVICE_DATA = {
  title: "Performance Optimization",
  subtitle: "Make Your Website Load Faster, Rank Higher, Convert Better",
  description: `Speed is not a luxury — it's a ranking factor and a conversion driver. A 1-second delay can cost you 7% of conversions. We audit, analyze, and optimize every layer of your stack to deliver sub-second load times.

From Core Web Vitals improvements to CDN configuration and database query tuning, we leave no stone unturned.`,
  subServices: [
    { title: "Core Web Vitals", description: "LCP, INP, CLS optimization to pass Google's page experience criteria" },
    { title: "Caching Strategy", description: "Browser cache, CDN cache, server cache, and service worker setup" },
    { title: "Image Optimization", description: "Next-gen formats, lazy loading, responsive images, and compression" },
    { title: "Code Splitting", description: "JavaScript bundle analysis, tree-shaking, and lazy loading routes" },
    { title: "CDN Setup", description: "Cloudflare, AWS CloudFront, or custom CDN configuration for global reach" },
    { title: "Lighthouse Audits", description: "Detailed performance reports with actionable recommendations and follow-up" },
  ],
  techStack: ["Lighthouse", "PageSpeed Insights", "Cloudflare", "Redis", "Webpack", "Turbopack", "GTMetrix", "Web Vitals"],
  process: [
    { step: "01", title: "Audit", desc: "We measure current performance using Lighthouse, Web Vitals, and real-user monitoring data." },
    { step: "02", title: "Analyze", desc: "Identify bottlenecks in code, assets, server response, and third-party scripts." },
    { step: "03", title: "Optimize", desc: "Apply targeted fixes: caching, compression, code splitting, image optimization, and CDN." },
    { step: "04", title: "Monitor", desc: "Set up ongoing performance monitoring with alerts for regressions." },
  ],
  portfolioItems: [
    { name: "E-commerce Speed Up", desc: "Reduced load time from 4.2s to 1.1s for a Shopify store" },
    { name: "SaaS Core Web Vitals", desc: "Fixed LCP and CLS issues for a B2B dashboard platform" },
  ],
  slug: "performance-optimization" as const,
};

export default function PerformanceOptimizationPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["performance-optimization"]} />;
}
