import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // req.nextauth.token is automatically populated by NextAuth
    // Check if the user is trying to access admin pages AND is NOT an admin
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      // Redirect them to the homepage (or an error page)
      return NextResponse.rewrite(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      // This function determines if the middleware above should even run
      // It basically says: "Is the user logged in?"
      authorized: ({ token }) => !!token,
    },
  }
);

// Protect these routes
export const config = {
  // Only run this middleware on paths starting with /admin
  matcher: ["/admin/:path*"],
};