import { createServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const supabase = createServerClient();
  try {
    const { id } = await req.json();
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error deleting product." },
        { status: 404 },
      );
    }
    if (!data) {
      return NextResponse.json(
        { success: false, msg: "Product not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: "Product deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error deleting product." },
      { status: 500 },
    );
  }
}
