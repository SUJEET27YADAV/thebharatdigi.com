import type { Metadata } from "next";
import ProductsManager from "./_components/ProductsManager";
import { Product } from "@/types/types";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Products | Admin Panel | The Bharat Digital",
};

export default async function Page() {
  let products: Product[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const cookieHeader = (await cookies()).toString();
    const response = await fetch(`${baseUrl}/api/getProducts`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    });
    if (response.ok) {
      const res = await response.json();
      if (res.success && Array.isArray(res.data)) {
        products = res.data;
      }
    }
  } catch {}
  return <ProductsManager products={products} />;
}
