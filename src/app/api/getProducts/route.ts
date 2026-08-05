import { NextRequest } from "next/server";
import { adminFetch } from "@/utils/admin/crud";

export async function GET(req: NextRequest) {
  return adminFetch(req, "products", {
    error: "Error fetching products",
    empty: "No products found",
    success: "Products fetched successfully",
  });
}
