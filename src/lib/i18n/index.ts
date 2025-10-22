import type { Namespaced } from "./schema";
import { en } from "./en";
import { zh } from "./zh";

export const SUPPORTED_LOCALES = ["en", "zh"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const defaultLocale: Locale = "en";

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

