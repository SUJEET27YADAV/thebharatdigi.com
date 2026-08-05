import { NextRequest } from "next/server";
import { adminUpdate } from "@/utils/admin/crud";

export async function POST(req: NextRequest) {
  const { id, name, email, phone, amount, product_id, paid, created_at } =
    await req.json();
  return adminUpdate(
    req,
    "customers",
    id,
    { name, email, phone, amount, product_id, paid, created_at },
    {
      error: "Error updating order.",
      notFound: "Order not found.",
      success: "Order updated successfully.",
    },
  );
}
