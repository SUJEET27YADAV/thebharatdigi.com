import type { Metadata } from "next"
import IndustryPageTemplate from "../IndustryPageTemplate"
import type { IndustryPageData } from "../IndustryPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: IndustryPageData = {
  slug: "real-estate",
  title: "Real Estate",
  subtitle: "Real Estate Web Development — IDX, 3D Tours & Hyperlocal SEO for Builders",
  description:
    "We build real estate websites that showcase properties with IDX integration, virtual tours, and hyperlocal SEO — helping builders, brokers, and developers capture leads in India's competitive property market.",
  painPoints: [
    { problem: "Slow, image-heavy property listings", impact: "Property sites with unoptimised images and slow load times lose 50% of mobile visitors before they see a listing." },
    { problem: "No IDX or MLS integration", impact: "Without property feed integration, listings go stale and buyers can't search properties in real-time." },
    { problem: "Low visibility for micro-market searches", impact: "'Apartment in Sector 62 Noida' searches don't reach builder sites without hyperlocal SEO." },
    { problem: "No virtual tours or 3D walkthroughs", impact: "Properties without virtual tours receive 40% fewer inquiries than those with immersive experiences." },
  ],
  searchQueries: [
    { query: "real estate website with IDX integration", intent: "Builders seeking property feed integration for their site" },
    { query: "property portal development cost India", intent: "Researching budget for custom real estate listing platforms" },
    { query: "3D virtual tour website for real estate", intent: "Looking to add immersive property experiences to their site" },
    { query: "real estate CRM with website integration", intent: "Needing lead management that connects to their property website" },
    { query: "builder website design company", intent: "Real estate developers seeking professional web design services" },
    { query: "real estate SEO services India", intent: "Ready to improve local search visibility for property listings" },
  ],
  solutions: [
    { problem: "Slow property listing pages", solution: "Optimised image delivery, lazy loading, and CDN caching for fast property page load times." },
    { problem: "No IDX/MLS integration", solution: "Custom property feed integration with real-time listing sync, search filters, and map views." },
    { problem: "Poor micro-market SEO", solution: "Hyperlocal SEO strategy targeting sector-specific and project-specific search queries." },
    { problem: "No virtual property tours", solution: "Integration of 360° virtual tours, 3D walkthroughs, and video property showcases." },
    { problem: "Manual lead follow-up", solution: "Automated lead capture with SMS/email alerts for new inquiries and property shortlists." },
    { problem: "No project microsites", solution: "Dedicated microsites for new projects with floor plans, amenities, and payment plan calculators." },
  ],
  portfolioItems: [
    { name: "Builder Project Portal", desc: "A multi-project website for a Noida-based builder with IDX search, project microsites, and CRM integration." },
    { name: "Property Listing Platform", desc: "A property listing website with advanced search, map integration, shortlist features, and agent profiles." },
  ],
  cta: "Ready to Showcase Your Properties Online?",
}

export const metadata: Metadata = {
  title: "Real Estate Web Development — IDX, 3D Tours & SEO | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "Real Estate Web Development — The Bharat Digital",
    description: data.description,
  },
}

export default function RealEstatePage() {
  return <IndustryPageTemplate data={data} faqs={faqs["real-estate"]} />
}
