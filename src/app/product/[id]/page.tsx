import type { Metadata } from "next";
import ProductDetailPage from "./ProductDetailPage";
import { createServerClient } from "@/utils/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("serial", Number(params.id))
    .single();

  if (!product) {
    return {
      title: "Product Not Found | The Bharat Digital",
    };
  }

  return {
    title: `${product.name} | The Bharat Digital`,
    description:
      product.description ||
      `Buy ${product.name} from The Bharat Digital. Price: ₹${product.price}. Digital product with lifetime updates and support.`,
    openGraph: {
      title: `${product.name} | The Bharat Digital`,
      description: product.description,
      images: product.image_url
        ? [{ url: product.image_url, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | The Bharat Digital`,
      description: product.description,
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

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
