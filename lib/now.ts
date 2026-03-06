import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const NOW_FILE = path.join(process.cwd(), "content", "now.mdx");

export interface NowPage {
  updatedAt: string;
  content: string;
}

export async function getNowPage(): Promise<NowPage | null> {
  if (!fs.existsSync(NOW_FILE)) return null;

  const raw = fs.readFileSync(NOW_FILE, "utf8");
  const { data, content } = matter(raw);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    updatedAt: data.updatedAt ? String(data.updatedAt) : new Date().toISOString().slice(0, 10),
    content: processed.toString(),
  };
}
