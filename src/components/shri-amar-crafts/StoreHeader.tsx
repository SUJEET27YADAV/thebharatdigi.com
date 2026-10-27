"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  Menu,
  X,
  Ruler,
  ShieldCheck,
  Truck,
  Flame,
} from "lucide-react";
import SizeChartModal from "./SizeChartModal";

export default function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const amazonStoreUrl =
    "https://www.amazon.in/l/27943762031?me=A1AI1J6GJDQR4B";

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#4A121F] via-[#6B1D2F] to-[#4A121F] text-[#FAF6F0] py-2 px-4 z-[9960] text-xs font-medium border-b border-[#C59B27]/30 tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="flex items-center gap-1 bg-[#C59B27] text-[#2C1810] font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              <Flame className="size-3" /> FBA Verified
            </span>
            <span className="truncate">
              Handcrafted Ethnic Elegance — Delivered Fast Nationwide with <strong>Amazon Prime</strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-[#FAF6F0]/90">
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-[#E6C66E]" /> 100% Genuine Fabrics
            </span>
            <span className="flex items-center gap-1">
              <Truck className="size-3.5 text-[#00A8E1]" /> Free Prime Delivery
            </span>
            <button
              type="button"
              onClick={() => setSizeChartOpen(true)}
              className="text-[#E6C66E] hover:underline flex items-center gap-1"
            >
              <Ruler className="size-3" /> Size Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Storefront Navigation */}
      <header className="sticky top-0 z-60 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8DCC8] shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link
            href="/shri-amar-crafts"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="size-11 rounded-lg bg-gradient-to-br from-[#6B1D2F] to-[#4A121F] text-[#E6C66E] flex items-center justify-center font-serif font-bold text-xl border border-[#C59B27]/40 shadow-sm group-hover:scale-105 transition-transform">
              SA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#6B1D2F] group-hover:text-[#4A121F] transition-colors">
                  Shri Amar Crafts
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#00A8E1]/10 text-[#00A8E1] border border-[#00A8E1]/30">
                  Prime
                </span>
              </div>
              <p className="text-[11px] text-[#7C5A48] tracking-widest uppercase font-sans font-semibold">
                Ethnic Couture • Amazon FBA Store
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/shri-amar-crafts#catalog"
              className="text-sm font-medium text-[#4A2E1B] hover:text-[#6B1D2F] transition-colors"
            >
              All Outfits
            </Link>
            <Link
              href="/shri-amar-crafts#anarkali-kurti-sets"
              className="text-sm font-medium text-[#4A2E1B] hover:text-[#6B1D2F] transition-colors"
            >
              Anarkali Sets
            </Link>
            <Link
              href="/shri-amar-crafts#banarasi-dupatta-sets"
              className="text-sm font-medium text-[#4A2E1B] hover:text-[#6B1D2F] transition-colors"
            >
              Banarasi Silk
            </Link>
            <Link
              href="/shri-amar-crafts#fba-benefits"
              className="text-sm font-medium text-[#4A2E1B] hover:text-[#6B1D2F] transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="size-3.5 text-[#C59B27]" />
              FBA Guarantee
            </Link>
            <button
              type="button"
              onClick={() => setSizeChartOpen(true)}
              className="text-sm font-medium text-[#4A2E1B] hover:text-[#6B1D2F] transition-colors flex items-center gap-1"
            >
              <Ruler className="size-3.5 text-[#7C5A48]" />
              Size Guide
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={amazonStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#FF9900] hover:bg-[#E88B00] text-[#111111] transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
            >
              <span className="font-bold">Amazon Store</span>
              <ExternalLink className="size-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-[#D9C4A5] bg-[#FAF3E8] text-[#6B1D2F] hover:bg-[#E8DCC8] transition-colors"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8DCC8] bg-[#FFFDF9] px-4 py-6 space-y-4 animate-fadeIn shadow-lg">
            <nav className="flex flex-col space-y-3 font-medium text-base text-[#4A2E1B]">
              <Link
                href="/shri-amar-crafts#catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#F0E5D4] hover:text-[#6B1D2F]"
              >
                All Outfits (FBA Verified)
              </Link>
              <Link
                href="/shri-amar-crafts#anarkali-kurti-sets"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#F0E5D4] hover:text-[#6B1D2F]"
              >
                Cotton Anarkali Kurta Sets
              </Link>
              <Link
                href="/shri-amar-crafts#banarasi-dupatta-sets"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#F0E5D4] hover:text-[#6B1D2F]"
              >
                Viscose Silk &amp; Banarasi Jacquard Sets
              </Link>
              <Link
                href="/shri-amar-crafts#fba-benefits"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#F0E5D4] hover:text-[#6B1D2F]"
              >
                Amazon Prime Fulfillment Benefits
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSizeChartOpen(true);
                }}
                className="py-2 text-left hover:text-[#6B1D2F] flex items-center gap-2"
              >
                <Ruler className="size-4 text-[#C59B27]" /> Size Chart &amp; Fit Guide
              </button>
            </nav>

            <div className="pt-2">
              <a
                href={amazonStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold bg-[#FF9900] text-[#111] shadow"
              >
                Visit Shri Amar Crafts on Amazon
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Sizing Modal */}
      <SizeChartModal isOpen={sizeChartOpen} onClose={() => setSizeChartOpen(false)} />
    </>
  );
}
