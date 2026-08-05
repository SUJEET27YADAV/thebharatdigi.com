import { MetadataRoute } from "next";
import { createServerClient } from "@/utils/supabase/server";
import { PUBLIC_PATHS } from "@/lib/routes";

const BASE_URL = "https://www.thebharatdigi.com";

const STATIC_METADATA: Record<
  string,
  {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }
> = {
  "/": { changeFrequency: "weekly", priority: 1.0 },
  "/aboutus": { changeFrequency: "monthly", priority: 0.8 },
  "/contactus": { changeFrequency: "monthly", priority: 0.8 },
  "/shop": { changeFrequency: "weekly", priority: 0.9 },
  "/services": { changeFrequency: "weekly", priority: 0.9 },
  "/portfolio": { changeFrequency: "weekly", priority: 0.8 },
  "/tutorials": { changeFrequency: "monthly", priority: 0.6 },
  "/locations": { changeFrequency: "monthly", priority: 0.8 },
  "/locations/delhi": { changeFrequency: "monthly", priority: 0.7 },
  "/locations/noida": { changeFrequency: "monthly", priority: 0.7 },
  "/locations/gurugram": { changeFrequency: "monthly", priority: 0.7 },
  "/locations/faridabad": { changeFrequency: "monthly", priority: 0.7 },
  "/locations/ghaziabad": { changeFrequency: "monthly", priority: 0.7 },
  "/seo-audit-pro": { changeFrequency: "weekly", priority: 0.8 },
  "/nodemailer": { changeFrequency: "monthly", priority: 0.5 },
  "/passgen": { changeFrequency: "monthly", priority: 0.5 },
  "/cart": { changeFrequency: "monthly", priority: 0.3 },
  "/payment-confirmation": { changeFrequency: "yearly", priority: 0.1 },
  "/privacypolicy": { changeFrequency: "yearly", priority: 0.3 },
  "/termsandconditions": { changeFrequency: "yearly", priority: 0.3 },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, created_at");

  const productEntries: MetadataRoute.Sitemap = (products ?? []).map(
    (product) => ({
      url: `${BASE_URL}/product/${product.id}`,
      lastModified: product.created_at
        ? new Date(product.created_at)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  const staticRoutes: MetadataRoute.Sitemap = PUBLIC_PATHS.map((path) => {
    const meta = STATIC_METADATA[path] ?? {
      changeFrequency: "monthly" as const,
      priority: 0.5,
    };
    return {
      url: `${BASE_URL}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      ...meta,
    };
  });

  return [...staticRoutes, ...productEntries];
}
