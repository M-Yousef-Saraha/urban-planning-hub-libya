# Copilot Instructions — Urban Planning Hub Libya

This repo is now frontend-only: a React (Vite + TS) SPA at the root. The backend will be a separate Laravel API. Use these conventions and entry points to be productive fast.

## Big picture
- Frontend (SPA): `src/` with React 18 + TypeScript, Tailwind, shadcn/ui, React Router, TanStack Query.
  - App entry: `src/main.tsx`; Root app and routing: `src/App.tsx`.
  - Path alias: `@` -> `./src` (see `vite.config.ts`). Prefer absolute imports like `@/components/...`.
  - Notifications: `@/components/ui/toaster` and `@/components/ui/sonner` mounted in `App.tsx`.
  - Routing: `BrowserRouter` with nested admin routes under `/admin` using `pages/admin/*` and `AdminLayout`.
- Backend API: external Laravel app (developed in a separate repo). Expose matching REST endpoints under `/api/*` and enable CORS for `http://localhost:5000` during dev.

## How components talk
- Dev proxy: the SPA proxies `/api` to the API (Vite server on 5000 -> Laravel on 8000 by default). See `vite.config.ts`.
  - In the frontend, call relative paths like `/api/documents` or `/api/requests` (don’t hardcode hosts).
  - Data fetching uses TanStack Query via the `QueryClientProvider` in `App.tsx`.

## Run it locally (pwsh)
- Frontend (root): `npm run dev` (Vite on http://localhost:5000; proxy active).
- Backend: run Laravel separately (e.g., `php artisan serve` on http://localhost:8000). Configure `VITE_API_BASE_URL` if not using default.

## Environment variables (Backend)
- Managed in the separate Laravel project (.env). Typical keys: `APP_URL`, `APP_KEY`, `DB_*`, `SANCTUM_STATEFUL_DOMAINS`, `SESSION_DOMAIN`, `MAIL_*`.

## Common extension tasks
- Add a frontend page/route:
  1) Create `src/pages/MyPage.tsx`.
  2) Register in `src/App.tsx` within `<Routes>`; for admin, nest under `<Route path="/admin" element={<AdminLayout />}>`.
- Add a backend API endpoint (in Laravel repo):
  1) Create a controller and route in the Laravel API to match `/api/...` from this SPA.
  2) Ensure CORS allows `http://localhost:5000` during development.
  3) If uploading files, use Laravel's storage and serve via a route or storage symlink.

## Patterns and conventions
- Frontend
  - Use `@` alias imports. Keep API calls relative to `/api` to leverage the proxy.
  - Use TanStack Query for server state; keep toast notifications consistent with existing Toaster/Sonner usage.
  - Tailwind tokens are extended in `tailwind.config.ts`; content globs include `./src/**/*.{ts,tsx}`.
- Backend
  - Laravel app maintained separately. Ensure endpoints mirror the frontend expectations and that CORS is configured for dev.

## Key references
- Frontend: `src/App.tsx`, `vite.config.ts`, `tailwind.config.ts`, `src/components/*`, `src/pages/*`.
- Backend: separate Laravel project repo.

If anything above is unclear or you need extra conventions documented (e.g., auth guards on admin routes or API validation patterns), ask to expand this file and I’ll refine it.
