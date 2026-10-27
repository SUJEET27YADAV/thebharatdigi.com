"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Filter,
  ChevronDown,
  HelpCircle,
  Ruler,
  ExternalLink,
} from "lucide-react";
import { StoreProduct } from "@/types/storefront";
import ProductCard from "@/components/shri-amar-crafts/ProductCard";
import SizeChartModal from "@/components/shri-amar-crafts/SizeChartModal";

interface StoreCatalogClientProps {
  products: StoreProduct[];
}

export default function StoreCatalogClient({
  products,
}: StoreCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Collections" },
    { id: "Anarkali Kurta Sets", label: "Anarkali Kurti Sets" },
    {
      id: "Straight Kurta & Banarasi Dupatta Sets",
      label: "Banarasi Dupatta Sets",
    },
  ];

  const colors = [
    { id: "all", label: "All Colors" },
    { id: "Maroon", label: "Maroon", hex: "#6B1D2F" },
    { id: "Purple", label: "Purple", hex: "#4B1D52" },
  ];

  // Filtering
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesColor =
      selectedColor === "all" ||
      product.colors.some(
        (c) => c.name.toLowerCase() === selectedColor.toLowerCase()
      );

    return matchesCategory && matchesColor;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.pricing.sellingPrice - b.pricing.sellingPrice;
    }
    if (sortBy === "price-high") {
      return b.pricing.sellingPrice - a.pricing.sellingPrice;
    }
    if (sortBy === "discount") {
      return b.pricing.discountPercentage - a.pricing.discountPercentage;
    }
    return 0; // featured default
  });

  const faqs = [
    {
      q: "How does Fulfilled by Amazon (FBA) delivery work for Shri Amar Crafts?",
      a: "All of our listed ethnic garments are stored in official Amazon climate-controlled fulfillment centers across India. When you place an order via our direct Amazon links, Amazon picks, packs, and delivers the outfit straight to your doorstep. If you are an Amazon Prime member, you receive free 1-Day or 2-Day delivery with live tracking.",
    },
    {
      q: "Can I exchange or return the outfit if the size doesn't fit?",
      a: "Yes, absolutely! Because our entire catalog is Fulfilled by Amazon (FBA), you are covered by Amazon's 7-Day Hassle-Free Return & Replacement Policy. If the bust or pant fit isn't perfect, you can request a doorstep exchange for another size directly in your Amazon app with zero return shipping fees.",
    },
    {
      q: "What payment methods are supported on Amazon?",
      a: "You can pay using Amazon Pay, UPI (Google Pay, PhonePe, Paytm), Credit/Debit cards (Visa, MasterCard, RuPay), Net Banking, EMI, or Cash on Delivery (COD) subject to pin code availability.",
    },
    {
      q: "What fabrics and care instructions are recommended?",
      a: "Our Cotton Anarkali sets are crafted from 100% breathable pure cotton, perfect for day and evening festivities. Our straight kurta sets feature lustrous viscose silk with woven Banarasi Jacquard dupattas. We recommend dry cleaning or gentle hand washing in cold water to preserve the intricate yoke embroidery and metallic zari threads.",
    },
  ];

  return (
    <>
      <section id="catalog" className="py-16 bg-[#FAF6F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E8DCC8]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B1D2F]/10 text-[#6B1D2F] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="size-3 text-[#C59B27]" />
                <span>Ready-To-Ship FBA Catalog</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D101A]">
                Handcrafted Festive Collections
              </h2>
              <p className="text-sm text-[#5C4033] mt-1 max-w-xl">
                Select your preferred ensemble, preview authentic color swatches, choose your standard Indian ethnic size, and checkout directly on Amazon.
              </p>
            </div>

            {/* Quick Sizing Button */}
            <div className="shrink-0 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSizeChartOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border border-[#D9C4A5] bg-[#FAF3E8] text-[#6B1D2F] hover:bg-[#E8DCC8] transition-colors"
              >
                <Ruler className="size-3.5 text-[#C59B27]" />
                <span>Size Chart &amp; Fit Guide</span>
              </button>
            </div>
          </div>

          {/* Filter and Sort Toolbar */}
          <div className="bg-[#FFFDF9] p-4 sm:p-5 rounded-2xl border border-[#E8DCC8] shadow-xs mb-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#7C5A48] mr-1 hidden sm:inline flex items-center gap-1">
                  <Filter className="size-3" /> Filter:
                </span>
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-[#6B1D2F] text-white font-bold shadow-xs"
                        : "bg-[#FAF6F0] text-[#5C4033] border border-[#E8DCC8] hover:border-[#C59B27]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#7C5A48]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF6F0] text-[#2C1810] border border-[#E8DCC8] text-xs font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#6B1D2F]"
                >
                  <option value="featured">Featured / Bestsellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Biggest Discount %</option>
                </select>
              </div>
            </div>

            {/* Color Filter Strip */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#F0E5D4] text-xs">
              <span className="text-[#7C5A48] font-medium">Color Palette:</span>
              <div className="flex items-center gap-2">
                {colors.map((c) => {
                  const isSelected = selectedColor === c.id;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border transition-all ${
                        isSelected
                          ? "border-[#6B1D2F] bg-[#FAF3E8] text-[#6B1D2F] font-bold"
                          : "border-[#E8DCC8] bg-white text-[#5C4033] hover:border-[#C59B27]"
                      }`}
                    >
                      {c.hex && (
                        <span
                          className="size-3 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                      )}
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFDF9] rounded-2xl border border-[#E8DCC8] p-8">
              <h3 className="font-serif text-xl font-bold text-[#6B1D2F] mb-2">
                No Outfits Match Your Filter
              </h3>
              <p className="text-sm text-[#5C4033] mb-4">
                Try resetting your color or collection filter to see all in-stock FBA items.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedColor("all");
                }}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-[#6B1D2F] text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  id={
                    product.category.includes("Anarkali")
                      ? "anarkali-kurti-sets"
                      : "banarasi-dupatta-sets"
                  }
                >
                  <ProductCard
                    product={product}
                    onOpenSizeChart={() => setSizeChartOpen(true)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Amazon Storefront Banner Callout */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#6B1D2F] via-[#521523] to-[#3D101A] text-white border border-[#C59B27]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#00A8E1] text-white">
                Amazon Prime Partner
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Want to Explore the Entire Shri Amar Crafts Store on Amazon?
              </h3>
              <p className="text-sm text-[#FAF6F0]/80 max-w-xl">
                Browse our brand storefront directly on Amazon.in with live customer reviews, Prime lightning deals, and seller ratings.
              </p>
            </div>

            <a
              href="https://www.amazon.in/l/27943762031?me=A1AI1J6GJDQR4B"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#FF9900] hover:bg-[#E88B00] text-[#111] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>Visit Amazon Storefront</span>
              <ExternalLink className="size-4" />
            </a>
          </div>

          {/* Frequently Asked Questions */}
          <div className="mt-20 max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#C59B27]">
                <HelpCircle className="size-4" />
                <span>Buyer Assistance</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D101A]">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4033]">
                Everything you need to know about ordering our ethnic collections via Amazon Prime.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-xl border border-[#E8DCC8] bg-[#FFFDF9] overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left font-serif font-bold text-sm sm:text-base text-[#2C1810] flex items-center justify-between gap-4 hover:text-[#6B1D2F]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`size-4 text-[#7C5A48] transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-[#6B1D2F]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#5C4033] leading-relaxed border-t border-[#F0E5D4] pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sizing Modal */}
      <SizeChartModal isOpen={sizeChartOpen} onClose={() => setSizeChartOpen(false)} />
    </>
  );
}
