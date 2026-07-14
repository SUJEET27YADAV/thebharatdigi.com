import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Custom Web Development Services | The Bharat Digital",
  description:
    "Tailored websites, corporate portals, and CMS solutions built for your business goals. Modern stacks, clean code, and on-time delivery.",
};

const SERVICE_DATA = {
  title: "Custom Web Development",
  subtitle: "Tailored Websites Built for Your Business Goals",
  description: `Not every business fits a template. We build custom websites and web applications that align with your brand, your workflow, and your growth plans — using modern frameworks that scale.

Whether you need a business website, a corporate portal, or a content-managed platform, we deliver clean, maintainable code with a focus on performance and user experience.`,
  subServices: [
    { title: "Business Websites", description: "Brand-aligned sites with clear messaging, fast load times, and strong conversion paths" },
    { title: "Corporate Portals", description: "Internal tools, employee dashboards, and client portals with role-based access" },
    { title: "Landing Pages", description: "High-converting campaign pages with A/B testing, analytics, and lead capture" },
    { title: "CMS Websites", description: "WordPress, Strapi, or headless CMS with custom content models and preview workflows" },
    { title: "Portfolio & Showcase", description: "Visual-first sites for agencies, creators, and product launches" },
    { title: "SaaS Dashboards", description: "Multi-tenant admin panels with real-time data, charts, and user management" },
  ],
  techStack: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "WordPress", "Strapi", "PostgreSQL"],
  process: [
    { step: "01", title: "Discovery", desc: "We learn about your business, audience, and goals to define the scope and requirements." },
    { step: "02", title: "Architecture", desc: "Technical design, stack selection, and information architecture planned upfront." },
    { step: "03", title: "Design & Build", desc: "Iterative development with regular previews. You see progress every few days." },
    { step: "04", title: "QA & Launch", desc: "Cross-browser testing, performance checks, and a smooth deployment to your domain." },
  ],
  portfolioItems: [
    { name: "Corporate Portal", desc: "Client management dashboard for a logistics company" },
    { name: "Business Website", desc: "Brand website for a luxury real estate developer" },
  ],
  slug: "custom-web-development" as const,
};

export default function CustomWebDevelopmentPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["custom-web-development"]} />;
}
