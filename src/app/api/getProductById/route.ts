import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id);
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
