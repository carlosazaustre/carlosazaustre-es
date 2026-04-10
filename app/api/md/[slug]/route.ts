import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Find the file (.mdx or .md)
  const extensions = ["mdx", "md"];
  let filePath: string | null = null;
  for (const ext of extensions) {
    const candidate = path.join(BLOG_DIR, `${slug}.${ext}`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) {
    return new NextResponse("Post not found", { status: 404 });
  }

  const raw = fs.readFileSync(filePath, "utf8");

  return new NextResponse(raw, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Content-Source": "cazaustre-web",
    },
  });
}
