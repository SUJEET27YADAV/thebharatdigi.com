"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  LazyMotion,
  m,
  domAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Check, Sparkles, TrendingUp, Globe, Clock } from "lucide-react";
import { easeOut, viewFade, staggerDelay } from "@/utils/motion";

function Counter({
  target,
  suffix = "+",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  const displayCount = prefersReducedMotion && isInView ? target : count;

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let start = 0;
    const duration = 1400;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      const next = start >= target ? target : Math.floor(start);
      setCount(next);
      if (start >= target) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayCount}
      {suffix}
    </span>
  );
}

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Global Standards, Local Understanding",
    desc: "International best practices with deep understanding of Indian and global markets.",
  },
  {
    icon: TrendingUp,
    title: "Transparent Pricing",
    desc: "No hidden costs. Competitive rates in INR and USD with flexible payment options.",
  },
  {
    icon: Globe,
    title: "Agile Development",
    desc: "Regular updates, quick iterations, and on-time delivery.",
  },
  {
    icon: Clock,
    title: "Post-Launch Support",
    desc: "We stay available after delivery with support across time zones.",
  },
];

const STATS = [
  {
    value: 500,
    label: "Projects Completed",
    color: "from-indigo-500 to-purple-500",
  },
  { value: 200, label: "Happy Clients", color: "from-purple-500 to-pink-500" },
  { value: 15, label: "Countries Served", color: "from-pink-500 to-rose-500" },
  {
    value: 10,
    label: "Years Experience",
    color: "from-indigo-500 to-blue-500",
  },
];

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const slideIn = viewFade(prefersReducedMotion, 0.5);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about"
        className="py-24 w-full overflow-x-hidden bg-slate-200/80 dark:bg-slate-800/50 relative"
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none"
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <m.div {...slideIn}>
              <p className="section-label mb-3 normal-case tracking-normal text-base">
                About Us
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white leading-tight">
                Crafting Digital{" "}
                <span className="gradient-text">Excellence</span> Since 2015
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                At The Bharat Digital, we believe every business deserves a
                world-class digital presence. Explore our{" "}
                <Link
                  href="/services"
                  className="text-indigo-600 dark:text-indigo-400 link-underline"
                >
                  web development services
                </Link>
                ,{" "}
                <Link
                  href="/seo-audit-pro"
                  className="text-indigo-600 dark:text-indigo-400 link-underline"
                >
                  SEO audit tools
                </Link>
                , and{" "}
                <Link
                  href="/shop"
                  className="text-indigo-600 dark:text-indigo-400 link-underline"
                >
                  digital products
                </Link>
                .
              </p>

              <dl className="grid grid-cols-2 gap-6">
                {STATS.map((stat) => (
                  <m.div
                    key={stat.label}
                    {...slideIn}
                    transition={{
                      duration: 0.5,
                      delay: staggerDelay(
                        prefersReducedMotion,
                        STATS.indexOf(stat),
                      ),
                      ease: easeOut,
                    }}
                    className="relative p-4 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <dt
                      className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-1`}
                    >
                      <Counter target={stat.value} />
                    </dt>
                    <dd className="text-sm text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </dd>
                  </m.div>
                ))}
              </dl>
            </m.div>

            <m.div
              {...slideIn}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            >
              <div className="card p-8 md:p-10 gradient-border">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                  Why Choose Us?
                </h3>
                <ul className="space-y-5">
                  {BENEFITS.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <m.li
                        key={benefit.title}
                        {...slideIn}
                        transition={{
                          duration: 0.4,
                          delay: staggerDelay(
                            prefersReducedMotion,
                            index,
                            0.08,
                          ),
                          ease: easeOut,
                        }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="size-10 mt-0.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                          <Icon className="size-5 text-white" aria-hidden />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm mb-0.5">
                            {benefit.title}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {benefit.desc}
                          </p>
                        </div>
                      </m.li>
                    );
                  })}
                </ul>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
