"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { easeOut, staggerDelay, viewFade } from "@/utils/motion";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CEO, Fashion Hub India",
    content:
      "The Bharat Digital delivered beyond our expectations. Our e-commerce sales increased by 300% within 3 months of the new website launch.",
    initials: "RK",
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, TechStart NYC",
    content:
      "Working with The Bharat Digital was a breeze. Despite the time zone difference, they were always available and delivered ahead of schedule.",
    initials: "SM",
  },
  {
    name: "Amit Patel",
    role: "Director, GreenTech Solutions",
    content:
      "The team's attention to detail is remarkable. They understood our brand and created a website that truly represents our values.",
    initials: "AP",
  },
];

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const itemMotion = viewFade(prefersReducedMotion, 0.22, "-40px");

  return (
    <section className="py-24 bg-slate-100 dark:bg-slate-900/50" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-12 md:mb-16">
          <motion.p {...itemMotion} className="section-label mb-2">
            Testimonials
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            {...itemMotion}
            transition={{ duration: 0.22, delay: 0.04, ease: easeOut }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              {...itemMotion}
              transition={{
                duration: 0.22,
                delay: staggerDelay(prefersReducedMotion, i),
                ease: easeOut,
              }}
              className="card p-6 md:p-8 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                {t.content}
              </p>
              <footer className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div
                  className="size-10 bg-indigo-100 dark:bg-indigo-600/20 rounded-full flex items-center justify-center text-sm font-semibold text-indigo-700 dark:text-indigo-300"
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
            </motion.blockquote>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/contactus" className="btn-primary">
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
