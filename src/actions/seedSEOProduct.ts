"use server";
import { createServerClient } from "@/utils/supabase/server";

export async function seedSEOProduct() {
  const supabase = createServerClient();
  try {
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("name", "SEO Audit Pro")
      .single();

    if (existing) {
      return { success: true, msg: "Product already exists" };
    }

    const { error } = await supabase.from("products").insert({
      image_url: "/SEO_Audit_Pro.svg",
      name: "SEO Audit Pro",
      description: "Production-grade SEO auditing tool with AI agent skill generation. Scans websites across 8 critical SEO dimensions — Meta Tags, Performance, Links, Content, Images, Social, Security, and Mobile. Generates detailed reports in JSON, HTML, and AI agent SKILL.md format with actionable fixes ranked by priority.",
      price: 999,
      tag: "SEO Tool",
      features: [
        "8 Category Analysis",
        "AI Skill Generation",
        "JSON/HTML Reports",
        "Broken Link Detection",
        "Core Web Vitals Check",
        "Security Audit",
        "Mobile Check",
        "CLI Tool",
      ],
    });

    if (error) {
      console.error("Seed error:", error);
      return { success: false, msg: error.message };
    }
    return { success: true, msg: "Product created successfully" };
  } catch (err) {
    console.error("Seed error:", err);
    return { success: false, msg: String(err) };
  }
}
