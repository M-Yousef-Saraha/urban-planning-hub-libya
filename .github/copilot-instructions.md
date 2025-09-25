# Copilot Instructions — Urban Planning Hub Libya

Frontend-only repo: React 18 + TypeScript SPA served by Vite. Laravel API lives elsewhere; this app speaks to it through relative `/api/*` calls.

## Architecture snapshot
- Entrypoint `src/main.tsx` mounts `<App />`; routing lives in `src/App.tsx` with `BrowserRouter` and `/admin` nested routes inside `pages/admin/*` via `AdminLayout`.
- Global providers: `QueryClientProvider` (TanStack Query), `AuthProvider`, `LanguageProvider`, `TooltipProvider`, and an `ErrorBoundary`. Even though TanStack Query is available, most current pages still fetch manually with the axios helpers.
- Auth flows live in `src/contexts/AuthContext.tsx`, storing tokens in cookies and rehydrating on load. `src/lib/api.ts` centralizes the axios instance, attaches the Bearer token, and force-redirects to `/login` on 401.

## Running & tooling
- Use `npm run dev` for Vite on http://localhost:5000 (see `vite.config.ts`); this server proxies `/api` and `/health` to the Laravel target (`VITE_API_BASE_URL` or `http://localhost:8000`).
- Ship builds with `npm run build`; lint via `npm run lint`. The lint task now includes guardrails that warn if you introduce raw hex/RGB values or Tailwind classes like `bg-blue-500`—stick to the semantic tokens exposed in `src/index.css`, `tailwind.config.ts`, and `src/lib/colorTokens.ts`.
- No automated tests are configured.

## Working with the API layer
- Call the axios helpers in `src/lib/api.ts` (`authAPI`, `documentsAPI`, `requestsAPI`, `adminAPI`, etc.). They already expect Laravel endpoints like `/api/auth/login` and return `response.data`; update backend responses accordingly.
- Normalize backend variability with `src/lib/normalize.ts` before rendering—document pages rely on `normalizeDocuments` and `normalizeCategories` to tolerate different payload shapes.
- When creating new fetch logic, prefer sticking to the shared axios instance (so interceptors fire) and, if you do adopt TanStack Query, wrap results in `useQuery` but reuse the same helper functions.

## UI & state conventions
- UI primitives come from `src/components/ui/*` (shadcn/radix wrappers). Compose pages with layout helpers like `components/layout/PageContainer` and keep new RTL-aware styles in Tailwind (see `tailwind.config.ts` and `src/index.css`).
- Forms rely on React Hook Form (`DocumentRequestModal`, Auth forms) plus shadcn `<FormField>` wrappers; success/error toasts use `sonner` via `toast.*`. Stick to that pattern for new dialogs.
- Document request flow: `DocumentRequestModal` calls `requestsAPI.create` and expects `{ success: boolean }` before closing and emitting `onSuccess`. `DocumentDetailModal` triggers the same modal rather than duplicating logic.

## Internationalization & RTL
- `LanguageProvider` (from `src/contexts/LanguageContext.tsx`) mirrors i18next state, flips `dir` and `lang` attributes, and stores the choice in `localStorage` (`preferred-language`). Use `useLanguage()` or `useTranslation()` instead of ad-hoc locale state, and drop new copy into `src/locales/{ar,en}/*`.
- Keep layouts RTL-first; check existing components for class patterns like `dir="rtl"` wrappers and mirrored flex orders.

## Admin surface
- Admin dashboards sit under `src/pages/admin/` (e.g., `RequestsManagement`, `DocumentsAdmin`, `AnalyticsDashboard`). Each screen expects axios helpers from `adminAPI` and shares global providers, so add new management views inside the `/admin` route tree.

## Reference points
- Start with `src/App.tsx`, `src/contexts`, `src/lib/api.ts`, `src/pages/LibrarySimple.tsx`, and `src/components/DocumentRequestModal.tsx` to understand core flows.
- Tailwind tokens and typography live in `tailwind.config.ts` and `src/index.css`; assets are in `public/`.

Ping if any workflow above is ambiguous so we can document it better.
