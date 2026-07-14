import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "E-commerce Development Company | Shopify & WooCommerce | The Bharat Digital",
  description:
    "Custom e-commerce stores built with Shopify, WooCommerce, or headless Next.js. Payment gateway integration for Indian and international markets.",
};

const SERVICE_DATA = {
  title: "E-commerce Development",
  subtitle: "E-commerce Development — Shopify, WooCommerce & Custom Stores",
  description: `Sell online with a store that's built to convert. Whether you need a quick Shopify storefront, a custom WooCommerce solution, or a headless e-commerce experience, we build stores that load fast, rank well, and drive sales.

We understand the Indian e-commerce landscape — Razorpay and UPI integration, GST-compliant invoices, multi-currency for export, and mobile-first design for the 80% of Indian shoppers who browse on their phones.`,
  subServices: [
    { title: "Shopify Stores", description: "Custom themes, app integrations, product management, fast checkout" },
    { title: "WooCommerce Stores", description: "WordPress-based stores with full control over design and functionality" },
    { title: "Headless Commerce", description: "Next.js frontend + any backend (Shopify, WooCommerce, custom) for maximum performance" },
    { title: "Payment Gateway Setup", description: "Razorpay, Stripe, Paytm, PhonePe, UPI, bank transfers" },
    { title: "Inventory Management", description: "Real-time stock sync, supplier management, low-stock alerts" },
    { title: "Multi-vendor Marketplaces", description: "Platforms where multiple sellers list products with commission management" },
  ],
  techStack: ["Shopify", "WooCommerce", "Next.js", "Stripe", "Razorpay", "Algolia", "Tailwind CSS", "Vercel"],
  process: [
    { step: "01", title: "Product Strategy", desc: "Catalog structure, pricing tiers, SEO keyword mapping for your products." },
    { step: "02", title: "Store Design", desc: "Mobile-first design with high-conversion product pages and checkout flow." },
    { step: "03", title: "Development", desc: "Build with your chosen platform. Custom features, integrations, and payment setup." },
    { step: "04", title: "Migration & Launch", desc: "Import products, set up analytics, test checkout, and go live." },
    { step: "05", title: "Post-launch Optimization", desc: "Monitor conversion rates, fix funnels, and add features based on data." },
  ],
  portfolioItems: [
    { name: "Custom Shopify Store", desc: "Multi-vendor fashion marketplace with 10,000+ products" },
  ],
  slug: "ecommerce-development" as const,
};

export default function EcommerceDevelopmentPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["ecommerce-development"]} />;
}
