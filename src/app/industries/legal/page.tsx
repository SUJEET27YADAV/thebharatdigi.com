import type { Metadata } from "next"
import IndustryPageTemplate from "../IndustryPageTemplate"
import type { IndustryPageData } from "../IndustryPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: IndustryPageData = {
  slug: "legal",
  title: "Legal Services",
  subtitle: "Legal Website Development — E-E-A-T Websites That Win Client Trust",
  description:
    "We build authoritative websites for law firms, advocates, and legal practices that demonstrate E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), automate client intake, and rank for high-CPC legal keywords.",
  painPoints: [
    { problem: "Google's E-E-A-T requirements for legal content", impact: "Legal websites face higher content standards — thin or generic copy hurts rankings and credibility." },
    { problem: "No client intake automation", impact: "Law firms still relying on phone-only intake lose leads to competitors with online forms and chatbots." },
    { problem: "Poor local presence for 'lawyer near me' searches", impact: "Legal searches are intensely local — without local SEO, potential clients choose the next firm." },
    { problem: "Generic template websites look unprofessional", impact: "A template-based site signals lack of investment — clients expect a premium digital presence from their legal representation." },
  ],
  searchQueries: [
    { query: "law firm website design India", intent: "Researching web developers who understand legal practices" },
    { query: "legal practice management software integration", intent: "Looking for websites that integrate with Clio, MyCase, or Zoho" },
    { query: "lawyer SEO services near me", intent: "Local law firms seeking legal-specific SEO expertise" },
    { query: "client intake system for law firms", intent: "Ready to automate lead capture and qualification" },
    { query: "E-E-A-T compliant legal content writing", intent: "Understanding Google's content quality standards for legal sites" },
    { query: "immigration lawyer website design", intent: "Niche legal practice seeking specialized web design" },
  ],
  solutions: [
    { problem: "Low E-E-A-T signals for Google", solution: "Attorney bios with credentials, published articles, case results, and authoritative content architecture." },
    { problem: "Manual phone-based client intake", solution: "Online intake forms with qualification logic, automated SMS/email responses, and calendar integration." },
    { problem: "Poor local SEO for legal queries", solution: "Location-specific landing pages, Google Local Services Ads setup, and legal directory citations." },
    { problem: "Template site looks generic", solution: "Custom design with professional color palette, practice area hierarchy, and trust-building visual elements." },
    { problem: "No blog or thought leadership", solution: "SEO-optimised legal blog with practice area articles, case briefs, and legal updates." },
    { problem: "Missing schema markup", solution: "LegalService schema, FAQ schema, LocalBusiness schema, and review schema for rich results." },
  ],
  portfolioItems: [
    { name: "Corporate Law Firm Website", desc: "A premium digital presence for a Delhi NCR corporate law firm with practice area pages, attorney profiles, and blog." },
    { name: "Property Law Portal", desc: "An informative website for a property law specialist with RERA guides, case studies, and client intake forms." },
  ],
  cta: "Ready to Build a Law Firm Website That Ranks?",
}

export const metadata: Metadata = {
  title: "Legal Website Development — E-E-A-T Compliant Law Firm Websites | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "Legal Website Development — The Bharat Digital",
    description: data.description,
  },
}

export default function LegalPage() {
  return <IndustryPageTemplate data={data} faqs={faqs["legal"]} />
}
