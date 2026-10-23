import { NextResponse, type NextRequest } from "next/server";

/**
 * Malformed percent-encoding in a URL (for example "/blog/tag/%" or "/blog/x%E0%A4%A") makes
 * Next.js answer dynamic routes with a 500, because it fails while decoding the path segment,
 * before any page code runs. Static routes already return a normal 404. This runs first and
 * turns those requests into the site's regular 404 page.
 */
export function proxy(request: NextRequest) {
  try {
    decodeURIComponent(request.nextUrl.pathname);
  } catch {
    // Rewrite to a path that does not exist, so the normal not-found page is rendered (status 404).
    return NextResponse.rewrite(new URL("/not-found-malformed-url", request.url), { status: 404 });
  }
  return NextResponse.next();
}

// Only the dynamic routes are affected; everything else is untouched.
export const config = {
  matcher: ["/blog/:path*", "/projects/:path*"],
};
