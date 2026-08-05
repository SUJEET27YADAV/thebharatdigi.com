import { NextRequest } from "next/server";
import { adminUpdate } from "@/utils/admin/crud";

export async function POST(req: NextRequest) {
  const { id, image_url, name, description, price, tag, features } =
    await req.json();
  return adminUpdate(
    req,
    "products",
    id,
    { image_url, name, description, price, tag, features },
    {
      error: "Error updating product.",
      notFound: "Product not found.",
      success: "Product updated successfully.",
    },
  );
}
