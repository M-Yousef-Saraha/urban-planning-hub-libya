# Copilot Instructions — Urban Planning Hub Libya

This repo is a full-stack app with a React (Vite + TS) SPA at the root and an Express + Prisma API in `Backend/`. Use these conventions and entry points to be productive fast.

## Big picture
- Frontend (SPA): `src/` with React 18 + TypeScript, Tailwind, shadcn/ui, React Router, TanStack Query.
  - App entry: `src/main.tsx`; Root app and routing: `src/App.tsx`.
  - Path alias: `@` -> `./src` (see `vite.config.ts`). Prefer absolute imports like `@/components/...`.
  - Notifications: `@/components/ui/toaster` and `@/components/ui/sonner` mounted in `App.tsx`.
  - Routing: `BrowserRouter` with nested admin routes under `/admin` using `pages/admin/*` and `AdminLayout`.
- Backend API: `Backend/src` with Express + TypeScript, Prisma (PostgreSQL), SendGrid, Multer, Winston logging.
  - App entry: `Backend/src/index.ts`. Config/required envs: `Backend/src/config.ts`.
  - Routes are modular in `Backend/src/routes/*` wired in `index.ts`; handlers live in `Backend/src/controllers/*`.
  - Static files served from `/uploads`; secure download endpoint: `GET /api/download/:token` (see `downloadController`).

## How components talk
- Dev proxy: the SPA proxies `/api` to the API (Vite server on 5000 -> API on 3001). See `vite.config.ts`.
  - In the frontend, call relative paths like `/api/documents` or `/api/requests` (don’t hardcode hosts).
  - Data fetching uses TanStack Query via the `QueryClientProvider` in `App.tsx`.

## Run it locally (pwsh)
- Frontend (root): `npm run dev` (Vite on http://localhost:5000; proxy active).
- Backend (`Backend/`): set `.env` (see below), then:
  - `npm run prisma:generate` and `npm run prisma:migrate`
  - `npm run dev` (Express on http://localhost:3001; health: `/health`).

## Environment variables (Backend)
- Required: `DATABASE_URL`, `JWT_SECRET`. Optional: `SENDGRID_API_KEY`, `FROM_EMAIL`, `ADMIN_EMAIL`, `PORT`.
- Enforced via `Backend/src/config.ts` (throws if required vars missing).

## Common extension tasks
- Add a frontend page/route:
  1) Create `src/pages/MyPage.tsx`.
  2) Register in `src/App.tsx` within `<Routes>`; for admin, nest under `<Route path="/admin" element={<AdminLayout />}>`.
- Add an API endpoint:
  1) Create controller in `Backend/src/controllers/myController.ts`.
  2) Create router in `Backend/src/routes/myFeature.ts` and export an Express Router.
  3) Wire it in `Backend/src/index.ts` with a base path: `app.use('/api/my-feature', myFeatureRoutes)`.
- Handle file uploads: use Multer in documents-related routes; files are stored under `Backend/uploads/` and served via `/uploads`.

## Patterns and conventions
- Frontend
  - Use `@` alias imports. Keep API calls relative to `/api` to leverage the proxy.
  - Use TanStack Query for server state; keep toast notifications consistent with existing Toaster/Sonner usage.
  - Tailwind tokens are extended in `tailwind.config.ts`; content globs include `./src/**/*.{ts,tsx}`.
- Backend
  - Use route/controller/service separation (`routes/*` -> `controllers/*` -> `services/*`).
  - Centralized middleware: `errorHandler`, `notFound` (registered in `index.ts`).
  - Logging via Winston (`utils/logger`), rate limiting via `express-rate-limit`, security via `helmet`, CORS enabled.

## Key references
- Frontend: `src/App.tsx`, `vite.config.ts`, `tailwind.config.ts`, `src/components/*`, `src/pages/*`.
- Backend: `Backend/src/index.ts`, `Backend/src/routes/*`, `Backend/src/controllers/*`, `Backend/prisma/schema.prisma`.

If anything above is unclear or you need extra conventions documented (e.g., auth guards on admin routes or API validation patterns), ask to expand this file and I’ll refine it.
