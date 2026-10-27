import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/utils/admin/auth";

const allowedOrigins = [
  "https://www.thebharatdigi.com",
  "https://thebharatdigi.com",
  "https://shriamarcrafts.thebharatdigi.com",
  "http://localhost:3000",
  "http://shriamarcrafts.localhost:3000",
];

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const hostname = request.headers.get("host") || "";
  const origin = request.headers.get("origin");

  // Create base response
  const response = NextResponse.next();

  // ----------------------------------------------------
  // 1. Dynamic CORS Handling (Runs for all /api routes)
  // ----------------------------------------------------
  if (pathname.startsWith("/api")) {
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    } else {
      response.headers.set(
        "Access-Control-Allow-Origin",
        "https://www.thebharatdigi.com"
      );
    }

    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept"
    );

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
    } catch {
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
      } catch {
        // Continue to login page
      }
    }
  }

  // ----------------------------------------------------
  // 3. Subdomain Routing for Shri Amar Crafts FBA Storefront
  // ----------------------------------------------------
  if (!pathname.startsWith("/_next") && !pathname.includes(".")) {
    const isShriAmarCraftsSubdomain =
      hostname.startsWith("shriamarcrafts.thebharatdigi.com") ||
      hostname.startsWith("shriamarcrafts.localhost");

    if (isShriAmarCraftsSubdomain) {
      // Prevent double prefixing if path already starts with /shri-amar-crafts
      if (!pathname.startsWith("/shri-amar-crafts")) {
        url.pathname = `/shri-amar-crafts${pathname === "/" ? "" : pathname}`;
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-storefront", "shri-amar-crafts");
        requestHeaders.set("x-original-pathname", pathname);

        return NextResponse.rewrite(url, {
          request: {
            headers: requestHeaders,
          },
        });
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
