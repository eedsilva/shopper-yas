# 🛍️ Shopper YAS — Modern E-commerce Platform

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-0ea5e9?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Status](https://img.shields.io/badge/Stage-MVP%20Ready-8b5cf6)

Brazilian-inspired e-commerce experience for beauty, skincare, and fashion products. Shopper YAS ships with a polished storefront, simulated Pix checkout, and a lightweight admin dashboard so you can manage inventory and orders from day one.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)

## Features
### Public Experience
- **Home page hero & featured categories**: Moda, Skincare, Maquiagem, Perfumes, and Roupas highlighted for quick discovery.
- **Product catalog**: filter by category, sort by price, and browse a responsive grid with large imagery.
- **Product detail drawer**: rich description, price formatting for BRL, and one-click “Adicionar ao carrinho.”
- **Cart & checkout**: quantity controls, subtotal calculation, and delivery options for Correios, Motorista Parceiro, or in-store pickup.
- **Pix simulation**: confirm purchases with a mock Pix payment flow and order success page.

### Admin Experience
- **Dashboard overview**: switch between Products and Orders to manage the store at a glance.
- **Inventory management**: update stock levels in real time and add new products with price, stock, and imagery.
- **Order management**: review customers, totals, delivery method, and fulfillment status.

## Tech Stack
| Layer | Technology | Notes |
| --- | --- | --- |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS | SPA storefront with contexts for cart state, localization in `en`, `pt-BR`, and `es`. |
| Backend | Node.js, Express 5, TypeScript | REST API serving catalog data with CORS-enabled endpoints. |
| Tooling | Vitest, Testing Library, Nodemon | Unit/UI testing on the client, hot reload for the API. |

## Architecture Overview
```
shopper-yas/
├── client/              # Vite + React storefront
│   ├── src/
│   │   ├── api/         # Fetchers that talk to the Express service
│   │   ├── components/  # Hero, product grid, cart drawer, admin widgets
│   │   ├── contexts/    # Cart state, localization helpers, checkout utilities
│   │   ├── hooks/       # Reusable logic (cart, currency, filters)
│   │   ├── i18n/        # Locale dictionaries (en, pt-BR, es)
│   │   ├── styles/      # Tailwind layer composition
│   │   └── types/       # Shared frontend types
│   └── ...
└── server/              # Express API service
    ├── src/
    │   ├── data/        # Seed products tailored for Brazilian market
    │   ├── routes/      # /api/products endpoints
    │   ├── services/    # Catalog fetching helpers
    │   └── types/       # Shared TypeScript types
    └── ...
```

## Getting Started
### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
git clone https://github.com/<your-org>/shopper-yas.git
cd shopper-yas
npm install --prefix client
npm install --prefix server
```

### Environment Variables
The API reads `PORT` from the environment. Create a `.env` file under `server/` if you want to override the default port (4000).

```
PORT=4000
```

### Running the apps
```bash
# Start the API (default http://localhost:4000)
npm run dev --prefix server

# In a new terminal: start the Vite dev server (default http://localhost:5173)
npm run dev --prefix client
```

Open the Admin tab from the storefront to manage products and orders.

## Available Scripts
| Location | Script | Description |
| --- | --- | --- |
| `client` | `npm run dev` | Launches Vite dev server with hot module reload. |
| `client` | `npm run build` | Builds the React app for production. |
| `client` | `npm run preview` | Serves the built app locally. |
| `client` | `npm run test` | Runs Vitest + Testing Library suite. |
| `server` | `npm run dev` | Runs Express API with Nodemon + ts-node. |

## API Reference
| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Health check (`Shopper YAS API is running 🚀`). |
| `GET` | `/api/products` | Fetch all catalog products. |
| `GET` | `/api/products/:id` | Fetch a single product by numeric `id`. |

## Roadmap
1. **Auth & Security** — JWT login for admins and shoppers.
2. **Image Upload** — Integrate Cloudinary/Supabase for media storage.
3. **Real Pix Payments** — MercadoPago or Stripe Pix integration.
4. **UI/UX Polish** — Responsive layouts, skeleton states, SEO.
5. **Deployment** — Vercel (frontend), Render (backend), Supabase (DB).
6. **Analytics** — Sales reports, stock alerts, dashboards.
7. **AI Enhancements** — Product recommendations and auto-descriptions.
8. **Testing & Docs** — Expand coverage with Jest, Playwright, and Swagger.

---

Want to contribute? Open an issue or drop a PR with your ideas—let’s make Shopper YAS the go-to beauty and fashion marketplace for Brazil.
