import type { Metadata } from "next";
import ServicePageTemplate from "../ServicePageTemplate";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Mobile App Development Company | iOS & Android | The Bharat Digital",
  description:
    "Cross-platform mobile app development using React Native and Flutter. iOS and Android apps for startups and businesses in India.",
};

const SERVICE_DATA = {
  title: "Mobile App Development",
  subtitle: "Mobile App Development — iOS, Android & Cross-Platform",
  description: `Reach your users where they spend most of their time — on their phones. We build cross-platform mobile apps that deliver native-quality experiences on both iOS and Android from a single codebase, saving you time and money.

Our apps are built with performance in mind: smooth animations, offline support, push notifications, and deep integration with device features. Whether you need a customer-facing app, an internal tool, or a companion to your web platform, we deliver production-ready mobile experiences.`,
  subServices: [
    { title: "React Native Apps", description: "Cross-platform with near-native performance. Code once, deploy everywhere." },
    { title: "Flutter Apps", description: "Google's UI toolkit for beautiful, fast, customizable mobile experiences." },
    { title: "Progressive Web Apps", description: "App-like experience in the browser — installable, offline-capable, fast." },
    { title: "App Store Deployment", description: "Full App Store and Google Play submission, metadata, screenshots, and reviews." },
    { title: "Backend & API", description: "REST/GraphQL APIs, real-time updates, push notifications, authentication." },
    { title: "App Maintenance", description: "Updates, bug fixes, performance monitoring, new feature development." },
  ],
  techStack: ["React Native", "Flutter", "Expo", "Firebase", "Supabase", "Node.js", "App Store Connect", "Google Play Console"],
  process: [
    { step: "01", title: "Discovery", desc: "Define features, user flows, platform requirements, and technical architecture." },
    { step: "02", title: "Design", desc: "Platform-specific UI/UX following iOS Human Interface and Material Design guidelines." },
    { step: "03", title: "Development", desc: "Agile sprints with continuous integration. Test on real devices throughout." },
    { step: "04", title: "Testing", desc: "Functional, performance, and usability testing. Beta testing via TestFlight." },
    { step: "05", title: "Launch", desc: "App store submission, monitoring, crash reporting, and user analytics setup." },
  ],
  portfolioItems: [
    { name: "Cross-Platform Delivery App", desc: "React Native app for iOS and Android with real-time tracking" },
  ],
  slug: "mobile-app-development" as const,
};

export default function MobileAppDevelopmentPage() {
  return <ServicePageTemplate data={SERVICE_DATA} faqs={faqs["mobile-app-development"]} />;
}
