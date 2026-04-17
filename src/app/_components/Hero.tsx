// components/Hero.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroBg from "./ui/hero_bg";

export default function Hero() {
  const words = [
    "Stunning Websites",
    "Digital Experiences",
    "Business Growth",
    "Brand Success",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const speed = isDeleting ? 50 : 150;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText !== word) {
        setDisplayText(word.substring(0, displayText.length + 1));
      } else if (isDeleting && displayText !== "") {
        setDisplayText(word.substring(0, displayText.length - 1));
      } else if (!isDeleting && displayText === word) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden
                 bg-slate-50 dark:bg-[#050208]"
    >
      <HeroBg />

      {/* Decorative blurs */}
      <div
        className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl animate-bounce z-[2]
                   bg-indigo-400/30 dark:bg-indigo-500/20"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full blur-xl animate-pulse z-[2]
                   bg-purple-400/30 dark:bg-purple-500/20"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute top-1/2 right-20 w-16 h-16 rounded-full blur-xl animate-spin z-[2]
                   bg-pink-400/30 dark:bg-pink-500/20"
        style={{ animationDuration: "10s" }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl mb-4 font-medium
                     text-indigo-600 dark:text-indigo-400"
        >
          Welcome to The Bharat Digital
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight
                     text-slate-900 dark:text-white"
        >
          We Build <br className="sm:hidden" />
          <span className="gradient-text">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 px-2
                     text-slate-600 dark:text-gray-300"
        >
          Transform your digital presence with cutting-edge web solutions. From
          startups in Mumbai to enterprises in Manhattan, we craft experiences
          that captivate and convert.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center px-4"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all
                       bg-indigo-600 text-white hover:bg-indigo-700
                       shadow-indigo-500/25"
          >
            Start Your Project →
          </a>
          <a
            href="#portfolio"
            className="px-8 py-4 rounded-full font-bold text-lg transition-all border backdrop-blur-sm
                       border-indigo-300 dark:border-indigo-500/50
                       text-indigo-600 dark:text-white
                       hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
          >
            View Our Work
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer rounded-full border-2 p-1
                   text-indigo-500 dark:text-indigo-400
                   border-indigo-500 dark:border-indigo-400"
        onClick={() =>
          document
            .getElementById("services")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
