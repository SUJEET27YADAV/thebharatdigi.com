"use client";
import { LazyMotion, m, domAnimation } from "framer-motion";
import {
  CheckCircle,
  FileText,
  Shield,
  Search,
  Zap,
  Smartphone,
  Share2,
  Link2,
  Image,
  BarChart3,
  Code,
  Star,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { Product } from "@/types/types";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";

const features = [
  {
    icon: Search,
    title: "Meta Tags & Headings",
    desc: "Title tags, descriptions, H1-H6 structure, canonical URLs, and language declarations.",
  },
  {
    icon: Zap,
    title: "Performance & Core Web Vitals",
    desc: "HTML size, script count, CSS files, compression, caching headers, render-blocking resources.",
  },
  {
    icon: Link2,
    title: "Links & Indexing",
    desc: "Internal/external links, broken link detection, robots meta, nofollow analysis.",
  },
  {
    icon: BarChart3,
    title: "Content & Keyword Analysis",
    desc: "Word count, keyword density, readability, keyword stuffing detection, TF analysis.",
  },
  {
    icon: Image,
    title: "Images & Media",
    desc: "Alt text validation, dimension checks, lazy loading, WebP/AVIF format detection.",
  },
  {
    icon: Share2,
    title: "Social & Open Graph",
    desc: "og:title, og:image, Twitter cards, Facebook app ID, locale and site name.",
  },
  {
    icon: Shield,
    title: "Security & HTTPS",
    desc: "SSL check, HSTS, CSP, X-Frame-Options, mixed content detection, 8+ security headers.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsiveness",
    desc: "Viewport config, media queries, font sizes, tap targets (44x44px), zoom.",
  },
];

const checks = [
  "8 comprehensive SEO categories analyzed",
  "Production-grade AI agent skill generation (SKILL.md)",
  "Beautiful HTML report for clients",
  "Machine-readable JSON for CI/CD",
  "Broken link detection with HTTP status codes",
  "Core Web Vitals and performance analysis",
  "Security header audit (9 different headers)",
  "Mobile responsiveness and tap target validation",
  "Keyword density and readability scoring",
  "Open Graph and social media preview audit",
];

interface SEOAuditProClientProps {
  product: Product | null;
}

const SCORE_ITEMS = [
  { label: "Meta Tags", score: 85, color: "#00c758" },
  { label: "Performance", score: 72, color: "#f99c00" },
  { label: "Content", score: 90, color: "#00c758" },
  { label: "Security", score: 65, color: "#f99c00" },
];

function ScorePreviewCards() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-16 px-4 border-t border-slate-200 dark:border-[#314158]/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {SCORE_ITEMS.map((item, i) => (
              <m.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-[#0f172b] border border-slate-200 dark:border-[#314158]/30 rounded p-6 text-center"
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: item.color }}
                >
                  {item.score}
                </div>
                <div className="text-sm text-slate-500 dark:text-[#314158] uppercase tracking-wider">
                  {item.label}
                </div>
                <div className="mt-3 h-1.5 bg-slate-200 dark:bg-[#314158] rounded overflow-hidden">
                  <div
                    className="h-full rounded transition-[width] duration-500 ease-out"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

export default function SEOAuditProClient({ product }: SEOAuditProClientProps) {
  const { cart, addToCart, removeFromCart } = useCartStore();

  const isInCart = (serial: number) =>
    cart.filter((p) => p.serial === serial).length > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product) {
      addToCart(product);
      toast.success("SEO Audit Pro added to cart!");
    } else {
      toast.error("Product not loaded. Please try again.");
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-slate-100 dark:bg-[#020617]">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-[#ac4bff]/5 to-transparent pointer-events-none" />
          <div className="max-w-5xl mx-auto text-center relative">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#ac4bff]/20 bg-indigo-100 dark:bg-[#ac4bff]/10 mb-6"
            >
              <Zap size={14} className="text-[#ac4bff]" />
              <span className="text-[#ac4bff] text-sm font-medium">
                v1.0.0 • Production Ready
              </span>
            </m.div>
            <h1 className="sr-only">
              The Bharat Digital: "Premium Web Development Company that offers
              SEO Audit Tools, e-commerce solutions, IT support & much more for
              Businesses all over the world.
            </h1>
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-[#020617] dark:text-white mb-6"
            >
              <span className="gradient-text">SEO Audit Pro</span>
              <span>: Search Engine Optimization Tool</span>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 dark:text-[#314158] max-w-2xl mx-auto mb-8"
            >
              Production-grade SEO auditing tool that scans your website across
              8 critical dimensions and generates an AI agent-ready SKILL.md
              file containing fix instructions along with JSON and HTML reports.
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <button
                type="button"
                onClick={(e) =>
                  product && isInCart(product.serial)
                    ? removeFromCart(product.id)
                    : handleAddToCart(e)
                }
                className="btn-primary px-8 py-3 flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                <span>
                  {product && isInCart(product.serial)
                    ? "Remove from cart"
                    : "Add to cart"}
                </span>
              </button>
              <a href="#features" className="btn-secondary px-8 py-3">
                Explore Features
              </a>
            </m.div>
          </div>
        </section>

        <ScorePreviewCards />

        {/* Features */}
        <section id="features" className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <m.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#020617] dark:text-white text-center mb-4"
            >
              8-Category <span className="gradient-text">Deep Analysis</span>
            </m.h2>
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-500 dark:text-[#314158] text-center mb-12 max-w-xl mx-auto"
            >
              Every category includes automated checks with specific, actionable
              fix instructions
            </m.p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <m.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="card-interactive p-5 group"
                >
                  <div className="size-10 rounded bg-indigo-100 dark:bg-[#ac4bff]/10 flex items-center justify-center mb-3 transition-colors duration-200 group-hover:bg-indigo-200 dark:group-hover:bg-[#ac4bff]/20">
                    <f.icon
                      size={18}
                      className="text-indigo-600 dark:text-[#ac4bff]"
                    />
                  </div>
                  <h3 className="text-[#020617] dark:text-white font-semibold mb-1 text-sm">
                    {f.title}
                  </h3>
                  <p className="text-slate-500 dark:text-[#314158] text-xs leading-relaxed">
                    {f.desc}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 px-4 bg-slate-200/50 dark:bg-[#0f172b]/50 border-t border-slate-200 dark:border-[#314158]/30">
          <div className="max-w-5xl mx-auto">
            <m.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#020617] dark:text-white text-center mb-12"
            >
              What You <span className="gradient-text">Get</span>
            </m.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checks.map((c, i) => (
                <m.div
                  key={c}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    size={18}
                    className="text-[#00c758] mt-0.5 shrink-0"
                  />
                  <span className="text-slate-500 dark:text-[#90a1b9] text-sm">
                    {c}
                  </span>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Skill Output Preview */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {[
                {
                  icon: FileText,
                  title: "JSON Report",
                  desc: "Machine-readable data for CI/CD pipelines and programmatic analysis",
                },
                {
                  icon: Code,
                  title: "HTML Report",
                  desc: "Beautiful branded report with scores, findings, and charts — ready for clients",
                },
                {
                  icon: Star,
                  title: "AI Skill (SKILL.md)",
                  desc: "Agent-ready fix instructions in the format AI coding agents understand natively",
                },
              ].map((item, i) => (
                <m.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-[#0f172b] border border-slate-200 dark:border-[#314158]/30 rounded p-6 text-center"
                >
                  <div className="size-12 rounded-full bg-indigo-100 dark:bg-[#ac4bff]/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon
                      size={24}
                      className="text-indigo-600 dark:text-[#ac4bff]"
                    />
                  </div>
                  <h3 className="text-[#020617] dark:text-white font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-[#314158] text-sm">
                    {item.desc}
                  </p>
                </m.div>
              ))}
            </div>

            {/* Code preview */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-[#1e293b] dark:bg-[#0f172b] border border-slate-200 dark:border-[#314158]/30 rounded overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-[#314158]/30">
                <div className="size-3 rounded-full bg-[#fb2c36]" />
                <div className="size-3 rounded-full bg-[#f99c00]" />
                <div className="size-3 rounded-full bg-[#00c758]" />
                <span className="text-slate-400 dark:text-[#314158] text-xs ml-2">
                  SKILL.md: AI Agent Output
                </span>
              </div>
              <pre className="p-4 text-sm text-slate-300 dark:text-[#90a1b9] overflow-x-auto font-mono leading-relaxed">
                {`# SEO Audit Pro — AI Agent Skill
> Target: https://yoursite.com
> Overall Score: 74/100

## 🔴 Critical Fixes
### 1. Missing meta description
**Fix:** Add a unique meta description
### 2. 5 images without alt text
**Fix:** Add descriptive alt text

## 🟡 Warnings
### 1. No HSTS header detected
**Fix:** Add Strict-Transport-Security header`}
              </pre>
            </m.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 border-t border-slate-200 dark:border-[#314158]/30">
          <div className="max-w-3xl mx-auto text-center">
            <m.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#020617] dark:text-white mb-4"
            >
              Ready to Rank <span className="gradient-text">Higher?</span>
            </m.h2>
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-500 dark:text-[#314158] mb-8"
            >
              Get SEO Audit Pro and start identifying exactly what&apos;s
              holding your website back from first-page rankings.
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                type="button"
                onClick={(e) =>
                  product && isInCart(product.serial)
                    ? removeFromCart(product.id)
                    : handleAddToCart(e)
                }
                className="btn-primary px-10 py-3.5 text-lg mx-auto flex items-center gap-2"
              >
                <ShoppingCart size={20} />
                <span>
                  {product && isInCart(product.serial)
                    ? "Remove from cart"
                    : "Add to cart"}
                </span>
                <ArrowRight size={20} />
              </button>
            </m.div>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
}
