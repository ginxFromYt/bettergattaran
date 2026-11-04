# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Better Gattaran is an independent, volunteer-led civic information portal for Gattaran, Cagayan, forked from BetterLocalGov. It is **not** the official municipal website. The guiding rule: never publish a municipal fact without a recorded public source. Leave a section empty rather than infer officials, contacts, fees, schedules or procedures from snippets, directories, other localities or undated posts. See `README.md`, `docs/content-verification.md` and `docs/sources.md`.

## Commands

```bash
npm run dev            # Dev server (localhost:5173); drafts are visible here
npm run build          # tsc + vite build + prerender + dist leak check
npm test               # Vitest (run once); npm run test:watch to watch
npm run lint           # ESLint; npm run lint:fix to auto-fix
npm run format         # Prettier write; npm run format:check to check
npm run content:audit  # Validate content/ records and governance metadata
npm run check:leaks    # Re-run the dist/ draft leak check on its own
npm run index-content  # Index public content into Meilisearch
```

CI (`.github/workflows/content.yml`) runs `content:audit`, `test`, `lint` and `build` on every PR. Run all four before committing content or code changes. Scheduled jobs check source links weekly and reverification monthly, opening GitHub issues.

Pre-commit hook runs `lint-staged` (ESLint + Prettier on staged files).

## Architecture

Static React 19 + TypeScript + Vite + Tailwind 4 app using `react-router` v8, i18next, `react-helmet-async` and `nuqs`. No backend, database or login: maintainers govern content through reviewed repository changes, with `governance/` and Git history as the audit trail.

### Routing

`src/App.tsx` (pages are lazy-loaded from `src/pages/`):

- `/` Home, `/about`, `/hotlines`, `/foi-requests`, `/whats-new`, `/report-incorrect-information`
- `/services`, `/services/:category`, `/services/:category/:documentSlug`
- `/government`, `/government/:category`, `/government/:category/:documentSlug`
- `/government/projects`: national-agency projects table (declared before `/government/:category`)
- `/search`: only when Meilisearch is configured (`isMeilisearchEnabled`)
- `/:lang/:documentSlug`, `/:documentSlug`: legacy document routes

### Content system

Content lives in `content/`. Two Markdown document trees share one loader:

1. **Top-level categories:** `src/data/services.yaml` and `src/data/government.yaml` (name, slug, icon, description; `icon` must be a valid Lucide icon name).
2. **Category index:** `content/{services|government}/{category}/index.yaml`, a `pages:` array. Each entry needs `name`, `slug`, `description`, `publicationStatus` and `verificationStatus`, or it is not listed.
3. **Page:** `content/{services|government}/{category}/{slug}.md` plus a companion `{slug}.json` holding governance metadata (below) and optional `{PLACEHOLDER}` values.

When adding a category: add it to the top-level YAML, create its `index.yaml`, and add the static `?raw` import and entry to the single `categoryIndexMap` in `src/data/yamlLoader.ts` (services and government share it). Some government categories in `government.yaml` intentionally have no index yet.

`src/lib/markdownLoader.ts` loads Markdown and companion JSON via dynamic `import()`. It takes the title from the first `# Heading` and the description from the first paragraph. `interpolate()` replaces `{PLACEHOLDER}` tokens: JSON value, then `VITE_<KEY>` env var, otherwise left unchanged.

Structured record collections (JSON, one file per record):

- `content/hotlines/`: emergency contacts (`src/lib/hotlines.ts`, static imports)
- `content/projects/`: national-agency projects in Gattaran (`src/lib/projects.ts`, `import.meta.glob`)
- `content/requests/`: filed FOI/information requests (`src/lib/foiRequests.ts`)
- `content/request-drafts/`: unfiled request drafts. Deliberately outside every import pattern so they never reach the bundle. Filing steps are in `docs/phase-4-handoff.md` §5.

### Content governance

Every companion/record JSON carries:

- `publicationStatus`: `draft` | `published` | `archived` (missing means draft)
- `scope`: `local` | `national_applicable`. National records must cite a `national_government` or `official_government_publication` source and show a fixed notice.
- `provenance`: `verificationStatus` (`awaiting_verification` | `sourced` | `verified` | `outdated`), `lastUpdatedAt`, `lastVerifiedAt`, `asOf`, and `sources[]` (`title`, `organization`, `url`, `type`, optional `publishedAt`, `asOf`, `locator`)
- `containsFigures: true` requires a `locator` on every source. Project records must set it and use `local` scope.

Rules:

- A record is public only if published, has provenance, and is `verified`, `outdated` or (when `VITE_ALLOW_SOURCED_CONTENT` is not `false`) `sourced`.
- **The one visibility policy is `scripts/lib/visibility.mjs`** (typed in `visibility.d.mts`, re-exported by `src/lib/contentGovernance.ts`). The app, the build plugin, the prerenderer, the leak check, the search indexer and the audit all use it. Never duplicate these rules.
- Only a human maintainer checking the source in a browser may promote `sourced` to `verified`. An agent sets `sourced` at most.
- Every content change also updates `governance/content-register.json` and `governance/revisions.json`.
- The repository is public: no unverified personal information, secrets or reporter details in content or governance files.

### Build pipeline

- `scripts/lib/content-visibility-plugin.mjs` (Vite plugin, build only) replaces non-public Markdown/JSON with empty stubs and strips non-public `index.yaml` entries.
- `scripts/prerender.mjs` renders every public route from `src/prerender/publicRoutes.ts` to `dist/**/index.html` with per-page SEO, plus `sitemap.xml`, `robots.txt` and `whats-new.json`.
- `scripts/check-dist-leaks.mjs` fails the build if draft text appears in `dist/`.
- Deployment config (`vercel.json`, `public/.htaccess`, `terraform/`) is not to be changed without asking. See `docs/spa-deployment.md`.

### Internationalization

- i18next with `HttpBackend` loads `public/locales/{lang}/common.json`. Detection order: `localStorage`, `navigator`, `htmlTag`. Fallback `en`.
- Selectable languages are in `LANGUAGES` in `src/i18n/languages.ts`. Currently only `en`.
- `fil`, `ilo` and `ibg` are in `PLANNED_LANGUAGES`: scaffolded but disabled until a fluent human speaker approves the strings. Do not enable them or machine-translate. See `docs/languages.md`.

### Environment variables

See `env.example`; copy it to `.env.local`. Key groups: site and government identity (`VITE_SITE_NAME`, `VITE_GOVERNMENT_NAME`, ...), `VITE_WEBSITE_URL` (canonical origin, default `https://bettergattaran.org`), content governance (`VITE_ALLOW_SOURCED_CONTENT`, `VITE_CORRECTION_*`, `VITE_CONTENT_REVERIFY_MONTHS`, read in `src/config/contentGovernance.ts`), and `VITE_WEATHER_API_BASE_URL`. The weather card falls back to Open-Meteo and always links to PAGASA.

### UI components

- Primitives in `src/components/ui/`: `Section`, `Heading`, `Text`, `Breadcrumbs`, `ScrollToTop`, `ThemeSelector`. Use them instead of raw HTML elements.
- Content components in `src/components/content/`: `ContentProvenance`, `VerificationBadge`, `NationalScopeNotice`, `ProjectsTable` and others.

### Tests

Vitest + Testing Library (jsdom). Tests sit next to their source (`*.test.ts(x)` in `src/` and `scripts/`). Add or update tests for any change to governance, visibility or prerender logic.

### Code style

- Single quotes, 2-space indentation, trailing commas (ES5), semicolons, 80-char line width (enforced by Prettier)
- Arrow functions omit parens for single arguments
