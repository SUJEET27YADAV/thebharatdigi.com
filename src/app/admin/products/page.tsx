import type { Metadata } from "next";
import ProductsManager from "./_components/ProductsManager";
import { Product } from "@/types/types";
import { fetchApiList } from "@/utils/api-fetch";

export const metadata: Metadata = {
  title: "Products | Admin Panel | The Bharat Digital",
};

export default async function Page() {
  const products = await fetchApiList<Product>("/api/getProducts");
  return <ProductsManager products={products} />;
}
