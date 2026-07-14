"use client";
import { LazyMotion, m, domAnimation, useReducedMotion } from "framer-motion";
import {
  Brain,
  ShoppingCart,
  Monitor,
  BarChart3,
  Rocket,
  ChevronRight,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { easeOut, staggerDelay, viewFade } from "@/utils/motion";

const services = [
  {
    icon: Brain,
    title: "AI Development",
    desc: "Generative AI, custom ChatGPT models, RAG pipelines, and AI-powered automation for your business workflows.",
    color: "from-indigo-500 to-indigo-600",
    bgLight: "bg-indigo-50 dark:bg-indigo-600/10",
    textLight: "text-indigo-600 dark:text-indigo-400",
    borderLight: "hover:border-indigo-300 dark:hover:border-indigo-500/40",
    path: "/services/ai-development",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    desc: "Powerful online stores with secure payment integration. Shopify, WooCommerce, or custom headless solutions.",
    color: "from-pink-500 to-rose-500",
    bgLight: "bg-pink-50 dark:bg-pink-600/10",
    textLight: "text-pink-600 dark:text-pink-400",
    borderLight: "hover:border-pink-300 dark:hover:border-pink-500/40",
    path: "/services/ecommerce-development",
  },
  {
    icon: Monitor,
    title: "Custom Web Development",
    desc: "Bespoke websites tailored to your brand identity. From simple landing pages to complex web applications.",
    color: "from-purple-500 to-violet-500",
    bgLight: "bg-purple-50 dark:bg-purple-600/10",
    textLight: "text-purple-600 dark:text-purple-400",
    borderLight: "hover:border-purple-300 dark:hover:border-purple-500/40",
    path: "/services/custom-web-development",
  },
  {
    icon: BarChart3,
    title: "SEO & Marketing",
    desc: "Technical SEO, content strategy, local search, and PPC campaigns that drive qualified traffic and conversions.",
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-600/10",
    textLight: "text-emerald-600 dark:text-emerald-400",
    borderLight: "hover:border-emerald-300 dark:hover:border-emerald-500/40",
    path: "/services/seo-marketing",
  },
  {
    icon: Rocket,
    title: "MVP Development",
    desc: "Launch your product in 60 days with a focused MVP approach. Validate your idea, attract investors, and get to market fast.",
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50 dark:bg-amber-600/10",
    textLight: "text-amber-600 dark:text-amber-400",
    borderLight: "hover:border-amber-300 dark:hover:border-amber-500/40",
    path: "/services/mvp-development",
  },
];

export default function Services() {
  const prefersReducedMotion = useReducedMotion();
  const itemMotion = viewFade(prefersReducedMotion, 0.5, "-40px");

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="services"
        className="py-24 bg-slate-100/80 dark:bg-slate-900/50 relative overflow-hidden"
      >
        {/* Decorative gradient orb */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <m.p {...itemMotion} className="section-label mb-3">
              What We Offer
            </m.p>
            <m.h2
              {...itemMotion}
              transition={{ duration: 0.5, delay: 0.06, ease: easeOut }}
              className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
            >
              Our <span className="gradient-text">Premium Services</span>
            </m.h2>
            <m.p
              {...itemMotion}
              transition={{ duration: 0.5, delay: 0.12, ease: easeOut }}
              className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto"
            >
              End-to-end digital solutions crafted to elevate your brand and drive real business results.
            </m.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.path}>
                  <m.article
                    {...itemMotion}
                    transition={{
                      duration: 0.5,
                      delay: staggerDelay(prefersReducedMotion, index),
                      ease: easeOut,
                    }}
                    className={`group card-interactive p-8 h-full ${service.borderLight}`}
                  >
                    <div
                      className={`size-14 ${service.bgLight} rounded-xl flex items-center justify-center mb-5 transition-all duration-200 group-hover:scale-110`}
                    >
                      <Icon className={`size-7 ${service.textLight}`} aria-hidden />
                    </div>
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-3 flex items-center gap-2">
                      {service.title}
                      <ArrowUpRight
                        className="size-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-indigo-500 dark:text-indigo-400"
                        aria-hidden
                      />
                    </h3>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400 text-sm">
                      {service.desc}
                    </p>
                  </m.article>
                </Link>
              );
            })}

            <Link
              href="/services"
              className="group card-interactive card-hover p-8 h-full flex flex-col"
            >
              <m.div {...itemMotion} className="flex flex-col h-full">
                <div className="size-14 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-5 transition-all duration-200 group-hover:scale-110 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-600/10">
                  <MoreHorizontal className="size-7 text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200" />
                </div>
                <h3 className="text-slate-900 dark:text-white flex items-center gap-1 text-xl font-bold mb-3">
                  More Services
                  <ChevronRight
                    className="size-5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </h3>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400 text-sm">
                  See the full list of services we offer.
                </p>
              </m.div>
            </Link>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
