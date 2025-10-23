---
locale: en
slugBase: astro-i18n-demo
title: "Astro i18n Guide: Localized Routes & Content"
description: "A practical guide to implementing language‑prefixed routes and Content Collections with Astro."
date: 2025-10-23
tags: [astro, i18n, content]
---

# Astro Internationalization (i18n) Routing Guide

When building global websites, internationalization (i18n) is essential for reaching a wider audience.
This guide walks through a clean, practical approach to multi‑language sites in Astro using language‑prefixed
routes and Content Collections.

---

## Why Astro for i18n

Astro is a modern static site builder focused on shipping less JavaScript by default.
Its Islands Architecture lets you render most of a page as static HTML and hydrate only what’s needed.

While Astro doesn’t ship a built‑in i18n subsystem like some meta‑frameworks, its routing and content
APIs make it straightforward to implement robust, flexible localization that fits your project’s shape.

---

## URL Strategies for Locales

Common patterns for localized URLs:

- Path prefix: `/en/about`, `/zh/about` (SEO‑friendly and most common)
- Subdomain: `en.example.com`, `zh.example.com` (infrastructure split)
- Query string: `/about?lang=zh` (simple, but not SEO‑friendly)

For Astro projects, a path prefix under `/[lang]/...` is usually the best default:

- Works naturally with Astro’s filesystem routing
- Easy to detect and switch languages
- Deploys cleanly to static hosts (Vercel, Netlify, etc.)

---

## Suggested Project Layout

Organize pages and strings per locale to keep things predictable:

```
src/
  pages/
    en/
      index.astro
      about.astro
    zh/
      index.astro
      about.astro
  i18n/
    en.json
    zh.json
```

- Files under each locale folder are the localized versions of the same pages
- `i18n` stores shared UI copy/strings
- Pages read the right language via the `[lang]` route parameter

---

## Minimal i18n Helper

Start with a tiny helper for UI strings:

```ts
// src/utils/i18n.ts
import en from '../i18n/en.json';
import zh from '../i18n/zh.json';

const languages = { en, zh } as const;

export function getLangData(lang: string) {
  return (languages as Record<string, (typeof languages)[keyof typeof languages]>)[lang] || languages.en;
}
```

Use it in a page:

```astro
---
import { getLangData } from '../../utils/i18n';
const { lang } = Astro.params;
const t = getLangData(lang);
---

<html lang={lang}>
  <head>
    <title>{t.title}</title>
  </head>
  <body>
    <h1>{t.hello}</h1>
  </body>
  </html>
```

---

## Option A: `[lang]/blog/[slug]` + Content Collections

If you keep your articles in Astro Content Collections, you can locate the correct document by
matching both the `slug` and the `locale` from params.

```astro
---
// src/pages/[lang]/blog/[slug].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  // Pre‑build both languages for every post
  const posts = await getCollection('posts');
  return posts.flatMap((p) => [
    { params: { lang: 'en', slug: p.data.slugBase }, props: { locale: 'en' } },
    { params: { lang: 'zh', slug: p.data.slugBase }, props: { locale: 'zh' } },
  ]);
}

const { lang, slug } = Astro.params;
const all = await getCollection('posts');
const entry = all.find((p) => p.data.slugBase === slug && p.data.locale === lang);

if (!entry) {
  // Optional: fallback to default locale, or 404
  return Astro.redirect(`/${lang}/blog`);
}

const { Content } = await entry.render();
---

<article>
  <Content />
</article>
```

Frontmatter for each localized post shares the same `slugBase`:

```md
---
// en
locale: en
slugBase: astro-i18n-demo
title: "Astro i18n Guide: Localized Routes & Content"
description: "A practical guide to implementing language‑prefixed routes and Content Collections with Astro."
date: 2025-10-23
tags: [astro, i18n, content]
---

---
// zh
locale: zh
slugBase: astro-i18n-demo
title: "Astro i18n 演示：本地化路由与内容"
description: "演示如何通过 [lang] 路由与内容集合来组织多语言文章。"
date: 2025-10-23
tags: [astro, i18n, content]
---
```

---

## Option B: Directory‑per‑locale Static Pages

For simple sites, you can also duplicate page files under `en/` and `zh/`. This keeps routing very
explicit but can lead to more duplication if content grows. Content Collections generally scale better.

---

## Route Param + Default Locale Redirect

Use a top‑level `index.astro` to redirect visitors to their language (or a default like `en`).

```astro
---
// src/pages/index.astro
const userLang = Astro.request.headers.get('accept-language')
  ?.split(',')[0]
  .split('-')[0];
Astro.redirect(`/${userLang ?? 'en'}/`);
---
```

Then read `lang` inside localized pages via `Astro.params.lang`.

---

## Shared Layout + Localized Nav

Extract common structure into a layout component and pass the current `lang`.

```astro
---
// src/layouts/I18nLayout.astro
const { lang, title } = Astro.props;
---
<html lang={lang}>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <nav>
      <a href={`/en/`}>English</a> | <a href={`/zh/`}>中文</a>
    </nav>
    <slot />
  </body>
</html>
```

Use it in pages:

```astro
---
import I18nLayout from '../../layouts/I18nLayout.astro';
import { getLangData } from '../../utils/i18n';
const { lang } = Astro.params;
const t = getLangData(lang);
---

<I18nLayout lang={lang} title={t.title}>
  <h1>{t.hello}</h1>
</I18nLayout>
```

---

## SEO Tips

- Pre‑generate static paths with `getStaticPaths()` so every language has real URLs

```ts
export async function getStaticPaths() {
  const langs = ['en', 'zh'];
  return langs.map((lang) => ({ params: { lang } }));
}
```

- Set `<html lang>` correctly for each page
- Add `<link rel="alternate" hreflang="...">` to express language alternates for crawlers

---

## Wrap‑up

Even without a built‑in i18n framework, Astro’s routing + Content Collections make it easy to build
fast, localized sites. Use a consistent directory layout, keep a stable `slugBase` across translations,
and centralize shared UI copy for maintainability.

Quick checklist:

- Use path‑based i18n (`/[lang]/...`) for clean URLs and SEO
- Generate all localized pages at build time
- Share `slugBase` and set `locale` in frontmatter
- Prefer Content Collections for growing content

— Author: ZhouZhiOu

