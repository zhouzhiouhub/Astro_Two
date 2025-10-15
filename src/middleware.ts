import type { MiddlewareHandler } from "astro";
import { defaultLocale, isLocale } from "@/lib/i18n";
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

  if (pathname === "/") {
    return context.redirect(`/${defaultLocale}`, 307);
  }

  const seg = pathname.split("/").filter(Boolean)[0];
  if (!seg || !isLocale(seg)) {
    return context.redirect(`/${defaultLocale}${pathname}`, 307);
  }

  return next();
};
