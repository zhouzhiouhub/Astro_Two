import type { MiddlewareHandler } from "astro";
import { initAuthExpiryNotifier } from "@/lib/authExpiryNotifier";
// 如需保留语言工具，仅用于后续功能：
// import { defaultLocale, isLocale, negotiateLocale } from "@/lib/i18n";

export const onRequest: MiddlewareHandler = async (context, next) => {
  // 启动一次性通知器
  initAuthExpiryNotifier();

  const { url } = context;
  const { pathname } = url;

  // 1) 放行 API
  if (pathname === "/api" || pathname.startsWith("/api/")) {
    return next();
  }

  // 2) 放行静态资源与框架内部路径
  const STATIC_PREFIXES = [
    "/_astro/",
    "/assets/",
    "/icons/",
    "/og/",
    "/_image/",
    "/pagefind/",
  ];
  const STATIC_EXTS = [
    ".svg",".png",".jpg",".jpeg",".webp",".gif",".ico",
    ".txt",".xml",".json",".css",".js",".mjs",".map",
    ".woff",".woff2",".ttf",".otf",".eot",".mp4",".webm",
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

  // 3) 不做任何语言重定向：根路径与其它路径都直接放行
  //    让 / 走你新的 index.astro 语言选择页
  //    让 /zh /en 等页面按常规路由工作
  return next();
};
