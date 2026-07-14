import type { Metadata } from "next"
import Link from "next/link"
import { Building, ArrowRight, Stethoscope, Scale, Home, ShoppingBag, Plane, Gem } from "lucide-react"

const industries = [
  { title: "Healthcare & Wellness", path: "/industries/healthcare", desc: "HIPAA-ready platforms, telemedicine, patient portals, and local SEO for clinics and hospitals.", icon: Stethoscope },
  { title: "Legal Services", path: "/industries/legal", desc: "E-E-A-T compliant websites, client intake automation, and local SEO for law firms and advocates.", icon: Scale },
  { title: "Real Estate", path: "/industries/real-estate", desc: "IDX integration, 3D virtual tours, property portals, and hyperlocal SEO for builders.", icon: Home },
  { title: "E-commerce & Retail", path: "/industries/ecommerce-retail", desc: "D2C stores, headless Shopify, subscription models, and omnichannel integration.", icon: ShoppingBag },
  { title: "Travel & Hospitality", path: "/industries/travel-hospitality", desc: "Direct booking engines, OTA-bypass platforms, multi-lingual sites, and PMS integration.", icon: Plane },
  { title: "Luxury & Automotive", path: "/industries/luxury-automotive", desc: "Premium brand experiences, 3D configurators, virtual showrooms, and performance campaigns.", icon: Gem },
]

export const metadata: Metadata = {
  title: "Industries We Serve — Web Development for Healthcare, Legal, Real Estate & More | The Bharat Digital",
  description: "The Bharat Digital builds industry-specific web solutions for healthcare, legal, real estate, e-commerce, travel, and luxury automotive brands across India.",
  openGraph: {
    title: "Industries We Serve — The Bharat Digital",
    description: "Industry-specific web development solutions for healthcare, legal, real estate, e-commerce, travel, and luxury brands.",
  },
}

export default function IndustriesPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-white dark:bg-slate-900">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 size-72 rounded-full bg-indigo-100 dark:bg-indigo-500/5" />
          <div className="absolute bottom-10 right-10 size-96 rounded-full bg-purple-100 dark:bg-purple-500/5" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border mb-5 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20">
            <Building className="size-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">By Industry</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            <span className="gradient-text">Industries</span> We Serve
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600 dark:text-gray-400 mb-10 leading-relaxed">
            We build industry-specific digital solutions — from HIPAA-compliant healthcare platforms to immersive luxury brand experiences.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => {
              const Icon = ind.icon
              return (
                <Link
                  key={ind.path}
                  href={ind.path}
                  className="card-interactive p-6 group"
                >
                  <div className="size-12 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Icon className="size-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {ind.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">{ind.desc}</p>
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium inline-flex items-center gap-1">
                    Learn more <ArrowRight className="size-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
