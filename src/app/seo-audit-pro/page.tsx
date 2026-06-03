import type { Metadata } from "next";
import SEOAuditProClient from "./SEOAuditProClient";
import { Product } from "@/types/types";

export const metadata: Metadata = {
  title: "SEO Audit Pro | SEO Tool | The Bharat Digital",
  description:
    "Production-grade SEO auditing tool that scans your website across 8 critical dimensions. Get AI-generated fix instructions, JSON reports, and HTML reports.",
};

export default async function Page() {
  let product: Product | null = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    let res = await fetch(`${baseUrl}/api/getProducts`, { cache: "no-store" });
    let result = await res.json();
    if (result.success) {
      const seoProduct = result.data.find(
        (p: Product) => p.name === "SEO Audit Pro",
      );
      if (seoProduct) {
        product = seoProduct;
      }
    }
  } catch (error) {
    console.error(error);
  }
  return <SEOAuditProClient product={product} />;
}
