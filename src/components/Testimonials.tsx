"use client";
import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import { easeOut, staggerDelay, viewFade } from "@/utils/motion";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CEO, Fashion Hub India",
    content:
      "The Bharat Digital delivered beyond our expectations. Our e-commerce sales increased by 300% within 3 months of the new website launch.",
    initials: "RK",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, TechStart NYC",
    content:
      "Working with The Bharat Digital was a breeze. Despite the time zone difference, they were always available and delivered ahead of schedule.",
    initials: "SM",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Amit Patel",
    role: "Director, GreenTech Solutions",
    content:
      "The team's attention to detail is remarkable. They understood our brand and created a website that truly represents our values.",
    initials: "AP",
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const itemMotion = viewFade(prefersReducedMotion, 0.5, "-40px");

  return (
      <section
        className="py-24 bg-slate-100/80 dark:bg-slate-800/50 relative overflow-hidden"
        aria-labelledby="testimonials-heading"
      >
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <header className="text-center mb-12 md:mb-16">
            <m.p {...itemMotion} className="section-label mb-3">
              Testimonials
            </m.p>
            <m.h2
              id="testimonials-heading"
              {...itemMotion}
              transition={{ duration: 0.5, delay: 0.06, ease: easeOut }}
              className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
            >
              What Our <span className="gradient-text">Clients Say</span>
            </m.h2>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <m.blockquote
                key={t.name}
                {...itemMotion}
                transition={{
                  duration: 0.5,
                  delay: staggerDelay(prefersReducedMotion, i),
                  ease: easeOut,
                }}
                className="card p-6 md:p-8 flex flex-col relative group card-hover gradient-border"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-200">
                  <Quote className="size-12 text-indigo-500" />
                </div>

                <div
                  className="flex gap-0.5 mb-4"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1 italic">
                  &ldquo;{t.content}&rdquo;
                </p>
                <footer className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div
                    className={`size-10 bg-gradient-to-br ${t.gradient} rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0`}
                    aria-hidden
                  >
                    {t.initials}
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-slate-900 dark:text-white text-sm">
                      {t.name}
                    </cite>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {t.role}
                    </p>
                  </div>
                </footer>
              </m.blockquote>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/contactus" className="btn-primary group">
              Start Your Project
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
  );
}
