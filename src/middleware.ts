import type { MiddlewareHandler } from "astro";
import { defaultLocale, isLocale } from "@/lib/i18n";

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url } = context;
  const { pathname } = url;

  if (pathname === "/") {
    return context.redirect(`/${defaultLocale}`, 307);
  }

  const seg = pathname.split("/").filter(Boolean)[0];
  if (!seg || !isLocale(seg)) {
    return context.redirect(`/${defaultLocale}${pathname}`, 307);
  }

  return next();
};

