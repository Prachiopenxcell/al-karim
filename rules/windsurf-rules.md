# Al Karim Frontend – Windsurf Rules

This document defines project standards so that new modules follow the same patterns automatically.

## Summary (read this first)
- One-component-per-page (App Router): each page returns a single feature Screen component.
- One component per file; split files > ~250 LOC into subcomponents/hooks.
- Feature-first placement: shared blocks in `src/components/…`, feature-scoped blocks in `src/features/<module>/components/`.

## Table of Contents
- [General Code Style & Formatting](#general-code-style--formatting)
- [Project Structure & Architecture](#project-structure--architecture)
- [Styling & UI](#styling--ui)
- [Reusable Components & Page Composition](#reusable-components--page-composition)
  - [Dashboard module composition](#dashboard-module-composition)
- [Data & API Access](#data--api-access)
- [Naming & Conventions](#naming--conventions)
  - [Component File Organization](#component-file-organization)
- [Functions & Logic](#functions--logic)
- [Forms & Validation](#forms--validation-when-needed)
- [State Management](#state-management)
- [Testing](#testing-optional-guidelines)
- [How to add a new feature module](#how-to-add-a-new-feature-module)
- [New Module Checklist](#new-module-checklist-avoid-duplication)
- [Linting Rules Summary](#linting-rules-summary)

## Quick Start Checklist (avoid duplication)
- [ ] Page renders only one Screen component from `features/.../components`.
- [ ] Reuse existing shared blocks before creating new ones.
- [ ] Use `@/` alias imports (no deep relatives).
- [ ] If a component > ~250 lines, split into subcomponents/hooks.
- [ ] Put feature-specific UI under `features/<module>/components/`.
 - [ ] If you create a reusable component, add it to this Windsurf Rules document (see "Reusable component registry updates").

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

## Reusable Components & Page Composition
- **Single-entry pages (Windsurf rule)**: Every App Router page should render exactly one component from `features/.../components`. Example:
  - `app/(auth)/login/page.tsx` → `features/auth/components/LoginForm.tsx`
  - `app/(auth)/forgot-password/page.tsx` → `features/auth/components/ForgotPasswordForm.tsx`
  - `app/(auth)/reset-password/page.tsx` → `features/auth/components/ResetPasswordForm.tsx`

Example page (App Router):

```tsx
// app/(dashboard)/dashboard/page.tsx
import Screen from '@/features/dashboard/components/DashboardScreen';
import { getDashboardData } from '@/features/dashboard/api';

export default async function Page() {
  const data = await getDashboardData();
  return (
    <Screen
      stats={data.stats}
      enrollment={data.enrollment}
      collections={data.collections}
      activity={data.activity}
      departments={data.departments}
    />
  );
}
```

#### Reusable component registry updates
- When you create a component that will be reused across pages or modules:
  - Add it to this document under the appropriate area:
    - Shared components under `components/<area>/` (e.g., dashboard, data, layout)
    - Feature-scoped components under `features/<module>/components/`
  - Document: name, path, what it does, and one-line usage example.
  - Prefer enhancing existing components over introducing near-duplicates.

Example screen (compose UI only, no fetching):

```tsx
// src/features/dashboard/components/DashboardScreen.tsx
import BreadcrumbRow from '@/components/dashboard/BreadcrumbRow';

export default function DashboardScreen(props: { stats: any[]; activity: any[]; /* ... */ }) {
  return (
    <div className="space-y-6">
      <BreadcrumbRow items={[{ label: 'Dashboard' }]} />
      {/* compose other blocks here */}
    </div>
  );
}
```

- **Auth reusable set (use, don’t duplicate)**:
  - `features/auth/components/AuthHeader.tsx`
  - `features/auth/components/AuthCard.tsx`
  - `features/auth/components/PasswordInput.tsx`
  - `features/auth/components/AuthFooter.tsx`
  - When adding new auth pages (e.g., Register, Verify Email, MFA), reuse the above. Pages must only contain one line that imports and returns the relevant `...Form` component.

- **Directory conventions**:
  - Reusable, cross-page components live in `src/components/<area>/` (layout, dashboard, data, leads, etc.).
  - Feature-specific components live in `src/features/<module>/components/`.
  - UI primitives remain in `src/components/ui/`.

- **DO**
  - Extract shared blocks into reusable components when used ≥ 2 pages.
  - Keep components focused; one default export per file.
  - Keep props typed; prefer `React.ComponentProps<typeof X>` when wrapping UI primitives.

- **DON'T**
  - Duplicate existing components with minor style tweaks—extend via props or className.
  - Add UI logic inside `app/` pages; put it in `features/.../components`.

- **Naming**
  - Forms: `SomethingForm.tsx`
  - Shared blocks: `ThingCard.tsx`, `ThingHeader.tsx`, `ThingFooter.tsx`
  - Icons/Logos use `next/image` from `public/` assets.

### Dashboard module composition
- **Single-entry pages**: Each dashboard route page renders exactly one screen component from `features/dashboard/components/`.
  - Example: `app/(dashboard)/dashboard/page.tsx` → `features/dashboard/components/DashboardScreen.tsx`
- **Compose from reusable building blocks** under `src/components/dashboard/` and feature-scoped blocks under `src/features/dashboard/components/`:
  - Generic/shared: `BreadcrumbRow`, `HeroBanner`, `StatCard`, `Chart`
  - Dashboard-scoped: `RecentActivityItem`, `DepartmentProgressRow`, `RechartsBlocks`
- **Data flow**:
  - Pages fetch data on the server via `features/dashboard/api.ts` and pass props to `DashboardScreen`.
  - `DashboardScreen` composes the UI only; it must not fetch.
- **Naming**:
  - Screens end with `Screen` (e.g., `DashboardScreen.tsx`).
  - Feature-only components live in `features/dashboard/components/`.

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
 - **Alias imports**: Always import using `@/` (configured in `tsconfig.json` to map `src/`). Avoid deep relative paths.

### Component File Organization
- **One component per file**: Do not place multiple unrelated components in the same file. Each component gets its own file.
- **Split large components**: If a component exceeds ~250 lines, extract logical parts into small subcomponents (e.g., `Section`, `Footer`, `Toolbar`) or hooks.
- **Colocate subcomponents**: If subcomponents are only used by a parent, place them in a sibling folder (e.g., `FeatureCard/`) with an `index.ts` barrel if needed.
- **Props first**: Keep props interfaces/types at the top of the file; avoid anonymous prop shapes scattered throughout.

## Functions & Logic
- Prefer short, single-purpose functions. Use early returns and extract utils to `lib/utils.ts`.
- Use `map/filter/reduce` for array transforms where clear.
 - Extract stateful bits into small hooks when a component grows too large (e.g., `useThingController`).
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

## New Module Checklist (avoid duplication)
- [ ] Does the page render only one feature component? (Windsurf rule)
- [ ] Can you reuse existing shared/feature blocks instead of duplicating?
- [ ] Are you importing via `@/` alias?
- [ ] Do you need to promote a repeated block to `src/components/<area>/`?
- [ ] Do types live under `features/<module>/types.ts`?

## Linting Rules Summary
- `unused-imports/no-unused-imports` and `unused-imports/no-unused-vars` warn on dead code.
- `@typescript-eslint/explicit-function-return-type` warns to keep functions typed.
- `@typescript-eslint/consistent-type-imports` prefers `import type`.
- `import/order` enforces clean imports and path groups.
- `react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps` ensure hook discipline.
