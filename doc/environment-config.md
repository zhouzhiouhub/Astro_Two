# 环境配置说明

## 为什么不应该写死网址？

之前的配置方式：
```json
{
  "site": {
    "base_url": "https://zhouzhiouhub.github.io/Astro_Two",
    "base_path": "/Astro_Two/"
  }
}
```

### 问题

1. **不灵活** - 每次更换部署平台或域名都要修改配置
2. **本地开发不便** - 本地开发时路径不匹配
3. **违反 DRY 原则** - 配置重复且难以维护
4. **不符合最佳实践** - 无法适应不同环境

## 新的智能配置方案

### 自动环境检测

`astro.config.mjs` 现在会自动检测环境并配置正确的路径：

```javascript
// 智能检测部署环境
const isDev = import.meta.env.DEV;
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || 
                      process.env.DEPLOY_TARGET === 'github-pages';

// 动态配置 site 和 base
let site, base;

if (isDev) {
  // 本地开发环境 - 使用 localhost
  site = 'http://localhost:4321';
  base = '/';
} else if (isGitHubPages) {
  // GitHub Pages - 自动从 config.json 读取仓库信息
  site = `https://${user}.github.io/${repo}`;
  base = `/${repo}/`;
} else {
  // 其他生产环境 (Vercel, Netlify, etc.)
  site = process.env.SITE_URL || 'https://yourdomain.com';
  base = process.env.BASE_PATH || '/';
}
```

### 配置文件简化

`src/config/config.json` 只保留必要信息：

```json
{
  "site": {
    "trailing_slash": false,
    "title": "zhouzhiou",
    "description": "...",
    "github_repo": "Astro_Two",
    "github_user": "zhouzhiouhub"
  }
}
```

## 不同环境的使用方式

### 1. 本地开发

```bash
npm run dev
```

自动使用 `http://localhost:4321` 和 `/` 作为基础路径

### 2. GitHub Pages 部署

GitHub Actions 会自动检测 `GITHUB_ACTIONS=true` 环境变量，并从 `config.json` 读取仓库信息，自动配置为：
- Site: `https://zhouzhiouhub.github.io/Astro_Two`
- Base: `/Astro_Two/`

### 3. 其他平台部署

#### Vercel
在 Vercel 仪表板设置环境变量：
- `SITE_URL`: 你的域名
- `BASE_PATH`: `/` (默认)

#### Netlify
在 Netlify 设置环境变量：
- `SITE_URL`: 你的域名
- `BASE_PATH`: `/` (默认)

#### 自定义域名
如果你有自己的域名，只需设置：
```bash
SITE_URL=https://yourdomain.com npm run build
```

## 本地测试 GitHub Pages 构建

如果你想在本地测试 GitHub Pages 的构建结果：

```bash
npm run build:github
npm run preview
```

然后访问 `http://localhost:4321/Astro_Two/`

## 环境变量优先级

1. **环境变量** (最高优先级) - `SITE_URL`, `BASE_PATH`
2. **自动检测** - 检测 `GITHUB_ACTIONS` 或 `DEPLOY_TARGET`
3. **默认值** (最低优先级) - 开发环境默认值

## 优势总结

✅ **零配置** - 大多数情况下无需手动配置  
✅ **灵活性** - 通过环境变量轻松覆盖  
✅ **可维护性** - 配置逻辑集中在一处  
✅ **开发体验** - 本地开发和生产环境自动切换  
✅ **多平台支持** - GitHub Pages、Vercel、Netlify 等  
✅ **遵循最佳实践** - 符合 12-Factor App 原则

## 迁移到自定义域名

如果将来你要使用自定义域名：

1. **购买域名并配置 DNS**
2. **在部署平台添加域名**
3. **设置环境变量**：
   ```
   SITE_URL=https://yourdomain.com
   BASE_PATH=/
   ```
4. **重新部署** - 无需修改代码！

## 常见问题

### Q: 为什么本地预览显示 404？
A: 如果你运行了 `npm run build:github`，需要访问 `http://localhost:4321/Astro_Two/` 而不是根路径。

### Q: 如何强制使用特定配置？
A: 设置环境变量：
```bash
SITE_URL=https://example.com BASE_PATH=/blog/ npm run build
```

### Q: GitHub Actions 自动检测失败怎么办？
A: 检查 `config.json` 中的 `github_user` 和 `github_repo` 是否正确。

