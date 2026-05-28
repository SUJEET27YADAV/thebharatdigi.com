import { createServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  try {
    const { id, image_url, name, description, price, tag, features } =
      await req.json();
    const { data, error } = await supabase
      .from("products")
      .update({
        image_url,
        name,
        description,
        price,
        tag,
        features,
      })
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error updating product." },
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
      { success: true, msg: "Product updated successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error updating product." },
      { status: 500 },
    );
  }
}
