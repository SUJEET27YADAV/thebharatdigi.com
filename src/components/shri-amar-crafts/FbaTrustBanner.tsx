"use client";

import React from "react";
import {
  Truck,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  Check,
} from "lucide-react";

export default function FbaTrustBanner() {
  const amazonStoreUrl =
    "https://www.amazon.in/l/27943762031?me=A1AI1J6GJDQR4B";

  const benefits = [
    {
      icon: Truck,
      color: "#00A8E1",
      badge: "Prime Speed",
      title: "Fast Prime Delivery Across India",
      description:
        "Shipped directly from Amazon fulfillment centers with free 1-2 day express shipping for Prime members and live tracking.",
    },
    {
      icon: PackageCheck,
      color: "#C59B27",
      badge: "FBA Sealed",
      title: "Climate-Controlled Packaging",
      description:
        "Stored in Amazon air-conditioned fulfillment hubs and delivered in tamper-proof branded protective packaging to preserve fabric sheen.",
    },
    {
      icon: RotateCcw,
      color: "#6B1D2F",
      badge: "Doorstep Pickup",
      title: "7-Day Hassle-Free Amazon Returns",
      description:
        "Need a different size? Enjoy easy doorstep pickup and rapid replacement or refund directly handled by Amazon customer care.",
    },
    {
      icon: ShieldCheck,
      color: "#008A00",
      badge: "A-to-z Guarantee",
      title: "100% Secure Checkout & COD",
      description:
        "Protected by Amazon's A-to-z Guarantee with all payment modes supported: UPI, Credit/Debit, EMI, Net Banking, or Cash on Delivery.",
    },
  ];

  return (
    <section id="fba-benefits" className="py-16 bg-[#FFFDF9] border-b border-[#E8DCC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A8E1]/10 text-[#00A8E1] text-xs font-bold uppercase tracking-wider border border-[#00A8E1]/30">
            <span>Fulfilled by Amazon (FBA)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D101A]">
            The Shri Amar Crafts &times; Amazon Prime Promise
          </h2>
          <p className="text-sm sm:text-base text-[#5C4033] leading-relaxed">
            Every garment in our FBA catalog is pre-stocked inside official Amazon fulfillment centers, eliminating long tailoring wait times and ensuring lightning-fast delivery.
          </p>
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="p-6 rounded-xl bg-[#FAF6F0] border border-[#E8DCC8] hover:border-[#C59B27] transition-all hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="size-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${b.color}15`, color: b.color }}
                    >
                      <Icon className="size-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#7C5A48] border border-[#E8DCC8]">
                      {b.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2C1810] mb-2 group-hover:text-[#6B1D2F] transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#5C4033] leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E8DCC8] flex items-center gap-1 text-[11px] font-medium text-[#7C5A48]">
                  <Check className="size-3 text-green-600" />
                  Verified on Amazon.in
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Strip */}
        <div className="mt-10 p-4 rounded-xl bg-[#FAF3E8] border border-[#C59B27]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#6B1D2F] uppercase tracking-wider">
              Official Amazon Seller ID: <span className="font-mono text-[#2C1810]">A1AI1J6GJDQR4B</span>
            </div>
            <div className="text-xs text-[#5C4033]">
              All purchases are processed securely on Amazon.in with authentic tax invoices and manufacturer warranty.
            </div>
          </div>
          <a
            href={amazonStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#FF9900] hover:bg-[#E88B00] text-[#111] transition-colors shadow-xs"
          >
            <span>Verify on Amazon</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
