import type { Locale } from "@/lib/i18n";

export interface NoteEntry {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  updatedAt: string;
  link?: string;
}

type NotesMap = Record<Locale, NoteEntry[]>;

export const notesByLocale: NotesMap = {
  en: [
    {
      id: "astro-content-pipeline",
      title: "Astro content pipeline checklist",
      summary: "Steps for shipping a new article: draft in MD, run accessibility audits, collect Lighthouse metrics, and publish via CI.",
      tags: ["Astro", "workflow", "writing"],
      updatedAt: "2025-10-12",
    },
    {
      id: "qt-renderthread",
      title: "Qt render thread patterns",
      summary: "Comparing QRhi, QQuickRenderControl, and raw OpenGL contexts for LED wall visualisers.",
      tags: ["Qt", "graphics", "hardware"],
      updatedAt: "2025-09-28",
    },
    {
      id: "led-color-calibration",
      title: "LED color calibration cheatsheet",
      summary: "Gamma curves, white balance matrices, and how to profile fixtures with a SpyderX probe.",
      tags: ["LED", "color", "hardware"],
      updatedAt: "2025-08-31",
    },
    {
      id: "translation-workflow",
      title: "Translation workflow automation",
      summary: "Using Content Collections, git hooks, and DeepL to keep zh/en content in sync.",
      tags: ["i18n", "automation", "writing"],
      updatedAt: "2025-07-15",
    },
    {
      id: "pagefind-snippets",
      title: "Pagefind search snippets",
      summary: "Customising Pagefind UI to surface tags, code blocks, and reading time metadata.",
      tags: ["Astro", "search", "design"],
      updatedAt: "2025-06-02",
      link: "https://github.com/zhouzhiou/pagefind-snippets",
    },
  ],
  zh: [
    {
      id: "astro-content-pipeline",
      title: "Astro 内容发布清单",
      summary: "新文章上线流程：Markdown 草稿、可访问性审查、Lighthouse 指标采集、CI 发布。",
      tags: ["Astro", "流程", "写作"],
      updatedAt: "2025-10-12",
    },
    {
      id: "qt-renderthread",
      title: "Qt 渲染线程模式速记",
      summary: "对比 QRhi、QQuickRenderControl 与原生 OpenGL，在 LED 大屏可视化中的应用。",
      tags: ["Qt", "图形", "硬件"],
      updatedAt: "2025-09-28",
    },
    {
      id: "led-color-calibration",
      title: "LED 色彩校准速查表",
      summary: "总结伽马曲线、白平衡矩阵，以及使用 SpyderX 探头校准灯具的方法。",
      tags: ["LED", "色彩", "硬件"],
      updatedAt: "2025-08-31",
    },
    {
      id: "translation-workflow",
      title: "双语内容同步自动化",
      summary: "借助 Content Collection、git 钩子与 DeepL，使中英文内容保持同步。",
      tags: ["i18n", "自动化", "写作"],
      updatedAt: "2025-07-15",
    },
    {
      id: "pagefind-snippets",
      title: "Pagefind 检索定制笔记",
      summary: "设计 Pagefind UI，突出标签、代码块与阅读时间元数据。",
      tags: ["Astro", "搜索", "设计"],
      updatedAt: "2025-06-02",
      link: "https://github.com/zhouzhiou/pagefind-snippets",
    },
  ],
};

export const noteTagsByLocale: Record<Locale, string> = {
  en: "Tags",
  zh: "标签",
};


