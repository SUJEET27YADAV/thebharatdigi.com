import type { Metadata } from "next"
import IndustryPageTemplate from "../IndustryPageTemplate"
import type { IndustryPageData } from "../IndustryPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: IndustryPageData = {
  slug: "healthcare",
  title: "Healthcare & Wellness",
  subtitle: "Healthcare Web Development — HIPAA-Ready Platforms That Build Patient Trust",
  description:
    "From multi-location clinic websites to telemedicine platforms and patient portals, we build HIPAA-ready digital solutions that help healthcare practices attract patients, streamline bookings, and manage operations securely.",
  painPoints: [
    { problem: "Outdated websites that hurt credibility", impact: "Patients judge a practice by its digital presence — 80% of patients research online before booking." },
    { problem: "No online booking or patient portal", impact: "Clinics without self-scheduling lose 30-40% of potential new patient appointments to competitors." },
    { problem: "HIPAA compliance anxiety", impact: "Fear of compliance violations stops many healthcare providers from building useful digital tools." },
    { problem: "Poor local SEO visibility", impact: "Healthcare searches are hyperlocal — if you don't rank for 'dentist in [city]', you don't get found." },
  ],
  searchQueries: [
    { query: "HIPAA compliant website development", intent: "Looking for developers who understand healthcare regulations" },
    { query: "telemedicine platform development cost", intent: "Budget research for virtual care solutions" },
    { query: "medical website design company India", intent: "Finding affordable healthcare web developers" },
    { query: "patient portal development services", intent: "Ready to build a secure patient-facing portal" },
    { query: "multi-location clinic SEO", intent: "Local SEO for healthcare practices with multiple branches" },
    { query: "online booking system for doctors", intent: "Looking to reduce no-shows with self-scheduling" },
  ],
  solutions: [
    { problem: "Outdated, non-responsive website", solution: "Modern, mobile-first website with intuitive navigation, fast load times, and accessibility compliance." },
    { problem: "No online appointment booking", solution: "Custom booking system with calendar sync, automated reminders, and waitlist management." },
    { problem: "HIPAA compliance concerns", solution: "Secure architecture with data encryption, access controls, audit logging, and BAA-compliant hosting." },
    { problem: "Low local search rankings", solution: "Local SEO strategy with Google Business Profile optimization, local citations, and review management." },
    { problem: "Manual patient intake and forms", solution: "Digital intake forms, e-signatures, and automated patient registration workflows." },
    { problem: "No telemedicine capability", solution: "Secure video consultation platform integrated with scheduling, payments, and EHR systems." },
  ],
  portfolioItems: [
    { name: "Multi-Specialty Clinic Portal", desc: "A complete digital ecosystem for a chain of clinics in Delhi NCR — online booking, patient records, and telemedicine." },
    { name: "Wellness Brand Website", desc: "Modern brand website for a wellness chain with class scheduling, membership management, and e-commerce for products." },
  ],
  cta: "Ready to Modernize Your Healthcare Practice?",
}

export const metadata: Metadata = {
  title: "Healthcare Web Development — HIPAA-Ready Platforms | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "Healthcare Web Development — The Bharat Digital",
    description: data.description,
  },
}

export default function HealthcarePage() {
  return <IndustryPageTemplate data={data} faqs={faqs["healthcare"]} />
}
