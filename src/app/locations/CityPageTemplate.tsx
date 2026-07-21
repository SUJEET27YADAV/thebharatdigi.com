import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import type { FaqItem } from "@/lib/faq-data";
import Locationbar from "@/components/Locationbar";

export interface CityPageData {
  slug: string;
  city: string;
  subtitle: string;
  description: string;
  contentParagraphs: string[];
  services: { name: string; path: string }[];
  industries: { name: string; path: string }[];
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  address?: string;
}

export default function CityPageTemplate({
  data,
  faqs,
}: {
  data: CityPageData;
  faqs: FaqItem[];
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://thebharatdigi.com";

  return (
    <>
      <JsonLd
        type="LocalBusiness"
        data={{
          name: `The Bharat Digital - ${data.city}`,
          description: `Web development company in ${data.city} serving local businesses with modern web solutions.`,
          url: `${baseUrl}/${data.slug}`,
          telephone: data.phone,
          email: data.email,
          address: data.address
            ? {
                "@type": "PostalAddress",
                streetAddress: data.address,
                addressLocality: data.city,
                addressRegion:
                  data.city === "Noida"
                    ? "Uttar Pradesh"
                    : data.city === "Delhi"
                      ? "Delhi"
                      : data.city === "Faridabad" || data.city === "Gurugram"
                        ? "Haryana"
                        : "Uttar Pradesh",
                addressCountry: "IN",
              }
            : undefined,
          geo: {
            "@type": "GeoCoordinates",
            latitude: data.latitude,
            longitude: data.longitude,
          },
          areaServed: data.city === "Noida" ? undefined : `Delhi NCR`,
        }}
        id={`local-${data.slug}`}
      />
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            {
              "@type": "ListItem",
              position: 2,
              name: data.city,
              item: `${baseUrl}/${data.slug}`,
            },
          ],
        }}
        id={`breadcrumb-${data.slug}`}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 size-72 rounded-full bg-indigo-100 dark:bg-indigo-500/5" />
          <div className="absolute bottom-10 right-10 size-96 rounded-full bg-purple-100 dark:bg-purple-500/5" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border mb-5 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20">
            <MapPin className="size-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              {data.city}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            <span className="gradient-text">Web Development</span> Company in{" "}
            {data.city}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600 dark:text-gray-400 mb-10 leading-relaxed">
            {data.description}
          </p>
          <Link
            href="/contactus"
            className="btn bg-indigo-600 text-white px-8 py-3.5 text-lg hover:bg-indigo-700 inline-flex items-center gap-2"
          >
            Free Consultation in {data.city} <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>

      {/* Other available locations */}
      <Locationbar />

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {data.contentParagraphs.map((p, i) => (
              <p
                key={i}
                className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4 text-justify"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Web Development Services in {data.city}
          </h2>
          <p className="text-center text-slate-500 dark:text-gray-400 mb-12">
            We offer the full spectrum of web development services for{" "}
            {data.city} businesses.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.services.map((s) => (
              <Link
                key={s.path}
                href={s.path}
                className="card-interactive p-4 text-center"
              >
                <span className="font-medium text-slate-900 dark:text-white">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-slate-150 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Local Industries We Serve
          </h2>
          <p className="text-center text-slate-500 dark:text-gray-400 mb-12">
            {data.city} businesses across multiple industries trust us.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.industries.map((ind) => (
              <Link
                key={ind.path}
                href={ind.path}
                className="card-interactive p-4 text-center"
              >
                <span className="font-medium text-slate-900 dark:text-white">
                  {ind.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      {(data.phone || data.email || data.address) && (
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-center text-slate-500 dark:text-gray-400 mb-12">
              Ready to start your project in {data.city}?
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {data.phone && (
                <div className="text-center p-4">
                  <Phone className="size-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                  <p className="font-medium text-slate-900 dark:text-white">
                    {data.phone}
                  </p>
                </div>
              )}
              {data.email && (
                <div className="text-center p-4">
                  <Mail className="size-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                  <p className="font-medium text-slate-900 dark:text-white">
                    {data.email}
                  </p>
                </div>
              )}
              {data.address && (
                <div className="text-center p-4">
                  <MapPin className="size-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                  <p className="font-medium text-slate-900 dark:text-white">
                    {data.address}
                  </p>
                  <p className="text-sm text-slate-500">{data.city}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FaqSection
        faqs={faqs}
        title={`Web Development in ${data.city} — FAQs`}
      />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s Build Your Digital Presence in {data.city}
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            We understand the {data.city} market and what it takes to grow your
            business online.
          </p>
          <Link
            href="/contactus"
            className="btn bg-white text-indigo-600 px-8 py-3.5 text-lg hover:bg-slate-100 inline-flex items-center gap-2"
          >
            Get Free Consultation <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
