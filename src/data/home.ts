import type { Locale } from "@/lib/i18n";

export type HighlightImage = 'heroCode' | 'heroDesign' | 'heroHardware';

export interface HomeHighlight {
  image: HighlightImage;
  alt: string;
  caption: string;
}

export interface HomeContent {
  seoTitle: string;
  seoDescription: string;
  mission: string;
  metrics: Array<{ label: string; value: string; hint?: string }>;
  highlights: HomeHighlight[];
}

type HomeContentMap = Record<Locale, HomeContent>;

export const homeContent: HomeContentMap = {
  en: {
    seoTitle: "zhouzhiou – Build. Document. Share.",
    seoDescription: "Exploring frontier technology, design systems, and lighting projects through deep-dive essays and hands-on case studies.",
    mission: "Exploring frontier technology and design through a personal blog and portfolio.",
    metrics: [
      { label: "Published Essays", value: "48", hint: "Curated since 2017" },
      { label: "Open Source Stars", value: "3.1k", hint: "Across GitHub projects" },
      { label: "Hardware Builds", value: "12", hint: "LED, IoT, and display systems" },
    ],
    highlights: [
      { image: 'heroCode', alt: "Code editor showing Astro and Qt snippets", caption: "Code experiments from Astro, Qt, and OpenRGB" },
      { image: 'heroDesign', alt: "Design board showcasing UI components", caption: "Interface systems and interaction sketches" },
      { image: 'heroHardware', alt: "Custom LED controller prototype", caption: "Hardware explorations with LEDs and embedded gear" },
    ],
  },
  zh: {
    seoTitle: "zhouzhiou – 构建·记录·分享",
    seoDescription: "以深度文章与案例记录前沿技术、设计系统与灯光项目的探索。",
    mission: "以个人博客与作品集记录前沿技术与设计探索。",
    metrics: [
      { label: "已发布文章", value: "48 篇", hint: "自 2017 年持续打磨" },
      { label: "开源 Star", value: "3.1k", hint: "GitHub 项目累计" },
      { label: "硬件作品", value: "12 件", hint: "LED、IoT 与显示系统" },
    ],
    highlights: [
      { image: 'heroCode', alt: "显示 Astro 与 Qt 代码片段的编辑器", caption: "Astro、Qt、OpenRGB 等代码实验" },
      { image: 'heroDesign', alt: "展示组件库的设计板", caption: "界面系统与交互草图" },
      { image: 'heroHardware', alt: "自制 LED 控制器原型", caption: "围绕 LED 与嵌入式的硬件探索" },
    ],
  },
};


