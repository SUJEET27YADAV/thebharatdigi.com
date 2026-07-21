import Link from "next/link";
import { AlertTriangle, Search, ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import type { FaqItem } from "@/lib/faq-data";

function splitTitle(title: string) {
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  return {
    first: words.slice(0, mid).join(" "),
    rest: words.slice(mid).join(" "),
  };
}

interface PainPoint {
  problem: string;
  impact: string;
}

interface SearchQuery {
  query: string;
  intent: string;
}

interface Solution {
  problem: string;
  solution: string;
}

interface PortfolioItem {
  name: string;
  desc: string;
}

export interface IndustryPageData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  painPoints: PainPoint[];
  searchQueries: SearchQuery[];
  solutions: Solution[];
  portfolioItems: PortfolioItem[];
  cta: string;
}

export default function IndustryPageTemplate({
  data,
  faqs,
}: {
  data: IndustryPageData;
  faqs: FaqItem[];
}) {
  const titleParts = splitTitle(data.subtitle);
  return (
    <>
      <JsonLd
        type="LocalBusiness"
        data={{
          name: "The Bharat Digital",
          description: data.subtitle,
          areaServed: "IN",
          serviceType: data.title,
        }}
        id={`industry-${data.slug}`}
      />
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${process.env.NEXT_PUBLIC_APP_URL || "https://thebharatdigi.com"}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Industries",
              item: `${process.env.NEXT_PUBLIC_APP_URL || "https://thebharatdigi.com"}/industries`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: data.title,
              item: `${process.env.NEXT_PUBLIC_APP_URL || "https://thebharatdigi.com"}/industries/${data.slug}`,
            },
          ],
        }}
        id={`breadcrumb-${data.slug}`}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-white dark:bg-slate-900">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 size-72 rounded-full bg-indigo-100 dark:bg-indigo-500/5" />
          <div className="absolute bottom-10 right-10 size-96 rounded-full bg-purple-100 dark:bg-purple-500/5" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            <span className="gradient-text">{titleParts.first}</span>{" "}
            {titleParts.rest}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600 dark:text-gray-400 mb-10 leading-relaxed">
            {data.description}
          </p>
          <Link
            href="/contactus"
            className="btn bg-indigo-600 text-white px-8 py-3.5 text-lg hover:bg-indigo-700 inline-flex items-center gap-2"
          >
            Let&apos;s Build for {data.title} <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Common Challenges in {data.title}
          </h2>
          <p className="text-center text-slate-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {data.title} businesses face unique digital hurdles that
            off-the-shelf solutions can&apos;t solve.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {data.painPoints.map((p, i) => (
              <div key={i} className="card-interactive p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="size-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      {p.problem}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                      {p.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Queries */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="size-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              What They&apos;re Searching For
            </h2>
          </div>
          <p className="text-slate-500 dark:text-gray-400 mb-10 max-w-2xl">
            Real search queries from {data.title.toLowerCase()} businesses
            looking for digital solutions.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.searchQueries.map((q, i) => (
              <div
                key={i}
                className="border border-slate-200 dark:border-slate-700 rounded p-4 bg-slate-50 dark:bg-slate-800/50"
              >
                <p className="font-mono text-sm text-indigo-600 dark:text-indigo-400 mb-1">
                  &ldquo;{q.query}&rdquo;
                </p>
                <p className="text-xs text-slate-500">{q.intent}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Table */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Problems We Solve for {data.title}
          </h2>
          <p className="text-center text-slate-500 dark:text-gray-400 mb-12">
            Every challenge has a tailored solution from our team.
          </p>
          <div className="space-y-4">
            {data.solutions.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              >
                <div className="size-10 shrink-0 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center">
                  <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white mb-1">
                    {s.problem}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-gray-400">
                    {s.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Related Work
          </h2>
          <p className="text-center text-slate-500 dark:text-gray-400 mb-12">
            Projects we&apos;ve delivered for {data.title.toLowerCase()} and
            adjacent industries.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {data.portfolioItems.map((item, i) => (
              <div key={i} className="card p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
            <div className="md:col-span-2 text-center">
              <Link
                href="/portfolio"
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm"
              >
                View full portfolio →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} title={`${data.title} — FAQs`} />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {data.cta}
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            We understand the {data.title.toLowerCase()} industry inside out.
            Let&apos;s build something that works for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contactus"
              className="btn bg-white text-indigo-600 px-8 py-3.5 text-lg hover:bg-slate-100 inline-flex items-center gap-2"
            >
              Get Free Consultation <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/industries"
              className="btn text-white border border-white/30 px-8 py-3.5 text-lg hover:bg-white/10"
            >
              View All Industries
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
