# Astro Two - 多语言静态站点

一个基于 Astro 构建的现代化、多语言（中文/英文）静态网站，支持自动语言检测和智能部署配置。

## ✨ 特性

- 🌍 **多语言支持** - 中文/英文双语，自动语言检测
- 🎨 **现代化设计** - TailwindCSS + 响应式布局
- 🚀 **极速性能** - 静态生成，极致优化
- 📱 **移动优先** - 完美适配各种设备
- 🔍 **SEO 优化** - 自动生成 Sitemap、RSS
- 🎯 **智能部署** - 自动适配 GitHub Pages、Vercel、Netlify 等平台

---

## 📋 目录

- [快速开始](#快速开始)
- [开发指南](#开发指南)
- [构建与部署](#构建与部署)
- [部署平台配置](#部署平台配置)
- [配置说明](#配置说明)
- [常见问题](#常见问题)

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.14.0
- npm 或 pnpm

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:4321` 查看网站。
- 中文版：`http://localhost:4321/zh/`
- 英文版：`http://localhost:4321/en/`
- 根路径会自动根据浏览器语言重定向

---

## 💻 开发指南

### 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（支持热重载） |
| `npm run build` | 构建生产版本（根路径配置） |
| `npm run build:github` | 构建 GitHub Pages 版本（子路径配置） |
| `npm run preview` | 预览构建后的网站 |
| `npm run check` | TypeScript 类型检查 |

### 项目结构

```
Astro_Two/
├── src/
│   ├── components/      # 可复用组件
│   ├── content/         # 内容集合（博客、FAQ 等）
│   ├── data/            # 数据文件
│   ├── layouts/         # 布局模板
│   ├── lib/             # 工具函数和配置
│   │   └── i18n/        # 国际化配置
│   ├── pages/           # 页面路由
│   │   ├── [lang]/      # 多语言页面
│   │   └── api/         # API 端点
│   └── styles/          # 全局样式
├── public/              # 静态资源
├── scripts/             # 构建脚本
│   └── postbuild.mjs    # 构建后处理脚本
└── src/config/
    └── config.json      # 站点配置
```

---

## 📦 构建与部署

### 构建逻辑说明

项目采用**智能环境检测**机制，根据不同场景自动配置路径：

| 场景 | 命令 | 生成的 basePath | 说明 |
|------|------|----------------|------|
| 🏠 **本地开发** | `npm run dev` | 开发服务器 | 实时热重载，无需构建 |
| 📦 **本地构建/预览** | `npm run build` | `/` | 根路径，方便本地测试 |
| 🧪 **GitHub Pages 测试** | `npm run build:github` | `/Astro_Two/` | 完全模拟 GitHub Pages |
| 🤖 **GitHub Actions** | 自动检测 | `/Astro_Two/` | CI 环境自动配置 |
| ☁️ **Vercel/Netlify** | `npm run build` | `/` | 自定义域名，根路径 |

### 本地预览流程

```bash
# 1. 构建网站
npm run build

# 2. 预览构建结果
npm run preview

# 3. 访问
# http://localhost:4321/zh/  (中文)
# http://localhost:4321/en/  (英文)
```

### 测试 GitHub Pages 构建

```bash
# 1. 使用 GitHub Pages 配置构建
npm run build:github

# 2. 预览
npm run preview

# 3. 访问（注意路径包含仓库名）
# http://localhost:4321/Astro_Two/zh/
# http://localhost:4321/Astro_Two/en/
```

---

## 🌐 部署平台配置

### 1️⃣ GitHub Pages（当前配置）

#### 自动部署

推送到 `main` 分支会自动触发部署：

```bash
git add .
git commit -m "Update content"
git push
```

**访问地址：** `https://zhouzhiouhub.github.io/Astro_Two/`

#### GitHub Actions 配置

项目已配置 `.github/workflows/deploy.yml`，会自动：
1. 检测到推送
2. 安装依赖
3. 运行 `npm run build`（自动检测 GitHub Actions 环境）
4. 部署到 GitHub Pages

#### ⚠️ 重要说明

- **构建命令**：GitHub Actions 使用 `npm run build`（不是 `build:github`）
- **自动检测**：系统会自动检测 `GITHUB_ACTIONS=true` 环境变量
- **路径配置**：自动生成 `/Astro_Two/` 子路径
- **仓库设置**：确保 GitHub Pages 设置为 "GitHub Actions" 源

---

### 2️⃣ Vercel 部署

#### 方式 1：通过 GitHub 集成（推荐）

1. 访问 [vercel.com](https://vercel.com)
2. 导入 GitHub 仓库
3. Vercel 会自动检测 Astro 项目
4. 部署设置：
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### 方式 2：使用 CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

**优势：**
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自定义域名
- ✅ 自动预览部署

---

### 3️⃣ Netlify 部署

#### 方式 1：通过 GitHub 集成

1. 访问 [netlify.com](https://netlify.com)
2. 导入 GitHub 仓库
3. 部署设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### 方式 2：使用 CLI

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod
```

---

### 4️⃣ Cloudflare Pages

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com)
2. 连接 GitHub 仓库
3. 构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

---

### 5️⃣ 自定义服务器部署

#### 根域名部署

```bash
# 1. 构建
npm run build

# 2. 上传 dist 文件夹到服务器
scp -r dist/* user@yourserver.com:/var/www/html/

# 或使用 rsync
rsync -avz --delete dist/ user@yourserver.com:/var/www/html/
```

#### 子目录部署

如果要部署到 `https://yourdomain.com/blog/`：

```bash
# 1. 使用环境变量构建
SITE_URL=https://yourdomain.com BASE_PATH=/blog/ npm run build

# 2. 上传到子目录
scp -r dist/* user@yourserver.com:/var/www/html/blog/
```

---

## ⚙️ 配置说明

### 站点配置文件

`src/config/config.json`:

```json
{
  "site": {
    "trailing_slash": false,
    "title": "zhouzhiou",
    "description": "Exploring frontier technology, design, and personal projects.",
    "github_repo": "Astro_Two",
    "github_user": "zhouzhiouhub"
  }
}
```

#### 配置项说明

| 字段 | 说明 | 必填 |
|------|------|------|
| `title` | 网站标题 | ✅ |
| `description` | 网站描述（用于 SEO） | ✅ |
| `github_user` | GitHub 用户名 | ⚠️ 部署到 GitHub Pages 时必填 |
| `github_repo` | GitHub 仓库名 | ⚠️ 部署到 GitHub Pages 时必填 |
| `trailing_slash` | URL 是否包含尾部斜杠 | ✅ |

### 环境变量

可以通过环境变量覆盖默认配置：

| 环境变量 | 说明 | 示例 |
|---------|------|------|
| `SITE_URL` | 站点 URL | `https://yourdomain.com` |
| `BASE_PATH` | 基础路径 | `/blog/` |
| `DEPLOY_TARGET` | 部署目标 | `github-pages` |
| `GITHUB_ACTIONS` | GitHub Actions 环境 | `true`（自动设置） |

#### 使用示例

```bash
# 部署到自定义域名
SITE_URL=https://example.com npm run build

# 部署到子目录
SITE_URL=https://example.com BASE_PATH=/blog/ npm run build

# 强制使用 GitHub Pages 配置
DEPLOY_TARGET=github-pages npm run build
```

---

## 🎯 路径配置决策树

系统使用以下优先级决定路径配置：

```
1. 开发环境（npm run dev）
   → basePath: '/'
   → 开发服务器，无需 dist 构建

2. 显式环境变量（最高优先级）
   → SITE_URL + BASE_PATH
   → 完全自定义

3. GitHub Pages 检测
   → 检测到：GITHUB_ACTIONS=true 或 DEPLOY_TARGET=github-pages
   → 且配置了 github_user + github_repo
   → basePath: '/仓库名/'

4. 默认配置
   → basePath: '/'
   → 适用于 Vercel、Netlify、自定义域名等
```

---

## ❓ 常见问题

### Q1: 本地 `npm run build` 后预览，为什么和部署到 GitHub Pages 的路径不一样？

**A:** 这是设计如此。
- **本地构建** (`npm run build`): 生成根路径 `/`，方便本地预览
- **GitHub Pages**: 使用 `build:github` 或 CI 自动检测，生成 `/Astro_Two/` 子路径

如需本地测试 GitHub Pages 路径：
```bash
npm run build:github
npm run preview
# 访问 http://localhost:4321/Astro_Two/
```

---

### Q2: 部署到 Vercel 后，为什么链接都是 404？

**A:** 检查以下几点：
1. 确认 Vercel 使用的构建命令是 `npm run build`（不是 `build:github`）
2. 确认没有设置 `DEPLOY_TARGET=github-pages` 环境变量
3. Vercel 应该自动使用根路径 `/`

---

### Q3: 如何修改为其他仓库名或用户名？

**A:** 修改 `src/config/config.json`:

```json
{
  "site": {
    "github_user": "你的用户名",
    "github_repo": "你的仓库名"
  }
}
```

然后重新部署即可。

---

### Q4: 能否部署到自定义域名？

**A:** 可以！支持多种方式：

**GitHub Pages + 自定义域名：**
1. 在 GitHub 仓库设置中配置自定义域名
2. GitHub Pages 会自动使用根路径
3. 无需修改代码

**Vercel/Netlify + 自定义域名：**
1. 在平台配置域名
2. 构建命令使用 `npm run build`
3. 自动使用根路径

---

### Q5: 如何添加新的语言？

**A:** 需要修改以下文件：
1. `src/lib/i18n/` - 添加语言配置
2. `astro.config.mjs` - sitemap 配置
3. `src/pages/[lang]/` - 添加新语言页面
4. `public/lang-detect-core.js` - 语言检测逻辑

---

### Q6: 本地开发时，如何测试不同语言？

**A:** 
- 中文：`http://localhost:4321/zh/`
- 英文：`http://localhost:4321/en/`
- 自动检测：`http://localhost:4321/`（根据浏览器语言跳转）

修改浏览器语言设置可测试自动检测功能。

---

## 📚 技术栈

- **框架**: [Astro](https://astro.build)
- **样式**: [TailwindCSS](https://tailwindcss.com)
- **UI 组件**: [React](https://react.dev)
- **内容**: [MDX](https://mdxjs.com)
- **部署**: GitHub Pages / Vercel / Netlify

---

## 🔧 开发注意事项

### 1. 不要手动修改 `dist/` 文件夹

`dist/` 是构建产物，每次运行 `npm run build` 都会重新生成。

### 2. `postbuild.mjs` 脚本的作用

构建后自动运行，生成 `dist/index.html` 用于语言自动重定向。
- 与 `astro.config.mjs` 使用相同的路径检测逻辑
- 不要手动编辑生成的 `dist/index.html`

### 3. 环境变量的优先级

```
显式环境变量 > GitHub Actions 检测 > 默认配置
```

如果部署时路径不对，检查是否有意外的环境变量。

### 4. 跨平台兼容性

项目使用 `cross-env` 确保 Windows/Mac/Linux 环境变量兼容。

### 5. Git 推送前检查

```bash
# 运行类型检查
npm run check

# 确保构建成功
npm run build
```

---

## 📄 许可证

MIT License

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📞 联系方式

- GitHub: [@zhouzhiouhub](https://github.com/zhouzhiouhub)
- 网站: [https://zhouzhiouhub.github.io/Astro_Two/](https://zhouzhiouhub.github.io/Astro_Two/)

---

## 🔄 更新日志

### 最新优化（2024）

- ✅ 智能环境检测机制
- ✅ 跨平台环境变量支持（cross-env）
- ✅ 本地构建与 GitHub Pages 路径分离
- ✅ 完整的部署文档

---

**享受构建吧！** 🚀

