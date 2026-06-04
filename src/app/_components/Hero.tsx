"use client";
import { useState, useEffect, useRef } from "react";
import { LazyMotion, m, domAnimation, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
    const speed = isDeleting.current ? 50 : 150;

    const timer = setTimeout(() => {
      if (!isDeleting.current) {
        if (displayText.length < word.length) {
          setDisplayText(word.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => {
            isDeleting.current = true;
            setTick(t => t + 1);
          }, 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(word.slice(0, displayText.length - 1));
        } else {
          isDeleting.current = false;
          wordIndex.current = (wordIndex.current + 1) % words.length;
          setTick(t => t + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, tick]);

  return (
    <LazyMotion features={domAnimation}>
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-50 dark:bg-[#050208]"
    >
      <HeroBg />

      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
        <m.p
          {...fadeUp}
          className="section-label mb-3 text-base normal-case tracking-normal"
        >
          Welcome to The Bharat Digital
        </m.p>

        <h1 className="sr-only">
          The Bharat Digital: Premium Web Development Company that offers SEO
          Audit Tools, e-commerce solutions, IT support and more for businesses
          worldwide.
        </h1>
        <m.h2
          {...fadeUp}
          transition={{ duration: 0.25, delay: 0.05, ease: easeOut }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-slate-900 dark:text-white"
        >
          We Build <br className="sm:hidden" />
          <span className="gradient-text">
            {displayText}
            <span className="opacity-70">|</span>
          </span>
        </m.h2>

        <m.p
          {...fadeUp}
          transition={{ duration: 0.25, delay: 0.1, ease: easeOut }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 px-2 text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          Transform your digital presence with cutting-edge web solutions. From
          startups in Mumbai to enterprises in Manhattan, we craft experiences
          that captivate and convert.
        </m.p>

        <m.div
          {...fadeUp}
          transition={{ duration: 0.25, delay: 0.15, ease: easeOut }}
          className="flex flex-col sm:flex-row gap-3 justify-center px-4"
        >
          <a href="#contact" className="btn-primary text-lg px-8 py-3.5">
            Start Your Project
          </a>
          <a href="#portfolio" className="btn-secondary text-lg px-8 py-3.5">
            View Our Work
          </a>
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
  </LazyMotion>
  );
}
