import type { Metadata } from "next"
import IndustryPageTemplate from "../IndustryPageTemplate"
import type { IndustryPageData } from "../IndustryPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: IndustryPageData = {
  slug: "ecommerce-retail",
  title: "E-commerce & Retail",
  subtitle: "E-commerce Development for D2C Brands — Stores That Convert & Scale",
  description:
    "From Shopify stores to custom headless e-commerce platforms, we build D2C-ready online stores with subscription models, omnichannel integration, and conversion-optimised checkout flows for Indian and global brands.",
  painPoints: [
    { problem: "High cart abandonment rates", impact: "Average e-commerce cart abandonment is 70% — poor UX, slow load times, and complicated checkout drive customers away." },
    { problem: "No omnichannel integration", impact: "Retailers without integrated online + offline inventory management lose sales and oversell across channels." },
    { problem: "Payment gateway friction for Indian customers", impact: "Without UPI, Paytm, and COD options, Indian customers abandon checkout for competitors." },
    { problem: "Slow page speeds hurt conversion", impact: "A 1-second delay in page load causes 7% fewer conversions — every second costs revenue." },
  ],
  searchQueries: [
    { query: "Shopify store development India", intent: "D2C brands looking for Shopify experts to build their store" },
    { query: "headless e-commerce development cost", intent: "Brands researching modern, API-first e-commerce architecture" },
    { query: "D2C website builder for Indian brands", intent: "Indian direct-to-consumer brands seeking specialised developers" },
    { query: "e-commerce SEO services India", intent: "Online stores needing product page optimisation and category rankings" },
    { query: "subscription e-commerce platform development", intent: "Businesses looking to add recurring billing and subscription models" },
    { query: "multi-vendor marketplace development", intent: "Platforms wanting to launch marketplace models with vendor dashboards" },
  ],
  solutions: [
    { problem: "High cart abandonment", solution: "Optimised checkout flow with guest checkout, progress indicators, trust badges, and exit-intent popups." },
    { problem: "No omnichannel inventory sync", solution: "Real-time inventory sync across Shopify, WooCommerce, and physical POS systems." },
    { problem: "Payment friction for Indian customers", solution: "Integration of Razorpay, UPI, Paytm, PhonePe, COD, and BNPL options." },
    { problem: "Slow page speeds", solution: "Headless architecture with Next.js for instant page loads, image optimisation, and CDN delivery." },
    { problem: "No subscription or recurring billing", solution: "Subscription engine with tiered plans, recurring billing, and customer portal." },
    { problem: "Poor mobile shopping experience", solution: "Mobile-first design with touch-optimised navigation, swipeable product galleries, and one-tap checkout." },
  ],
  portfolioItems: [
    { name: "D2C Fashion Store", desc: "A headless Shopify store for an Indian fashion brand with personalised recommendations, size guide, and UPI checkout." },
    { name: "Subscription Beauty Box Platform", desc: "A custom subscription e-commerce platform with monthly boxes, customer portal, and recurring billing via Razorpay." },
  ],
  cta: "Ready to Build Your D2C E-commerce Store?",
}

export const metadata: Metadata = {
  title: "E-commerce Development — D2C Stores for Indian Brands | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "E-commerce Development — The Bharat Digital",
    description: data.description,
  },
}

export default function EcommerceRetailPage() {
  return <IndustryPageTemplate data={data} faqs={faqs["ecommerce-retail"]} />
}
