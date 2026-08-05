import { NextRequest } from "next/server";
import { adminInsert } from "@/utils/admin/crud";

export async function POST(req: NextRequest) {
  const { image_url, name, description, price, tag, features } = await req.json();
  return adminInsert(
    req,
    "products",
    { image_url, name, description, price, tag, features },
    {
      error: "Error creating product.",
      notFound: "Product not created.",
      success: "Product created successfully.",
    },
  );
}
