# DigitalOcean VPS Deployment (Production)

This guide deploys the app with Docker Compose, Nginx reverse proxy, PostgreSQL, Redis, and Let's Encrypt.

## 1) Prepare Droplet

- Ubuntu 22.04+ Droplet
- DNS A record: `DOMAIN -> VPS_IP`
- Open firewall ports: `22`, `80`, `443`

Install Docker + Compose plugin:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```

Log out/in after adding your user to docker group.

## 2) Project Setup

```bash
git clone <your-repo-url> foodapp1
cd foodapp1
cp .env.production.example .env.production
```

Edit `.env.production`:

- `DOMAIN`
- `LETSENCRYPT_EMAIL`
- DB/Redis/JWT secrets
- frontend public URLs (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SOCKET_URL`)

## 3) First Deployment

```bash
./scripts/deploy-prod.sh
```

This starts all services and applies Prisma schema + seed.

## 4) Issue HTTPS Certificate

```bash
./scripts/init-letsencrypt.sh
```

After that, Nginx serves traffic on HTTPS.

## 5) Verify

```bash
docker compose -f docker-compose.prod.yml ps
curl -I https://$DOMAIN
curl -s https://$DOMAIN/api/v1/health
```

## 6) SSL Auto-Renew

Add cron (twice daily):

```bash
(crontab -l 2>/dev/null; echo "0 */12 * * * cd /path/to/foodapp1 && ./scripts/renew-letsencrypt.sh >> /var/log/certbot-renew.log 2>&1") | crontab -
```

## 7) Backups

Run manual backup:

```bash
./scripts/backup-postgres.sh
```

Daily backup cron example:

```bash
(crontab -l 2>/dev/null; echo "30 2 * * * cd /path/to/foodapp1 && ./scripts/backup-postgres.sh >> /var/log/postgres-backup.log 2>&1") | crontab -
```

## 8) Rolling Update

```bash
git pull
./scripts/deploy-prod.sh
```

## Notes

- In Docker mode, PM2 is not required.
- DB and Redis are internal-only (no host port exposure in production compose).
- Use object storage lifecycle/retention policy for uploaded assets and backup archives.
