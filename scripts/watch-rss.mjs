#!/usr/bin/env node
/**
 * watch-rss.mjs
 *
 * Watches content/blog/ for new/changed .md and .mdx files
 * and automatically regenerates public/rss.xml.
 *
 * Usage:
 *   node scripts/watch-rss.mjs
 *
 * Run in a separate terminal alongside `npm run dev`, or use:
 *   npm run dev:rss   (runs both concurrently)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "..", "content", "blog");
const SCRIPT = path.join(__dirname, "generate-rss.mjs");

let debounceTimer = null;

function regenerate(filename) {
  // Only react to blog post files
  if (filename && !filename.match(/\.(md|mdx)$/)) return;

  // Debounce: wait 300ms in case of rapid saves
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const label = filename ? `[${filename}]` : "[change]";
    console.log(`📡  ${label} → regenerando RSS...`);
    try {
      execSync(`node ${SCRIPT}`, { stdio: "inherit" });
    } catch {
      console.error("❌  Error generando RSS");
    }
  }, 300);
}

if (!fs.existsSync(BLOG_DIR)) {
  console.error(`❌  Blog dir not found: ${BLOG_DIR}`);
  process.exit(1);
}

// Generate once on startup
regenerate(null);

// Watch for changes
fs.watch(BLOG_DIR, { persistent: true }, (eventType, filename) => {
  regenerate(filename);
});

console.log(`👀  Watching ${BLOG_DIR} for changes…`);
console.log("    (Ctrl+C to stop)\n");
