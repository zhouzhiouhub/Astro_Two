import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const distDir = join(process.cwd(), "dist");

// 确保 dist 存在
if (!existsSync(distDir)) {
  console.error("❌ dist/ directory not found. Did you run `astro build`?");
  process.exit(1);
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
      let target = '/en/';
      if (lang.startsWith('zh')) target = '/zh/';
      window.location.replace(target);
    })();
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0;url=/en/" />
  </noscript>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>`;

// 写入 dist/index.html
const indexPath = join(distDir, "index.html");
writeFileSync(indexPath, html);

console.log("✅ Added dist/index.html for language auto-redirect.");


