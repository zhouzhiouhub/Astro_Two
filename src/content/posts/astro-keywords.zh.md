---
locale: zh
slugBase: astro-keywords
title: "🚀 Astro 关键词与概念速查表"
description: "浓缩梳理 Astro 架构、项目结构、常见配置与术语，快速建立整体认知。"
date: 2025-10-23
tags: [astro, basics, guide]
summary: "面向 Astro 开发者的术语清单，涵盖 Islands 架构、组件类型、构建策略、配置选项与部署适配器。通过表格与流程图解释目录结构、CLI 脚本与效率技巧，帮助你在创建新项目时保持清晰。"
cover:
  src: "/og/blog-astro-keywords.svg"
  alt: "Astro 关键字速查板"
canonical: "https://zhouzhiou.com/zh/blog/astro-keywords"
related: ["astro-i18n-demo"]
---

# 🚀 Astro 关键词与概念速查表

本文整理了在使用 **Astro** 开发时常见的核心概念、文件结构、配置项及术语解释，帮助你快速理解 Astro 的工作机制与生态。

---

## 🌌 核心概念

| 关键词 | 含义 |
|--------|------|
| **Astro** | 一种静态站点生成器（SSG），采用“岛屿架构（Islands Architecture）”，默认输出纯 HTML，仅在需要时加载前端 JS。 |
| **Islands Architecture** | Astro 的核心理念：页面整体是静态的 HTML，只在交互组件部分加载 JS。极大提升性能。 |
| **Component (组件)** | `.astro` 文件或前端框架组件（React/Vue/Svelte 等），用于构建页面结构。 |
| **Partial Hydration** | “部分水合”机制，只为页面中需要交互的组件加载 JS。 |
| **Adapter** | 用于将 Astro 部署到不同平台的适配器（如 Vercel、Netlify、Node 等）。 |
| **Renderer** | 让 Astro 能使用特定前端框架（如 React/Vue/Svelte）的插件系统。 |

---

## 📂 文件与目录结构

| 路径/文件 | 含义 |
|------------|------|
| `src/pages/` | 页面文件夹，对应静态路由（每个 `.astro` 文件会生成一个 HTML 页面）。 |
| `src/components/` | 存放组件文件（可为 `.astro`、`.jsx`、`.vue`、`.svelte` 等）。 |
| `src/layouts/` | 页面模板/布局文件。可通过 `<slot />` 注入内容。 |
| `public/` | 静态资源目录，内容会原样复制到最终 `dist/`。 |
| `astro.config.mjs` | Astro 项目主配置文件，定义站点信息、插件、适配器等。 |
| `src/env.d.ts` | TypeScript 类型定义文件，用于识别 `.astro` 模块。 |
| `dist/` | 构建输出目录。 |

---

## ⚙️ 配置关键词（astro.config.mjs）

| 关键词 | 含义 |
|--------|------|
| **`site`** | 站点的基础 URL，用于生成 sitemap、RSS、canonical 链接。 |
| **`base`** | 部署时的子路径（例如 GitHub Pages 的仓库路径）。 |
| **`integrations`** | 集成插件数组（如 `@astrojs/react`、`@astrojs/sitemap` 等）。 |
| **`adapter`** | 定义部署平台适配器。 |
| **`output`** | 输出模式：`'static'`（默认）或 `'server'`（SSR）。 |
| **`trailingSlash`** | 是否在 URL 末尾添加斜杠，可选：`'always'`、`'never'`、`'ignore'`。 |
| **`build`** | 构建相关设置，如输出目录、自定义路径等。 |

---

## 🧩 模板语法关键词

| 语法 | 含义 |
|------|------|
| `---` | Astro 前后端逻辑分隔符，三条横线之间写服务器端逻辑（JavaScript/TypeScript）。 |
| `Astro.props` | 获取组件或页面传入的属性。 |
| `Astro.params` | 获取动态路由参数（例如 `[id].astro` 中的 `id`）。 |
| `Astro.request` | 访问请求信息（仅 SSR 模式下）。 |
| `<slot />` | 插槽，用于在布局组件中插入内容。 |
| `{}` | 表达式插值，可在 HTML 中嵌入变量。 |

---

