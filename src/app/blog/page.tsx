import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import JsonLd from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebharatdigi.com";

export const metadata: Metadata = {
  title: "Blog | The Bharat Digital — Web Development Insights & Guides",
  description:
    "Expert insights on web development, AI integration, e-commerce, SEO, and digital transformation. Practical guides from The Bharat Digital team in Noida, Delhi NCR.",
  openGraph: {
    title: "Blog | The Bharat Digital",
    description:
      "Expert insights on web development, AI integration, e-commerce, SEO, and digital transformation.",
    url: `${SITE_URL}/blog`,
    siteName: "The Bharat Digital",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/blog` },
};

const PLACEHOLDER_POSTS = [
  {
    slug: "how-to-build-mvp-in-60-days",
    title: "How to Build an MVP in 60 Days: A Step-by-Step Guide for Founders",
    excerpt:
      "Turn your startup idea into a working product in 60 days. We break down our proven MVP development process — from discovery sprint to production launch.",
    category: "MVP Development",
    readTime: "8 min read",
    date: "2026-06-15",
  },
  {
    slug: "ai-integration-for-business-2026",
    title: "AI Integration for Business in 2026: What Actually Works",
    excerpt:
      "Skip the hype. Here's what AI integrations deliver real ROI in 2026 — chatbots, RAG pipelines, and workflow automation with real cost breakdowns.",
    category: "AI Development",
    readTime: "12 min read",
    date: "2026-06-01",
  },
  {
    slug: "ecommerce-platform-comparison-shopify-vs-woocommerce-vs-custom",
    title: "Shopify vs WooCommerce vs Custom: Which E-commerce Platform Is Right for You?",
    excerpt:
      "A no-nonsense comparison of the three most popular e-commerce approaches — with pricing, scalability, and real project examples.",
    category: "E-commerce",
    readTime: "10 min read",
    date: "2026-05-20",
  },
  {
    slug: "local-seo-noida-delhi-ncr",
    title: "Local SEO for Noida & Delhi NCR Businesses: The Complete Playbook",
    excerpt:
      "Rank on Google Maps and local search results. Proven strategies for businesses in Noida, Delhi, Gurugram, and Faridabad.",
    category: "SEO & Marketing",
    readTime: "15 min read",
    date: "2026-05-10",
  },
  {
    slug: "nextjs-vs-wordpress-2026",
    title: "Next.js vs WordPress in 2026: When to Choose Which",
    excerpt:
      "WordPress still powers 40% of the web, but Next.js is winning for performance-critical sites. Here's how to decide.",
    category: "Web Development",
    readTime: "9 min read",
    date: "2026-04-28",
  },
  {
    slug: "automate-business-workflows-with-ai",
    title: "5 Business Processes You Should Automate with AI This Quarter",
    excerpt:
      "Invoice processing, lead scoring, customer support, reporting, and onboarding — practical automation with real cost savings.",
    category: "Automation",
    readTime: "7 min read",
    date: "2026-04-15",
  },
];

const CATEGORIES = [
  "All",
  "MVP Development",
  "AI Development",
  "E-commerce",
  "SEO & Marketing",
  "Web Development",
  "Automation",
];

function BlogCard({
  post,
}: {
  post: (typeof PLACEHOLDER_POSTS)[number];
}) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30">
      <div className="mb-4 flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">
        <Tag className="h-3 w-3" />
        {post.category}
      </div>
      <h2 className="mb-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h2>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>
        <ArrowRight className="h-4 w-4 text-indigo-600 transition-transform group-hover:translate-x-1 dark:text-indigo-400" />
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <>
      <JsonLd
        type="Blog"
        data={{
          name: "The Bharat Digital Blog",
          description:
            "Expert insights on web development, AI, e-commerce, and digital transformation.",
          url: `${SITE_URL}/blog`,
          publisher: {
            "@type": "Organization",
            name: "The Bharat Digital",
            url: SITE_URL,
          },
        }}
      />

      <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)]">
        {/* Gradient mesh bg */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-indigo-100 blur-[120px] dark:bg-indigo-500/5" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-100 blur-[120px] dark:bg-purple-500/5" />
        </div>

        {/* Header */}
        <section className="relative px-4 pb-8 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                Blog
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                Insights &{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                  Guides
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Practical insights on web development, AI, e-commerce, and digital transformation — from the team building real products every day.
              </p>
            </div>

            {/* Category filter */}
            <div className="mb-10 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  className="cursor-pointer rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Post grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PLACEHOLDER_POSTS.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Pagination placeholder */}
            <div className="mt-12 flex justify-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-medium text-white">
                1
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-sm font-medium text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300">
                2
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-sm font-medium text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300">
                3
              </span>
            </div>

            {/* Ghost CMS integration note */}
            <div className="mt-16 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50 p-8 text-center dark:border-indigo-500/20 dark:bg-indigo-500/5">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Posts will be dynamically loaded from Ghost CMS once connected.{" "}
                <Link
                  href="/contactus"
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Contact us
                </Link>{" "}
                to contribute or suggest topics.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
