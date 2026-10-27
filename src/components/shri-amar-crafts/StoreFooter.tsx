"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Heart,
} from "lucide-react";
import SizeChartModal from "./SizeChartModal";

export default function StoreFooter() {
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const amazonStoreUrl =
    "https://www.amazon.in/l/27943762031?me=A1AI1J6GJDQR4B";

  return (
    <>
      <footer className="bg-[#2A0B13] text-[#FAF6F0] pt-16 pb-12 border-t-2 border-[#C59B27]/40 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div
          className="absolute top-0 right-10 size-80 rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-10 size-80 rounded-full bg-[#6B1D2F]/20 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF6F0]/10">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-lg bg-gradient-to-br from-[#6B1D2F] to-[#4A121F] text-[#E6C66E] flex items-center justify-center font-serif font-bold text-xl border border-[#C59B27]/50 shadow-sm">
                  SA
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FAF6F0]">
                    Shri Amar Crafts
                  </h3>
                  <p className="text-xs text-[#E6C66E] font-medium tracking-widest uppercase">
                    Ethnic Couture • Amazon FBA Storefront
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#FAF6F0]/80 leading-relaxed max-w-md font-sans">
                Handcrafted Indian ethnic elegance designed for modern festive celebrations. Tailored from premium pure cotton and lustrous viscose silk with woven Banarasi Jacquard dupattas, backed by the speed and reliability of Amazon Prime.
              </p>

              <div className="p-3.5 rounded-lg bg-[#FAF6F0]/5 border border-[#C59B27]/30 text-xs space-y-1">
                <div className="text-[#E6C66E] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="size-4" /> Amazon FBA Verified Merchant
                </div>
                <div className="text-[#FAF6F0]/70 font-mono">
                  Seller Merchant ID: <strong>A1AI1J6GJDQR4B</strong>
                </div>
              </div>
            </div>

            {/* Quick Collections */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-serif text-base font-bold text-[#E6C66E] tracking-wider uppercase">
                Ethnic Collections
              </h4>
              <ul className="space-y-2.5 text-sm text-[#FAF6F0]/80 font-sans">
                <li>
                  <Link
                    href="/shri-amar-crafts#anarkali-kurti-sets"
                    className="hover:text-[#E6C66E] transition-colors flex items-center gap-1.5"
                  >
                    <span>Cotton Flared Anarkali Sets</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shri-amar-crafts#banarasi-dupatta-sets"
                    className="hover:text-[#E6C66E] transition-colors flex items-center gap-1.5"
                  >
                    <span>Viscose Silk Banarasi Sets</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shri-amar-crafts#catalog"
                    className="hover:text-[#E6C66E] transition-colors flex items-center gap-1.5"
                  >
                    <span>All Ready-to-Ship Outfits</span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setSizeChartOpen(true)}
                    className="hover:text-[#E6C66E] transition-colors flex items-center gap-1.5 text-left"
                  >
                    <Ruler className="size-3.5 text-[#E6C66E]" />
                    <span>Indian Sizing &amp; Fit Guide</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Amazon Fulfillment & Assurance */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-serif text-base font-bold text-[#E6C66E] tracking-wider uppercase">
                Amazon Fulfillment Assurance
              </h4>
              <ul className="space-y-3 text-xs text-[#FAF6F0]/80">
                <li className="flex items-start gap-2.5">
                  <Truck className="size-4 text-[#00A8E1] shrink-0 mt-0.5" />
                  <span><strong>Prime 1-2 Day Delivery:</strong> Free priority shipping for all Amazon Prime members across India.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <RotateCcw className="size-4 text-[#E6C66E] shrink-0 mt-0.5" />
                  <span><strong>7-Day Returns:</strong> Hassle-free doorstep pickup return and replacement policy managed by Amazon.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="size-4 text-green-400 shrink-0 mt-0.5" />
                  <span><strong>A-to-z Safe Checkout:</strong> UPI, Credit/Debit, Net Banking, and Cash on Delivery accepted on Amazon.</span>
                </li>
              </ul>

              <div className="pt-2">
                <a
                  href={amazonStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#FF9900] hover:bg-[#E88B00] text-[#111] transition-all shadow-xs"
                >
                  <span>Visit Shri Amar Crafts on Amazon</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Subtle Agency Credit */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6F0]/60">
            <div className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} Shri Amar Crafts. All rights reserved. Fulfilled by Amazon.
            </div>

            <div className="flex items-center gap-1">
              <span>Handcrafted with</span>
              <Heart className="size-3 text-red-500 fill-red-500" />
              <span>in India &bull; Powered by</span>
              <a
                href="https://www.thebharatdigi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E6C66E] hover:underline font-semibold ml-1 inline-flex items-center gap-0.5"
              >
                The Bharat Digital
                <ExternalLink className="size-2.5" />
              </a>
            </div>
          </div>

          <div className="mt-4 text-[10px] text-center text-[#FAF6F0]/40">
            Amazon, Amazon Prime, and Fulfilled by Amazon (FBA) are trademarks of Amazon.com, Inc. or its affiliates. Shri Amar Crafts is an independent seller on Amazon.in.
          </div>
        </div>
      </footer>

      {/* Size Chart Modal */}
      <SizeChartModal isOpen={sizeChartOpen} onClose={() => setSizeChartOpen(false)} />
    </>
  );
}
