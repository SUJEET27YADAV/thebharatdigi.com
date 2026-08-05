import { NextRequest } from "next/server";
import { adminFetch } from "@/utils/admin/crud";

export async function GET(req: NextRequest) {
  return adminFetch(req, "customers", {
    error: "Error fetching orders",
    empty: "No orders found",
    success: "Orders fetched successfully",
  });
}
