import type { Metadata } from "next";
import ProductDetailPage from "./ProductDetailPage";
import { createServerClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Product Details | The Bharat Digital",
  description:
    "View product details and add to your cart. Digital products from The Bharat Digital with lifetime updates and support.",
};

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("serial", Number(params.id))
    .single();

  return <ProductDetailPage product={data} />;
}
