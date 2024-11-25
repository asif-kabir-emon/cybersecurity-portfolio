import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./utils/validateToken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const isValid = await validateToken(
    token || "",
    process.env.JWT_SECRET as string,
  );

  if (req.nextUrl.pathname === "/login") {
    if (token && isValid) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/profiles")
  ) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    if (!isValid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/dashboard/:path*",
    "/profiles",
    "/profiles/:path*",
  ],
};
