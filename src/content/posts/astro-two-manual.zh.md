---
locale: zh
slugBase: astro-two-manual
title: "Astro Two 使用手册：部署、国际化与运维"
description: "完整解析 Astro Two 项目的目录结构、i18n 工作流、内容写作、API 配置以及部署上线流程。"
date: 2025-11-05
tags: [astro, guide, handbook]
summary: "从本地开发到多语言扩展、API 部署、Pagefind 搜索和邮件系统配置，手把手梳理 Astro Two 项目的使用方法，帮助你快速定制自己的站点。"
cover:
  src: "./media/hero-code.svg"
  alt: "Astro Two 项目结构与工具示意"
related: ["astro-i18n-demo", "astro-keywords"]
---

# Astro Two 使用手册

## 项目概览
- 项目地址：[Astro_Two 仓库](https://github.com/zhouzhiouhub/Astro_Two)
- 技术栈：Astro 4、Tailwind CSS、Pagefind、astro-i18n、Zod、Nodemailer
- 默认支持语言：简体中文 (`zh`)、英语 (`en`)，首页基于 `Accept-Language` 自动重定向
- 站点结构：核心页面位于 `src/pages/[lang]`，内容集合在 `src/content`，公共数据在 `src/data`

## 环境要求
- Node.js ≥ 18.14（推荐使用 20 LTS）
- npm ≥ 9（或 pnpm/yarn，需自行替换命令）
- 163 邮箱授权码（用于内置联系表单，可参照 `doc/email.md` 配置）

## 快速开始
1. 克隆仓库并进入目录：
   ```bash
   git clone https://github.com/zhouzhiouhub/Astro_Two.git
   cd Astro_Two
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
3. 本地开发：运行 `npm run dev` 并访问 `http://localhost:4321`
4. 生产预览：
   ```bash
   npm run build
   npm run preview
   ```

## npm 脚本说明
- `npm run dev`：启动 Astro Dev Server
- `npm run build`：执行静态化构建，并调用 `pagefind` 生成站内搜索索引
- `npm run preview`：以生产模式预览构建结果
- `npm run check`：运行 Astro 自检（类型、内容、链接等）

## 目录结构速览
| 目录 | 用途 |
| --- | --- |
| `src/pages/[lang]` | 多语言页面（`[lang]` 由中间件注入，手动控制路由） |
| `src/components` | 纯展示型 UI 组件 |
| `src/layouts` | 布局组件，统一 SEO、主题与外框架 |
| `src/lib/i18n` | 文案词典、语言工具、类型定义 |
| `src/content` | Astro Content 集合：`posts`、`faq` 等 Markdown 资源 |
| `src/data` | 结构化页面数据（如 `about.ts`、`projects.ts`） |
| `src/pages/api` | 服务端 API：联系表单、SMTP 验证 |
| `public` | 静态资源（图标、OG 图、robots、RSS） |
| `doc` | 项目文档（使用手册、邮箱配置说明等） |

## 多语言与路由
- `astro.config.mjs` 中启用 `i18n.routing = 'manual'`，再由 `src/middleware.ts` 自动识别语言前缀并重定向
- `src/lib/i18n/index.ts` 定义 `SUPPORTED_LOCALES`、`defaultLocale` 和翻译工具函数
- 文案命名空间在 `src/lib/i18n/schema.ts` 中声明，语言文件为 `en.ts`、`zh.ts`
- `LocaleSwitcher.astro` 控制语言切换，`pathWithLocale()` 确保链接保留语言前缀

### 新增语言步骤
1. 在 `src/lib/i18n/schema.ts` 扩展枚举，加入新语言代码（如 `ja`）
2. 新建 `src/lib/i18n/ja.ts`，导出与 `en/zh` 相同结构的字典
3. 在 `src/lib/i18n/index.ts`：
   - 引入 `ja`
   - 将 `'ja'` 加入 `SUPPORTED_LOCALES`
   - 在 `dict` 映射中注册 `ja`
4. 更新 `src/content/config.ts` 的 `locale` 枚举，允许集合内容使用新语言
5. 在 `src/content/posts`、`src/content/faq` 等集合中添加对应语言的 Markdown 文件
6. 复制 `src/pages/[lang]` 下的页面结构，确保翻译键存在
7. 检查 `src/data` 中的多语言字段（常为对象内 `title`、`description`）并补全
8. 运行 `npm run dev` 验证路由、导航与 SEO 标签是否正确

## 添加新页面
1. 在 `src/pages/[lang]` 下创建页面（如 `case-studies.astro`）
2. 参考模板：
   ```astro
   ---
   import Base from '@/layouts/BaseLayout.astro';
   import Header from '@/components/Header.astro';
   import Footer from '@/components/Footer.astro';
   import { SUPPORTED_LOCALES, isLocale, t } from '@/lib/i18n';

   export function getStaticPaths() {
     return SUPPORTED_LOCALES.map((lang) => ({ params: { lang } }));
   }

   const { lang } = Astro.params;
   if (!lang || !isLocale(lang)) throw new Error('Invalid locale');
   const title = t('common', 'case_studies_title', lang);
   ---
   <Base title={title} lang={lang}>
     <Header lang={lang} />
     <main class="container py-12">...</main>
     <Footer lang={lang} />
   </Base>
   ```
3. 在 `src/lib/i18n/*` 中补充该页面相关的翻译键
4. 如需数据驱动内容，可在 `src/data` 新建模块或引入 Markdown 集合

## 内容创作与集合
- 博客：`src/content/posts`，文件命名格式 `slug.locale.md`
  - 示例 Frontmatter：
    ```markdown
    ---
    locale: zh
    slugBase: astro-i18n-demo
    title: "Astro 多语言快速指南"
    description: "..."
    date: 2025-01-10
    tags: ["astro", "i18n"]
    summary: "40-600 字摘要"
    cover:
      src: "/og/blog-astro-i18n.svg"
      alt: "..."
    related: ["astro-keywords"]
    ---
    正文内容...
    ```
- FAQ：`src/content/faq`，字段包含 `locale`、`question`、`order`
- 结构化页面：参阅 `src/data/home.ts`、`about.ts` 等，按语言对象维护文案

## 样式与设计
- Tailwind 在 `tailwind.config.cjs` 配置，基准样式位于 `src/styles/tailwind.css`
- 遵循高内聚：主题变量集中定义，组件内尽量使用实用类或局部样式
- 避免在逻辑层混入样式代码，保持 UI 与核心逻辑分离

## 搜索（Pagefind）
- `npm run build` 会执行 `pagefind --site dist --output-subdir pagefind`
- 自定义构建流程时，确保 `dist/pagefind` 随静态资源一同部署
- 前端通过 `SearchModal.astro` 使用 Pagefind UI，保证相关静态资源可访问

## API 与邮件系统
- API 端点：
  - `POST /api/contact`：处理联系表单，验证并发送邮件
  - `GET /api/mail-verify`：部署后检查 SMTP 凭证
- 环境变量：详见 `doc/email.md`
- `src/lib/mailer.ts` 默认使用 163 SMTP（465 端口），如需更换请调整 `host/port`
- `src/lib/authExpiryNotifier.ts` 在服务启动后每日检测授权码到期并发出提醒
- 若部署在纯静态平台（无 Node 运行时），需迁移 API 到无服务器函数或替换成第三方服务

## 部署与运行
1. 构建：`npm run build`
2. 确认 `dist/` 内包含页面、`pagefind` 索引、`rss.xml`、`sitemap`
3. 选择部署方式：
   - **Astro Node Adapter**：适合自托管或长期运行的 Node 服务
   - **Vercel / Netlify**：启用对应适配器，并在平台环境变量中配置 `MAIL_*`
   - **静态托管（如 Cloudflare Pages 静态模式）**：仅适用于无需联系表单的场景
4. 配置 CDN/缓存策略：静态资源可长期缓存，API 需根据平台配置

## SEO 与站点地图
- `src/lib/seo.ts` 管理共享 SEO 元数据
- `@astrojs/sitemap` 自动生成 `sitemap-*.xml`
- OG 资源位于 `public/og`
- RSS 订阅：`public/rss.xml`

## 测试与质量
- `npm run check` 保障类型、内容与链接有效
- 可在 CI 中运行 `npm run build` 捕捉构建警告
- 如需端到端测试，可引入 Playwright/Cypress，对关键流程（首页、博客、联系表单）做冒烟验证

## 常见问题
- **首页不走多语言前缀**：确认部署平台支持 Astro 中间件（Node 或 Edge）
- **Pagefind 索引缺失**：检查构建命令是否执行 `pagefind`
- **邮件发送失败**：查看 `/api/contact` 返回，或访问 `/api/mail-verify` 获取错误类型


