FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json ./package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN npm install

FROM deps AS build
COPY . .
RUN npm run build --workspace=frontend

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=build /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=build /app/apps/frontend/next.config.ts ./apps/frontend/next.config.ts
COPY --from=build /app/apps/frontend/public ./apps/frontend/public
CMD ["npx", "next", "start", "apps/frontend", "-p", "3000"]
