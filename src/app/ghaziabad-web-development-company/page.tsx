import type { Metadata } from "next"
import CityPageTemplate from "@/components/CityPageTemplate"
import type { CityPageData } from "@/components/CityPageTemplate"
import { faqs } from "@/lib/faq-data"

const data: CityPageData = {
  slug: "ghaziabad-web-development-company",
  city: "Ghaziabad",
  subtitle: "Ghaziabad web development company delivering professional websites and digital solutions for local businesses, retailers, and service providers.",
  description:
    "The Bharat Digital provides affordable, high-quality web development services to Ghaziabad businesses — helping local companies establish a strong online presence without the high costs of Delhi or Noida agencies.",
  contentParagraphs: [
    "Ghaziabad is one of the fastest-growing cities in Uttar Pradesh and a key part of the Delhi NCR. With its expanding population and business ecosystem, Ghaziabad businesses increasingly need professional websites to compete and grow in the digital age.",
    "We help Ghaziabad-based businesses — from retail stores in Raj Nagar to professional services in Indirapuram and Vaishali — build websites that attract customers, generate leads, and build credibility. Our solutions are designed to be affordable for small and medium businesses while maintaining professional quality.",
    "As a web development company serving Ghaziabad, we offer the same modern technology (Next.js, React, Tailwind CSS) that top Delhi agencies use, at prices that make sense for Ghaziabad businesses. Every project includes responsive design, SEO basics, and performance optimisation.",
    "We're accessible for in-person meetings in Ghaziabad and committed to building long-term relationships with local businesses. Our post-launch support ensures your website stays updated, secure, and performing well. Contact us for a free consultation and quote.",
  ],
  services: [
    { name: "Custom Web Development", path: "/services/custom-web-development" },
    { name: "E-commerce Development", path: "/services/ecommerce-development" },
    { name: "Responsive Design", path: "/services/responsive-design" },
    { name: "Performance Optimization", path: "/services/performance-optimization" },
    { name: "UI/UX Design", path: "/services/ui-ux-design" },
    { name: "SEO & Marketing", path: "/services/seo-marketing" },
  ],
  industries: [
    { name: "Healthcare", path: "/industries/healthcare" },
    { name: "Legal Services", path: "/industries/legal" },
    { name: "Real Estate", path: "/industries/real-estate" },
    { name: "E-commerce", path: "/industries/ecommerce-retail" },
    { name: "Retail & Local Services", path: "/services/custom-web-development" },
  ],
  latitude: 28.6692,
  longitude: 77.4538,
  phone: "+919999239307",
  email: "support@thebharatdigi.com",
}

export const metadata: Metadata = {
  title: "Web Development Company in Ghaziabad — Affordable Websites | The Bharat Digital",
  description: data.description,
  openGraph: {
    title: "Web Development Company in Ghaziabad — The Bharat Digital",
    description: data.description,
  },
}

export default function GhaziabadPage() {
  return <CityPageTemplate data={data} faqs={faqs["ghaziabad"]} />
}
