import type { Metadata } from "next"
import CityPageTemplate from "@/components/CityPageTemplate"
import type { CityPageData } from "@/components/CityPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: CityPageData = {
  slug: "faridabad-web-development-company",
  city: "Faridabad",
  subtitle: "Faridabad web development company offering affordable, high-quality websites and custom web applications for local businesses.",
  description:
    "The Bharat Digital provides professional web development services to Faridabad businesses — helping local companies build their online presence with modern, affordable, and scalable websites that compete with Delhi and Gurugram-based competitors.",
  contentParagraphs: [
    "Faridabad is a rapidly growing industrial and commercial hub in the Delhi NCR. With its strategic location and expanding business ecosystem, Faridabad companies need digital partners who deliver quality work without the premium pricing of Delhi-based agencies.",
    "We understand the Faridabad market — a mix of manufacturing businesses needing B2B websites, retail stores requiring e-commerce platforms, and professional services firms (doctors, lawyers, consultants) wanting credible online presence. Each requires a different approach, and we tailor our solutions accordingly.",
    "Our pricing is designed to be accessible for Faridabad SMEs and startups. We deliver the same Next.js and React-powered websites that agencies charge 2-3x more for in Delhi and Gurugram. Every project includes SEO setup, mobile optimisation, and post-launch support.",
    "We're available for in-person consultations in Faridabad and provide ongoing support throughout the project lifecycle. Our Faridabad clients appreciate the combination of global-quality development with local accessibility and competitive pricing.",
  ],
  services: [
    { name: "Custom Web Development", path: "/services/custom-web-development" },
    { name: "MVP Development", path: "/services/mvp-development" },
    { name: "E-commerce Development", path: "/services/ecommerce-development" },
    { name: "Responsive Design", path: "/services/responsive-design" },
    { name: "Performance Optimization", path: "/services/performance-optimization" },
    { name: "SEO & Marketing", path: "/services/seo-marketing" },
  ],
  industries: [
    { name: "Healthcare", path: "/industries/healthcare" },
    { name: "Legal Services", path: "/industries/legal" },
    { name: "Real Estate", path: "/industries/real-estate" },
    { name: "E-commerce", path: "/industries/ecommerce-retail" },
    { name: "Manufacturing & Industrial", path: "/services/custom-web-development" },
  ],
  latitude: 28.4089,
  longitude: 77.3178,
  phone: "+919999239307",
  email: "support@thebharatdigi.com",
}

export const metadata: Metadata = {
  title: "Web Development Company in Faridabad — Affordable Websites | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "Web Development Company in Faridabad — The Bharat Digital",
    description: data.description,
  },
}

export default function FaridabadPage() {
  return <CityPageTemplate data={data} faqs={faqs["faridabad"]} />
}
