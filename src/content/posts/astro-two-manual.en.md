---
locale: en
slugBase: astro-two-manual
title: "Astro Two Playbook: Build, Localize, Deploy"
description: "Everything you need to run the Astro Two starter: project structure, i18n workflow, content authoring, API/email setup, and deployment checklist."
date: 2025-11-05
tags: [astro, guide, handbook]
summary: "Walk through Astro Two from local development to multilingual expansion, Pagefind search, contact API, and production deployment so you can adapt the project to your own site."
cover:
  src: "./media/hero-code.svg"
  alt: "Astro Two project architecture overview"
related: ["astro-i18n-demo", "astro-keywords"]
---

# Astro Two Usage Guide

## Overview
- Repository: [Astro_Two project](https://github.com/zhouzhiouhub/Astro_Two)
- Stack: Astro 4, Tailwind CSS, Pagefind, astro-i18n, Zod, Nodemailer
- Locales: Simplified Chinese (`zh`) and English (`en`); middleware negotiates the preferred locale via `Accept-Language`
- Structure highlights: core routes in `src/pages/[lang]`, content collections in `src/content`, shared data modules in `src/data`

## Prerequisites
- Node.js ≥ 18.14 (20 LTS recommended)
- npm ≥ 9 (swap to pnpm/yarn commands if desired)
- SMTP app password for 163 Mail (used by the contact form; see `doc/email.md`)

## Quick Start
1. Clone and enter the project:
   ```bash
   git clone https://github.com/zhouzhiouhub/Astro_Two.git
   cd Astro_Two
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start local dev server: run `npm run dev` and open `http://localhost:4321`
4. Preview the production build:
   ```bash
   npm run build
   npm run preview
   ```

## npm Scripts
- `npm run dev`: start the Astro dev server with live reload
- `npm run build`: generate the static site and run `pagefind` to build search indexes
- `npm run preview`: serve the production output locally
- `npm run check`: execute Astro diagnostics (content schema, links, TypeScript)

## Directory Cheat Sheet
| Path | Purpose |
| --- | --- |
| `src/pages/[lang]` | Locale-aware pages (manual routing handled by middleware) |
| `src/components` | Reusable UI components (presentation only) |
| `src/layouts` | Layout shells sharing SEO, theming, and scaffolding |
| `src/lib/i18n` | Dictionaries, locale helpers, and typed namespaces |
| `src/content` | Astro Content collections (`posts`, `faq`) |
| `src/data` | Structured data powering sections such as About, Projects |
| `src/pages/api` | Server endpoints (contact form, SMTP verification) |
| `public` | Static assets (icons, OG images, RSS, robots) |
| `doc` | Additional documentation (this manual, email setup)

## Internationalization Workflow
- `astro.config.mjs` enables manual routing; `src/middleware.ts` redirects or injects locale prefixes
- `src/lib/i18n/index.ts` exposes `SUPPORTED_LOCALES`, `defaultLocale`, and helpers like `t()` and `pathWithLocale()`
- Namespaces are declared in `src/lib/i18n/schema.ts`; every locale file must export the same set of keys
- `LocaleSwitcher.astro` keeps the current route while toggling locales

### Add a New Locale
1. Extend enums in `src/lib/i18n/schema.ts` and `src/content/config.ts`
2. Create `src/lib/i18n/<locale>.ts` mirroring the existing dictionaries
3. Update `src/lib/i18n/index.ts` to import the new dictionary, push the locale into `SUPPORTED_LOCALES`, and register the entry in `dict`
4. Duplicate or adapt data modules in `src/data` for the new locale
5. Provide translated markdown files in `src/content/posts` and `src/content/faq`
6. Ensure each page within `src/pages/[lang]` renders without missing translation keys
7. Run `npm run dev` and browse the site to validate navigation, metadata, and sitemaps

## Create a New Page
1. Add an `.astro` file under `src/pages/[lang]` (e.g., `case-studies.astro`)
2. Export `getStaticPaths()` returning `SUPPORTED_LOCALES`
3. Validate `Astro.params.lang` with `isLocale` and resolve strings through `t()`
4. Compose UI with shared layout, header, footer to keep logic decoupled from presentation
5. Add translation keys to each locale file before publishing

## Content Authoring
- **Blog posts** live in `src/content/posts`; file naming convention `slug.locale.md`
  - Example frontmatter:
    ```markdown
    ---
    locale: en
    slugBase: astro-i18n-demo
    title: "Astro i18n quickstart"
    description: "..."
    date: 2025-01-10
    tags: ["astro", "i18n"]
    summary: "40-600 character abstract"
    cover:
      src: "/og/blog-astro-i18n.svg"
      alt: "..."
    related: ["astro-keywords"]
    ---
    Markdown body...
    ```
- **FAQ entries** reside in `src/content/faq` with `locale`, `question`, `order`
- **Structured sections** leverage TypeScript modules like `src/data/home.ts`

## Styling Guidelines
- Tailwind CSS is configured in `tailwind.config.cjs`; global utilities live in `src/styles/tailwind.css`
- Keep cohesion high: share design tokens globally, but scope component-specific tweaks locally
- Maintain separation between UI and business logic for easier maintenance

## Search (Pagefind)
- `npm run build` triggers `pagefind --site dist --output-subdir pagefind`
- When customising the pipeline, ensure `dist/pagefind` ships with your static assets
- `SearchModal.astro` loads Pagefind UI; verify corresponding scripts and CSS remain reachable post-deploy

## API & Mail Delivery
- Endpoints:
  - `POST /api/contact`: validates form data via Zod and sends email through Nodemailer
  - `GET /api/mail-verify`: checks SMTP credentials for health monitoring
- Environment variables are documented in `doc/email.md`
- `src/lib/mailer.ts` targets 163 SMTP (port 465) by default; tweak host/port to match your provider
- `src/lib/authExpiryNotifier.ts` schedules reminder emails before the SMTP token expires (requires a persistent Node runtime)
- Static-only hosting (no server runtime) should offload the API to serverless functions or disable the form

## Deployment Checklist
1. Run `npm run build`
2. Confirm `dist/` contains HTML pages, `pagefind` assets, `rss.xml`, and sitemaps
3. Choose runtime:
   - **Astro Node adapter** for self-hosted or long-lived Node services
   - **Vercel / Netlify** with their official adapters and environment variables configured through the dashboard
   - **Static hosting** only if the contact API is replaced or removed
4. Configure CDN/cache: cache static assets aggressively, leave APIs un-cached or set appropriate TTLs

## SEO & Feeds
- Shared meta defaults are defined in `src/lib/seo.ts`
- `@astrojs/sitemap` outputs sitemap index files automatically
- OG assets live under `public/og`
- The blog feed is served from `public/rss.xml`

## Quality & Maintenance
- `npm run check` catches schema, link, and type issues early
- Include `npm run build` in CI to surface warnings before deployment
- Optional: add Playwright/Cypress smoke tests for home, blog, and contact flows
- Keep translation dictionaries aligned with `schema.ts` to avoid runtime gaps

## Troubleshooting
- **Missing locale redirect**: ensure your hosting platform executes Astro middleware (Node/Edge runtime)
- **Search returning zero results**: verify `pagefind` ran and assets are deployed
- **Mail failures**: inspect responses from `/api/contact` or call `/api/mail-verify` to diagnose auth/connection errors


