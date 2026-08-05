import { NextRequest } from "next/server";
import { adminDelete } from "@/utils/admin/crud";

export async function DELETE(req: NextRequest) {
  return adminDelete(req, "products", {
    error: "Error deleting product.",
    notFound: "Product not found.",
    success: "Product deleted successfully.",
  });
}
