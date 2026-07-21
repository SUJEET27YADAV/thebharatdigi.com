"use client";
import Link from "next/link";
import { LazyMotion, m, domAnimation, useReducedMotion } from "framer-motion";
import { easeOut, staggerDelay, viewFade } from "@/utils/motion";
import { Project } from "@/types/types";
import { useEffect, useState } from "react";
import { LucideIcon } from "./ui/lucideIcon";
import { ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const itemMotion = viewFade(prefersReducedMotion, 0.5, "-40px");

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/getProjects", {
        cache: "no-store",
      });
      const result = await res.json();
      if (result.success) {
        setProjects(
          result.data
            .filter((p: Project) => p.featured === true)
            .sort((a: Project, b: Project) =>
              b.created_at.localeCompare(a.created_at),
            ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="portfolio"
        className="py-24 bg-white dark:bg-slate-900/50 relative overflow-hidden"
        aria-labelledby="portfolio-heading"
      >
        {/* Background decoration */}
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/8 rounded-full blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <header className="text-center mb-12 md:mb-16">
            <m.p {...itemMotion} className="section-label mb-3">
              Our Work
            </m.p>
            <m.h2
              id="portfolio-heading"
              {...itemMotion}
              transition={{ duration: 0.5, delay: 0.06, ease: easeOut }}
              className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
            >
              Featured <span className="gradient-text">Projects</span>
            </m.h2>
            <m.p
              {...itemMotion}
              transition={{ duration: 0.5, delay: 0.12, ease: easeOut }}
              className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto"
            >
              A showcase of our finest work across industries and technologies.
            </m.p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <m.article
                  key={project.title}
                  {...itemMotion}
                  transition={{
                    duration: 0.5,
                    delay: staggerDelay(prefersReducedMotion, index),
                    ease: easeOut,
                  }}
                  className="card-interactive overflow-hidden group"
                >
                  <div
                    className="aspect-[4/3] relative overflow-hidden flex items-center justify-center"
                    style={{ background: project.color }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    {Icon.length <= 2 ? (
                      <span
                        className="text-[60px] transition-transform duration-300 group-hover:scale-110"
                        aria-hidden
                      >
                        {Icon}
                      </span>
                    ) : (
                      <LucideIcon
                        size={80}
                        name={Icon}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    )}

                    {/* Arrow icon on hover */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-2 group-hover:translate-y-0">
                      <div className="size-8 rounded-lg bg-white/90 dark:bg-slate-900/90 flex items-center justify-center">
                        <ArrowUpRight className="size-4 text-slate-900 dark:text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
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
            <Link href="/portfolio" className="btn-secondary group">
              View All Projects
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
