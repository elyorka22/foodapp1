#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env.production ]; then
  echo ".env.production not found. Copy .env.production.example first."
  exit 1
fi

source .env.production

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="./backups"
FILE="$BACKUP_DIR/postgres-$TIMESTAMP.sql.gz"

mkdir -p "$BACKUP_DIR"

docker compose -f docker-compose.prod.yml exec -T postgres \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > "$FILE"

echo "Backup created: $FILE"
