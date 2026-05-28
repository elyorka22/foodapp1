#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env.production ]; then
  echo ".env.production not found. Copy .env.production.example first."
  exit 1
fi

echo "[1/4] Build and start services"
docker compose -f docker-compose.prod.yml up -d --build

echo "[2/4] Apply Prisma schema"
docker compose -f docker-compose.prod.yml exec -T backend \
  npx prisma db push --schema=apps/backend/prisma/schema.prisma

echo "[3/4] Seed demo data"
docker compose -f docker-compose.prod.yml exec -T backend \
  npx ts-node apps/backend/prisma/seed.ts

echo "[4/4] Health check"
curl -fsS "http://127.0.0.1/api/v1/health" || true

echo "Deploy completed"
