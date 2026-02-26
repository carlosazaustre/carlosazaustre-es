import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import readingTime from "reading-time";
import type { Plugin } from "unified";
import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";

// Wraps <pre><code class="language-X"> in a code-window with a real titlebar element
const rehypeCodeWindow: Plugin<[], Root> = () => (tree: Root) => {
  visit(tree, "element", (node: Element, index, parent) => {
    if (
      node.tagName !== "pre" ||
      !parent ||
      index === undefined ||
      index === null
    )
      return;

    const code = node.children.find(
      (c): c is Element => (c as Element).tagName === "code"
    );
    const className = (code?.properties?.className as string[]) ?? [];
    const langClass = className.find((c) => c.startsWith("language-"));
    const lang = langClass ? langClass.replace("language-", "") : "code";

    // Real titlebar div (dots via CSS ::before, lang label via real span)
    const titlebar: Element = {
      type: "element",
      tagName: "div",
      properties: { className: ["code-titlebar"] },
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["code-lang"] },
          children: [{ type: "text", value: lang }],
        },
      ],
    };

    const wrapper: Element = {
      type: "element",
      tagName: "div",
      properties: { className: ["code-window"] },
      children: [titlebar, node],
    };

    (parent.children as Element[])[index] = wrapper;
  });
};

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  coverImage?: string;
}

export interface Post extends PostMeta {
  content: string;
}

function formatReadingTime(text: string): string {
  const stats = readingTime(text);
  const minutes = Math.ceil(stats.minutes);
  return `${minutes} min`;
}

function extractExcerpt(content: string, maxLength = 160): string {
  // Strip MDX/markdown: remove frontmatter fence, headings, images, links, inline code, bold/italic
  const clean = content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1")
    .replace(/_{1,2}([^_]+)_{1,2}/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\n+/g, " ")
    .trim();

  if (clean.length <= maxLength) return clean;
  const cut = clean.lastIndexOf(" ", maxLength);
  return clean.slice(0, cut > 0 ? cut : maxLength) + "…";
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(md|mdx)$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? "Sin título",
      date: data.date ? String(data.date) : new Date().toISOString(),
      excerpt: data.excerpt ?? extractExcerpt(content),
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: formatReadingTime(content),
      coverImage: data.coverImage ?? null,
    } as PostMeta;
  });

  // Sort by date DESC
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const extensions = ["md", "mdx"];
  let filePath: string | null = null;

  for (const ext of extensions) {
    const candidate = path.join(BLOG_DIR, `${slug}.${ext}`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, { detect: true })
    .use(rehypeCodeWindow)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    slug,
    title: data.title ?? "Sin título",
    date: data.date ? String(data.date) : new Date().toISOString(),
    excerpt: data.excerpt ?? extractExcerpt(content),
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: formatReadingTime(content),
    coverImage: data.coverImage ?? null,
    content: processed.toString(),
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
