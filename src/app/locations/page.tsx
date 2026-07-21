import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { locations } from "@/lib/location-data";
import JsonLd from "@/components/JsonLd";
import LocationSidebar from "@/components/Locationbar";

export const metadata: Metadata = {
  title: "Locations — Web Development Across Delhi NCR | The Bharat Digital",
  description:
    "The Bharat Digital serves businesses across Delhi NCR — Delhi, Noida, Gurugram, Faridabad, and Ghaziabad — with modern web development, e-commerce, and digital solutions.",
  openGraph: {
    title: "Locations — The Bharat Digital",
    description:
      "Web development services across Delhi NCR — Delhi, Noida, Gurugram, Faridabad, and Ghaziabad.",
  },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://thebharatdigi.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Locations",
              item: "https://thebharatdigi.com/locations",
            },
          ],
        }}
        id="breadcrumb-locations"
      />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-20 left-10 size-72 rounded-full bg-indigo-100 dark:bg-indigo-500/5" />
            <div className="absolute bottom-10 right-10 size-96 rounded-full bg-purple-100 dark:bg-purple-500/5" />
          </div>
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border mb-5 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20">
              <MapPin className="size-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                Delhi NCR
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              <span className="gradient-text">Web Development</span> Across
              Delhi NCR
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600 dark:text-gray-400 mb-10 leading-relaxed">
              We serve businesses across five key locations in the Delhi NCR
              region — from Delhi&apos;s corporate hubs to Noida&apos;s tech
              corridor and Gurugram&apos;s startup ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="card-interactive p-6 group"
              >
                <div className="size-12 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                  <MapPin className="size-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {loc.city}
                </h2>
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">
                  {loc.subtitle}
                </p>
                <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium inline-flex items-center gap-1">
                  Learn more <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
