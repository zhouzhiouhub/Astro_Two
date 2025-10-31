import type { Locale } from "@/lib/i18n";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectEntry {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  outcomes: string[];
  tech: string[];
  year: string;
  image: string;
  imageAlt: string;
  links: ProjectLink[];
}

type ProjectLocaleMap = Record<Locale, ProjectEntry[]>;

export const projectsByLocale: ProjectLocaleMap = {
  en: [
    {
      slug: "spectra-led-studio",
      title: "Spectra LED Studio",
      tagline: "Desktop lighting design powered by OpenRGB and Qt",
      summary:
        "A cross-platform toolkit to choreograph LED strips, custom controllers, and DMX fixtures with timeline-based scenes and live audio reactivity.",
      description:
        "Spectra LED Studio bridges industrial LED installations and hobby builds. Built with Qt for native performance, it layers device discovery, color science, and OpenRGB integration into a cohesive workflow.",
      outcomes: [
        "Reduced show programming time by 45% compared to manual DMX workflows",
        "Implemented modular driver architecture for 14+ controller families",
        "Delivered bilingual UI and presets for touring crews",
      ],
      tech: ["Qt", "C++", "OpenRGB", "FFTW", "TypeScript"],
      year: "2024",
      image: "/og/project-spectra.svg",
      imageAlt: "Spectra LED Studio interface showing timeline and color wheels",
      links: [
        { label: "GitHub", href: "https://github.com/zhouzhiou/spectra-led-studio" },
        { label: "Demo Video", href: "https://youtu.be/placeholder" },
      ],
    },
    {
      slug: "astro-observatory",
      title: "Astro Observatory",
      tagline: "Content analytics dashboards shipped with Astro Islands",
      summary:
        "A lightweight observability layer for content-heavy sites: track LCP, read-depth, and topic clusters without slowing down pages.",
      description:
        "Astro Observatory attaches to any Astro or static output. It collects Core Web Vitals, scroll depth, and search queries, delivering insights through privacy-first edge functions.",
      outcomes: [
        "Improved article completion rate by 18% after surfacing depth insights",
        "Deployed to Vercel Edge with sub-50ms cold starts",
        "Shipped plug-and-play widgets for authors to embed in Markdown",
      ],
      tech: ["Astro", "TypeScript", "D3.js", "Plausible"],
      year: "2025",
      image: "/og/project-observatory.svg",
      imageAlt: "Astro Observatory dashboard visualizing read depth and topic clusters",
      links: [
        { label: "Case Study", href: "https://zhouzhiou.com/en/projects/astro-observatory" },
        { label: "Live Demo", href: "https://observatory.zhouzhiou.com" },
      ],
    },
    {
      slug: "qmesh-audio-grid",
      title: "QMesh Audio Grid",
      tagline: "Edge audio routing for creative coding labs",
      summary:
        "An embedded audio matrix that syncs Ableton Link, Eurorack clocks, and spatial audio nodes—built for interactive installations.",
      description:
        "QMesh Audio Grid combines Raspberry Pi CM4 nodes with a Rust control plane. The system keeps latency under 4ms while allowing web-based scene programming for sound art shows.",
      outcomes: [
        "Maintains sub-4ms latency across 12 distributed nodes",
        "Self-heals mesh topology within 2 seconds when nodes drop",
        "Exposed automation API consumed by TouchDesigner and Max/MSP",
      ],
      tech: ["Rust", "TypeScript", "WebSockets", "Ableton Link", "OpenAPI"],
      year: "2023",
      image: "/og/project-qmesh.svg",
      imageAlt: "Diagram of QMesh Audio Grid nodes and routing paths",
      links: [
        { label: "System Overview", href: "https://zhouzhiou.com/en/projects/qmesh-audio-grid" },
        { label: "GitHub", href: "https://github.com/zhouzhiou/qmesh" },
      ],
    },
  ],
  zh: [
    {
      slug: "spectra-led-studio",
      title: "Spectra LED Studio",
      tagline: "基于 OpenRGB 与 Qt 的桌面灯光设计工具",
      summary:
        "面向舞台与创客的跨平台灯光编排套件，可按时间轴编排灯带、自定义控制器与 DMX 灯具，并支持实时音频联动。",
      description:
        "Spectra LED Studio 将专业灯光流程与个人创作实践连接起来。借助 Qt 原生性能与 OpenRGB 驱动生态，它把设备发现、色彩管理与序列编排整合进统一界面。",
      outcomes: [
        "相较手工 DMX 流程，节目编排效率提升 45%",
        "模块化驱动框架适配 14+ 类控制器",
        "提供中英文界面与预设，满足巡演团队需求",
      ],
      tech: ["Qt", "C++", "OpenRGB", "FFTW", "TypeScript"],
      year: "2024",
      image: "/og/project-spectra.svg",
      imageAlt: "Spectra LED Studio 界面展示时间轴与色轮",
      links: [
        { label: "GitHub", href: "https://github.com/zhouzhiou/spectra-led-studio" },
        { label: "演示视频", href: "https://youtu.be/placeholder" },
      ],
    },
    {
      slug: "astro-observatory",
      title: "Astro Observatory",
      tagline: "基于 Astro Islands 的内容数据洞察",
      summary:
        "为内容型网站打造的轻量分析层：追踪 LCP、阅读深度与主题聚类，同时保持页面极速加载。",
      description:
        "Astro Observatory 可挂载在任意 Astro 或静态站点上，收集核心指标、滚动深度与站内搜索，并通过隐私友好的 Edge 函数提供洞察。",
      outcomes: [
        "基于阅读深度数据优化后，文章完读率提升 18%",
        "部署至 Vercel Edge，冷启动小于 50ms",
        "为作者提供可在 Markdown 中嵌入的可视化挂件",
      ],
      tech: ["Astro", "TypeScript", "D3.js", "Plausible"],
      year: "2025",
      image: "/og/project-observatory.svg",
      imageAlt: "Astro Observatory 仪表盘展示阅读深度与主题聚类",
      links: [
        { label: "案例分析", href: "https://zhouzhiou.com/zh/projects/astro-observatory" },
        { label: "在线演示", href: "https://observatory.zhouzhiou.com" },
      ],
    },
    {
      slug: "qmesh-audio-grid",
      title: "QMesh Audio Grid",
      tagline: "面向创意实验室的边缘音频路由系统",
      summary:
        "一套将 Ableton Link、Eurorack 时钟与空间音频节点同步的嵌入式矩阵，专为互动装置打造。",
      description:
        "QMesh Audio Grid 结合 Raspberry Pi CM4 节点与 Rust 控制平面，在 4ms 内保持时序一致，并提供基于 Web 的场景编排界面。",
      outcomes: [
        "12 个分布式节点维持在 4ms 以内的端到端延迟",
        "节点掉线后 2 秒内自愈拓扑",
        "提供可供 TouchDesigner 与 Max/MSP 调用的自动化 API",
      ],
      tech: ["Rust", "TypeScript", "WebSockets", "Ableton Link", "OpenAPI"],
      year: "2023",
      image: "/og/project-qmesh.svg",
      imageAlt: "QMesh Audio Grid 节点与路由图示",
      links: [
        { label: "系统概览", href: "https://zhouzhiou.com/zh/projects/qmesh-audio-grid" },
        { label: "GitHub", href: "https://github.com/zhouzhiou/qmesh" },
      ],
    },
  ],
};

export function getProjectBySlug(locale: Locale, slug: string): ProjectEntry | undefined {
  return projectsByLocale[locale]?.find((item) => item.slug === slug);
}


