FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY apps/backend/prisma ./apps/backend/prisma

RUN npm ci
RUN npm run prisma:generate --workspace=backend

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build --workspace=backend

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/package.json ./package.json

EXPOSE 4000
CMD ["node", "apps/backend/dist/main.js"]
