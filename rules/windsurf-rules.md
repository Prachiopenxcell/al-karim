# Al Karim Frontend – Windsurf Rules

This document defines project standards so that new modules follow the same patterns automatically.

## General Code Style & Formatting
- **Airbnb + ESLint**: Follow ESLint rules in `.eslintrc.cjs` (TypeScript, unused imports, import order, hook rules).
- **Type Safety**: Avoid `any`. Prefer explicit return types for functions. Use `type` imports.
- **English**: Use English for code and docs. No trailing debug logs.

## Project Structure & Architecture
- **Feature-first**: Each domain lives under `features/<module>/` with `api.ts`, `types.ts`, and `mock-data.ts`.
- **App Router**: Next.js App Router in `app/` for routing. Pages should be Server Components by default.
- **Client Components**: Only when interactivity is required (`'use client'`). Keep them in `components/...`.
- **Shared Core**: Use `lib/` for infra (e.g., `lib/http.ts`), `types/common.ts` for cross-cutting types, and `components/ui/` for primitives.

## Styling & UI
- **Tailwind CSS** for styling.
- **shadcn/ui** for primitives under `components/ui/`.
- Prefer small reusable building blocks in `components/dashboard/` and `components/data/` (e.g., `Chart`, `DataTable`, `HeroBanner`, `BreadcrumbRow`).

## Data & API Access
- **Mock-first**: All features expose a typed service with mock fallback.
  - `features/<module>/api.ts` uses `lib/http.ts` when `NEXT_PUBLIC_API_BASE_URL` is configured; otherwise returns mocks.
  - Provide `configure…Api()` and `setUse…Mock()` in each service for programmatic control.
- **Shared client**: Use `createClient()` and `getJson()` from `lib/http.ts` for real API calls.
- **Types**: Put feature types in `features/<module>/types.ts`. Promote shared types (e.g., `ApiPagination`, `MonthKey`) to `types/common.ts`.

## Naming & Conventions
- **React files**: PascalCase for component files (e.g., `HeroBanner.tsx`).
- **Variables/Functions**: camelCase.
- **Env Vars**: UPPER_SNAKE_CASE. Use `NEXT_PUBLIC_…` only for client-exposed values.
- **Exports**: One default export per file; keep files focused.

## Functions & Logic
- Prefer short, single-purpose functions. Use early returns and extract utils to `lib/utils.ts`.
- Use `map/filter/reduce` for array transforms where clear.
- Use default params instead of null checks where appropriate.

## Forms & Validation (when needed)
- Prefer React Hook Form + Zod in form-heavy modules.

## State Management
- Keep state local or via small contexts; avoid global state unless necessary.

## Testing (optional guidelines)
- Co-locate tests with features: `features/<module>/*.test.ts`.

## How to add a new feature module
1. Create `features/<module>/types.ts`, `mock-data.ts`, `api.ts`.
2. In `api.ts`, auto-config from env like existing modules and export `configure…Api()` + `setUse…Mock()`.
3. Build UI in `components/<module>/…` or reuse generic building blocks.
4. `app/(dashboard)/<route>/page.tsx` should be a Server Component that calls the service and passes data to UI components.

## Linting Rules Summary
- `unused-imports/no-unused-imports` and `unused-imports/no-unused-vars` warn on dead code.
- `@typescript-eslint/explicit-function-return-type` warns to keep functions typed.
- `@typescript-eslint/consistent-type-imports` prefers `import type`.
- `import/order` enforces clean imports and path groups.
- `react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps` ensure hook discipline.
