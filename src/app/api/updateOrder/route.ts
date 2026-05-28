import { createServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  try {
    const { id, name, email, phone, amount, product_id, paid, created_at } =
      await req.json();
    const { data, error } = await supabase
      .from("customers")
      .update({
        name,
        email,
        phone,
        amount,
        product_id,
        paid,
        created_at,
      })
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error updating order." },
        { status: 404 },
      );
    }
    if (!data) {
      return NextResponse.json(
        { success: false, msg: "Order not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: "Order updated successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error updating order." },
      { status: 500 },
    );
  }
}
