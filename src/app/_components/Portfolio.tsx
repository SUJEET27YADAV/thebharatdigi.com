"use client";
import Link from "next/link";
import { LazyMotion, m, domAnimation, useReducedMotion } from "framer-motion";
import {
  ShoppingCart,
  Landmark,
  HeartPulse,
  UtensilsCrossed,
  Plane,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { easeOut, staggerDelay, viewFade } from "@/utils/motion";

const projects: {
  title: string;
  category: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  {
    title: "E-Commerce Platform",
    category: "Fashion retail online store",
    icon: ShoppingCart,
    accent: "bg-indigo-100 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "FinTech Dashboard",
    category: "Banking analytics platform",
    icon: Landmark,
    accent: "bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400",
  },
  {
    title: "Healthcare Portal",
    category: "Telemedicine platform",
    icon: HeartPulse,
    accent: "bg-emerald-100 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Food Delivery App",
    category: "Restaurant ordering system",
    icon: UtensilsCrossed,
    accent: "bg-amber-100 dark:bg-amber-600/20 text-amber-600 dark:text-amber-400",
  },
  {
    title: "Travel Booking",
    category: "Holiday package platform",
    icon: Plane,
    accent: "bg-sky-100 dark:bg-sky-600/20 text-sky-600 dark:text-sky-400",
  },
  {
    title: "EdTech Platform",
    category: "Online learning management",
    icon: GraduationCap,
    accent: "bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400",
  },
];

export default function Portfolio() {
  const prefersReducedMotion = useReducedMotion();
  const itemMotion = viewFade(prefersReducedMotion, 0.22, "-40px");

  return (
    <LazyMotion features={domAnimation}>
    <section
      id="portfolio"
      className="py-24 bg-white dark:bg-slate-900"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-12 md:mb-16">
          <m.p {...itemMotion} className="section-label mb-2">
            Our Work
          </m.p>
          <m.h2
            id="portfolio-heading"
            {...itemMotion}
            transition={{ duration: 0.22, delay: 0.04, ease: easeOut }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            Featured <span className="gradient-text">Projects</span>
          </m.h2>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <m.article
                key={project.title}
                {...itemMotion}
                transition={{
                  duration: 0.22,
                  delay: staggerDelay(prefersReducedMotion, index),
                  ease: easeOut,
                }}
                className="card-interactive overflow-hidden"
              >
                <div
                  className={`aspect-[4/3] ${project.accent} flex items-center justify-center`}
                >
                  <Icon className="size-12" strokeWidth={1.5} aria-hidden />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {project.category}
                  </p>
                </div>
              </m.article>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/portfolio" className="btn-secondary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  </LazyMotion>
  );
}
