import { createServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerClient();
  try {
    const { data, error } = await supabase.from("services").select("*");
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error fetching services", data: [] },
        { status: 404 },
      );
    }
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, msg: "No services found", data: [] },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: "Services fetched successfully", data: data },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error fetching services" },
      { status: 500 },
    );
  }
}
