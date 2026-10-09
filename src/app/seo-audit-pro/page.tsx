import type { Metadata } from "next";
import SEOAuditProClient from "./SEOAuditProClient";
import { Product } from "@/types/types";
import { createServerClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "SEO Audit Pro | SEO Tool | The Bharat Digital",
  description:
    "Production-grade SEO auditing tool that scans your website across 8 critical dimensions. Get AI-generated fix instructions, JSON reports, and HTML reports.",
};

export default async function Page() {
  let product: Product | null = null;
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .ilike("name", "%SEO Audit Pro%")
      .limit(1);

    if (data && data.length > 0) {
      product = data[0];
    }
  } catch (error) {
    console.error("Error fetching SEO Audit Pro product:", error);
  }
  return <SEOAuditProClient product={product} />;
}
