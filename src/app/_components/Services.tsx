"use client";
import { LazyMotion, m, domAnimation, useReducedMotion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  ShoppingCart,
  Zap,
  Palette,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { easeOut, staggerDelay, viewFade } from "@/utils/motion";

const services = [
  {
    icon: Monitor,
    title: "Custom Web Development",
    desc: "Bespoke websites tailored to your brand identity. From simple landing pages to complex web applications.",
    color: "bg-indigo-100 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    desc: "Pixel-perfect designs that look stunning on every device. Mobile-first approach for seamless experience.",
    color: "bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    desc: "Powerful online stores with secure payment integration. Shopify, WooCommerce, or custom solutions.",
    color: "bg-pink-100 dark:bg-pink-600/20 text-pink-600 dark:text-pink-400",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    desc: "Lightning-fast websites that rank higher on Google. We optimize every millisecond for SEO results.",
    color: "bg-emerald-100 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "User-centric designs that convert visitors into customers. Intuitive interfaces that delight and engage.",
    color: "bg-amber-100 dark:bg-amber-600/20 text-amber-600 dark:text-amber-400",
  },
];

export default function Services() {
  const prefersReducedMotion = useReducedMotion();
  const itemMotion = viewFade(prefersReducedMotion, 0.22, "-40px");

  return (
    <LazyMotion features={domAnimation}>
    <section
      id="services"
      className="py-24 bg-slate-100 dark:bg-slate-900/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <m.p {...itemMotion} className="section-label mb-2">
            What We Offer
          </m.p>
          <m.h2
            {...itemMotion}
            transition={{ duration: 0.22, delay: 0.04, ease: easeOut }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            Our <span className="gradient-text">Premium Services</span>
          </m.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <m.article
                key={service.title}
                {...itemMotion}
                transition={{
                  duration: 0.22,
                  delay: staggerDelay(prefersReducedMotion, index),
                  ease: easeOut,
                }}
                className="service-card group card-interactive card-hover p-8"
              >
                <div
                  className={`size-14 ${service.color} rounded flex items-center justify-center mb-5 icon-pulse`}
                >
                  <Icon className="size-7" aria-hidden />
                </div>
                <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-3">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400 text-sm">
                  {service.desc}
                </p>
              </m.article>
            );
          })}

          <Link href="/services" className="service-card card-interactive card-hover p-8 group">
            <m.div {...itemMotion}>
              <div className="size-14 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center mb-5">
                <MoreHorizontal className="size-7 text-slate-500 dark:text-slate-400" />
              </div>
              <h3 className="text-slate-900 dark:text-white flex items-center gap-1 text-xl font-bold mb-3">
                More Services
                <ChevronRight
                  className="size-5 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5"
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
