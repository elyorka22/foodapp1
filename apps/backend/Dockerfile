FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json ./package.json
COPY apps/backend/package.json ./apps/backend/package.json
RUN npm install

FROM deps AS build
COPY . .
RUN npm run build --workspace=backend

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/backend/dist ./apps/backend/dist
COPY --from=build /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=build /app/apps/backend/prisma ./apps/backend/prisma
CMD ["node", "apps/backend/dist/main.js"]
