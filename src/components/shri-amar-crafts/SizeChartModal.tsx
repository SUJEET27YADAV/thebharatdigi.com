"use client";

import React, { useEffect } from "react";
import { X, Ruler, CheckCircle2 } from "lucide-react";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-chart-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FFFDF9] text-[#2C1810] rounded-xl border border-[#D9C4A5] shadow-2xl overflow-hidden animate-scaleUp max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#6B1D2F] text-white border-b border-[#C59B27]/40">
          <div className="flex items-center gap-2">
            <Ruler className="size-5 text-[#E6C66E]" />
            <h2 id="size-chart-title" className="text-xl font-serif font-semibold tracking-wide">
              Shri Amar Crafts Size Chart
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-sm text-[#5C4033] leading-relaxed">
            All measurements are tailored to standard Indian ethnic ready-garment dimensions (inches). For a relaxed Anarkali drape or straight fit, select your true bust measurement.
          </p>

          {/* Sizing Table */}
          <div className="overflow-x-auto rounded-lg border border-[#E8DCC8]">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#FAF3E8] border-b border-[#E8DCC8] text-[#6B1D2F] font-serif font-bold">
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Bust (in)</th>
                  <th className="py-3 px-4">Waist (in)</th>
                  <th className="py-3 px-4">Hip (in)</th>
                  <th className="py-3 px-4">Kurti Length</th>
                  <th className="py-3 px-4">Pant Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DCC8]">
                <tr className="hover:bg-[#FFF8EE] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#6B1D2F]">M (Medium)</td>
                  <td className="py-3 px-4">38&quot;</td>
                  <td className="py-3 px-4">34&quot;</td>
                  <td className="py-3 px-4">40&quot;</td>
                  <td className="py-3 px-4">46&quot;</td>
                  <td className="py-3 px-4">38&quot;</td>
                </tr>
                <tr className="hover:bg-[#FFF8EE] transition-colors bg-[#FAF6F0]/60">
                  <td className="py-3 px-4 font-bold text-[#6B1D2F]">L (Large)</td>
                  <td className="py-3 px-4">40&quot;</td>
                  <td className="py-3 px-4">36&quot;</td>
                  <td className="py-3 px-4">42&quot;</td>
                  <td className="py-3 px-4">46&quot;</td>
                  <td className="py-3 px-4">38&quot;</td>
                </tr>
                <tr className="hover:bg-[#FFF8EE] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#6B1D2F]">XL (Extra Large)</td>
                  <td className="py-3 px-4">42&quot;</td>
                  <td className="py-3 px-4">38&quot;</td>
                  <td className="py-3 px-4">44&quot;</td>
                  <td className="py-3 px-4">46&quot;</td>
                  <td className="py-3 px-4">39&quot;</td>
                </tr>
                <tr className="hover:bg-[#FFF8EE] transition-colors bg-[#FAF6F0]/60">
                  <td className="py-3 px-4 font-bold text-[#6B1D2F]">XXL (2X Large)</td>
                  <td className="py-3 px-4">44&quot;</td>
                  <td className="py-3 px-4">40&quot;</td>
                  <td className="py-3 px-4">46&quot;</td>
                  <td className="py-3 px-4">46&quot;</td>
                  <td className="py-3 px-4">39&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Measurement Advice */}
          <div className="bg-[#FAF3E8] p-4 rounded-lg border border-[#D9C4A5] space-y-2">
            <h3 className="font-serif font-bold text-[#6B1D2F] flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#C59B27]" />
              Measuring &amp; Fit Recommendations
            </h3>
            <ul className="text-xs text-[#5C4033] space-y-1.5 pl-6 list-disc">
              <li><strong>Bust:</strong> Measure around the fullest part of your chest keeping the tape measure parallel to the ground.</li>
              <li><strong>Waist:</strong> Measure around the natural waistline, slightly above your belly button.</li>
              <li><strong>Comfort Ease:</strong> Our garments include standard ethnic comfort allowance of ~2 inches beyond body measurement.</li>
              <li><strong>Hassle-Free Exchange:</strong> If sizing isn&apos;t ideal, all orders are eligible for Amazon&apos;s 7-day FBA replacement policy.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF6F0] border-t border-[#E8DCC8] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold rounded-md bg-[#6B1D2F] text-white hover:bg-[#521523] transition-colors shadow-sm"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
