## Multi-stage Dockerfile for Next.js (Node 20)
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --production=false --prefer-offline

# Copy sources and build
COPY . .
RUN npm run build

## Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Install a minimal set of production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --production --prefer-offline

# Copy build output from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
