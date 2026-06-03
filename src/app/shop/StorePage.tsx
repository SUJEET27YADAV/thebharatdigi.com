"use client";
import { Product } from "@/types/types";
import { LazyMotion, m, domAnimation, useReducedMotion } from "framer-motion";
import { Globe, PackageOpen, Zap } from "lucide-react";
import ProductCard from "../_components/ProductCard";
import ProductCardLoading from "../_components/ProductCardLoading";
import { easeOut, viewFade } from "@/utils/motion";

interface StorePageProps {
  products: Product[] | null;
  err: string;
}

export default function StorePage({ products, err }: StorePageProps) {
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = viewFade(prefersReducedMotion);

  return (
    <LazyMotion features={domAnimation}>
    <div className="min-h-screen px-4 md:px-6 py-24 max-w-7xl mx-auto">
      <header className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
        <m.div
          {...fadeUp}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded border mb-5 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20"
        >
          <Globe className="size-4 text-indigo-600 dark:text-indigo-400" aria-hidden />
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
            Available Worldwide
          </span>
        </m.div>
        <m.h1
          {...fadeUp}
          transition={{ duration: 0.22, delay: 0.04, ease: easeOut }}
          className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white"
        >
          Digital Products for{" "}
          <span className="gradient-text">Modern Teams</span>
        </m.h1>
        <m.p
          {...fadeUp}
          transition={{ duration: 0.22, delay: 0.08, ease: easeOut }}
          className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          Starter kits, SEO tools, and assets built by The Bharat Digital.
          Every purchase includes lifetime updates and support.
        </m.p>
      </header>

      <section aria-labelledby="products-heading">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {err ? (
            <div className="empty-state col-span-full card">
              <div className="empty-state-icon">
                <PackageOpen size={22} aria-hidden />
              </div>
              <p className="text-slate-900 dark:text-white font-medium mb-1">
                Couldn&apos;t load products
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{err}</p>
            </div>
          ) : !products ? (
            <>
              <ProductCardLoading />
              <ProductCardLoading />
              <ProductCardLoading />
            </>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}

          <div
            aria-hidden
            className="border border-dashed border-slate-200 dark:border-slate-800 rounded flex flex-col items-center justify-center p-8 text-slate-400 min-h-[280px]"
          >
            <Zap size={32} className="mb-3 opacity-60" />
            <p className="text-sm font-medium text-center">
              New products coming soon
            </p>
          </div>
        </div>
      </section>
    </div>
  </LazyMotion>
  );
}
