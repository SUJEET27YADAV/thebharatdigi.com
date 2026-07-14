import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Web Development & IT Services | The Bharat Digital",
  description:
    "Premium web development services including custom websites, e-commerce, SEO tools, UI/UX design, and IT support. 500+ projects delivered. Get a free consultation.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://thebharatdigi.com" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://thebharatdigi.com/services" },
          ],
        }}
        id="breadcrumb-services"
      />
      <ServicesPage />
    </>
  );
}
