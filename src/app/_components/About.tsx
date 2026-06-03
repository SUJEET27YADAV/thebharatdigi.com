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
import { Check } from "lucide-react";
import { easeOut, viewFade } from "@/utils/motion";

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

  const displayCount =
    prefersReducedMotion && isInView ? target : count;

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let start = 0;
    const duration = 1200;
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
    title: "Global Standards, Local Understanding",
    desc: "International best practices with deep understanding of Indian and global markets.",
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden costs. Competitive rates in INR and USD with flexible payment options.",
  },
  {
    title: "Agile Development",
    desc: "Regular updates, quick iterations, and on-time delivery.",
  },
  {
    title: "Post-Launch Support",
    desc: "We stay available after delivery with support across time zones.",
  },
];

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const slideIn = viewFade(prefersReducedMotion, 0.25);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about"
        className="py-24 w-full overflow-x-hidden bg-slate-100 dark:bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <m.div {...slideIn}>
              <p className="section-label mb-2 normal-case tracking-normal text-base">
                About Us
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                Crafting Digital{" "}
                <span className="gradient-text">Excellence</span> Since 2015
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                At The Bharat Digital, we believe every business deserves a
                world-class digital presence. Explore our{" "}
                <Link
                  href="/services"
                  className="text-indigo-600 dark:text-indigo-400 underline-offset-2 hover:underline"
                >
                  web development services
                </Link>
                ,{" "}
                <Link
                  href="/seo-audit-pro"
                  className="text-indigo-600 dark:text-indigo-400 underline-offset-2 hover:underline"
                >
                  SEO audit tools
                </Link>
                , and{" "}
                <Link
                  href="/shop"
                  className="text-indigo-600 dark:text-indigo-400 underline-offset-2 hover:underline"
                >
                  digital products
                </Link>
                .
              </p>

              <dl className="grid grid-cols-2 gap-6">
                {[
                  { value: 500, label: "Projects Completed" },
                  { value: 200, label: "Happy Clients" },
                  { value: 15, label: "Countries Served" },
                  { value: 8, label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-3xl font-bold gradient-text mb-0.5">
                      <Counter target={stat.value} />
                    </dt>
                    <dd className="text-sm text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </m.div>

            <m.div
              {...slideIn}
              transition={{ duration: 0.25, delay: 0.05, ease: easeOut }}
            >
              <div className="card p-8 md:p-10">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                  Why Choose Us?
                </h3>
                <ul className="space-y-5">
                  {BENEFITS.map((benefit) => (
                    <li key={benefit.title} className="flex items-start gap-3">
                      <div className="size-5 mt-0.5 bg-indigo-600 dark:bg-[#ac4bff] rounded-full flex items-center justify-center shrink-0">
                        <Check
                          className="size-3 text-white"
                          strokeWidth={3}
                          aria-hidden
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm mb-0.5">
                          {benefit.title}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
