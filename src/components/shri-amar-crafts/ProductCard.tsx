"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Eye,
  Sparkles,
  Check,
  Copy,
  Ruler,
  Truck,
} from "lucide-react";
import { StoreProduct, ProductVariant } from "@/types/storefront";
import ProductQuickViewModal from "./ProductQuickViewModal";

interface ProductCardProps {
  product: StoreProduct;
  onOpenSizeChart: () => void;
}

export default function ProductCard({
  product,
  onOpenSizeChart,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || "Maroon"
  );
  // Default to first variant's size
  const [selectedSize, setSelectedSize] = useState<string>(
    product.variants[0]?.size || "L"
  );
  const [activeImage, setActiveImage] = useState<string>(
    product.images.primary || product.images.fallbackPlaceholder
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [copiedAsin, setCopiedAsin] = useState(false);

  // Filter variants available for the selected color
  const colorVariants = product.variants.filter(
    (v) => v.color.toLowerCase() === selectedColor.toLowerCase()
  );

  // Set of sizes available for current color
  const availableSizesForColor = new Set(colorVariants.map((v) => v.size));

  // Determine active variant matching (Color + Size)
  const activeVariant: ProductVariant =
    colorVariants.find((v) => v.size === selectedSize) ||
    colorVariants[0] ||
    product.variants[0];

  // Standard sizes to display
  const standardSizes = ["M", "L", "XL", "XXL"];

  // Handle color change
  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);

    // Switch image based on selected color if matching gallery image found
    const matchingImg = product.images.gallery.find((img) =>
      img.toLowerCase().includes(colorName.toLowerCase())
    );
    if (matchingImg) {
      setActiveImage(matchingImg);
    }

    // Check if current selectedSize exists in this new color
    const newColorVariants = product.variants.filter(
      (v) => v.color.toLowerCase() === colorName.toLowerCase()
    );
    const hasSameSize = newColorVariants.some((v) => v.size === selectedSize);
    if (!hasSameSize && newColorVariants.length > 0) {
      setSelectedSize(newColorVariants[0].size);
    }
  };

  const handleCopyAsin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!activeVariant) return;
    navigator.clipboard.writeText(activeVariant.asin);
    setCopiedAsin(true);
    setTimeout(() => setCopiedAsin(false), 2000);
  };

  return (
    <>
      <article className="group rounded-2xl bg-[#FFFDF9] border border-[#E8DCC8] hover:border-[#C59B27] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between overflow-hidden">
        {/* Product Image Section */}
        <div className="relative aspect-[3/4] bg-[#FAF6F0] overflow-hidden">
          <Link href={`/shri-amar-crafts/product/${product.id}`} className="block size-full">
            <Image
              src={activeImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              onError={() => setActiveImage(product.images.fallbackPlaceholder)}
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#6B1D2F] text-white shadow-xs">
              {product.pricing.discountPercentage}% OFF
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1D2F] border border-[#E8DCC8] backdrop-blur-xs shadow-xs">
              {product.styleCode}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#00A8E1] text-white shadow-sm">
              <span>prime</span>
            </span>
          </div>

          {/* Quick View Button on Hover */}
          <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={() => setIsQuickViewOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white/95 text-[#2C1810] hover:bg-white hover:text-[#6B1D2F] backdrop-blur-md border border-[#E8DCC8] shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Eye className="size-4 text-[#6B1D2F]" />
              <span>Quick Preview &amp; Specs</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#C59B27] font-semibold flex items-center gap-1">
                <Sparkles className="size-3" />
                {product.category}
              </span>
              <span className="text-[#7C5A48] text-[11px] flex items-center gap-1">
                <Truck className="size-3 text-[#00A8E1]" /> FBA Stock
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-lg font-bold text-[#2C1810] group-hover:text-[#6B1D2F] transition-colors line-clamp-2 leading-snug">
              <Link href={`/shri-amar-crafts/product/${product.id}`}>
                {product.title}
              </Link>
            </h3>

            {/* Fabric Subtitle */}
            <p className="text-xs text-[#5C4033] mt-1 line-clamp-1">
              {product.fabric} • {product.fitType}
            </p>
          </div>

          {/* Interactive Color Selector */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#5C4033] font-medium">
                Color: <strong className="text-[#2C1810]">{selectedColor}</strong>
              </span>
              <span className="text-[11px] text-[#7C5A48]">
                {product.colors.length} {product.colors.length === 1 ? "Color" : "Colors"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {product.colors.map((color) => {
                const isSelected =
                  selectedColor.toLowerCase() === color.name.toLowerCase();
                return (
                  <button
                    type="button"
                    key={color.name}
                    onClick={() => handleColorChange(color.name)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border transition-all ${
                      isSelected
                        ? "border-[#6B1D2F] bg-[#FAF3E8] font-bold text-[#6B1D2F] ring-1 ring-[#6B1D2F]"
                        : "border-[#E8DCC8] bg-white text-[#5C4033] hover:border-[#C59B27]"
                    }`}
                  >
                    <span
                      className="size-3.5 rounded-full border border-black/15 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Size Pill Selector */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#5C4033] font-medium">
                Size: <strong className="text-[#6B1D2F]">{selectedSize}</strong>
              </span>
              <button
                type="button"
                onClick={onOpenSizeChart}
                className="text-[11px] text-[#7C5A48] hover:text-[#6B1D2F] hover:underline flex items-center gap-0.5"
              >
                <Ruler className="size-3" /> Size Guide
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {standardSizes.map((size) => {
                const isAvailable = availableSizesForColor.has(size);
                const isSelected = selectedSize === size;

                return (
                  <button
                    type="button"
                    key={size}
                    disabled={!isAvailable}
                    onClick={() => setSelectedSize(size)}
                    className={`py-1.5 px-2 rounded-md text-xs font-bold border transition-all ${
                      !isAvailable
                        ? "opacity-30 bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                        : isSelected
                        ? "bg-[#6B1D2F] text-white border-[#6B1D2F] shadow-xs"
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
          <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E8DCC8] flex items-center justify-between text-xs">
            <div className="truncate pr-2">
              <span className="text-[#7C5A48] text-[11px]">ASIN: </span>
              <code className="font-mono font-bold text-[#6B1D2F]">
                {activeVariant?.asin || "FBA"}
              </code>
            </div>
            <button
              type="button"
              onClick={handleCopyAsin}
              className="shrink-0 text-[10px] font-semibold text-[#6B1D2F] hover:underline flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-[#E8DCC8]"
            >
              {copiedAsin ? (
                <>
                  <Check className="size-3 text-green-600" /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-3" /> Copy
                </>
              )}
            </button>
          </div>

          {/* Pricing Display */}
          <div className="pt-2 border-t border-[#E8DCC8]">
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-[#6B1D2F]">
                  ₹{product.pricing.sellingPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-[#7C5A48] line-through">
                  ₹{product.pricing.mrp.toLocaleString("en-IN")}
                </span>
              </div>
              <span className="text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                Save {product.pricing.discountPercentage}%
              </span>
            </div>
            <div className="text-[10px] text-[#7C5A48]">
              Inclusive of all taxes (GST 5% included)
            </div>
          </div>

          {/* Primary Action Button: Buy on Amazon */}
          <div className="pt-1">
            <a
              href={activeVariant?.amazonUrl || product.variants[0]?.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#FF9900] hover:bg-[#E88B00] text-[#111111] transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 group/btn"
            >
              <span>Buy on Amazon</span>
              <ExternalLink className="size-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onOpenSizeChart={onOpenSizeChart}
      />
    </>
  );
}
