import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import { db } from "@/db/db";
// import { products } from "@/db/schema";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase.from("products").select("*");
    // const proArr = await db.select().from(products);
    // if (!proArr || proArr.length === 0) {
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error fetching products", data: [] },
        { status: 404 },
      );
    }
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, msg: "No products found", data: [] },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: "Products fetched successfully", data: data },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error fetching products" },
      { status: 500 },
    );
  }
}
