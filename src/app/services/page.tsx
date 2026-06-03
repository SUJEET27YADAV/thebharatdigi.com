import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";
import { Service } from "@/types/types";

export const metadata: Metadata = {
  title: "Web Development & IT Services | The Bharat Digital",
  description: "Premium web development services including custom websites, e-commerce, SEO tools, UI/UX design, and IT support. 500+ projects delivered. Get a free consultation.",
};

export default async function Page() {
  let services: Service[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/getServices`, { cache: "no-store" });
    const result = await res.json();
    if (result.success) {
      services = result.data;
    }
  } catch {}
  return <ServicesPage services={services} />;
}
