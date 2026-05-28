#!/usr/bin/env bash
set -euo pipefail

docker run --rm \
  -v "$(pwd)/infra/certbot/www:/var/www/certbot" \
  -v "$(pwd)/infra/certbot/conf:/etc/letsencrypt" \
  certbot/certbot renew --webroot -w /var/www/certbot

docker compose -f docker-compose.prod.yml restart nginx
