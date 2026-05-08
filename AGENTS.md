# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server (uses webpack explicitly)

# Build (runs all generation scripts first via prebuild)
npm run build

# Linting
npm run lint

# Content generation (run individually or all at once)
npm run generate:rss
npm run generate:llms
npm run generate:excerpts
npm run generate:tags
npm run generate:related
npm run update:stats
npm run generate:all   # RSS + LLMs only
```

No testing framework is configured — only ESLint for code quality.

## Architecture

**Next.js 16 App Router** personal portfolio and blog platform.

### Content Pipeline

Blog posts live as MDX files in `/content/blog/` (~109 posts). Content is processed at build time:

1. Pre-build scripts (`/scripts/`) generate derived data: RSS feed, tag indexes, excerpts, related posts, and LLMs.txt
2. `lib/blog.ts` uses `unified`/`remark`/`rehype` to parse MDX with custom plugins:
   - `rehypeMermaid` — converts fenced mermaid blocks to client-side diagrams
   - `rehypeSpotify` — embeds Spotify podcast players
3. Frontmatter fields: `title`, `date`, `tags`, `excerpt`, `related`, `seoTitle`

### Routing

- `/blog/[slug]` — blog posts from MDX
- `/podcast/[slug]` — podcast episodes from `/content/podcast/`
- `/educacion` — courses/education content from `/content/educacion/`
- `/api/md/[slug]` — serves raw markdown for AI/LLM consumption
- `/api/og` — generates Open Graph images

**Middleware** (`middleware.ts`) rewrites blog requests with `Accept: text/markdown` or `text/plain` headers to the markdown API route — enabling LLM-friendly content access.

### Styling

Tailwind CSS v4 with a neo-brutalist design aesthetic. Key conventions:
- CSS variables for theming: light mode uses cream background + `#FFCC00` yellow accent; dark mode uses dark backgrounds
- Custom utility classes: `.neo-btn`, `.neo-card`, `.neo-btn-primary`
- Fonts: Space Grotesk (primary), Space Mono (monospace)
- Theme toggling via `ThemeProvider` with localStorage persistence

### Key Directories

- `/app` — Next.js pages and layouts (App Router)
- `/components` — React components
- `/content` — MDX source files (blog, podcast, educacion, now)
- `/lib` — Data fetching utilities (blog, YouTube, books, etc.)
- `/scripts` — Build-time content generation scripts

### External Integrations

- **YouTube API** — `lib/youtube.ts`, ISR with 1h revalidation
- **Anthropic SDK** — available as dependency for AI-assisted features
- **Spotify** — embedded via custom rehype plugin
