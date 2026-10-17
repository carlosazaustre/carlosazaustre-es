import assert from "node:assert/strict";
import { requestOrigin } from "./request-origin.mjs";

const base = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";
const expectedRevision = process.env.APP_REVISION;
const headers = process.env.SMOKE_HOST ? { Host: process.env.SMOKE_HOST } : {};
if (process.env.CF_ACCESS_CLIENT_ID && process.env.CF_ACCESS_CLIENT_SECRET) {
  headers["CF-Access-Client-Id"] = process.env.CF_ACCESS_CLIENT_ID;
  headers["CF-Access-Client-Secret"] = process.env.CF_ACCESS_CLIENT_SECRET;
}

async function request(path, options = {}) {
  const response = await requestOrigin(new URL(path, base), {
    headers: { ...headers, "Cache-Control": "no-cache", ...options.headers },
    timeoutMs: 30_000,
  });
  assert.equal(response.status, options.status ?? 200, `${path}: HTTP ${response.status}`);
  return response;
}

const health = await request("/api/health");
assert.match(health.headers.get("cache-control") ?? "", /no-store/);
const state = await health.json();
assert.equal(state.status, "ok");
if (expectedRevision) assert.equal(state.revision, expectedRevision);

for (const path of ["/", "/blog", "/podcast", "/about", "/uses", "/now", "/educacion"]) {
  const response = await request(path);
  assert.match(response.headers.get("content-type") ?? "", /text\/html/);
  const html = await response.text();
  assert.ok(html.includes("<!DOCTYPE html>") || html.includes("<!doctype html>"), path);
}

const blog = "/blog/pc-2023";
const article = await request(blog);
assert.match(article.headers.get("content-type") ?? "", /text\/html/);
const html = await article.text();
assert.match(html, /2023/);
const markdown = await request(blog, { headers: { Accept: "text/markdown" } });
assert.match(markdown.headers.get("content-type") ?? "", /text\/(markdown|plain)/);
assert.match(await markdown.text(), /2023/);
await request(blog, { headers: { Accept: "text/html" } });

const staticAsset = html.match(/(?:src|href)="([^" ]*\/_next\/static\/[^" ]+)"/);
assert.ok(staticAsset, "Missing Next.js static assets");
await request(staticAsset[1].replaceAll("&amp;", "&"));
for (const path of ["/rss.xml", "/podcast.xml", "/sitemap.xml", "/robots.txt", "/llms.txt"]) {
  await request(path);
}

const og = await request("/api/og?title=Deployment%20health%20check");
assert.match(og.headers.get("content-type") ?? "", /image\/png/);
assert.ok((await og.arrayBuffer()).byteLength > 1000, "Empty Open Graph image");
await request("/og-background.jpg");
const optimized = await request("/_next/image?url=%2Fog-background.jpg&w=640&q=75");
assert.match(optimized.headers.get("content-type") ?? "", /image\//);
const redirect = await request("/blog/quetechcuentas-01", { status: 308 });
assert.equal(new URL(redirect.headers.get("location"), base).pathname, "/podcast/quetechcuentas-01");
console.log("Smoke checks passed: revision, pages, MDX, HTML/Markdown negotiation, feeds, static assets, images, and redirects.");
