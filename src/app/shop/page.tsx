import type { Metadata } from "next";
import StorePage from "./StorePage";
import { Product } from "@/types/types";
import { createServerClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Shop Digital Products | The Bharat Digital",
  description:
    "Browse and buy digital products from The Bharat Digital — starter kits, SEO tools, and premium assets for modern teams. Lifetime updates included.",
};

export default async function Page() {
  let products: Product[] | null = null;
  let err = "";
  try {
    const supabase = createServerClient();
    const { data } = await supabase.from("products").select("*");
    products = data;
  } catch (error) {
    console.error(error);
    err = "Could not load products. Please try again.";
  }
  return <StorePage products={products} err={err} />;
}
