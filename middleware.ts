import { NextRequest, NextResponse } from "next/server";

/**
 * Content negotiation middleware.
 * When an AI agent requests /blog/[slug] with Accept: text/markdown or text/plain,
 * rewrite to /api/md/[slug] which serves raw markdown.
 * Same for /blog → /api/md (index).
 */
export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const wantsMarkdown =
    accept.includes("text/markdown") || accept.includes("text/plain");

  if (!wantsMarkdown) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // /blog/[slug] → /api/md/[slug]
  const blogPostMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogPostMatch) {
    const slug = blogPostMatch[1];
    return NextResponse.rewrite(new URL(`/api/md/${slug}`, request.url));
  }

  // /blog → /api/md (index)
  if (pathname === "/blog") {
    return NextResponse.rewrite(new URL("/api/md", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog", "/blog/:slug*"],
};
