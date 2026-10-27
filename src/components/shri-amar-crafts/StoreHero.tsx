"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
} from "lucide-react";

export default function StoreHero() {
  const amazonStoreUrl =
    "https://www.amazon.in/l/27943762031?me=A1AI1J6GJDQR4B";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#F5ECE0] to-[#FAF6F0] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E8DCC8]">
      {/* Decorative Traditional Ethnic Elements */}
      <div
        className="absolute top-0 right-0 -mt-10 -mr-10 size-96 rounded-full bg-[#6B1D2F]/5 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 -mb-10 -ml-10 size-96 rounded-full bg-[#C59B27]/10 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF3E8] border border-[#C59B27]/40 text-[#6B1D2F] text-xs font-semibold tracking-wide shadow-xs">
              <Sparkles className="size-3.5 text-[#C59B27]" />
              <span>Amazon FBA Certified Store • Seller ID: A1AI1J6GJDQR4B</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D101A] leading-[1.15] tracking-tight">
              Regal Indian Ethnic Elegance Delivered with{" "}
              <span className="text-[#6B1D2F] relative inline-block">
                Amazon Prime
                <span className="absolute left-0 bottom-1 w-full h-2 bg-[#C59B27]/20 -z-10 rounded"></span>
              </span>{" "}
              Speed
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5C4033] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Discover masterfully tailored 3-piece ethnic kurta sets crafted from breathable pure cotton and lustrous viscose silk with authentic Banarasi Jacquard dupattas. Shipped, packed, and backed by Amazon Prime fulfillment.
            </p>

            {/* Key Value Props Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-white/70 border border-[#E8DCC8] backdrop-blur-xs">
                <Truck className="size-4 text-[#00A8E1] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#2C1810]">Prime Fast Delivery</div>
                  <div className="text-[11px] text-[#7C5A48]">1-2 Day Free Dispatch</div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-white/70 border border-[#E8DCC8] backdrop-blur-xs">
                <ShieldCheck className="size-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#2C1810]">100% Genuine Fabrics</div>
                  <div className="text-[11px] text-[#7C5A48]">Pure Cotton &amp; Viscose Silk</div>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-start gap-2 p-3 rounded-lg bg-white/70 border border-[#E8DCC8] backdrop-blur-xs">
                <RotateCcw className="size-4 text-[#6B1D2F] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#2C1810]">Amazon 7-Day Returns</div>
                  <div className="text-[11px] text-[#7C5A48]">Hassle-Free Exchanges</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/shri-amar-crafts#catalog"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg text-base font-bold bg-[#6B1D2F] hover:bg-[#521523] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore FBA Collection</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <a
                href={amazonStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-base font-semibold bg-[#FF9900] hover:bg-[#E88B00] text-[#111111] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <span>Buy Direct on Amazon</span>
                <ExternalLink className="size-4" />
              </a>
            </div>

            {/* Trust Footer */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-xs text-[#7C5A48]">
              <span className="flex items-center gap-1">
                <Star className="size-3.5 fill-[#FF9900] text-[#FF9900]" />
                <strong className="text-[#2C1810]">Top-Rated</strong> Amazon Seller
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-green-600" />
                Verified FBA Inventory
              </span>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Golden Border Glow */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#C59B27]/40 via-[#6B1D2F]/20 to-[#C59B27]/40 blur-md opacity-70" />

              <div className="relative rounded-2xl bg-[#FFFDF9] border border-[#D9C4A5] p-3 shadow-xl overflow-hidden">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#FAF6F0]">
                  <Image
                    src="/images/shri-amar-crafts/am3-hc-30-maroon-front.jpg"
                    alt="Shri Amar Crafts Cotton Embroidered Maroon Anarkali Kurti Set"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 bg-[#6B1D2F] text-white px-3 py-1 rounded-md text-xs font-serif font-semibold tracking-wide shadow-md">
                    Festive 51% OFF
                  </div>
                  <div className="absolute top-3 right-3 bg-[#00A8E1] text-white px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                    <span>prime</span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-3 rounded-lg border border-[#E8DCC8] shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-bold text-[#6B1D2F] uppercase tracking-wider">
                          Bestseller • FBA In Stock
                        </div>
                        <div className="text-sm font-serif font-bold text-[#2C1810] line-clamp-1">
                          Cotton Embroidered Anarkali Kurti Set
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-[#6B1D2F]">₹1,699</div>
                        <div className="text-[11px] text-[#7C5A48] line-through">₹3,499</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
