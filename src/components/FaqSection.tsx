"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import JsonLd from "./JsonLd"
import type { FaqItem } from "@/lib/faq-data"

interface FaqSectionProps {
  faqs: FaqItem[]
  title?: string
}

export default function FaqSection({ faqs, title = "Frequently Asked Questions" }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqSchema = {
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <>
      <JsonLd type="FAQPage" data={faqSchema} id="faq-schema" />
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            <span className="gradient-text">{title}</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={faq.q}
                  className={`rounded border overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? "border-indigo-200 dark:border-indigo-500/30 bg-slate-50 dark:bg-slate-800/30"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <button
                    id={`faq-question-${i}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left bg-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors duration-150"
                  >
                    <span className={`font-medium pr-4 transition-colors duration-150 ${
                      isOpen
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-900 dark:text-white"
                    }`}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 transition-all duration-200 ${
                        isOpen
                          ? "rotate-180 text-indigo-500 dark:text-indigo-400"
                          : "text-slate-400"
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-4 pt-0 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
