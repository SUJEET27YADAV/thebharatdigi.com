import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/utils/admin/auth";
import { createServerClient } from "@/utils/supabase/server";

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAdminToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { name, phone, bio, department, avatar_url } = await request.json();

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("admin_users")
      .update({
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(bio !== undefined && { bio }),
        ...(department !== undefined && { department }),
        ...(avatar_url !== undefined && { avatar_url }),
        updated_at: new Date().toISOString(),
        updated_by: payload.userId as string,
      })
      .eq("id", payload.userId)
      .select("id, email, name, role, avatar_url, phone, bio, department")
      .single();

    if (error) {
      console.error("Profile update error:", error);
      return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: data });
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}
