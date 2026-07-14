import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, ArrowRight, CheckCircle } from "lucide-react";
import JsonLd from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebharatdigi.com";

export const metadata: Metadata = {
  title: "Free Guides | The Bharat Digital — Downloadable Resources",
  description:
    "Free downloadable guides on MVP development, AI integration, e-commerce, SEO, and digital transformation. Practical playbooks from The Bharat Digital.",
  openGraph: {
    title: "Free Guides | The Bharat Digital",
    description:
      "Free downloadable guides on MVP development, AI integration, e-commerce, SEO, and digital transformation.",
    url: `${SITE_URL}/guides`,
    siteName: "The Bharat Digital",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/guides` },
};

const GUIDES = [
  {
    id: "mvp-playbook",
    title: "The MVP Playbook",
    subtitle: "From Idea to Launch in 60 Days",
    description:
      "A step-by-step guide to building and launching your minimum viable product. Covers discovery, tech stack selection, agile sprints, and launch strategy.",
    pages: 32,
    format: "PDF",
    topics: ["Product Discovery", "Tech Stack Selection", "Agile Sprints", "Launch Strategy"],
    icon: "🚀",
    color: "from-indigo-500 to-purple-600",
    lightBorder: "border-indigo-200",
    lightBg: "bg-indigo-50",
    darkBorder: "dark:border-indigo-500/20",
    darkBg: "dark:bg-indigo-500/5",
    lightHoverBorder: "hover:border-indigo-300",
    lightHoverBg: "hover:bg-white",
    darkHoverBorder: "dark:hover:border-indigo-500/30",
    darkHoverBg: "dark:hover:bg-slate-800/50",
  },
  {
    id: "ai-integration-guide",
    title: "AI Integration for Business",
    subtitle: "What Actually Works in 2026",
    description:
      "Cut through the AI hype. Learn which integrations deliver real ROI — chatbots, RAG pipelines, workflow automation — with cost breakdowns and implementation timelines.",
    pages: 48,
    format: "PDF",
    topics: ["ChatGPT Integration", "RAG Pipelines", "Workflow Automation", "Cost Analysis"],
    icon: "🤖",
    color: "from-purple-500 to-pink-600",
    lightBorder: "border-purple-200",
    lightBg: "bg-purple-50",
    darkBorder: "dark:border-purple-500/20",
    darkBg: "dark:bg-purple-500/5",
    lightHoverBorder: "hover:border-purple-300",
    lightHoverBg: "hover:bg-white",
    darkHoverBorder: "dark:hover:border-purple-500/30",
    darkHoverBg: "dark:hover:bg-slate-800/50",
  },
  {
    id: "ecommerce-guide",
    title: "E-commerce Platform Guide",
    subtitle: "Shopify vs WooCommerce vs Custom",
    description:
      "Choose the right platform for your online store. Detailed comparison of Shopify, WooCommerce, and custom builds with pricing, scalability, and migration paths.",
    pages: 28,
    format: "PDF",
    topics: ["Platform Comparison", "Pricing Analysis", "Migration Guide", "Scaling Strategy"],
    icon: "🛒",
    color: "from-emerald-500 to-teal-600",
    lightBorder: "border-emerald-200",
    lightBg: "bg-emerald-50",
    darkBorder: "dark:border-emerald-500/20",
    darkBg: "dark:bg-emerald-500/5",
    lightHoverBorder: "hover:border-emerald-300",
    lightHoverBg: "hover:bg-white",
    darkHoverBorder: "dark:hover:border-emerald-500/30",
    darkHoverBg: "dark:hover:bg-slate-800/50",
  },
  {
    id: "seo-checklist",
    title: "Local SEO Checklist",
    subtitle: "Rank Higher in Noida & Delhi NCR",
    description:
      "A complete local SEO playbook for businesses in Noida, Delhi, Gurugram, and Faridabad. Covers Google Business Profile, on-page SEO, and local link building.",
    pages: 24,
    format: "PDF",
    topics: ["Google Business Profile", "On-Page SEO", "Local Citations", "Link Building"],
    icon: "📈",
    color: "from-amber-500 to-orange-600",
    lightBorder: "border-amber-200",
    lightBg: "bg-amber-50",
    darkBorder: "dark:border-amber-500/20",
    darkBg: "dark:bg-amber-500/5",
    lightHoverBorder: "hover:border-amber-300",
    lightHoverBg: "hover:bg-white",
    darkHoverBorder: "dark:hover:border-amber-500/30",
    darkHoverBg: "dark:hover:bg-slate-800/50",
  },
  {
    id: "automation-playbook",
    title: "Business Automation Playbook",
    subtitle: "Save 20+ Hours Per Week",
    description:
      "Automate invoicing, lead scoring, customer onboarding, and reporting. Practical workflows using Zapier, Make, and n8n with real cost savings calculations.",
    pages: 36,
    format: "PDF",
    topics: ["CRM Automation", "Invoice Processing", "Lead Scoring", "Reporting"],
    icon: "⚡",
    color: "from-cyan-500 to-blue-600",
    lightBorder: "border-cyan-200",
    lightBg: "bg-cyan-50",
    darkBorder: "dark:border-cyan-500/20",
    darkBg: "dark:bg-cyan-500/5",
    lightHoverBorder: "hover:border-cyan-300",
    lightHoverBg: "hover:bg-white",
    darkHoverBorder: "dark:hover:border-cyan-500/30",
    darkHoverBg: "dark:hover:bg-slate-800/50",
  },
  {
    id: "tech-stack-guide",
    title: "Choosing Your Tech Stack",
    subtitle: "Next.js vs WordPress vs Custom",
    description:
      "A developer-friendly guide to choosing the right technology for your project. Covers performance, cost, scalability, and team requirements.",
    pages: 20,
    format: "PDF",
    topics: ["Performance Comparison", "Cost Analysis", "Team Requirements", "Scaling"],
    icon: "🛠️",
    color: "from-rose-500 to-red-600",
    lightBorder: "border-rose-200",
    lightBg: "bg-rose-50",
    darkBorder: "dark:border-rose-500/20",
    darkBg: "dark:bg-rose-500/5",
    lightHoverBorder: "hover:border-rose-300",
    lightHoverBg: "hover:bg-white",
    darkHoverBorder: "dark:hover:border-rose-500/30",
    darkHoverBg: "dark:hover:bg-slate-800/50",
  },
];

function GuideCard({ guide }: { guide: (typeof GUIDES)[number] }) {
  return (
    <article
      className={`group relative flex flex-col rounded-2xl border ${guide.lightBorder} ${guide.lightBg} ${guide.darkBorder} ${guide.darkBg} p-6 transition-all duration-300 ${guide.lightHoverBorder} ${guide.lightHoverBg} ${guide.darkHoverBorder} ${guide.darkHoverBg} hover:shadow-lg hover:shadow-indigo-500/5`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-3xl">{guide.icon}</span>
        <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          {guide.pages} pages · {guide.format}
        </span>
      </div>

      <h2 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
        {guide.title}
      </h2>
      <p className="mb-3 text-sm font-medium text-indigo-600 dark:text-indigo-400">
        {guide.subtitle}
      </p>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {guide.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {guide.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Email capture CTA */}
      <div className="flex items-center gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="input flex-1 !rounded-lg !px-3 !py-2 !text-sm"
        />
        <button
          className={`flex items-center gap-2 rounded-lg bg-gradient-to-r ${guide.color} px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90 hover:shadow-lg`}
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Get</span>
        </button>
      </div>
    </article>
  );
}

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        type="CollectionPage"
        data={{
          name: "Free Guides — The Bharat Digital",
          description:
            "Free downloadable guides on MVP development, AI integration, e-commerce, SEO, and digital transformation.",
          url: `${SITE_URL}/guides`,
        }}
      />

      <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)]">
        {/* Gradient mesh bg */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-[500px] w-[500px] rounded-full bg-purple-100 blur-[120px] dark:bg-purple-500/5" />
          <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-indigo-100 blur-[120px] dark:bg-indigo-500/5" />
        </div>

        {/* Header */}
        <section className="relative px-4 pb-8 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-medium text-purple-700 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400">
                <FileText className="h-3 w-3" />
                Free Resources
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                Downloadable{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                  Guides
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Practical playbooks and checklists to help you make better decisions about your digital projects.
              </p>
            </div>

            {/* What you get */}
            <div className="mb-12 flex flex-wrap gap-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              {[
                "Expert insights from 100+ projects",
                "Real cost breakdowns & timelines",
                "Actionable checklists you can use today",
                "No fluff — just what works",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  {item}
                </div>
              ))}
            </div>

            {/* Guide grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 text-center sm:p-12 dark:border-slate-800 dark:from-indigo-500/10 dark:to-purple-500/10">
              <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
                Need a Custom Guide?
              </h2>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                We can create tailored guides for your specific industry, tech stack, or business challenge.
              </p>
              <Link
                href="/contactus"
                className="btn-primary"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
