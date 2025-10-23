---
locale: en
slugBase: astro-keywords
title: "🚀 Astro Keywords & Concepts Cheat Sheet"
description: "A concise guide to Astro’s core concepts, project structure, config options, and common terms to get productive fast."
date: 2025-10-23
tags: [astro, basics, guide]
---

# 🚀 Astro Keywords & Concepts Cheat Sheet

This guide summarizes essential ideas you’ll meet when building with **Astro**: how it renders, how routing works, what goes where, and which terms matter.

---

## 🌌 Core Concepts

| Keyword | Meaning |
|--------|------|
| **Astro** | A static‑first site builder (SSG) using the “Islands Architecture”; ships HTML by default and loads JS only where needed. |
| **Islands Architecture** | Most of the page is static HTML, while interactive components hydrate with JS. Great for performance. |
| **Component** | An `.astro` file or a framework component (React/Vue/Svelte) used to build pages. |
| **Partial Hydration** | Only hydrate components that need interactivity. |
| **Adapter** | Deploy target adapter (Vercel/Netlify/Node/etc.). |
| **Renderer** | Integration that enables a given UI framework in Astro (e.g., React/Vue/Svelte). |

---

## 📂 Files & Structure

| Path/File | Meaning |
|------------|------|
| `src/pages/` | Page files; each `.astro` becomes an HTML route. |
| `src/components/` | Reusable components (`.astro`, `.jsx`, `.vue`, `.svelte`, etc.). |
| `src/layouts/` | Layout templates. Use `<slot />` to inject content. |
| `public/` | Static assets copied verbatim to `dist/`. |
| `astro.config.mjs` | Main project config: site info, integrations, adapter. |
| `src/env.d.ts` | Type definitions for `.astro` modules. |
| `dist/` | Build output folder. |

---

## ⚙️ Config Keywords (astro.config.mjs)

| Key | Meaning |
|--------|------|
| `site` | Base site URL for sitemap/RSS/canonicals. |
| `base` | Sub‑path when deploying under a repo (e.g., GitHub Pages). |
| `integrations` | Integrations list (e.g., `@astrojs/react`, `@astrojs/sitemap`). |
| `adapter` | Deployment adapter selection. |
| `output` | `'static'` (default) or `'server'` for SSR. |
| `trailingSlash` | URL behavior: `'always'`, `'never'`, or `'ignore'`. |
| `build` | Build options like output dir and paths. |

---

## 🧩 Template Syntax

| Syntax | Meaning |
|------|------|
| `---` | Frontmatter fence for server‑side logic (JS/TS). |
| `Astro.props` | Read props passed into a page/component. |
| `Astro.params` | Dynamic route params (e.g., `id` in `[id].astro`). |
| `Astro.request` | Incoming request (SSR only). |
| `<slot />` | Slots for layouts/children. |
| `{}` | Insert expressions inside HTML. |

---

## 🌍 Routing

| Keyword | Meaning |
|--------|------|
| File‑based routing | Routes mirror `src/pages` directory. |
| Dynamic routes | Bracket params: `[id].astro` → `/123`. |
| Nested routes | Folders create nesting: `blog/[slug].astro` → `/blog/post`. |
| `getStaticPaths()` | Return all paths for dynamic pages. |
| `Astro.redirect()` | Redirect at build or request time. |

---

## 💫 Integrations & Frameworks

| Keyword | Meaning |
|--------|------|
| Integrations | Extend Astro (framework support, MDX, sitemap, etc.). |
| `@astrojs/react` | Render React components in Astro. |
| `@astrojs/vue` | Render Vue components in Astro. |
| `@astrojs/svelte` | Render Svelte components in Astro. |
| `@astrojs/mdx` | Use components inside `.mdx` files. |

---

## 📖 Markdown & Content

| Keyword | Meaning |
|--------|------|
| Content Collections | Structured content system for Markdown/MDX. |
| Frontmatter | YAML metadata block at file top. |
| Content Entry | A single Markdown file (one document). |
| `getCollection()` | Read documents from a collection. |
| `slug` | Short URL based on file path/name. |

Tip: For i18n, keep the same `slugBase` across languages and mark `locale` in frontmatter.

---

## ⚡ Build & Deploy

| Keyword | Meaning |
|--------|------|
| SSG | Static Site Generation at build time. |
| SSR | Server‑side rendering on request. |
| Hybrid | Mix SSG and SSR as needed. |
| Vercel / Netlify / Cloudflare | Common deployment targets. |
| `astro preview` | Preview built output locally. |

---

## 🎨 Styling & Assets

| Keyword | Meaning |
|--------|------|
| Scoped CSS | `<style>` in `.astro` is scoped to the component by default. |
| Global Styles | Use `:global()` or import a global stylesheet. |
| Tailwind / UnoCSS / SCSS | Use via integrations. |
| Image Optimization | Optimize images via `@astrojs/image` or `astro:assets`. |

---

## 🧠 Advanced

| Keyword | Meaning |
|--------|------|
| Client Directive | `client:load` / `client:visible` / `client:idle` / `client:media` / `client:only`. |
| Astro Islands | Interactive components that hydrate on the client. |
| `Astro.fetchContent()` | Legacy API replaced by Content Collections. |
| `Astro.glob()` | Import multiple matched files dynamically. |
| `Astro.locals` | Shared context in SSR. |

---

## 🧰 CLI

| Command | Purpose |
|------|------|
| `npm create astro@latest` | Scaffold a new project. |
| `npm run dev` | Start the dev server. |
| `npm run build` | Build the site. |
| `npm run preview` | Preview the build output. |
| `astro add [integration]` | Install and configure an integration. |

---

## 🔗 References

- 🌐 Website: https://astro.build
- 📘 Docs: https://docs.astro.build
- 🧩 Integrations: https://astro.build/integrations
- 💬 Community: https://astro.build/chat

---

🪐 Summary
> Astro’s “static‑first + partial hydration” approach blends performance with flexibility.  
> Learn these keywords to quickly understand project structure, config, and rendering logic.

