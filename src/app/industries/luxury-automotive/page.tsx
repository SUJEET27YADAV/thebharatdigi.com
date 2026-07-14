import type { Metadata } from "next"
import IndustryPageTemplate from "../IndustryPageTemplate"
import type { IndustryPageData } from "../IndustryPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: IndustryPageData = {
  slug: "luxury-automotive",
  title: "Luxury & Automotive",
  subtitle: "Luxury Brand Website Development — Premium Experiences That Convert High-Value Clients",
  description:
    "We build high-end digital experiences for luxury brands, automotive dealers, and premium service providers — combining stunning visuals, smooth performance, and conversion-driven design that matches world-class expectations.",
  painPoints: [
    { problem: "Premium brand needs premium digital presence", impact: "Luxury customers expect flawless digital experiences — slow or generic sites damage brand perception irreparably." },
    { problem: "No immersive product showcase", impact: "Without 3D configurators, cinematic galleries, or virtual showrooms, luxury products appear ordinary online." },
    { problem: "Low conversion from site visits to inquiries", impact: "Luxury buyers research extensively before engaging — without the right content and CTAs, they leave without connecting." },
    { problem: "Performance campaigns need exceptional landing pages", impact: "Luxury ad spend is wasted on generic landing pages that don't reflect the brand's premium positioning." },
  ],
  searchQueries: [
    { query: "luxury brand website design company", intent: "Premium brands seeking web design that reflects their market position" },
    { query: "car dealer website with configurator", intent: "Automotive dealers wanting to add vehicle configurators to their site" },
    { query: "high-end e-commerce development", intent: "Luxury retailers seeking bespoke online shopping experiences" },
    { query: "premium real estate website design", intent: "Luxury property developers looking for high-end digital showcases" },
    { query: "automotive lead generation website", intent: "Car dealers wanting websites that capture and qualify high-value leads" },
    { query: "bespoke web development for luxury brands", intent: "Ultra-premium brands seeking fully custom digital experiences" },
  ],
  solutions: [
    { problem: "Generic-looking brand website", solution: "Bespoke design with custom typography, art-directed imagery, micro-animations, and brand-first layouts." },
    { problem: "No immersive product experience", solution: "3D product configurators, cinematic video backgrounds, virtual showrooms, and interactive galleries." },
    { problem: "Low visitor-to-lead conversion", solution: "Personalised content journeys, concierge-style CTAs, lead capture forms with minimal friction." },
    { problem: "Poor landing page performance for ads", solution: "Campaign-specific landing pages built for speed, with clear messaging, social proof, and direct CTA." },
    { problem: "No storytelling or brand narrative", solution: "Immersive brand story pages with timeline, founder narrative, video testimonials, and press mentions." },
    { problem: "Slow page speed hurts user experience", solution: "Optimised assets, CDN delivery, edge caching, and performance budgets for sub-second load times." },
  ],
  portfolioItems: [
    { name: "Premium Car Dealer Website", desc: "A high-end automotive dealer website with vehicle configurator, 360° interior views, and test drive booking." },
    { name: "Luxury Brand Showcase", desc: "An immersive brand storytelling platform for a premium Indian lifestyle brand with cinematic visuals and concierge contact." },
  ],
  cta: "Ready to Create a Premium Digital Experience?",
}

export const metadata: Metadata = {
  title: "Luxury Brand & Automotive Website Development | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "Luxury Brand Website Development — The Bharat Digital",
    description: data.description,
  },
}

export default function LuxuryAutomotivePage() {
  return <IndustryPageTemplate data={data} faqs={faqs["luxury-automotive"]} />
}
