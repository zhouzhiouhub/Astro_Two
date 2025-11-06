import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";

const distDir = join(process.cwd(), "dist");

// 确保 dist 存在
if (!existsSync(distDir)) {
  console.error("❌ dist/ directory not found. Did you run `astro build`?");
  process.exit(1);
}

// 读取配置以获取 base path
const configPath = join(process.cwd(), "src/config/config.json");
const config = JSON.parse(readFileSync(configPath, "utf-8"));

// 从配置读取 GitHub 信息
const githubUser = config.site.github_user;
const githubRepo = config.site.github_repo;
const hasGitHubConfig = githubUser && githubRepo;

// 智能检测部署环境（与 astro.config.mjs 保持一致）
let basePath = '/';

// 优先级从高到低
if (process.env.BASE_PATH) {
  // 1. 显式指定的环境变量（最高优先级）
  basePath = process.env.BASE_PATH;
} else if (process.env.GITHUB_ACTIONS === 'true' && hasGitHubConfig) {
  // 2. GitHub Actions 自动检测
  basePath = `/${githubRepo}/`;
} else if (hasGitHubConfig) {
  // 3. 有 GitHub 配置就默认用 GitHub Pages（本地构建也用这个）
  basePath = `/${githubRepo}/`;
}
// 4. 否则使用默认根路径 '/'

// 确保 basePath 以 / 结尾
if (basePath !== '/' && !basePath.endsWith('/')) {
  basePath += '/';
}

// HTML 内容：检测浏览器语言并跳转
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Redirecting...</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script>
    (function() {
      const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
      const basePath = '${basePath}';
      let target = basePath + 'en/';
      if (lang.startsWith('zh')) target = basePath + 'zh/';
      window.location.replace(target);
    })();
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0;url=${basePath}en/" />
  </noscript>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>`;

// 写入 dist/index.html
const indexPath = join(distDir, "index.html");
writeFileSync(indexPath, html);

console.log(`✅ Added dist/index.html with base path: ${basePath}`);


