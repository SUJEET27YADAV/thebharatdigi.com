import type { Metadata } from "next"
import CityPageTemplate from "@/components/CityPageTemplate"
import type { CityPageData } from "@/components/CityPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: CityPageData = {
  slug: "noida-web-development-company",
  city: "Noida",
  subtitle: "Noida-based web development company delivering modern, scalable websites and web applications for businesses in Sector 62, Sector 63, and across the city.",
  description:
    "The Bharat Digital is a Noida-based web development company specialising in Next.js, React, and custom web applications. We help businesses in Noida build modern digital presence — from corporate websites to complex SaaS platforms.",
  contentParagraphs: [
    "Based in the heart of Noida's tech hub, The Bharat Digital understands the unique needs of Noida businesses. Whether you're a startup in Sector 62 looking for an MVP, an e-commerce brand in Sector 63 needing a scalable store, or a corporate office requiring a professional website — we build solutions that work for the Noida market.",
    "Noida has emerged as one of India's premier IT and business destinations, home to thousands of startups, SMEs, and corporate offices. With affordable office space and excellent connectivity to Delhi, Noida businesses need digital partners who understand the local landscape and deliver world-class solutions at competitive rates.",
    "As a Noida web development company, we pride ourselves on transparent pricing, clear communication, and projects delivered on time. Our office is located in Noida, which means we can meet you in person, understand your requirements face-to-face, and be available for ongoing support.",
    "From responsive business websites to custom web applications, mobile apps, and SEO — we offer end-to-end digital services tailored for Noida-based businesses. All our projects include free hosting setup, basic SEO optimisation, and 30 days of post-launch support.",
  ],
  services: [
    { name: "Custom Web Development", path: "/services/custom-web-development" },
    { name: "MVP Development", path: "/services/mvp-development" },
    { name: "E-commerce Development", path: "/services/ecommerce-development" },
    { name: "Web App Development", path: "/services/web-app-development" },
    { name: "UI/UX Design", path: "/services/ui-ux-design" },
    { name: "SEO & Marketing", path: "/services/seo-marketing" },
  ],
  industries: [
    { name: "Healthcare", path: "/industries/healthcare" },
    { name: "Legal Services", path: "/industries/legal" },
    { name: "Real Estate", path: "/industries/real-estate" },
    { name: "E-commerce", path: "/industries/ecommerce-retail" },
    { name: "Travel & Hospitality", path: "/industries/travel-hospitality" },
    { name: "Startups & SaaS", path: "/services/web-app-development" },
  ],
  latitude: 28.5355,
  longitude: 77.3910,
  phone: "+919999239307",
  email: "support@thebharatdigi.com",
  address: "Noida, Uttar Pradesh",
}

export const metadata: Metadata = {
  title: "Web Development Company in Noida — Modern Websites & Web Apps | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "Web Development Company in Noida — The Bharat Digital",
    description: data.description,
  },
}

export default function NoidaPage() {
  return <CityPageTemplate data={data} faqs={faqs["noida"]} />
}
