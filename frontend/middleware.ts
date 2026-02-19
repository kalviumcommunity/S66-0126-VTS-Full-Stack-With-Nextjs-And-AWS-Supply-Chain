import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Allow public pages and static files (keep /login public)
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/login") {
    return NextResponse.next();
  }

  // If user visits protected route without token, redirect to /login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Protect root (home) and users routes
  matcher: ["/", "/users/:path*"],
};
