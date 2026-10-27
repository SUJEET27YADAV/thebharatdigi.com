"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ExternalLink,
  Check,
  Copy,
  Ruler,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { StoreProduct, ProductVariant } from "@/types/storefront";

interface ProductQuickViewModalProps {
  product: StoreProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeChart: () => void;
}

export default function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
  onOpenSizeChart,
}: ProductQuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [copiedAsin, setCopiedAsin] = useState(false);

  // Initialize or reset selections when product changes
  useEffect(() => {
    if (!product) return;
    const initialColor = product.colors[0]?.name || "";
    setSelectedColor(initialColor);

    const availableVariants = product.variants.filter(
      (v) => v.color.toLowerCase() === initialColor.toLowerCase()
    );
    setSelectedSize(availableVariants[0]?.size || "");
    setActiveImage(product.images.primary || product.images.fallbackPlaceholder);
  }, [product]);

  // Handle color change and auto-select matching available size
  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    if (!product) return;

    // Pick appropriate image if available for color
    const matchedGalleryImg = product.images.gallery.find((img) =>
      img.toLowerCase().includes(colorName.toLowerCase())
    );
    if (matchedGalleryImg) {
      setActiveImage(matchedGalleryImg);
    }

    const availableVariants = product.variants.filter(
      (v) => v.color.toLowerCase() === colorName.toLowerCase()
    );
    // If current selected size is not in this color's variants, switch to first available
    const hasSameSize = availableVariants.some((v) => v.size === selectedSize);
    if (!hasSameSize && availableVariants.length > 0) {
      setSelectedSize(availableVariants[0].size);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  // Active Variant
  const activeVariant: ProductVariant | undefined =
    product.variants.find(
      (v) =>
        v.color.toLowerCase() === selectedColor.toLowerCase() &&
        v.size === selectedSize
    ) ||
    product.variants.find(
      (v) => v.color.toLowerCase() === selectedColor.toLowerCase()
    ) ||
    product.variants[0];

  const availableSizesForSelectedColor = new Set(
    product.variants
      .filter((v) => v.color.toLowerCase() === selectedColor.toLowerCase())
      .map((v) => v.size)
  );

  const allAvailableSizes = ["M", "L", "XL", "XXL"];

  const handleCopyAsin = () => {
    if (!activeVariant) return;
    navigator.clipboard.writeText(activeVariant.asin);
    setCopiedAsin(true);
    setTimeout(() => setCopiedAsin(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FFFDF9] text-[#2C1810] rounded-2xl border border-[#D9C4A5] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#FAF3E8] border-b border-[#E8DCC8]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#00A8E1] text-white">
              Amazon Prime
            </span>
            <span className="text-xs font-semibold text-[#6B1D2F]">
              FBA Quick View • SKU: {activeVariant?.sku || product.styleCode}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-full text-[#7C5A48] hover:text-[#2C1810] hover:bg-black/5 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 grid md:grid-cols-12 gap-8">
          {/* Left Column: Image Preview & Gallery */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#E8DCC8]">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover object-top"
                onError={() => setActiveImage(product.images.fallbackPlaceholder)}
              />
              <div className="absolute top-3 left-3 bg-[#6B1D2F] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                {product.pricing.discountPercentage}% OFF
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.images.gallery.map((imgUrl, idx) => (
                <button
                  type="button"
                  key={imgUrl}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative size-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === imgUrl
                      ? "border-[#6B1D2F] scale-95"
                      : "border-[#E8DCC8] hover:border-[#C59B27]"
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${product.shortTitle} thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        product.images.fallbackPlaceholder;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Variant & Buying Info */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="text-xs font-bold text-[#C59B27] uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="size-3" /> {product.category}
              </div>
              <h2
                id="quick-view-title"
                className="font-serif text-2xl font-bold text-[#3D101A] leading-snug"
              >
                {product.title}
              </h2>
            </div>

            {/* Pricing */}
            <div className="p-3.5 rounded-xl bg-[#FAF3E8] border border-[#E8DCC8] flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#6B1D2F]">
                  ₹{product.pricing.sellingPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-[#7C5A48] line-through">
                  ₹{product.pricing.mrp.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                  Save {product.pricing.discountPercentage}%
                </span>
              </div>
              <span className="text-[11px] text-[#7C5A48]">
                Incl. of 5% GST
              </span>
            </div>

            {/* Color Swatches */}
            <div>
              <div className="text-xs font-bold text-[#2C1810] mb-2 flex items-center justify-between">
                <span>Color: <strong className="text-[#6B1D2F]">{selectedColor}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => {
                  const isSelected =
                    selectedColor.toLowerCase() === color.name.toLowerCase();
                  return (
                    <button
                      type="button"
                      key={color.name}
                      onClick={() => handleColorChange(color.name)}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        isSelected
                          ? "border-[#6B1D2F] bg-[#6B1D2F]/10 text-[#6B1D2F] font-bold ring-1 ring-[#6B1D2F]"
                          : "border-[#E8DCC8] bg-white text-[#5C4033] hover:border-[#C59B27]"
                      }`}
                    >
                      <span
                        className="size-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="text-xs font-bold text-[#2C1810] mb-2 flex items-center justify-between">
                <span>Size: <strong className="text-[#6B1D2F]">{selectedSize || "Select Size"}</strong></span>
                <button
                  type="button"
                  onClick={onOpenSizeChart}
                  className="text-[#6B1D2F] hover:underline text-xs flex items-center gap-1 font-semibold"
                >
                  <Ruler className="size-3" /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {allAvailableSizes.map((size) => {
                  const isAvailable = availableSizesForSelectedColor.has(size);
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      type="button"
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        !isAvailable
                          ? "opacity-40 bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                          : isSelected
                          ? "bg-[#6B1D2F] text-white border-[#6B1D2F] shadow-sm"
                          : "bg-white text-[#2C1810] border-[#E8DCC8] hover:border-[#6B1D2F]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live ASIN & SKU Pill */}
            {activeVariant && (
              <div className="p-3 rounded-lg bg-white border border-[#E8DCC8] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#7C5A48]">Amazon ASIN: </span>
                  <code className="font-mono font-bold text-[#2C1810] bg-[#FAF3E8] px-1.5 py-0.5 rounded">
                    {activeVariant.asin}
                  </code>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAsin}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#6B1D2F] hover:underline"
                >
                  {copiedAsin ? (
                    <>
                      <Check className="size-3 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      Copy ASIN
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Prime Perks */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5C4033]">
              <div className="flex items-center gap-1.5">
                <Truck className="size-3.5 text-[#00A8E1]" />
                <span>Prime 1-2 Day Free Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="size-3.5 text-[#6B1D2F]" />
                <span>7-Day Amazon Doorstep Returns</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <a
                href={activeVariant?.amazonUrl || product.variants[0]?.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-[#FF9900] hover:bg-[#E88B00] text-[#111111] transition-all shadow-md hover:shadow-lg"
              >
                <span>Buy on Amazon (Variant: {activeVariant?.size} • {activeVariant?.color})</span>
                <ExternalLink className="size-4" />
              </a>

              <div className="flex items-center justify-between text-xs pt-1">
                <Link
                  href={`/shri-amar-crafts/product/${product.id}`}
                  onClick={onClose}
                  className="text-[#6B1D2F] font-semibold hover:underline"
                >
                  View Full Product Details &amp; Fabric Specs &rarr;
                </Link>
                <span className="text-[10px] text-[#7C5A48]">
                  Verified Amazon FBA Stock
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
