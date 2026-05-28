import { createServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { serial } = await req.json();
  const supabase = createServerClient();

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("serial", serial);
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error fetching product details." },
        { status: 500 },
      );
    }
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, msg: "Product details not found.", data: [] },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: "Product fetched successfully.", data: data[0] },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error fetching product details." },
      { status: 500 },
    );
  }
}
