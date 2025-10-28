# Shopper YAS API

This server exposes RESTful product and analytics endpoints backed by a SQLite database. Inventory data is stored with stock, sold, and cost metrics so that both catalog and operational queries are supported.

## Environment variables

Environment variables can be managed from the repository root. Copy `.env.example` to `.env` and the server will load it automatically, even when commands are executed from the workspace directory.

Create or update the following variables:

| Name | Description |
| --- | --- |
| `DATABASE_URL` | SQLite connection string. Defaults to `file:./dev.db`. |
| `PRISMA_CLIENT_ENGINE_TYPE` | Optional. Set to `wasm` if you want to run Prisma CLI commands without downloading native engines. |

## Database workflow

```bash
npm install
npm run db:migrate   # applies prisma/migrations/* SQL files to the DATABASE_URL database
npm run db:seed      # runs migrations (if needed) and loads src/data/products.json
```

The migration SQL lives in `prisma/migrations/`. A helper in `scripts/migrate.ts` applies them using `better-sqlite3` so that the schema can be bootstrapped even in environments without access to Prisma binaries.

## Development

```bash
npm run dev
```

The API is served from `http://localhost:4000` and exposes the following notable routes:

- `GET /api/products` — list products with optional filters.
- `POST /api/products` — create products (requires stock/sold/cost payload).
- `PATCH /api/products/:id` — update product fields or tags.
- `DELETE /api/products/:id` — remove a product.
- `GET /api/products/analytics/summary` — aggregate inventory totals.
- `GET /api/products/analytics/categories` — totals grouped by category.

## Testing

The Vitest suite provisions an isolated SQLite database (`file:./test.db`) and covers both service helpers and HTTP endpoints:

```bash
npm test
```

`npm test` runs the suite in-band so migrations and seeds stay deterministic.
