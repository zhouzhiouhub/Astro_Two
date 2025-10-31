import type { Locale } from "@/lib/i18n";

export interface AboutSection {
  introHeading: string;
  introBody: string[];
  skillsHeading: string;
  skills: string[];
  valuesHeading: string;
  values: string[];
  contactHeading: string;
  contactSummary: string;
  resumeLabel: string;
  resumeUrl: string;
  photoAlt: string;
}

type AboutContentMap = Record<Locale, AboutSection>;

export const aboutContent: AboutContentMap = {
  en: {
    introHeading: "Who I am",
    introBody: [
      "I'm Zhou Zhiou — an engineer and designer shipping bilingual products, lighting control systems, and content-heavy sites.",
      "I share experiments so other builders can reuse the playbooks, from Astro performance tuning to Qt graphics pipelines.",
    ],
    skillsHeading: "Core stack",
    skills: [
      "C++ / Qt Quick",
      "Astro & Islands architecture",
      "TypeScript & React",
      "Rust for control planes",
      "OpenRGB & hardware automation",
      "Design systems & motion",
    ],
    valuesHeading: "Why I share",
    values: [
      "Documenting builds keeps the craft accountable.",
      "Bilingual workflows widen collaboration.",
      "Accessible, fast interfaces matter as much as raw features.",
    ],
    contactHeading: "Connect",
    contactSummary: "Let’s collaborate on human-centred tools, lighting, or creative coding projects.",
    resumeLabel: "Download résumé (PDF)",
    resumeUrl: "",
    photoAlt: "Portrait of Zhou Zhiou in the studio",
  },
  zh: {
    introHeading: "我是谁",
    introBody: [
      "你好，我是周植欧，一名同时做工程与设计的创作者，常年在双语产品、灯光控制系统与内容站点之间游走。",
      "我分享实践经验，希望让更多开发者复用这些方法：从 Astro 性能调优，到 Qt 图形渲染流程。",
    ],
    skillsHeading: "核心技术栈",
    skills: [
      "C++ / Qt Quick",
      "Astro 与 Islands 架构",
      "TypeScript & React",
      "Rust 控制平面",
      "OpenRGB 硬件自动化",
      "设计系统与动效",
    ],
    valuesHeading: "为什么要分享",
    values: [
      "记录过程让创作更自洽。",
      "双语流程拓展协作边界。",
      "易用、迅捷的界面与功能同等重要。",
    ],
    contactHeading: "联系我",
    contactSummary: "欢迎一起探索以人为本的工具、灯光项目与创意编程。",
    resumeLabel: "下载简历（PDF）",
    resumeUrl: "",
    photoAlt: "周植欧在工作室的照片",
  },
};

export interface SocialLink {
  label: string;
  href: string;
}

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/zhouzhiou" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zhouzhiou" },
  { label: "Weibo", href: "https://weibo.com/zhouzhiou" },
  { label: "Email", href: "mailto:hello@zhouzhiou.com" },
];


