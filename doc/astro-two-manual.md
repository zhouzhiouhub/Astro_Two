# Astro Two 使用手册 · Astro Two Usage Guide

## 简体中文

### 项目概览
- 项目地址：[Astro_Two 仓库](https://github.com/zhouzhiouhub/Astro_Two)
- 技术栈：Astro 4、Tailwind CSS、Pagefind、astro-i18n、Zod、Nodemailer
- 默认支持语言：简体中文 (`zh`)、英语 (`en`)，首页基于 `Accept-Language` 自动重定向
- 站点结构：核心页面位于 `src/pages/[lang]`，内容集合在 `src/content`，公共数据在 `src/data`

### 环境要求
- Node.js ≥ 18.14（推荐使用 20 LTS）
- npm ≥ 9（或 pnpm/yarn，需自行替换命令）
- 163 邮箱授权码（用于内置联系表单，可根据 `doc/email.md` 配置）

### 快速开始
1. 克隆仓库并进入目录：
   ```bash
   git clone https://github.com/zhouzhiouhub/Astro_Two.git
   cd Astro_Two
   ```
2. 安装依赖：`npm install`
3. 本地开发：`npm run dev`，访问 `http://localhost:4321`
4. 预览生产构建：
   ```bash
   npm run build
   npm run preview
   ```

### npm 脚本说明
- `npm run dev`：启动 Astro Dev Server
- `npm run build`：执行静态化构建并调用 `pagefind` 生成站内搜索索引
- `npm run preview`：以生产模式预览
- `npm run check`：运行 Astro 自检（语法、类型、链接等）

### 目录结构速览
| 目录 | 用途 |
| --- | --- |
| `src/pages/[lang]` | 多语言页面（`[lang]` 由中间件注入，手动路由） |
| `src/components` | 可复用 UI 组件（无业务逻辑） |
| `src/layouts` | 布局组件，统一 SEO、主题、脚手架 |
| `src/lib/i18n` | 文案词典、语言工具、类型定义 |
| `src/content` | Astro Content 集合：`posts`、`faq` 等 Markdown 资源 |
| `src/data` | 结构化页面数据（如 `about.ts`、`projects.ts`） |
| `src/pages/api` | 服务端 API：联系表单、邮件验证 |
| `public` | 静态资源（图标、OG 图、robots、RSS） |
| `doc` | 文档（包含本手册、邮件配置说明） |

### 多语言与路由
- `astro.config.mjs` 中启用 `i18n.routing = 'manual'`，通过 `src/middleware.ts` 自动识别语言前缀并重定向
- `src/lib/i18n/index.ts` 定义 `SUPPORTED_LOCALES` 与 `defaultLocale`
- 词条类型在 `src/lib/i18n/schema.ts` 内声明，语言文案分别在 `en.ts`、`zh.ts`
- `LocaleSwitcher.astro` 控制语言切换；`pathWithLocale()` 工具确保链接携带语言前缀

#### 新增语言步骤
1. 在 `src/lib/i18n/schema.ts` 中将 `locale` 类型扩展至新语言代码（如 `ja`）
2. 创建新的词典文件 `src/lib/i18n/ja.ts`，导出与 `en/zh` 同结构的命名空间
3. 在 `src/lib/i18n/index.ts` 中：
   - 添加 `import { ja } from './ja'`
   - 将 `'ja'` 加入 `SUPPORTED_LOCALES`
   - 在 `dict` 映射中注册 `ja`
4. 更新 `src/content/config.ts` 中 `locale` 枚举，允许新语言的内容
5. 为 `src/content/posts`、`src/content/faq` 等集合新增对应语言文件
6. 复制 `src/pages/[lang]` 下页面结构，如 `src/pages/[lang]/about.astro`，确保翻译字符串存在
7. 检查 `src/data` 中的多语言字段（通常是对象内 `title`、`description`）并补充新语言
8. 本地运行 `npm run dev` 验证路由、导航、SEO 标签是否正确加载

### 添加新页面
1. 在 `src/pages/[lang]` 下建立新文件（如 `case-studies.astro`）
2. 模板示例：
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
3. 在 `src/lib/i18n/*` 中补充 `case_studies_title` 等文案
4. 如需数据驱动内容，可在 `src/data` 新建模块或引入 Markdown 集合

### 内容创作与集合
- 博文：存放于 `src/content/posts`，文件命名格式 `slug.locale.md`
  - Frontmatter 模式：
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
- 结构化页面：查看 `src/data/home.ts`、`about.ts` 等，按语言对象维护

### 样式与设计
- Tailwind 已在 `tailwind.config.cjs` 中配置，基准样式由 `src/styles/tailwind.css` 控制
- 组件中遵循原子类 + 语义命名方式；自定义变量在 `:root` 主题内定义
- 若添加全局样式，请维护高内聚：主题相关写入 `tailwind.css`，组件特定样式局部化

### 搜索（Pagefind）
- 构建后 `npm run build` 会执行 `pagefind --site dist --output-subdir pagefind`
- 若使用自定义构建流程，需确保 `dist/pagefind` 目录与静态资源一同部署
- 前端通过 `SearchModal.astro` 使用 Pagefind UI，注意保持 `pagefind` 静态资源可访问

### API 与邮件系统
- 端点：
  - `POST /api/contact`：处理联系表单，验证并发送邮件
  - `GET /api/mail-verify`：触发 SMTP 连接验证
- 环境变量：详见 `doc/email.md`
- `src/lib/mailer.ts` 使用 163 SMTP（465 端口）发送邮件；可根据实际邮箱修改 `host`、`port`
- `src/lib/authExpiryNotifier.ts` 在服务启动后定时检测授权码到期并发送提醒
- 若部署在**纯静态平台**（无 Node 运行时），应迁移 API 到独立函数或第三方服务

### 部署与运行
1. 构建：`npm run build`
2. 确认 `dist/` 内包含：页面、`pagefind` 索引、`rss.xml`、`sitemap`
3. 选择部署方式：
   - **Astro Node Adapter**：适合自托管/服务商提供长期 Node 进程（确保 `@astrojs/node` 安装，构建时 `astro build --adapter node`）
   - **Vercel / Netlify**：推荐启用官方适配器，在平台环境变量中添加 `MAIL_*`
   - **静态托管（如 Cloudflare Pages 静态模式）**：仅适用于不需要联系表单的场景；否则需改用外部表单服务或 Workers 实现 API
4. CDN/缓存：静态资源自动缓存；动态 API 需根据平台设置缓存策略

### SEO 与站点地图
- `src/lib/seo.ts` 管理共享 SEO 元数据
- `@astrojs/sitemap` 自动生成 `sitemap-*.xml`
- Open Graph 资源位于 `public/og`
- RSS 订阅：`public/rss.xml`

### 测试与质量
- `npm run check` 保证类型与页面有效
- 自定义测试可结合 `npm run build` 验证是否存在构建警告
- 根据需要添加无头浏览器测试或截图对比，保持 UI 与逻辑分离

### 常见问题
- **首页不带语言前缀**：`middleware.ts` 自动重定向，确保部署平台支持中间件（Node/Edge）
- **Pagefind 索引缺失**：确认 `pagefind` 命令存在且构建后目录被上传
- **邮件发送失败**：查看 `/api/contact` 返回码，或访问 `/api/mail-verify` 检查 SMTP 凭证

---

## English

### Overview
- Repository: [Astro_Two project](https://github.com/zhouzhiouhub/Astro_Two)
- Stack: Astro 4, Tailwind CSS, Pagefind, astro-i18n, Zod, Nodemailer
- Supported locales: Simplified Chinese (`zh`) and English (`en`); middleware negotiates the best locale from `Accept-Language`
- Structure highlights: core routes in `src/pages/[lang]`, content collections in `src/content`, shared data in `src/data`

### Prerequisites
- Node.js ≥ 18.14 (20 LTS recommended)
- npm ≥ 9 (swap to pnpm/yarn if preferred)
- SMTP app password for 163 Mail (used by the built-in contact form)

### Quick Start
1. Clone and enter the project:
   ```bash
   git clone https://github.com/zhouzhiouhub/Astro_Two.git
   cd Astro_Two
   ```
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev` → browse `http://localhost:4321`
4. Production preview:
   ```bash
   npm run build
   npm run preview
   ```

### npm Scripts
- `npm run dev`: Astro dev server with live reload
- `npm run build`: static build followed by Pagefind index generation
- `npm run preview`: production preview server
- `npm run check`: Astro diagnostics (content schema, links, types)

### Directory Cheat Sheet
| Path | Purpose |
| --- | --- |
| `src/pages/[lang]` | Language-aware routes (manual i18n routing) |
| `src/components` | Reusable UI components (presentation only) |
| `src/layouts` | Layout shells handling SEO, meta, theming |
| `src/lib/i18n` | Localization dictionaries and helpers |
| `src/content` | Astro Content collections (`posts`, `faq`) |
| `src/data` | Structured data modules powering sections |
| `src/pages/api` | Server routes: contact form + SMTP probe |
| `public` | Static files (icons, OG images, rss, robots) |
| `doc` | Project documentation (email setup, this manual) |

### Internationalization Workflow
- `astro.config.mjs` enables manual routing; `src/middleware.ts` injects/redirects locale prefixes
- Supported locales and dictionaries live in `src/lib/i18n`
- Namespace definitions are kept in `schema.ts`; make sure every locale exposes identical keys
- `LocaleSwitcher.astro` uses `pathWithLocale()` to preserve the current route when switching languages

#### Add a New Locale
1. Extend enums in `src/lib/i18n/schema.ts` and `src/content/config.ts`
2. Create `src/lib/i18n/<locale>.ts` mirroring the namespace structure
3. Register the locale within `SUPPORTED_LOCALES` and the `dict` map (`index.ts`)
4. Duplicate or refactor page data in `src/data` for the new locale
5. Supply translated markdown for collections under `src/content`
6. Ensure every page under `src/pages/[lang]` renders without missing keys
7. Run `npm run dev` and navigate through the site to validate the locale switcher, meta tags, and sitemap entries

### Create a New Page
1. Drop an `.astro` file under `src/pages/[lang]` (e.g. `case-studies.astro`)
2. Export `getStaticPaths()` returning `SUPPORTED_LOCALES`
3. Validate the incoming `lang` with `isLocale` and resolve translated strings via `t()`
4. Wire shared UI (`Header`, `Footer`, layout) to keep presentation and logic separated
5. Add localization keys to each dictionary before shipping

### Writing Content
- **Blog posts**: Markdown files in `src/content/posts`. Required frontmatter includes `locale`, `slugBase`, `title`, `summary`, `date`, optional `cover`, `canonical`, `related`
- **FAQ**: `src/content/faq` with `locale`, `question`, `order`
- **Structured data**: TypeScript modules (e.g. `src/data/home.ts`) bundle richer objects for hero sections, pricing tables, etc.

### Styling
- Tailwind CSS powers most styling; utilities are declared in `src/styles/tailwind.css`
- Respect the separation of concerns: keep layout tokens centralized, encapsulate one-off styles within components

### Search (Pagefind)
- Build script generates search assets into `dist/pagefind`
- Ensure deployment uploads that directory alongside HTML; UI lives in `SearchModal.astro`
- When customizing the build pipeline, rerun `pagefind --site dist --output-subdir pagefind`

### API & Mail Delivery
- `POST /api/contact`: validates payload via Zod, sends email through Nodemailer
- `GET /api/mail-verify`: confirms SMTP credentials at deploy time or via health checks
- Required environment variables (`MAIL_USER`, `MAIL_PASS`, `AUTH_ISSUED_AT`, etc.) are documented in `doc/email.md`
- `authExpiryNotifier` schedules reminder emails ahead of SMTP token expiry; this requires a persistent Node runtime
- For static-only hosts, move the API into serverless functions or disable the contact form

### Deployment Checklist
1. Run `npm run build`
2. Upload the entire `dist/` folder including `pagefind`, `rss.xml`, and `sitemap-*`
3. Pick a runtime:
   - **Node adapter / self-hosted**: use `@astrojs/node` and serve via Node
   - **Vercel / Netlify**: install the corresponding adapter and configure environment variables in the dashboard
   - **Static hosting**: only if the API is replaced or disabled
4. Configure environment variables on the hosting platform; never commit secrets to git
5. Optionally set up cron or scheduled pings to keep the Node instance warm if reminders are critical

### SEO & Feeds
- Shared meta defaults come from `src/lib/seo.ts`
- The sitemap plugin outputs index files automatically
- OG assets live under `public/og`; update or add new SVGs/PNGs as needed
- `public/rss.xml` powers the blog feed—refresh it when introducing new categories or locales

### Quality & Maintenance
- Run `npm run check` before pull requests to catch early errors
- Consider adding Playwright/Cypress smoke tests for key flows (home, blog post, contact submit)
- Keep translations in sync: treat `schema.ts` as the single source of truth for namespaces
- Monitor SMTP errors by inspecting responses from `/api/contact` or by calling `/api/mail-verify`

### Troubleshooting
- **No locale redirect**: confirm middleware execution (requires platforms that run Astro middleware)
- **Missing search results**: verify `dist/pagefind` exists and is served as static assets
- **Mail failures**: check environment variables, whitelist the deployment IP in 163 Mail if necessary, inspect adapter logs


