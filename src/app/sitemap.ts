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
  "/games": { changeFrequency: "weekly", priority: 0.9 },
  "/games/bingo-clash-live": { changeFrequency: "weekly", priority: 0.95 },
  "/games/bingo-clash-live/privacy": { changeFrequency: "yearly", priority: 0.3 },
  "/services": { changeFrequency: "weekly", priority: 0.9 },
  "/services/mvp-development": { changeFrequency: "weekly", priority: 0.85 },
  "/services/ai-development": { changeFrequency: "weekly", priority: 0.85 },
  "/services/automation": { changeFrequency: "weekly", priority: 0.85 },
  "/services/ecommerce-development": { changeFrequency: "weekly", priority: 0.85 },
  "/services/seo-marketing": { changeFrequency: "weekly", priority: 0.85 },
  "/services/mobile-app-development": { changeFrequency: "weekly", priority: 0.9 },
  "/services/custom-web-development": { changeFrequency: "weekly", priority: 0.85 },
  "/services/performance-optimization": { changeFrequency: "weekly", priority: 0.8 },
  "/services/web-app-development": { changeFrequency: "weekly", priority: 0.85 },
  "/services/ui-ux-design": { changeFrequency: "weekly", priority: 0.8 },
  "/services/responsive-design": { changeFrequency: "weekly", priority: 0.8 },
  "/aboutus": { changeFrequency: "monthly", priority: 0.8 },
  "/contactus": { changeFrequency: "monthly", priority: 0.8 },
  "/shop": { changeFrequency: "weekly", priority: 0.9 },
  "/portfolio": { changeFrequency: "weekly", priority: 0.8 },
  "/blog": { changeFrequency: "weekly", priority: 0.8 },
  "/guides": { changeFrequency: "monthly", priority: 0.7 },
  "/cost-calculator": { changeFrequency: "monthly", priority: 0.7 },
  "/industries": { changeFrequency: "monthly", priority: 0.8 },
  "/industries/healthcare": { changeFrequency: "monthly", priority: 0.75 },
  "/industries/legal": { changeFrequency: "monthly", priority: 0.75 },
  "/industries/real-estate": { changeFrequency: "monthly", priority: 0.75 },
  "/industries/ecommerce-retail": { changeFrequency: "monthly", priority: 0.75 },
  "/industries/travel-hospitality": { changeFrequency: "monthly", priority: 0.75 },
  "/industries/luxury-automotive": { changeFrequency: "monthly", priority: 0.75 },
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
  let productEntries: MetadataRoute.Sitemap = [];

  try {
    const supabase = createServerClient();
    const { data: products } = await supabase
      .from("products")
      .select("id, serial, created_at");

    if (products) {
      productEntries = products.map((product) => ({
        url: `${BASE_URL}/product/${product.serial ?? product.id}`,
        lastModified: product.created_at
          ? new Date(product.created_at)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Sitemap product fetch error:", e);
  }

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
