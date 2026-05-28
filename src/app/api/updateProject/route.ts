import { createServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  try {
    const {
      id,
      icon,
      title,
      subtitle,
      category,
      color,
      technologies,
      year,
      link,
      featured,
    } = await req.json();
    const { data, error } = await supabase
      .from("projects")
      .update({
        icon,
        title,
        subtitle,
        category,
        color,
        technologies,
        year,
        link,
        featured,
      })
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error updating project." },
        { status: 404 },
      );
    }
    if (!data) {
      return NextResponse.json(
        { success: false, msg: "Project not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: "Project updated successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error updating project." },
      { status: 500 },
    );
  }
}
