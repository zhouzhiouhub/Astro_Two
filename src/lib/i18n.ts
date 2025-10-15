export const SUPPORTED_LOCALES = ["en", "zh"] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const defaultLocale: Locale = "en";

type Dict = Record<string, string>;
type Namespaced = Record<
  | "common"
  | "home"
  | "pricing"
  | "integrations"
  | "contact"
  | "product"
  | "videos"
  | "faq"
  | "about"
  | "download"
  | "blog"
  | "projects"
  | "notes",
  Dict
>;

const en: Namespaced = {
  common: {
    nav_all_pages: "All Pages",
    nav_integrations: "Integrations",
    nav_pricing: "Pricing",
    nav_contact: "Contact",
    nav_home: "Home",
    nav_blog: "Blog",
    nav_projects: "Projects",
    nav_notes: "Notes",
    nav_product: "Product",
    nav_videos: "Videos",
    nav_faq: "FAQ",
    nav_about: "About",
    nav_download: "Download",
    cta_primary: "Get Template",
    cta_secondary: "View Demo",
    lang_en: "English",
    lang_zh: "中文",
    cookie_text: "We use cookies to improve experience.",
    cookie_accept: "Accept",
    cookie_decline: "Decline",
  },
  home: {
    badge: "Awarded Top Conversion Theme",
    title: "Predict. Decide. Grow.",
    subtitle: "Futuristic dark theme for SaaS & analytics.",
  },
  pricing: {
    title: "Pricing",
    subtitle: "Simple, transparent, and scalable.",
  },
  integrations: {
    title: "Integrations",
    subtitle: "Connect your stack in minutes.",
  },
  contact: {
    title: "Contact",
    subtitle: "Let’s talk about your use case.",
  },
  product: { title: "Product", subtitle: "Capabilities and platform overview." },
  blog: { title: "Blog", subtitle: "Latest writings and updates." },
  projects: { title: "Projects", subtitle: "Showcase of work and contributions." },
  notes: { title: "Notes", subtitle: "Reusable knowledge and cheat sheets." },
  videos: { title: "Videos", subtitle: "Product walkthroughs and demos." },
  faq: { title: "FAQ", subtitle: "Answers to common questions." },
  about: { title: "About", subtitle: "Our mission and story." },
  download: { title: "Download", subtitle: "Get installers and resources." },
};

const zh: Namespaced = {
  common: {
    nav_all_pages: "全部页面",
    nav_integrations: "集成",
    nav_pricing: "定价",
    nav_contact: "联系",
    nav_home: "首页",
    nav_blog: "博客",
    nav_projects: "项目",
    nav_notes: "知识库",
    nav_product: "产品",
    nav_videos: "视频",
    nav_faq: "解答",
    nav_about: "关于",
    nav_download: "下载",
    cta_primary: "获取模板",
    cta_secondary: "查看演示",
    lang_en: "English",
    lang_zh: "中文",
    cookie_text: "我们使用 Cookie 以优化体验。",
    cookie_accept: "同意",
    cookie_decline: "拒绝",
  },
  home: {
    badge: "高转化主题奖项",
    title: "预测 · 决策 · 增长",
    subtitle: "为 SaaS 与分析产品打造的深色主题。",
  },
  pricing: {
    title: "定价",
    subtitle: "简单透明，随业务扩展。",
  },
  integrations: {
    title: "集成",
    subtitle: "几分钟接入你的技术栈。",
  },
  contact: {
    title: "联系",
    subtitle: "聊聊你的场景与需求。",
  },
  product: { title: "产品", subtitle: "能力一览与平台总览。" },
  blog: { title: "博客", subtitle: "最新文章与动态。" },
  projects: { title: "项目", subtitle: "作品与贡献展示。" },
  notes: { title: "知识库", subtitle: "可复用的知识与备忘。" },
  videos: { title: "视频", subtitle: "产品演示与上手指南。" },
  faq: { title: "解答", subtitle: "常见问题与答案。" },
  about: { title: "关于", subtitle: "我们的使命与故事。" },
  download: { title: "下载", subtitle: "获取安装包与资源。" },
};

const dict: Record<Locale, Namespaced> = { en, zh };

export function t(ns: keyof Namespaced, key: string, locale: Locale): string {
  return dict[locale][ns][key] ?? key;
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
