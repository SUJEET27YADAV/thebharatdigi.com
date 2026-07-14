import type { Metadata } from "next"
import IndustryPageTemplate from "../IndustryPageTemplate"
import type { IndustryPageData } from "../IndustryPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: IndustryPageData = {
  slug: "travel-hospitality",
  title: "Travel & Hospitality",
  subtitle: "Travel Website Development — Booking Engines, Multi-Lingual & OTA-Bypass Platforms",
  description:
    "We build travel and hospitality websites that bypass OTA commissions with direct booking engines, multi-lingual support, and integrated property management — helping hotels, tour operators, and DMCs capture more direct revenue.",
  painPoints: [
    { problem: "OTA commissions eating margins", impact: "Hotels and tour operators lose 15-25% of revenue to OTA commissions on every booking." },
    { problem: "No direct booking engine", impact: "Without a direct booking channel, properties are fully dependent on third-party platforms." },
    { problem: "Multi-lingual & multi-currency challenges", impact: "Travel businesses serving international customers need sites that speak their language and price in their currency." },
    { problem: "Poor mobile booking experience", impact: "60% of travel bookings start on mobile — a clunky mobile experience means lost reservations." },
  ],
  searchQueries: [
    { query: "hotel booking engine development", intent: "Hotels looking to build direct booking capabilities on their website" },
    { query: "travel website development India", intent: "Tour operators and DMCs seeking professional travel web developers" },
    { query: "multi-language travel website", intent: "Travel businesses needing sites that support multiple languages and currencies" },
    { query: "OTA bypass solutions for hotels", intent: "Properties wanting to reduce OTA dependency and increase direct bookings" },
    { query: "property management system integration", intent: "Hotels seeking websites that integrate with their PMS for real-time availability" },
    { query: "tour package booking website cost", intent: "Tour operators budgeting for a custom booking platform" },
  ],
  solutions: [
    { problem: "High OTA commissions", solution: "Direct booking engine with rate parity assurance, loyalty programs, and exclusive direct-only offers." },
    { problem: "No real-time availability or pricing", solution: "Integration with property management systems for live room/package availability and dynamic pricing." },
    { problem: "Multi-lingual & multi-currency needs", solution: "Full i18n support with language switching, currency conversion, and region-specific content." },
    { problem: "Poor mobile booking flow", solution: "Mobile-first booking interface with one-tap reservations, Apple Pay/GPay, and digital key delivery." },
    { problem: "No channel management", solution: "Centralised dashboard managing inventory across website, OTAs, and direct sales channels." },
    { problem: "Manual guest communication", solution: "Automated pre-arrival, in-stay, and post-stay email/SMS sequences with personalisation." },
  ],
  portfolioItems: [
    { name: "Boutique Hotel Booking Platform", desc: "A direct booking website for a boutique hotel chain with real-time availability, online payments, and channel management." },
    { name: "Tour Operator Portal", desc: "A package booking platform for a Delhi-based tour operator with itinerary builder, group booking, and payment gateway." },
  ],
  cta: "Ready to Start Taking Direct Bookings?",
}

export const metadata: Metadata = {
  title: "Travel Website Development — Direct Booking Platforms | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "Travel Website Development — The Bharat Digital",
    description: data.description,
  },
}

export default function TravelHospitalityPage() {
  return <IndustryPageTemplate data={data} faqs={faqs["travel-hospitality"]} />
}
