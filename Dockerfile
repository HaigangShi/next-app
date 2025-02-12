# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# 安装 curl 用于健康检查
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./
RUN npm ci
COPY . .

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build argument for environment
ARG BUILD_ENV=production
ENV NODE_ENV=${BUILD_ENV}

# Copy appropriate .env file
COPY .env.${BUILD_ENV} .env

# Build the application
RUN npm run build:${BUILD_ENV}

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ARG BUILD_ENV=production
ENV NODE_ENV=${BUILD_ENV}
ENV NEXT_TELEMETRY_DISABLED 1

# 添加健康检查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.env.${BUILD_ENV} .env

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
