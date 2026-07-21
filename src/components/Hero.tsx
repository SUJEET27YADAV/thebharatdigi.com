"use client";
import { useState, useEffect, useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import HeroBg from "./ui/hero_bg";
import { easeOut, enterFade } from "@/utils/motion";

const words = [
  "Innovative Web Solutions",
  "Stunning Websites",
  "SEO Optimization Tools",
  "E-Commerce Solutions",
  "Digital Experiences",
  "Sustainable Branding",
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = enterFade(prefersReducedMotion);
  const wordIndex = useRef(0);
  const isDeleting = useRef(false);
  const [displayText, setDisplayText] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const word = words[wordIndex.current];
    const speed = isDeleting.current ? 40 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting.current) {
        if (displayText.length < word.length) {
          setDisplayText(word.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => {
            isDeleting.current = true;
            setTick((t) => t + 1);
          }, 2200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(word.slice(0, displayText.length - 1));
        } else {
          isDeleting.current = false;
          wordIndex.current = (wordIndex.current + 1) % words.length;
          setTick((t) => t + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, tick]);

  return (
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-50 dark:bg-[#050208]"
      >
        <HeroBg />

        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 mesh-gradient opacity-60 pointer-events-none" aria-hidden />

        {/* Floating gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl animate-orb" />
          <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-500/8 dark:bg-purple-500/12 rounded-full blur-3xl animate-orb-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 dark:bg-pink-500/8 rounded-full blur-3xl animate-glow-pulse" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] animate-grid-pulse pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
          <m.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: easeOut }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-indigo-200 dark:border-indigo-500/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm"
          >
            <span className="size-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Welcome to The Bharat Digital
            </span>
          </m.div>

          <h1 className="sr-only">
            The Bharat Digital: Premium Web Development Company that offers SEO
            Audit Tools, e-commerce solutions, IT support and more for businesses
            worldwide.
          </h1>
          <m.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[1.1] text-slate-900 dark:text-white"
          >
            We Build{" "}
            <br className="sm:hidden" />
            <span className="gradient-text-animated">
              {displayText}
            </span>
            <span className="animate-typing-cursor text-indigo-500 dark:text-indigo-400 font-light">
              |
            </span>
          </m.h2>

          <m.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 px-2 text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Transform your digital presence with cutting-edge web solutions. From
            startups in Mumbai to enterprises in Manhattan, we craft experiences
            that captivate and convert.
          </m.p>

          <m.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.24, ease: easeOut }}
            className="flex flex-col sm:flex-row gap-4 justify-center px-4"
          >
            <a
              href="#contact"
              className="btn-primary text-lg px-8 py-4 group"
            >
              Start Your Project
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="btn-secondary text-lg px-8 py-4"
            >
              View Our Work
            </a>
          </m.div>

          {/* Trust badges */}
          <m.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.32, ease: easeOut }}
            className="flex flex-wrap items-center justify-center gap-6 mt-14 text-sm text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["RK", "SM", "AP"].map((initial, i) => (
                  <div
                    key={initial}
                    className="size-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white dark:border-slate-900"
                    style={{ zIndex: 3 - i }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span>200+ Happy Clients</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className="size-4 fill-amber-400 text-amber-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1">4.9/5 Rating</span>
            </div>
          </m.div>
        </div>

        <button
          type="button"
          aria-label="Scroll to services"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded border p-1 text-indigo-500 dark:text-indigo-400 border-indigo-500/60 dark:border-indigo-400/60 btn-ghost"
          onClick={() =>
            document
              .getElementById("services")
              ?.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
              })
          }
        >
          <ChevronDown className="size-6 motion-safe:animate-[bounce_2s_ease-in-out_infinite]" />
        </button>
      </section>
  );
}
