"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  Check,
  Copy,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Package,
  Layers,
  HeartHandshake,
  Calendar,
} from "lucide-react";
import { StoreProduct, ProductVariant } from "@/types/storefront";
import SizeChartModal from "@/components/shri-amar-crafts/SizeChartModal";
import ProductCard from "@/components/shri-amar-crafts/ProductCard";

interface ProductDetailClientProps {
  product: StoreProduct;
  relatedProducts: StoreProduct[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || "Maroon"
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.variants[0]?.size || "L"
  );
  const [activeImage, setActiveImage] = useState<string>(
    product.images.primary || product.images.fallbackPlaceholder
  );
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [copiedAsin, setCopiedAsin] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "contents" | "styling" | "care">("specs");

  // Filter variants available for the selected color
  const colorVariants = product.variants.filter(
    (v) => v.color.toLowerCase() === selectedColor.toLowerCase()
  );

  const availableSizesForColor = new Set(colorVariants.map((v) => v.size));

  // Determine active variant
  const activeVariant: ProductVariant =
    colorVariants.find((v) => v.size === selectedSize) ||
    colorVariants[0] ||
    product.variants[0];

  const standardSizes = ["M", "L", "XL", "XXL"];

  // Handle color change
  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);

    // Switch image based on selected color if available in gallery
    const matchingImg = product.images.gallery.find((img) =>
      img.toLowerCase().includes(colorName.toLowerCase())
    );
    if (matchingImg) {
      setActiveImage(matchingImg);
    }

    const newColorVariants = product.variants.filter(
      (v) => v.color.toLowerCase() === colorName.toLowerCase()
    );
    const hasSameSize = newColorVariants.some((v) => v.size === selectedSize);
    if (!hasSameSize && newColorVariants.length > 0) {
      setSelectedSize(newColorVariants[0].size);
    }
  };

  const handleCopyAsin = () => {
    if (!activeVariant) return;
    navigator.clipboard.writeText(activeVariant.asin);
    setCopiedAsin(true);
    setTimeout(() => setCopiedAsin(false), 2000);
  };

  return (
    <>
      <div className="py-8 sm:py-12 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#7C5A48]">
            <Link href="/shri-amar-crafts" className="hover:text-[#6B1D2F] transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3 text-[#D9C4A5]" />
            <Link href="/shri-amar-crafts#catalog" className="hover:text-[#6B1D2F] transition-colors">
              Collections
            </Link>
            <ChevronRight className="size-3 text-[#D9C4A5]" />
            <span className="text-[#C59B27] font-medium">{product.category}</span>
            <ChevronRight className="size-3 text-[#D9C4A5]" />
            <span className="text-[#2C1810] font-semibold truncate max-w-xs">{product.shortTitle}</span>
          </nav>

          {/* Main Product Layout */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 bg-[#FFFDF9] rounded-3xl border border-[#E8DCC8] p-6 sm:p-10 shadow-sm">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#E8DCC8] shadow-sm">
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  onError={() => setActiveImage(product.images.fallbackPlaceholder)}
                />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#6B1D2F] text-white shadow-md">
                    {product.pricing.discountPercentage}% OFF
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1D2F] border border-[#E8DCC8] backdrop-blur-xs">
                    Style: {product.styleCode}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#00A8E1] text-white shadow-md">
                    <span>prime</span>
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.gallery.map((imgUrl, idx) => {
                  const isActive = activeImage === imgUrl;
                  return (
                    <button
                      type="button"
                      key={imgUrl}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative size-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        isActive
                          ? "border-[#6B1D2F] ring-2 ring-[#6B1D2F]/20 scale-95"
                          : "border-[#E8DCC8] hover:border-[#C59B27]"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`${product.shortTitle} view ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            product.images.fallbackPlaceholder;
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Buying Information & Variant Selectors */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Brand & Category Strip */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#C59B27] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="size-3.5" />
                    {product.brand} &bull; {product.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#00A8E1]/10 text-[#00A8E1] font-bold text-[11px] border border-[#00A8E1]/30">
                    Fulfilled by Amazon
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3D101A] leading-tight">
                  {product.title}
                </h1>

                {/* Short Description */}
                <p className="text-sm text-[#5C4033] leading-relaxed">
                  {product.description}
                </p>

                {/* Price Box */}
                <div className="p-4 rounded-2xl bg-[#FAF3E8] border border-[#E8DCC8] flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-[#6B1D2F]">
                        ₹{product.pricing.sellingPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm sm:text-base text-[#7C5A48] line-through">
                        ₹{product.pricing.mrp.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                        Save {product.pricing.discountPercentage}%
                      </span>
                    </div>
                    <div className="text-[11px] text-[#7C5A48] mt-1">
                      Inclusive of all taxes &bull; Base Price: ₹{product.pricing.basePriceExclGst.toFixed(2)} + 5% GST
                    </div>
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#2C1810] font-semibold">
                      Color Selection: <strong className="text-[#6B1D2F]">{selectedColor}</strong>
                    </span>
                    <span className="text-[#7C5A48] text-[11px]">
                      {product.colors.length} Available
                    </span>
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
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                            isSelected
                              ? "border-[#6B1D2F] bg-[#FAF3E8] text-[#6B1D2F] font-bold ring-2 ring-[#6B1D2F]/20 shadow-xs"
                              : "border-[#E8DCC8] bg-white text-[#5C4033] hover:border-[#C59B27]"
                          }`}
                        >
                          <span
                            className="size-4 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#2C1810] font-semibold">
                      Select Size: <strong className="text-[#6B1D2F]">{selectedSize}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSizeChartOpen(true)}
                      className="text-xs text-[#6B1D2F] hover:underline font-bold flex items-center gap-1"
                    >
                      <Ruler className="size-3.5 text-[#C59B27]" />
                      Detailed Size Chart
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {standardSizes.map((size) => {
                      const isAvailable = availableSizesForColor.has(size);
                      const isSelected = selectedSize === size;

                      return (
                        <button
                          type="button"
                          key={size}
                          disabled={!isAvailable}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                            !isAvailable
                              ? "opacity-30 bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed line-through"
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
                <div className="p-3.5 rounded-xl bg-white border border-[#E8DCC8] flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="text-[#7C5A48] text-[11px]">
                      Selected FBA Variant:
                    </div>
                    <div className="font-mono text-xs text-[#2C1810]">
                      ASIN: <strong className="text-[#6B1D2F]">{activeVariant?.asin}</strong> &bull; SKU: {activeVariant?.sku}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAsin}
                    className="flex items-center gap-1 text-xs font-bold text-[#6B1D2F] hover:underline px-3 py-1 rounded-md bg-[#FAF3E8] border border-[#D9C4A5]"
                  >
                    {copiedAsin ? (
                      <>
                        <Check className="size-3 text-green-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" /> Copy ASIN
                      </>
                    )}
                  </button>
                </div>

                {/* Primary Buy CTA Button */}
                <div className="pt-2">
                  <a
                    href={activeVariant?.amazonUrl || product.variants[0]?.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl font-bold text-base bg-[#FF9900] hover:bg-[#E88B00] text-[#111111] transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-3 group/cta"
                  >
                    <span>Buy on Amazon (Size: {selectedSize} • Color: {selectedColor})</span>
                    <ExternalLink className="size-5 group-cta:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-[11px] text-center text-[#7C5A48] mt-2">
                    Direct redirect to official Amazon product page (Seller: Shri Amar Crafts, ID: A1AI1J6GJDQR4B)
                  </p>
                </div>
              </div>

              {/* FBA Prime Trust Box */}
              <div className="pt-6 border-t border-[#E8DCC8] grid grid-cols-2 gap-3 text-xs text-[#5C4033]">
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FAF6F0] border border-[#E8DCC8]">
                  <Truck className="size-4 text-[#00A8E1] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2C1810] block">Prime 1-2 Day Delivery</strong>
                    <span className="text-[11px] text-[#7C5A48]">Free priority shipping for Prime members</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FAF6F0] border border-[#E8DCC8]">
                  <RotateCcw className="size-4 text-[#6B1D2F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2C1810] block">7-Day Amazon Returns</strong>
                    <span className="text-[11px] text-[#7C5A48]">Doorstep pickup &amp; easy size exchange</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Product Specifications Tabs */}
          <div className="mt-12 bg-[#FFFDF9] rounded-3xl border border-[#E8DCC8] p-6 sm:p-10 shadow-sm">
            {/* Tabs Header */}
            <div className="flex flex-wrap gap-2 border-b border-[#E8DCC8] pb-4">
              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "specs"
                    ? "bg-[#6B1D2F] text-white shadow-xs"
                    : "text-[#5C4033] hover:bg-[#FAF6F0]"
                }`}
              >
                <Layers className="size-4" />
                Fabric &amp; Craft Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("contents")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "contents"
                    ? "bg-[#6B1D2F] text-white shadow-xs"
                    : "text-[#5C4033] hover:bg-[#FAF6F0]"
                }`}
              >
                <Package className="size-4" />
                Package Inclusions
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("styling")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "styling"
                    ? "bg-[#6B1D2F] text-white shadow-xs"
                    : "text-[#5C4033] hover:bg-[#FAF6F0]"
                }`}
              >
                <Calendar className="size-4" />
                Occasion &amp; Styling
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("care")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "care"
                    ? "bg-[#6B1D2F] text-white shadow-xs"
                    : "text-[#5C4033] hover:bg-[#FAF6F0]"
                }`}
              >
                <HeartHandshake className="size-4" />
                Wash &amp; Care
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-6 text-sm text-[#5C4033] leading-relaxed">
              {activeTab === "specs" && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DCC8]">
                      <div className="text-xs font-bold text-[#7C5A48] uppercase">Fabric Composition</div>
                      <div className="text-base font-serif font-bold text-[#2C1810] mt-0.5">{product.fabric}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DCC8]">
                      <div className="text-xs font-bold text-[#7C5A48] uppercase">Silhouette &amp; Fit</div>
                      <div className="text-base font-serif font-bold text-[#2C1810] mt-0.5">{product.fitType}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DCC8]">
                      <div className="text-xs font-bold text-[#7C5A48] uppercase">Embroidery &amp; Artistry</div>
                      <div className="text-base font-serif font-bold text-[#2C1810] mt-0.5">{product.workType}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DCC8]">
                      <div className="text-xs font-bold text-[#7C5A48] uppercase">Fulfillment Mechanism</div>
                      <div className="text-base font-serif font-bold text-[#00A8E1] mt-0.5">
                        Fulfilled by Amazon (FBA) &bull; Prime Eligible
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "contents" && (
                <div className="space-y-4">
                  <h4 className="font-serif text-lg font-bold text-[#3D101A]">
                    Complete 3-Piece Ensemble Breakdown:
                  </h4>
                  <ul className="grid sm:grid-cols-3 gap-4">
                    {product.packageContents.map((item, idx) => (
                      <li
                        key={item}
                        className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DCC8] flex items-center gap-3 font-medium text-[#2C1810]"
                      >
                        <span className="size-7 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "styling" && (
                <div className="space-y-4">
                  <h4 className="font-serif text-lg font-bold text-[#3D101A]">
                    Recommended Festive &amp; Traditional Occasions:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.occasion.map((occ) => (
                      <span
                        key={occ}
                        className="px-3.5 py-1.5 rounded-lg bg-[#FAF3E8] border border-[#C59B27]/40 text-[#6B1D2F] font-semibold text-xs flex items-center gap-1.5"
                      >
                        <Sparkles className="size-3 text-[#C59B27]" />
                        {occ}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[#7C5A48] pt-2">
                    Pair with traditional juttis, antique gold jhumkas, and a delicate clutch for an authentic Indian royal aesthetic.
                  </p>
                </div>
              )}

              {activeTab === "care" && (
                <div className="space-y-3 p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DCC8]">
                  <h4 className="font-serif text-base font-bold text-[#3D101A] flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-[#C59B27]" />
                    Preserving Your Garment&apos;s Longevity
                  </h4>
                  <p className="text-sm text-[#5C4033]">
                    {product.careInstructions}
                  </p>
                  <p className="text-xs text-[#7C5A48]">
                    Always iron inside out under low to medium heat to maintain the shimmer of metallic zari threads and delicate neck embroidery.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">
                    More from Shri Amar Crafts
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D101A]">
                    Explore Other FBA Ensembles
                  </h3>
                </div>
                <Link
                  href="/shri-amar-crafts#catalog"
                  className="text-xs font-bold text-[#6B1D2F] hover:underline"
                >
                  View Full Catalog &rarr;
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 max-w-4xl">
                {relatedProducts.map((relProduct) => (
                  <ProductCard
                    key={relProduct.id}
                    product={relProduct}
                    onOpenSizeChart={() => setSizeChartOpen(true)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sizing Modal */}
      <SizeChartModal isOpen={sizeChartOpen} onClose={() => setSizeChartOpen(false)} />
    </>
  );
}
