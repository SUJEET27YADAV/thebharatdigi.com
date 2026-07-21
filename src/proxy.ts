import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/utils/admin/auth";

const allowedOrigins = [
  "https://www.thebharatdigi.com",
  "https://thebharatdigi.com",
  "http://localhost:3000",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const origin = request.headers.get("origin");

  // Create base response
  const response = NextResponse.next();

  // ----------------------------------------------------
  // 1. Dynamic CORS Handling (Runs for all /api routes)
  // ----------------------------------------------------
  if (pathname.startsWith("/api")) {
    // If request comes from an allowed origin, set that specific origin
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    } else {
      // Fallback for direct browser calls or non-browser fetch
      response.headers.set(
        "Access-Control-Allow-Origin",
        "https://www.thebharatdigi.com",
      );
    }

    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept",
    );

    // CRITICAL: Return status 200 for browser CORS preflight checks (OPTIONS)
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }
  }

  // ----------------------------------------------------
  // 2. Admin Auth Protection (/admin routes)
  // ----------------------------------------------------
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const payload = await verifyAdminToken(token);
      if (!payload) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect /admin/login to dashboard if already authenticated
  if (pathname === "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (token) {
      try {
        const payload = await verifyAdminToken(token);
        if (payload) {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } catch (err) {
        // Continue to login page
      }
    }
  }

  return response;
}

// Intercept both admin routes AND api routes
export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
