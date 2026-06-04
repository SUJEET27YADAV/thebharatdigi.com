import type { Metadata } from "next";
import SEOAuditProClient from "./SEOAuditProClient";
import { Product } from "@/types/types";
import { createServerClient } from "@/utils/supabase/server";

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
      .eq("name", "SEO Audit Pro")
      .single();
    product = data;
  } catch (error) {
    console.error(error);
  }
  return <SEOAuditProClient product={product} />;
}
