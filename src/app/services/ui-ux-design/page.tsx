import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "UI/UX Design Services | The Bharat Digital",
  description:
    "User research, wireframing, visual design, interactive prototypes, and design systems. Data-driven design that users love.",
};

const SERVICE_DATA = {
  title: "UI/UX Design",
  subtitle: "Design Experiences That Users Love",
  description: `Great design is invisible. We create interfaces that feel intuitive, look polished, and guide users effortlessly toward their goals — whether that's completing a purchase, signing up, or finding information.

Our design process is research-driven and iterative. We test early, validate often, and hand off pixel-perfect designs that developers love to build.`,
  subServices: [
    { title: "User Research", description: "Interviews, surveys, analytics review, and competitive analysis to understand your users" },
    { title: "Wireframing", description: "Low and high-fidelity wireframes that map user flows and layout before visual design" },
    { title: "Visual Design", description: "Polished UI with typography, color systems, iconography, and micro-interactions" },
    { title: "Interactive Prototypes", description: "Clickable prototypes in Figma for user testing and stakeholder buy-in" },
    { title: "Design Systems", description: "Component libraries, style guides, and reusable patterns for consistent products" },
    { title: "Usability Testing", description: "Moderated and unmoderated tests with real users to validate design decisions" },
  ],
  techStack: ["Figma", "Adobe XD", "Framer", "Tailwind CSS", "Storybook", "Zeroheight"],
  process: [
    { step: "01", title: "Research", desc: "Understand users, goals, and pain points through interviews and data analysis." },
    { step: "02", title: "Wireframe", desc: "Map user flows and page structure with low-fidelity wireframes." },
    { step: "03", title: "Design", desc: "Apply visual design — typography, color, spacing, and interactions." },
    { step: "04", title: "Prototype & Test", desc: "Build interactive prototypes and validate with real users before development." },
  ],
  portfolioItems: [
    { name: "SaaS Dashboard Redesign", desc: "Redesigned analytics dashboard improving task completion by 40%" },
    { name: "E-commerce UX Audit", desc: "Usability audit and redesign that increased checkout conversion by 25%" },
  ],
  slug: "ui-ux-design" as const,
};

export default function UiUxDesignPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["ui-ux-design"]} />;
}
