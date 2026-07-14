import type { Metadata } from "next"
import CityPageTemplate from "@/components/CityPageTemplate"
import type { CityPageData } from "@/components/CityPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: CityPageData = {
  slug: "gurugram-web-development-company",
  city: "Gurugram",
  subtitle: "Gurugram web development company building modern digital products for startups, SaaS companies, and enterprises in the Millennium City.",
  description:
    "The Bharat Digital serves Gurugram's dynamic business ecosystem — from early-stage startups in Cyber Hub to enterprises in Udyog Vihar. We build fast, scalable websites and web applications that help Gurugram businesses grow.",
  contentParagraphs: [
    "Gurugram is India's startup and corporate hub — home to hundreds of startups, global-capability centres, and Fortune 500 offices in Cyber City, Cyber Hub, and Udyog Vihar. The digital expectations here are high, and businesses need websites that match the pace of Gurugram's fast-moving market.",
    "As a web development company serving Gurugram, we specialise in modern tech stacks — Next.js, React, Node.js, and TypeScript — that Gurugram's tech-savvy businesses expect. Whether you need an MVP for your Cyber Hub startup or a corporate website for your Udyog Vihar office, we deliver production-ready solutions.",
    "Our Gurugram clients appreciate our developer-first approach — clean code, performance-optimised builds, and transparent project management. We offer flexible engagement models, from fixed-price projects to monthly retainers for ongoing development.",
    "We understand the Gurugram market's competitive landscape and design websites that help businesses stand out. Our services include SEO optimisation specifically for Gurugram-based searches, helping you capture local traffic from people searching for 'web developer in Gurugram' and related queries.",
  ],
  services: [
    { name: "Custom Web Development", path: "/services/custom-web-development" },
    { name: "Web App Development", path: "/services/web-app-development" },
    { name: "MVP Development", path: "/services/mvp-development" },
    { name: "UI/UX Design", path: "/services/ui-ux-design" },
    { name: "Performance Optimization", path: "/services/performance-optimization" },
    { name: "SEO & Marketing", path: "/services/seo-marketing" },
  ],
  industries: [
    { name: "Healthcare", path: "/industries/healthcare" },
    { name: "Legal Services", path: "/industries/legal" },
    { name: "E-commerce", path: "/industries/ecommerce-retail" },
    { name: "Travel & Hospitality", path: "/industries/travel-hospitality" },
    { name: "Startups & SaaS", path: "/services/web-app-development" },
    { name: "Luxury & Automotive", path: "/industries/luxury-automotive" },
  ],
  latitude: 28.4595,
  longitude: 77.0266,
  phone: "+919999239307",
  email: "support@thebharatdigi.com",
}

export const metadata: Metadata = {
  title: "Web Development Company in Gurugram — Modern Web Apps | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "Web Development Company in Gurugram — The Bharat Digital",
    description: data.description,
  },
}

export default function GurugramPage() {
  return <CityPageTemplate data={data} faqs={faqs["gurugram"]} />
}
