import { createServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  try {
    const { id, icon, title, shortdesc, fulldesc, features, color, popular } =
      await req.json();
    const { data, error } = await supabase
      .from("services")
      .update({
        icon,
        title,
        shortdesc,
        fulldesc,
        features,
        color,
        popular,
      })
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error updating service." },
        { status: 404 },
      );
    }
    if (!data) {
      return NextResponse.json(
        { success: false, msg: "Service not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: "Service updated successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error updating service." },
      { status: 500 },
    );
  }
}
