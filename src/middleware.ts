import type { MiddlewareHandler } from "astro";
import { defaultLocale, isLocale, negotiateLocale } from "@/lib/i18n";
import { initAuthExpiryNotifier } from "@/lib/authExpiryNotifier";

export const onRequest: MiddlewareHandler = async (context, next) => {
  // Ensure the notifier is set up once when the server handles the first request
  initAuthExpiryNotifier();
  const { url } = context;
  const { pathname } = url;

  // Do not locale-redirect API routes
  if (pathname === "/api" || pathname.startsWith("/api/")) {
    return next();
  }

  // Skip redirects for static assets and framework internals
  // e.g. /favicon.ico, /logo.svg, /robots.txt, /assets/*, /_astro/*, etc.
  const STATIC_PREFIXES = [
    "/_astro/",
    "/assets/",
    "/icons/",
    "/og/",
    "/_image/",
    "/pagefind/",
  ];
  const STATIC_EXTS = [
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
    ".ico",
    ".txt",
    ".xml",
    ".json",
    ".css",
    ".js",
    ".mjs",
    ".map",
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
    ".eot",
    ".mp4",
    ".webm",
  ];
  const isStatic =
    STATIC_PREFIXES.some((p) => pathname.startsWith(p)) ||
    STATIC_EXTS.some((ext) => pathname.endsWith(ext)) ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml";
  if (isStatic) {
    return next();
  }

  if (pathname === "/") {
    // Negotiate locale from Accept-Language, fallback to default
    const best = negotiateLocale(context.request.headers.get("accept-language"));
    return context.redirect(`/${best}`, 307);
  }

  const seg = pathname.split("/").filter(Boolean)[0];
  if (!seg || !isLocale(seg)) {
    return context.redirect(`/${defaultLocale}${pathname}`, 307);
  }

  return next();
};
