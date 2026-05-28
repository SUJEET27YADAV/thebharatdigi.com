import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/utils/admin/auth";
import { createServerClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 },
      );
    }

    const payload = await verifyAdminToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 },
      );
    }

    const supabase = createServerClient();
    const { data: adminUser, error } = await supabase
      .from("admin_users")
      .select(
        "id, email, name, avatar_url, role, is_active, created_at, updated_at, last_login_at, phone, bio, department, created_by, updated_by",
      )
      .eq("id", payload.userId)
      .single();

    if (error || !adminUser) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
        avatar_url: adminUser.avatar_url,
        is_active: adminUser.is_active,
        created_at: adminUser.created_at,
        updated_at: adminUser.updated_at,
        last_login_at: adminUser.last_login_at,
        phone: adminUser.phone,
        bio: adminUser.bio,
        department: adminUser.department,
        created_by: adminUser.created_by,
        updated_by: adminUser.updated_by,
      },
    });
  } catch (err) {
    console.error("Auth verification error:", err);
    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        error: "Token verification failed",
      },
      { status: 401 },
    );
  }
}
