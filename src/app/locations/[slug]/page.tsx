import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPageTemplate from "@/app/locations/CityPageTemplate";
import { getLocationBySlug, LOCATION_SLUGS } from "@/lib/location-data";
import { faqs } from "@/lib/faq-data";

export function generateStaticParams() {
  return LOCATION_SLUGS.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getLocationBySlug(slug);
  if (!data) return {};
  return {
    title: `Web Development Company in ${data.city} — Modern Websites & Web Apps | The Bharat Digital`,
    description: data.description,
    openGraph: {
      title: `Web Development Company in ${data.city} — The Bharat Digital`,
      description: data.description,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const data = getLocationBySlug(slug);
  if (!data) notFound();
  return <CityPageTemplate data={data} faqs={faqs[slug]} />;
}
