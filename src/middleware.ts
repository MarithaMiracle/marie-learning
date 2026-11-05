import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (pathname === "/login" || pathname === "/register") {
    if (session) {
      return NextResponse.redirect(new URL(session.role === "instructor" ? "/instructor/dashboard" : "/student/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/student")) {
    if (!session) return NextResponse.redirect(new URL("/login", request.url));
    if (session.role !== "student") return NextResponse.redirect(new URL("/instructor/dashboard", request.url));
  }

  if (pathname.startsWith("/instructor")) {
    if (!session) return NextResponse.redirect(new URL("/login", request.url));
    if (session.role !== "instructor") return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/instructor/:path*", "/login", "/register"],
};
