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

// 智能检测部署环境（与 astro.config.mjs 保持一致）
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.DEPLOY_TARGET === 'github-pages';
let basePath = '/';

if (isGitHubPages && config.site.github_repo) {
  basePath = `/${config.site.github_repo}/`;
} else if (process.env.BASE_PATH) {
  basePath = process.env.BASE_PATH;
}

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


