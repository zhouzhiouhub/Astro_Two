import type { Namespaced } from "./schema";
import { en } from "./en";
import { zh } from "./zh";

export const SUPPORTED_LOCALES = ["en", "zh"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const defaultLocale: Locale = "zh";

const dict: Record<Locale, Namespaced> = { en, zh };

export function t(ns: keyof Namespaced, key: string, locale: Locale): string {
  return dict[locale]?.[ns]?.[key] ?? key;
}

export function isLocale(input: string): input is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(input);
}

export function pathWithLocale(locale: Locale, path = "/") {
  if (!path.startsWith("/")) path = "/" + path;
  const parts = path.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0])) {
    parts[0] = locale;
  } else {
    parts.unshift(locale);
  }
  return "/" + parts.join("/");
}

/**
 * Very small Accept-Language negotiator for our supported locales.
 * Returns best match or `defaultLocale`.
 */
export function negotiateLocale(al: string | null | undefined): Locale {
  const header = (al || "").toLowerCase();
  // parse e.g. "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
  const items = header
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((part) => {
      const [tag, qPart] = part.split(";");
      const q = qPart?.startsWith("q=") ? Number(qPart.slice(2)) : 1;
      return { tag: tag || "", q: Number.isFinite(q) ? q : 0 } as const;
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of items) {
    // direct match (en, zh)
    if (isLocale(tag)) return tag;
    // primary subtag match (en-US -> en, zh-CN -> zh)
    const primary = tag.split("-")[0];
    if (primary && isLocale(primary)) return primary;
  }
  return defaultLocale;
}
