import { NextRequest } from "next/server";
import { adminDelete } from "@/utils/admin/crud";

export async function DELETE(req: NextRequest) {
  return adminDelete(req, "customers", {
    error: "Error deleting order.",
    notFound: "Order not found.",
    success: "Order deleted successfully.",
  });
}
