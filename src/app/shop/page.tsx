import type { Metadata } from "next";
import StorePage from "./StorePage";
import { Product } from "@/types/types";

export const metadata: Metadata = {
  title: "Shop Digital Products | The Bharat Digital",
  description: "Browse and buy digital products from The Bharat Digital — starter kits, SEO tools, and premium assets for modern teams. Lifetime updates included.",
};

export default async function Page() {
  let products: Product[] | null = null;
  let err = "";
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/getProducts`, { cache: "no-store" });
    const result = await res.json();
    if (result.success) {
      products = result.data;
    } else {
      err = result.msg;
    }
  } catch {
    err = "Could not load products. Please try again.";
  }
  return <StorePage products={products} err={err} />;
}
