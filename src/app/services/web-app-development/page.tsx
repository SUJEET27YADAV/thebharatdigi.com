import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Web Application Development Company | The Bharat Digital",
  description:
    "Full-stack web app development — SaaS platforms, real-time apps, APIs, and enterprise portals. Next.js, React, Node.js, and Supabase.",
};

const SERVICE_DATA = {
  title: "Web App Development",
  subtitle: "Build Powerful Web Applications That Scale",
  description: `From SaaS platforms to real-time collaboration tools, we build full-stack web applications that handle thousands of users without breaking a sweat.

We use modern architectures — server components, real-time subscriptions, edge functions, and horizontal scaling — so your app performs today and grows with you tomorrow.`,
  subServices: [
    { title: "SaaS Platforms", description: "Multi-tenant apps with subscription billing, team management, and role-based access" },
    { title: "Real-Time Apps", description: "Live dashboards, collaborative editors, notifications, and streaming data" },
    { title: "API Development", description: "REST and GraphQL APIs with authentication, rate limiting, and comprehensive docs" },
    { title: "Enterprise Portals", description: "Internal tools, admin dashboards, and B2B platforms with complex workflows" },
    { title: "Data Visualization", description: "Interactive charts, real-time graphs, and custom reporting interfaces" },
    { title: "MVP to Production", description: "Take your prototype to a production-grade app with proper testing and monitoring" },
  ],
  techStack: ["Next.js", "React", "Node.js", "Python", "Supabase", "PostgreSQL", "WebSocket", "Redis", "Docker"],
  process: [
    { step: "01", title: "Requirements", desc: "Deep dive into your product vision, user stories, and technical constraints." },
    { step: "02", title: "Architecture", desc: "System design, database model, API contracts, and deployment strategy." },
    { step: "03", title: "Build", desc: "Agile development with continuous integration and preview deployments." },
    { step: "04", title: "Deploy", desc: "Production deployment with monitoring, error tracking, and performance alerts." },
  ],
  portfolioItems: [
    { name: "SaaS Dashboard", desc: "Real-time analytics platform for a logistics startup" },
    { name: "API Gateway", desc: "Unified API layer connecting 5 internal services" },
  ],
  slug: "web-app-development" as const,
};

export default function WebAppDevelopmentPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["web-app-development"]} />;
}
