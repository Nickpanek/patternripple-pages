// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Optional explicit map when a slug needs a custom target
// Fill in as needed; everything else falls back to `/collections/<slug>`
const REDIRECTS: Record<string, string> = {
  // "old-slug": "/collections/new-slug",
  // "8-bit-invader-faux-embroidery-black": "/collections/8-bit-invader-faux-embroidery-black",
};

export const config = {
  matcher: ["/p/:path*"], // run for /p/*
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;

  // Handle /p/* redirects (existing logic)
  const slug = path.replace(/^\/p\//, ""); // xyz or nested/slug

  // If it's just /p, send home
  if (!slug || slug === "/") {
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }

  // If explicit map exists, use it
  if (REDIRECTS[slug]) {
    url.pathname = REDIRECTS[slug];
    return NextResponse.redirect(url, 308);
  }

  // Default rule: move /p/<slug> to /collections/<slug>
  url.pathname = `/collections/${slug}`;
  return NextResponse.redirect(url, 308);
}