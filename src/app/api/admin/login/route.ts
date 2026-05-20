import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { verifyPassword, createAdminToken } from "@/utils/admin/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Query admin_users table
    const { data: adminUser, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !adminUser) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Verify password
    const passwordMatch = await verifyPassword(
      password,
      adminUser.password_hash,
    );
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Create JWT token
    const token = await createAdminToken(adminUser.id, adminUser.email);

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
        },
      },
      { status: 200 },
    );

    // Set secure HTTP-only cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 },
    );
  }
}
