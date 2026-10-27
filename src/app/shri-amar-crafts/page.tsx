import type { Metadata } from "next";
import StoreHero from "@/components/shri-amar-crafts/StoreHero";
import FbaTrustBanner from "@/components/shri-amar-crafts/FbaTrustBanner";
import StoreCatalogClient from "./StoreCatalogClient";
import catalogData from "@/data/shri-amar-crafts-fba.json";
import { StoreProduct } from "@/types/storefront";

export const metadata: Metadata = {
  title: "Shri Amar Crafts | Women's Indian Ethnic Wear — Amazon FBA Storefront",
  description:
    "Explore authentic handcrafted Indian ethnic fashion by Shri Amar Crafts. Pure cotton flared Anarkali kurta sets and Viscose Silk Banarasi Jacquard ensembles. Fulfilled fast nationwide via Amazon Prime with 7-day returns.",
};

export default function ShriAmarCraftsPage() {
  const products = catalogData.products as unknown as StoreProduct[];

  // Schema.org structured data for Store and ItemList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ClothingStore",
        "@id": "https://shriamarcrafts.thebharatdigi.com/#store",
        name: "Shri Amar Crafts",
        url: "https://shriamarcrafts.thebharatdigi.com",
        description:
          "Handcrafted Indian Ethnic Elegance — Delivered Fast with Amazon Prime",
        parentOrganization: {
          "@type": "Organization",
          name: "The Bharat Digital",
          url: "https://www.thebharatdigi.com",
        },
        makesOffer: products.map((p) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: p.title,
            sku: p.styleCode,
            brand: {
              "@type": "Brand",
              name: "Shri Amar Crafts",
            },
          },
          price: p.pricing.sellingPrice,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        })),
      },
      {
        "@type": "ItemList",
        name: "Shri Amar Crafts FBA Ethnic Collection",
        itemListElement: products.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Product",
            name: p.title,
            url: `https://shriamarcrafts.thebharatdigi.com/product/${p.id}`,
            image: `https://shriamarcrafts.thebharatdigi.com${p.images.primary}`,
            description: p.description,
            offers: {
              "@type": "Offer",
              price: p.pricing.sellingPrice,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoreHero />
      <FbaTrustBanner />
      <StoreCatalogClient products={products} />
    </>
  );
}
