# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js version warning

This project pins `next@16.2.9`, `react@19.2.4` — versions ahead of your training data. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any code that touches App Router conventions, data fetching, or config.** APIs and file structure may differ from what you expect. Heed any deprecation notices you encounter.

## Commands

Package manager is pnpm (`pnpm-lock.yaml` + `pnpm-workspace.yaml` present; a stray `package-lock.json` also exists but pnpm is authoritative).

```bash
pnpm dev      # start dev server (Turbopack via `next dev`)
pnpm build    # production build
pnpm start    # run production build
pnpm lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test suite and no `typecheck` script configured — use `pnpm tsc --noEmit` if you need to verify types (tsconfig has `noEmit: true`, `strict: true`).

## Architecture

This is a **single-page mobile app shell** simulating a phone screen inside the browser (a fixed `390x676` rounded card centered on the page — see `components/home-shell.tsx`). It's a UI prototype for a telco/ISP customer app ("TUKO LIVE!" / repo name `tel-z`); there is no backend, API layer, auth, or persisted state — everything is local React state.

Navigation model: instead of Next.js routing, the whole app is one route (`app/page.tsx` → `HomeShell`) that swaps content via a `selectedAction` string held in `HomeShell`'s state:

- `HomeShell` (`components/home-shell.tsx`) owns `selectedAction` (default `"Dashboard"`) and renders the phone-frame chrome plus a floating chat-bot button.
- `BodyWrapper` passes `selectedAction`/`onSelect`/`onBack` down to `ActionTab`.
- `ActionTab` (`components/action-tab.tsx`) is the core router: its `ActionBody` function is a `switch` on the label string (`"Dashboard" | "Data" | "Reports" | "Settings" | "Plans"`) that renders the corresponding screen. Add new screens here.
- `ActionsWrapper` / `Action` render the bottom icon nav (Dashboard/Data/Reports/Settings via `lucide-react` icons) and call `onSelect(label)` to change screens.
- Screen-specific UI currently lives as functions/components *inside* `action-tab.tsx` (`DashboardPlaceholder`, `PlansTab`, `PlanModal`, `PlanButton`, `BackButton`) rather than separate files — follow this pattern for small additions, but consider splitting the file out if it keeps growing.
- `CustomBtn` is a generic image-backed button (`next/image` with `layout="fill"`) used for the dashboard's tappable image tiles.
- `TopNav` exists but is not currently wired into `HomeShell`/`BodyWrapper`.

All screen imagery is served from `public/assets/**` (dashboard tiles, plan logos, bot icon, avatars) and referenced by hardcoded string paths — check `public/assets/` for available images before adding new `<Image>`/background-image references.

Styling is Tailwind v4 (via `@tailwindcss/postcss`, `@import "tailwindcss"` in `app/globals.css`) mixed with a fair amount of inline `style={{ background: ... }}` for gradients/background-images — match the existing pattern in `action-tab.tsx` rather than moving everything to Tailwind utility classes.

Path alias `@/*` maps to the project root (see `tsconfig.json`), e.g. `@/components/home-shell`.
