import { createServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const supabase = createServerClient();
  try {
    const { id } = await req.json();
    const { data, error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error deleting order." },
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
      { success: true, msg: "Order deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error deleting order." },
      { status: 500 },
    );
  }
}
