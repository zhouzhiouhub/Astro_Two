import type { Locale } from "@/lib/i18n";

export interface AuthorProfile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

type AuthorByLocale = Record<Locale, AuthorProfile>;

export const authorProfile: AuthorByLocale = {
  en: {
    name: "Zhou Zhiou",
    title: "Engineer · Designer",
    bio: "Writes about Astro, Qt, and lighting systems while building bilingual products and immersive installations.",
    avatar: "/og/author-zhouzhiou.svg",
  },
  zh: {
    name: "周植欧",
    title: "工程师 · 设计师",
    bio: "关注 Astro、Qt 与灯光系统，持续打造双语产品与沉浸式装置。",
    avatar: "/og/author-zhouzhiou.svg",
  },
};


