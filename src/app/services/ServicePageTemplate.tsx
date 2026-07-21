import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Code,
  Server,
  Palette,
  Users,
} from "lucide-react";
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

interface SubService {
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface PortfolioItem {
  name: string;
  desc: string;
}

interface ServicePageData {
  title: string;
  subtitle: string;
  description: string;
  subServices: SubService[];
  techStack: string[];
  process: ProcessStep[];
  portfolioItems: PortfolioItem[];
  slug: string;
}

const PROCESS_ICONS = [Palette, Code, Server, Clock, Users];

export default function ServicePageTemplate({
  data,
  faqs,
}: {
  data: ServicePageData;
  faqs: FaqItem[];
}) {
  const titleParts = splitTitle(data.subtitle);
  return (
    <>
      <JsonLd
        type="Service"
        data={{
          name: data.title,
          description: data.subtitle,
          provider: { "@type": "Organization", name: "The Bharat Digital" },
          areaServed: "IN",
        }}
        id={`service-${data.slug}`}
      />
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://thebharatdigi.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: "https://thebharatdigi.com/services",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: data.title,
              item: `https://thebharatdigi.com/services/${data.slug}`,
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
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contactus"
              className="btn bg-indigo-600 text-white px-8 py-3.5 text-lg hover:bg-indigo-700 inline-flex items-center gap-2"
            >
              Get Free Consultation <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/cost-calculator"
              className="btn border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-8 py-3.5 text-lg hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center gap-2"
            >
              Estimate Cost
            </Link>
          </div>
        </div>
      </section>

      {/* Sub-Services */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            What We Offer
          </h2>
          <p className="text-center text-slate-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            From simple to complex, we cover the full spectrum of{" "}
            {data.title.toLowerCase()} services.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.subServices.map((s, i) => (
              <div key={i} className="card-interactive p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Technologies We Use
          </h2>
          <p className="text-slate-500 dark:text-gray-400 mb-10">
            Modern tools and frameworks for production-ready results.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {data.techStack.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Our Process
          </h2>
          <p className="text-center text-slate-500 dark:text-gray-400 mb-12">
            A proven methodology that delivers results, every time.
          </p>
          <div className="space-y-6">
            {data.process.map((step, i) => {
              const Icon = PROCESS_ICONS[i] ?? Code;
              return (
                <div
                  key={step.step}
                  className="flex gap-4 md:gap-6 items-start"
                >
                  <div className="shrink-0 size-12 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
                    <Icon className="size-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {step.step}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Related Work
          </h2>
          <p className="text-center text-slate-500 dark:text-gray-400 mb-12">
            Projects we&apos;ve delivered that are similar to what you need.
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

      {/* Pricing Hint */}
      <section className="py-12 bg-indigo-50 dark:bg-indigo-500/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <p className="text-lg text-slate-600 dark:text-gray-300 mb-4">
            Most projects start at{" "}
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              ₹15,000 – ₹3,00,000
            </span>
          </p>
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
            Exact pricing depends on your requirements. Use our cost calculator
            for a precise estimate.
          </p>
          <Link
            href="/cost-calculator"
            className="btn border border-indigo-300 dark:border-indigo-500/50 text-indigo-600 dark:text-indigo-400 px-6 py-2.5 hover:bg-indigo-100 dark:hover:bg-indigo-500/10"
          >
            Calculate Your Cost
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} title={`${data.title} — FAQs`} />

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Let&apos;s discuss your project and find the best approach for your
            needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contactus"
              className="btn bg-white text-indigo-600 px-8 py-3.5 text-lg hover:bg-slate-100 inline-flex items-center gap-2"
            >
              Get Free Consultation <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/services"
              className="btn text-white border border-white/30 px-8 py-3.5 text-lg hover:bg-white/10"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
