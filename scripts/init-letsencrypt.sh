#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env.production ]; then
  echo ".env.production not found. Copy .env.production.example first."
  exit 1
fi

source .env.production

if [ -z "${DOMAIN:-}" ] || [ -z "${LETSENCRYPT_EMAIL:-}" ]; then
  echo "DOMAIN and LETSENCRYPT_EMAIL must be set in .env.production"
  exit 1
fi

mkdir -p infra/certbot/www infra/certbot/conf

# 1) Start only nginx on port 80 to serve ACME challenge files
docker compose -f docker-compose.prod.yml up -d nginx

# 2) Request certificate using webroot mode
docker run --rm \
  -v "$(pwd)/infra/certbot/www:/var/www/certbot" \
  -v "$(pwd)/infra/certbot/conf:/etc/letsencrypt" \
  certbot/certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email "$LETSENCRYPT_EMAIL" \
  --agree-tos --no-eff-email \
  -d "$DOMAIN"

# 3) Reload nginx with new certs
docker compose -f docker-compose.prod.yml restart nginx

echo "Let's Encrypt certificate issued for $DOMAIN"
