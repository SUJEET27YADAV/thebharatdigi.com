import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Responsive Web Design Services | The Bharat Digital",
  description:
    "Mobile-first responsive design that works flawlessly on every device. Cross-browser compatible, touch-optimized, and fast.",
};

const SERVICE_DATA = {
  title: "Responsive Design",
  subtitle: "One Website, Every Device, Perfect Experience",
  description: `Your users will visit your site from phones, tablets, laptops, and desktops. We ensure every experience is just as good — not by squeezing content into smaller screens, but by designing intentionally for each form factor.

Mobile-first approach, fluid grids, responsive images, and touch-friendly interactions are baked into every project we deliver.`,
  subServices: [
    { title: "Mobile-First Design", description: "Design starting from the smallest screen, scaling up to desktop with graceful enhancements" },
    { title: "Cross-Browser Support", description: "Consistent experience across Chrome, Firefox, Safari, Edge, and mobile browsers" },
    { title: "Tablet Optimization", description: "Touch targets, orientation support, and split-screen layouts for tablet users" },
    { title: "Adaptive Layouts", description: "Fluid grids and breakpoints that adapt to any screen size, not just standard devices" },
    { title: "Responsive Email", description: "Email templates that render beautifully in every email client and device" },
    { title: "Touch Optimization", description: "Gesture support, appropriate hit targets, and smooth touch interactions" },
  ],
  techStack: ["Tailwind CSS", "CSS Grid", "Flexbox", "Media Queries", "Responsive Images", "Touch Events"],
  process: [
    { step: "01", title: "Audit", desc: "Review current responsive behavior across devices and identify breakpoint issues." },
    { step: "02", title: "Design", desc: "Create responsive layouts using a mobile-first approach with defined breakpoints." },
    { step: "03", title: "Develop", desc: "Build fluid grids, flexible images, and touch-friendly interactions." },
    { step: "04", title: "Test", desc: "Real device testing on phones, tablets, and desktops to catch edge cases." },
  ],
  portfolioItems: [
    { name: "E-commerce Responsive Redesign", desc: "Mobile conversions increased by 35% after responsive overhaul" },
    { name: "SaaS Dashboard", desc: "Complex data tables and charts adapted for tablet and mobile use" },
  ],
  slug: "responsive-design" as const,
};

export default function ResponsiveDesignPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["responsive-design"]} />;
}