## 🌍 路由系统关键词

| 关键词 | 含义 |
|--------|------|
| **文件路由** | 根据 `src/pages` 目录结构自动生成路由。 |
| **动态路由** | 文件名中包含方括号的动态参数，如 `[id].astro` → `/123`。 |
| **嵌套路由** | 文件夹结构自动形成嵌套路由，如 `blog/[slug].astro` → `/blog/post-name`。 |
| **getStaticPaths()** | 返回静态页面路径集合，用于动态生成多页内容。 |
| **Astro.redirect()** | 在构建或请求时重定向到其他路径。 |

---

## 💫 集成与前端框架

| 关键词 | 含义 |
|--------|------|
| **Integrations** | 扩展 Astro 功能的插件机制（如 React/Vue 支持、Markdown 解析等）。 |
| **@astrojs/react** | 让 Astro 能渲染 React 组件。 |
| **@astrojs/vue** | 让 Astro 能渲染 Vue 组件。 |
| **@astrojs/svelte** | 让 Astro 能渲染 Svelte 组件。 |
| **@astrojs/mdx** | 支持在 `.mdx` 文件中混合使用 Markdown 与组件。 |

---

## 📖 Markdown 与内容系统

| 关键词 | 含义 |
|--------|------|
| **Content Collections** | 内容集合系统，用于结构化管理 Markdown/MDX 内容。 |
| **Frontmatter** | Markdown 文件顶部的元数据块（YAML 格式）。 |
| **Content Entry** | 内容条目，即单个 Markdown 文件。 |
| **getCollection()** | 从内容集合中读取文档数据的 API。 |
| **slug** | Markdown 文件路径的简写 URL 标识。 |

---

## ⚡ 构建与部署

| 关键词 | 含义 |
|--------|------|
| **Static Site Generation (SSG)** | 默认模式：在构建时生成静态 HTML。 |
| **Server-Side Rendering (SSR)** | 在服务器上动态渲染页面。 |
| **Hybrid Rendering** | 某些页面静态生成，部分页面 SSR。 |
| **Vercel / Netlify / Cloudflare** | 常见 Astro 部署目标平台。 |
| **Astro preview** | 本地运行已构建的产物以检查输出效果。 |

---

## 🎨 样式与资源

| 关键词 | 含义 |
|--------|------|
| **Scoped CSS** | `.astro` 文件内的 `<style>` 默认只作用于当前组件。 |
| **Global Styles** | 添加 `:global()` 或导入全局样式文件。 |
| **Tailwind / UnoCSS / SCSS** | 可通过集成插件直接使用。 |
| **Image Optimization** | 通过 `@astrojs/image` 插件实现图片优化与懒加载。 |

---

## 🧠 进阶概念

| 关键词 | 含义 |
|--------|------|
| **Client Directive** | 控制组件如何加载的指令，如 `client:load`、`client:visible`、`client:idle`。 |
| **Astro Islands** | 页面中可交互的独立 JS 模块（即“岛屿”）。 |
| **Astro.fetchContent()** | （旧版）获取内容的 API，现已由 Content Collections 替代。 |
| **Astro.glob()** | 动态导入匹配的文件。 |
| **Astro.locals** | SSR 模式下共享的上下文对象。 |

---

## 🧰 常用 CLI 命令

| 命令 | 功能 |
|------|------|
| `npm create astro@latest` | 创建新项目。 |
| `npm run dev` | 启动本地开发服务器。 |
| `npm run build` | 构建静态网站。 |
| `npm run preview` | 预览构建结果。 |
| `astro add [integration]` | 安装并配置集成插件。 |

---

## 🔗 参考资料

- 🌐 官方网站：[https://astro.build](https://astro.build)  
- 📘 文档中心：[https://docs.astro.build](https://docs.astro.build)  
- 🧩 官方集成库：[https://astro.build/integrations](https://astro.build/integrations)  
- 💬 社区论坛：[https://astro.build/chat](https://astro.build/chat)

---

🪐 **总结**
> Astro 通过“静态优先 + 部分水合”理念，兼具性能与灵活性。  
> 熟悉这些关键词，可以帮助你更快掌握 Astro 项目的组织、配置与渲染逻辑。

