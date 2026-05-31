# Mini SaaS Dashboard

A lightweight internal tool / micro-SaaS admin panel built with Next.js (App Router) to demonstrate core framework concepts: server/client component separation, Server Actions, dynamic routing, and full CRUD with database persistence.

## Tech Stack

- Next.js 16 (App Router, Server Components, Server Actions)
- TypeScript (strict mode)
- Prisma 7 (ORM + migrations)
- PostgreSQL 16
- Tailwind CSS 4
- Docker Compose
- Vitest + React Testing Library

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 20+
- pnpm (`corepack enable && corepack prepare pnpm@latest --activate`)

### Setup

```bash
git clone <repo-url>
cd saas-dashboard
pnpm install
pnpm approve-builds       # approve native build scripts (Prisma, esbuild, sharp)
```

### Run (development)

```bash
docker compose up db -d   # start Postgres
pnpm prisma migrate dev   # apply migrations
pnpm prisma db seed       # seed sample data
pnpm dev                  # start Next.js dev server
```

App available at `http://localhost:3000`.

### Run (full stack via Docker)

```bash
docker compose up --build
```

### Testing

```bash
pnpm test                 # run all tests once
pnpm test:watch           # watch mode
pnpm test <pattern>       # run tests matching a filename pattern
```

### Linting

```bash
pnpm lint                 # ESLint
pnpm exec tsc --noEmit    # type check
```

## Project Structure

```
src/
  app/                        # Routes (thin orchestrators)
    page.tsx                   # Dashboard
    items/[id]/page.tsx        # Item detail
    error.tsx                  # Error boundary
    not-found.tsx              # 404 page
  features/
    items/
      components/              # Feature-specific UI components
      services/                # Data access layer
      models/                  # Types and interfaces
  lib/                         # Shared infrastructure (DB client, config, errors)
  test/                        # Test setup
prisma/
  schema.prisma                # Database schema
  migrations/                  # Version-controlled SQL
  seed.ts                      # Sample data
docker-compose.yml
Dockerfile
.github/workflows/ci.yml      # Lint, test, build pipeline
```

## Key Concepts Demonstrated

- Server Components for data fetching and rendering
- Client Components only where interactivity is required
- Server Actions for create/update/delete mutations
- Dynamic routes with `[id]` segments
- Prisma for typed database access with driver adapters
- Centralised config with startup validation
- Domain error classes with error boundaries
- CSS Modules with Tailwind for scoped, maintainable styling
- Pre-commit hooks (Husky + lint-staged)
- CI pipeline (GitHub Actions)
