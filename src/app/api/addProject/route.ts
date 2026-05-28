import { createServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  try {
    const {
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
      .insert({
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
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error creating project." },
        { status: 404 },
      );
    }
    if (!data) {
      return NextResponse.json(
        { success: false, msg: "Project not created." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: "Project created successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error creating project." },
      { status: 500 },
    );
  }
}
