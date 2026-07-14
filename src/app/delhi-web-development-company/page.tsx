import type { Metadata } from "next"
import CityPageTemplate from "@/components/CityPageTemplate"
import type { CityPageData } from "@/components/CityPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: CityPageData = {
  slug: "delhi-web-development-company",
  city: "Delhi",
  subtitle: "Delhi-based web development company building high-performance websites and digital platforms for businesses across the capital.",
  description:
    "The Bharat Digital serves Delhi businesses with modern web development solutions — from corporate websites for Connaught Place offices to e-commerce stores for Chandni Chowk retailers. We bring global-quality development with local market understanding.",
  contentParagraphs: [
    "Delhi is India's capital and a massive market for digital services — from startups in Nehru Place to established businesses in Connaught Place and Karol Bagh. Every Delhi business needs a website that reflects its credibility and reaches its target audience effectively.",
    "As a web development company serving Delhi, we understand the unique challenges of the Delhi market — high competition, diverse customer base, and the need for multi-lingual and mobile-first experiences. Our solutions are designed to help Delhi businesses stand out in a crowded digital landscape.",
    "We work with Delhi-based clients across industries — healthcare practices in South Delhi, law firms in Saket, real estate developers in Dwarka, and e-commerce brands operating across the NCR. Our team is accessible for in-person meetings and ongoing collaboration.",
    "Our Delhi clients benefit from competitive pricing (no Delhi-Noida premium), fast turnaround times, and modern tech stacks that outperform traditional agency builds. Every project includes SEO optimisation, performance tuning, and 30 days of free support post-launch.",
  ],
  services: [
    { name: "Custom Web Development", path: "/services/custom-web-development" },
    { name: "E-commerce Development", path: "/services/ecommerce-development" },
    { name: "Web App Development", path: "/services/web-app-development" },
    { name: "Performance Optimization", path: "/services/performance-optimization" },
    { name: "UI/UX Design", path: "/services/ui-ux-design" },
    { name: "SEO & Marketing", path: "/services/seo-marketing" },
  ],
  industries: [
    { name: "Healthcare", path: "/industries/healthcare" },
    { name: "Legal Services", path: "/industries/legal" },
    { name: "Real Estate", path: "/industries/real-estate" },
    { name: "E-commerce", path: "/industries/ecommerce-retail" },
    { name: "Luxury & Automotive", path: "/industries/luxury-automotive" },
    { name: "Travel & Hospitality", path: "/industries/travel-hospitality" },
  ],
  latitude: 28.7041,
  longitude: 77.1025,
  phone: "+919999239307",
  email: "support@thebharatdigi.com",
}

export const metadata: Metadata = {
  title: "Web Development Company in Delhi — Modern Websites & Web Apps | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "Web Development Company in Delhi — The Bharat Digital",
    description: data.description,
  },
}

export default function DelhiPage() {
  return <CityPageTemplate data={data} faqs={faqs["delhi"]} />
}
