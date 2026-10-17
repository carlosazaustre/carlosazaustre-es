# syntax=docker/dockerfile:1.7
FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY . .
RUN --mount=type=secret,id=youtube_api_key \
    YOUTUBE_API_KEY="$(cat /run/secrets/youtube_api_key 2>/dev/null || true)" npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
ARG APP_REVISION=development
ENV APP_REVISION=$APP_REVISION
LABEL org.opencontainers.image.source="https://github.com/carlosazaustre/carlosazaustre-es" \
      org.opencontainers.image.revision=$APP_REVISION
RUN groupadd --gid 1001 nextjs && useradd --uid 1001 --gid nextjs --no-create-home nextjs
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/content ./content
COPY --from=builder --chown=nextjs:nextjs /app/data ./data
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=45s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", "server.js"]
