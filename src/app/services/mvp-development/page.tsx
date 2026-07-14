import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "MVP Development Company | Launch in 60 Days | The Bharat Digital",
  description:
    "Launch your MVP in 60 days. We build minimum viable products using Next.js, React & Node.js for startups in Noida, Delhi NCR and beyond.",
};

const SERVICE_DATA = {
  title: "MVP Development",
  subtitle: "Launch Your MVP in 60 Days — From Idea to Working Product",
  description: `Stop overthinking and start shipping. We help founders and startups turn ideas into working products fast — without sacrificing quality. Our MVP development process focuses on the 20% of features that deliver 80% of the value, getting you to market in 60 days or less.

Unlike traditional agencies that treat MVPs as "smaller versions of the final product," we treat them as learning vehicles. Every MVP we build is designed to test assumptions, gather real user feedback, and provide a foundation you can scale.`,
  subServices: [
    { title: "SaaS MVP", description: "Multi-tenant architecture, subscription billing, dashboard" },
    { title: "Marketplace MVP", description: "Buyer/seller flows, listings, payments, reviews" },
    { title: "Fintech MVP", description: "UPI, Razorpay/Stripe, KYC workflows, ledger" },
    { title: "Healthtech MVP", description: "Patient portals, booking, EHR integration, HIPAA-ready" },
    { title: "Edtech MVP", description: "Course platforms, video streaming, assessments, progress" },
    { title: "AI MVP", description: "ChatGPT integration, RAG pipelines, custom model fine-tuning" },
  ],
  techStack: ["Next.js 14+", "React", "Node.js", "Python", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
  process: [
    { step: "01", title: "Discovery Sprint", desc: "We map your idea, identify core assumptions, and define the must-have features for launch." },
    { step: "02", title: "Design & Prototype", desc: "Interactive wireframes and user flows so you can test before we write a line of code." },
    { step: "03", title: "Agile Build", desc: "2-week sprints with working software at the end of each cycle. You see progress every step." },
    { step: "04", title: "Launch & Learn", desc: "Deploy to production, set up analytics, and start collecting real user feedback immediately." },
    { step: "05", title: "Iterate", desc: "Based on data, we prioritize the next features that drive growth. Your MVP evolves with your users." },
  ],
  portfolioItems: [
    { name: "SaaS Dashboard Platform", desc: "Real-time analytics dashboard for logistics companies" },
    { name: "Healthcare Booking MVP", desc: "Patient appointment system with 3-week turnaround" },
  ],
  slug: "mvp-development" as const,
};

export default function MvpDevelopmentPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["mvp-development"]} />;
}
