# Food Delivery Platform Architecture (Initial Scaffold)

## Monorepo Layout

- `apps/backend` - NestJS API, Prisma, auth, RBAC foundation
- `apps/frontend` - Next.js 15 app router client
- `infra/nginx` - reverse proxy config
- `docs` - deployment and architecture docs

## Backend Structure

- `src/main.ts` - bootstrap, validation, Swagger
- `src/app.module.ts` - global modules and guards
- `src/prisma/*` - Prisma service and module
- `src/common/decorators/*` - `@Public`, `@Roles`
- `src/common/guards/*` - JWT and role guards
- `src/modules/auth/*` - register/login/OTP/JWT
- `src/modules/users/*` - protected role example endpoint
- `src/modules/health/*` - health endpoint
- `prisma/schema.prisma` - full domain schema
- `prisma/seed.ts` - initial admin seed

## Frontend Structure

- `src/app/layout.tsx` - root shell and providers
- `src/app/providers.tsx` - React Query provider
- `src/app/(public)/page.tsx` - landing page
- `src/app/auth/login/page.tsx` - login page
- `src/app/admin/page.tsx` - admin panel placeholder
- `src/app/restaurant/page.tsx` - restaurant panel placeholder
- `src/app/courier/page.tsx` - courier panel placeholder
- `src/components/layout/*` - reusable shell components
- `src/lib/api/http.ts` - Axios instance
- `src/lib/query/query-client.ts` - React Query setup
- `src/lib/store/auth-store.ts` - Zustand auth state

## Infra

- `docker-compose.yml` - postgres, redis, backend, frontend, nginx
- `apps/backend/Dockerfile` - backend production image
- `apps/frontend/Dockerfile` - frontend production image
- `infra/nginx/nginx.conf` - API/frontend/socket routing
- `docs/deployment.md` - DigitalOcean VPS deployment flow
