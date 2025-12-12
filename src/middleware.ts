// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl, nextauth } = req;
    const isLoggedIn = !!nextauth?.token;

    const pathname = nextUrl.pathname;

    // -----------------------------
    // 1. PROTECTED ROUTES (login required)
    // -----------------------------
    const protectedRoutes = ["/dashboard", "/profile", "/settings"];
    const isProtected = protectedRoutes.some((p) =>
      pathname.startsWith(p)
    );

    if (isProtected && !isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // -----------------------------
    // 2. PUBLIC-ONLY ROUTES (logged in users cannot enter)
    // -----------------------------
    const publicOnlyRoutes = [
      "/login",
      "/sign-up",
      "/sign-up/verify",
      "/welcome/start",
      "/welcome/result",
    ];
    const isPublicOnly = publicOnlyRoutes.includes(pathname);

    if (isPublicOnly && isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Run middleware on:
     * - all app routes except:
     *   /_next/, /static/, /api/auth/*, /favicon, /images
     */
    "/((?!_next|static|api/auth|favicon.ico|images).*)",
  ],
};