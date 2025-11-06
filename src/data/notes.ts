import type { Locale } from "@/lib/i18n";

export interface NoteEntry {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  updatedAt: string;
  link?: string;
}

type NotesMap = Record<Locale, NoteEntry[]>;

export const notesByLocale: NotesMap = {
  en: [
    {
      id: "astro-content-pipeline",
      slug: "astro-content-pipeline",
      title: "Astro content pipeline checklist",
      summary: "Steps for shipping a new article: draft in MD, run accessibility audits, collect Lighthouse metrics, and publish via CI.",
      content: `# Astro Content Pipeline Checklist

This note outlines the workflow for publishing new articles on Astro-based sites.

## Pre-Publishing Steps

### 1. Draft in Markdown
- Write content in standard Markdown format
- Use frontmatter for metadata (title, date, tags)
- Add proper heading hierarchy (h1 → h2 → h3)

### 2. Accessibility Review
- Run automated accessibility checks
- Ensure proper alt text for all images
- Verify color contrast ratios meet WCAG AA standards
- Check keyboard navigation flow

### 3. Lighthouse Metrics
- Collect performance metrics
- Target scores: Performance > 90, Accessibility > 95
- Optimize images and defer non-critical resources
- Check Core Web Vitals (LCP, FID, CLS)

### 4. CI/CD Deployment
- Push to Git repository
- Automated build via GitHub Actions or similar
- Deploy to production environment
- Verify live version

## Post-Publishing

- Monitor analytics for reader engagement
- Check for broken links
- Gather feedback and iterate

This checklist ensures consistent quality across all published content.`,
      tags: ["Astro", "workflow", "writing"],
      updatedAt: "2025-10-12",
    },
    {
      id: "qt-renderthread",
      slug: "qt-renderthread",
      title: "Qt render thread patterns",
      summary: "Comparing QRhi, QQuickRenderControl, and raw OpenGL contexts for LED wall visualisers.",
      content: `# Qt Render Thread Patterns

Quick reference for choosing the right rendering approach in Qt applications, especially for LED wall visualizations.

## QRhi (Qt Rendering Hardware Interface)

**When to use:**
- Need cross-platform backend support (OpenGL, Vulkan, Metal, D3D11)
- Building modern Qt 6+ applications
- Want hardware abstraction without vendor lock-in

**Key features:**
- Unified API across graphics backends
- Better performance on mobile and embedded
- Future-proof for Qt 6.x evolution

## QQuickRenderControl

**When to use:**
- Integrating Qt Quick in non-Qt Quick applications
- Need fine-grained control over rendering timing
- Offscreen rendering scenarios

**Key features:**
- Custom render loop management
- Ability to render Qt Quick in custom OpenGL contexts
- Essential for LED wall synchronization

## Raw OpenGL Context

**When to use:**
- Maximum performance is critical
- Custom shader pipelines
- Legacy hardware support

**Key features:**
- Direct GPU control
- No Qt overhead
- Full flexibility at the cost of portability

## LED Wall Specific Considerations

For large-scale LED displays:
- Use QQuickRenderControl for frame-perfect sync
- Implement custom swap buffers for multi-output
- Consider QRhi for future hardware flexibility

## Performance Tips

1. Minimize state changes
2. Batch similar draw calls
3. Use instancing for repeated geometry
4. Profile with Qt Creator's QML Profiler`,
      tags: ["Qt", "graphics", "hardware"],
      updatedAt: "2025-09-28",
    },
    {
      id: "led-color-calibration",
      slug: "led-color-calibration",
      title: "LED color calibration cheatsheet",
      summary: "Gamma curves, white balance matrices, and how to profile fixtures with a SpyderX probe.",
      content: `# LED Color Calibration Cheatsheet

Essential reference for calibrating LED fixtures and ensuring accurate color reproduction.

## Gamma Curves

### Standard Gamma Values
- **sRGB**: γ ≈ 2.2 (most common for displays)
- **LED fixtures**: Often γ = 2.0-2.8 depending on diode characteristics
- **Cinema**: γ = 2.6

### Applying Gamma Correction
\`\`\`cpp
// Simple gamma correction
corrected = pow(input, 1.0 / gamma);
\`\`\`

### Common Issues
- Too low gamma: Washed out midtones
- Too high gamma: Crushed shadows
- Non-uniform gamma: Color shifts at different brightness levels

## White Balance Matrices

### Purpose
Convert from design color space to fixture's native color space.

### 3x3 Matrix Approach
\`\`\`
R_out     M11 M12 M13     R_in
G_out  =  M21 M22 M23  ×  G_in
B_out     M31 M32 M33     B_in
\`\`\`

### Calibration Steps
1. Measure native white point (likely not D65)
2. Measure RGB primaries with spectrophotometer
3. Calculate transformation matrix
4. Apply before gamma correction

## SpyderX Calibration Workflow

### Equipment Setup
- Mount SpyderX probe facing fixture at 1m distance
- Ensure dark environment (< 5 lux ambient)
- Allow 30min warmup for LED stabilization

### Measurement Process
1. **Black Level**: Measure with fixture off
2. **Primary Colors**: Measure R, G, B at 100%
3. **Gray Scale**: Measure 10%, 25%, 50%, 75%, 100% white
4. **Color Gamut**: Optional - measure secondary colors

### Software Integration
- Use DisplayCAL or manufacturer tools
- Export ICC profile or 3D LUT
- Apply in content pipeline or LED processor

## Quick Reference Table

| Parameter | Target Value | Tolerance |
|-----------|-------------|-----------|
| White Point | D65 (6500K) | ±200K |
| ΔE (color accuracy) | < 2.0 | Industry standard |
| Gamma | 2.2 | ±0.1 |
| Brightness uniformity | > 90% | Across fixture |

## Common Fixture Issues

- **Green tint**: Often calibration matrix issue
- **Color shift over time**: LED aging, recalibrate every 6 months
- **Flicker**: PWM frequency too low, use > 1kHz

## Resources
- CIE colorimetry standards
- LED manufacturer calibration data sheets
- Open source tools: ArgyllCMS, DisplayCAL`,
      tags: ["LED", "color", "hardware"],
      updatedAt: "2025-08-31",
    },
    {
      id: "translation-workflow",
      slug: "translation-workflow",
      title: "Translation workflow automation",
      summary: "Using Content Collections, git hooks, and DeepL to keep zh/en content in sync.",
      content: `# Translation Workflow Automation

Automate bilingual content synchronization for Astro sites with Content Collections.

## Architecture Overview

### Components
1. **Content Collections**: Astro's native content management
2. **Git Hooks**: Trigger automation on commits
3. **DeepL API**: High-quality machine translation
4. **Sync Script**: Custom logic to maintain parity

## Implementation Steps

### 1. Content Collection Setup

\`\`\`typescript
// src/content/config.ts
export const collections = {
  posts: defineCollection({
    schema: z.object({
      locale: z.enum(['en', 'zh']),
      slugBase: z.string(),
      title: z.string(),
      // ... other fields
    })
  })
};
\`\`\`

### 2. Git Hook Configuration

\`\`\`bash
# .husky/pre-commit
#!/bin/sh
npm run sync-translations
\`\`\`

### 3. Translation Sync Script

\`\`\`javascript
// scripts/sync-translations.js
async function syncContent() {
  // 1. Detect changed Markdown files
  const changed = getGitChangedFiles();
  
  // 2. Identify locale (en/zh)
  const sourceLocale = detectLocale(changed);
  
  // 3. Check if translation exists
  const targetPath = getTranslationPath(changed, targetLocale);
  
  // 4. If missing, create via DeepL
  if (!exists(targetPath)) {
    const translated = await translateWithDeepL(content);
    writeFile(targetPath, translated);
  }
  
  // 5. Update frontmatter timestamps
  updateLastSync(targetPath);
}
\`\`\`

### 4. DeepL Integration

\`\`\`javascript
async function translateWithDeepL(text, targetLang) {
  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': \`DeepL-Auth-Key \${process.env.DEEPL_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: [text],
      target_lang: targetLang.toUpperCase()
    })
  });
  
  const data = await response.json();
  return data.translations[0].text;
}
\`\`\`

## Best Practices

### Content Structure
- Keep technical terms in English (use <code> tags)
- Separate translatable strings from metadata
- Use consistent heading hierarchy

### Translation Quality
- Review machine translations before publishing
- Maintain glossary for domain terms
- Test links and image paths work in both locales

### Git Workflow
1. Write content in primary language (e.g., English)
2. Commit triggers auto-translation
3. Review and refine translated version
4. Push both versions together

## Monitoring Sync Status

Create a dashboard showing:
- Files with stale translations
- Translation date vs source date
- DeepL API usage and costs

## Common Issues

**Problem**: Translation changes source formatting  
**Solution**: Use Markdown-aware translation, preserve frontmatter

**Problem**: DeepL rate limits  
**Solution**: Implement request queue and caching

**Problem**: Git conflicts on auto-commits  
**Solution**: Pull before auto-translation, handle conflicts manually

## Cost Optimization

- Cache repeated phrases
- Use DeepL Free API for < 500k chars/month
- Translate only changed paragraphs, not entire files

This workflow saves hours of manual translation while maintaining content quality across languages.`,
      tags: ["i18n", "automation", "writing"],
      updatedAt: "2025-07-15",
    },
    {
      id: "pagefind-snippets",
      slug: "pagefind-snippets",
      title: "Pagefind search snippets",
      summary: "Customising Pagefind UI to surface tags, code blocks, and reading time metadata.",
      content: `# Pagefind Search Customization

Practical snippets for customizing Pagefind search UI in Astro projects.

## Installation

\`\`\`bash
npm install -D pagefind
\`\`\`

## Basic Integration

\`\`\`javascript
// In your Astro component
import { pagefind } from 'pagefind';

// Initialize search
const search = await pagefind.search("query");
\`\`\`

## Surfacing Custom Metadata

### Tags

\`\`\`html
<!-- Add to your content -->
<article data-pagefind-body data-pagefind-meta="tags:React,TypeScript">
  <!-- content -->
</article>
\`\`\`

### Code Blocks

\`\`\`javascript
// Custom filter for code blocks
{
  "selectors": {
    "code[class*='language-']": {
      "data-pagefind-index-attrs": "class"
    }
  }
}
\`\`\`

### Reading Time

\`\`\`html
<meta property="pagefind:reading_time" content="5 min read" />
\`\`\`

## UI Customization

### Search Modal Component

\`\`\`astro
---
// SearchModal.astro
const { lang } = Astro.props;
---
<div id="search-modal" class="hidden">
  <div id="search"></div>
</div>

<script>
  import { PagefindUI } from "@pagefind/default-ui";
  
  const search = new PagefindUI({
    element: "#search",
    showSubResults: true,
    excerptLength: 30,
    translations: {
      placeholder: "Search notes...",
      no_results: "No notes found"
    }
  });
</script>
\`\`\`

### Custom Result Template

\`\`\`javascript
search.on("result", (result) => {
  return \`
    <article>
      <h3>\${result.meta.title}</h3>
      <div class="tags">
        \${result.meta.tags?.map(tag => \`<span>#\${tag}</span>\`).join('')}
      </div>
      <p>\${result.excerpt}</p>
      <span class="reading-time">\${result.meta.reading_time}</span>
    </article>
  \`;
});
\`\`\`

## Advanced Features

### Faceted Search by Tags

\`\`\`javascript
const filters = {
  tags: await pagefind.filters()
};

// Filter by specific tag
const results = await pagefind.search("query", {
  filters: { tags: ["Astro"] }
});
\`\`\`

### Highlighting Matches

\`\`\`javascript
pagefind.highlight({
  mark: {
    className: "search-highlight",
    style: "background: yellow;"
  }
});
\`\`\`

### Keyboard Navigation

\`\`\`javascript
document.addEventListener('keydown', (e) => {
  // Cmd/Ctrl + K to open search
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  }
});
\`\`\`

## Build Configuration

\`\`\`javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [
    // Pagefind runs post-build
  ],
  build: {
    // Ensure pagefind can index the dist folder
  }
});
\`\`\`

## Performance Tips

1. **Index only necessary content**: Use \`data-pagefind-ignore\` for sidebars, footers
2. **Lazy load search**: Import Pagefind only when search is opened
3. **Debounce queries**: Wait 300ms after last keystroke
4. **Cache results**: Store recent searches in sessionStorage

## Example: Full Implementation

See the GitHub repository for a complete example with:
- Keyboard shortcuts
- Tag filtering
- Reading time display
- Mobile-responsive modal
- Dark mode support

**Repository**: https://github.com/zhouzhiou/pagefind-snippets

This setup provides a fast, client-side search without requiring a server or external service.`,
      tags: ["Astro", "search", "design"],
      updatedAt: "2025-06-02",
      link: "https://github.com/zhouzhiou/pagefind-snippets",
    },
  ],
  zh: [
    {
      id: "astro-content-pipeline",
      slug: "astro-content-pipeline",
      title: "Astro 内容发布清单",
      summary: "新文章上线流程：Markdown 草稿、可访问性审查、Lighthouse 指标采集、CI 发布。",
      content: `# Astro 内容发布清单

本笔记总结了在 Astro 站点上发布新文章的完整流程。

## 发布前步骤

### 1. Markdown 草稿
- 使用标准 Markdown 格式撰写内容
- 在 frontmatter 中添加元数据（标题、日期、标签）
- 确保标题层级清晰（h1 → h2 → h3）

### 2. 可访问性审查
- 运行自动化无障碍检查工具
- 为所有图片添加合适的 alt 文本
- 验证色彩对比度符合 WCAG AA 标准
- 检查键盘导航流程

### 3. Lighthouse 指标采集
- 收集性能指标
- 目标分数：性能 > 90，可访问性 > 95
- 优化图片并延迟加载非关键资源
- 检查核心 Web 指标（LCP、FID、CLS）

### 4. CI/CD 部署
- 推送至 Git 仓库
- 通过 GitHub Actions 或类似工具自动构建
- 部署到生产环境
- 验证线上版本

## 发布后工作

- 监控分析数据，了解读者参与度
- 检查是否存在失效链接
- 收集反馈并持续迭代

此清单确保所有发布内容的一致性与质量。`,
      tags: ["Astro", "流程", "写作"],
      updatedAt: "2025-10-12",
    },
    {
      id: "qt-renderthread",
      slug: "qt-renderthread",
      title: "Qt 渲染线程模式速记",
      summary: "对比 QRhi、QQuickRenderControl 与原生 OpenGL，在 LED 大屏可视化中的应用。",
      content: `# Qt 渲染线程模式速记

在 Qt 应用中选择合适渲染方式的快速参考，特别适用于 LED 大屏可视化场景。

## QRhi（Qt 渲染硬件接口）

**适用场景：**
- 需要跨平台后端支持（OpenGL、Vulkan、Metal、D3D11）
- 构建现代 Qt 6+ 应用
- 需要硬件抽象而不依赖特定供应商

**核心特性：**
- 统一的跨图形后端 API
- 移动端和嵌入式设备上性能更优
- 为 Qt 6.x 演进做好准备

## QQuickRenderControl

**适用场景：**
- 在非 Qt Quick 应用中集成 Qt Quick
- 需要对渲染时机进行精细控制
- 离屏渲染场景

**核心特性：**
- 自定义渲染循环管理
- 可在自定义 OpenGL 上下文中渲染 Qt Quick
- 对 LED 大屏同步至关重要

## 原生 OpenGL 上下文

**适用场景：**
- 极致性能至关重要
- 自定义着色器管线
- 需要支持老旧硬件

**核心特性：**
- 直接控制 GPU
- 无 Qt 开销
- 灵活性最高但可移植性较差

## LED 大屏专用考虑

对于大型 LED 显示屏：
- 使用 QQuickRenderControl 实现帧级同步
- 为多输出实现自定义交换缓冲区
- 考虑使用 QRhi 以适应未来硬件变化

## 性能提示

1. 最小化状态切换
2. 批量处理相似的绘制调用
3. 对重复几何体使用实例化
4. 使用 Qt Creator 的 QML Profiler 进行性能分析`,
      tags: ["Qt", "图形", "硬件"],
      updatedAt: "2025-09-28",
    },
    {
      id: "led-color-calibration",
      slug: "led-color-calibration",
      title: "LED 色彩校准速查表",
      summary: "总结伽马曲线、白平衡矩阵，以及使用 SpyderX 探头校准灯具的方法。",
      content: `# LED 色彩校准速查表

LED 灯具校准与确保准确色彩还原的核心参考。

## 伽马曲线

### 标准伽马值
- **sRGB**：γ ≈ 2.2（显示器最常用）
- **LED 灯具**：通常 γ = 2.0-2.8，取决于二极管特性
- **电影院**：γ = 2.6

### 应用伽马校正
\`\`\`cpp
// 简单的伽马校正
corrected = pow(input, 1.0 / gamma);
\`\`\`

### 常见问题
- 伽马过低：中间调发白
- 伽马过高：阴影压缩
- 伽马不均匀：不同亮度下色偏

## 白平衡矩阵

### 用途
从设计色彩空间转换到灯具原生色彩空间。

### 3x3 矩阵方法
\`\`\`
R_out     M11 M12 M13     R_in
G_out  =  M21 M22 M23  ×  G_in
B_out     M31 M32 M33     B_in
\`\`\`

### 校准步骤
1. 测量原生白点（通常不是 D65）
2. 使用分光光度计测量 RGB 原色
3. 计算转换矩阵
4. 在伽马校正前应用

## SpyderX 校准工作流

### 设备设置
- 将 SpyderX 探头安装在距灯具 1 米处
- 确保暗室环境（< 5 lux 环境光）
- 预热 LED 灯具 30 分钟以稳定

### 测量流程
1. **黑电平**：灯具关闭时测量
2. **原色**：测量 100% R、G、B
3. **灰阶**：测量 10%、25%、50%、75%、100% 白色
4. **色域**：可选 - 测量二次色

### 软件集成
- 使用 DisplayCAL 或厂商工具
- 导出 ICC 配置文件或 3D LUT
- 在内容管线或 LED 处理器中应用

## 快速参考表

| 参数 | 目标值 | 容差 |
|-----------|-------------|-----------|
| 白点 | D65 (6500K) | ±200K |
| ΔE（色彩准确度） | < 2.0 | 行业标准 |
| 伽马 | 2.2 | ±0.1 |
| 亮度均匀性 | > 90% | 跨灯具 |

## 常见灯具问题

- **绿色色调**：通常是校准矩阵问题
- **色彩随时间偏移**：LED 老化，每 6 个月重新校准
- **闪烁**：PWM 频率过低，使用 > 1kHz

## 参考资源
- CIE 色度学标准
- LED 厂商校准数据表
- 开源工具：ArgyllCMS、DisplayCAL`,
      tags: ["LED", "色彩", "硬件"],
      updatedAt: "2025-08-31",
    },
    {
      id: "translation-workflow",
      slug: "translation-workflow",
      title: "双语内容同步自动化",
      summary: "借助 Content Collection、git 钩子与 DeepL，使中英文内容保持同步。",
      content: `# 双语内容同步自动化

使用 Content Collections 为 Astro 站点实现双语内容自动同步。

## 架构总览

### 组件
1. **Content Collections**：Astro 原生内容管理
2. **Git Hooks**：在提交时触发自动化
3. **DeepL API**：高质量机器翻译
4. **同步脚本**：自定义逻辑维护一致性

## 实现步骤

### 1. Content Collection 设置

\`\`\`typescript
// src/content/config.ts
export const collections = {
  posts: defineCollection({
    schema: z.object({
      locale: z.enum(['en', 'zh']),
      slugBase: z.string(),
      title: z.string(),
      // ... 其他字段
    })
  })
};
\`\`\`

### 2. Git Hook 配置

\`\`\`bash
# .husky/pre-commit
#!/bin/sh
npm run sync-translations
\`\`\`

### 3. 翻译同步脚本

\`\`\`javascript
// scripts/sync-translations.js
async function syncContent() {
  // 1. 检测变更的 Markdown 文件
  const changed = getGitChangedFiles();
  
  // 2. 识别语言 (en/zh)
  const sourceLocale = detectLocale(changed);
  
  // 3. 检查译文是否存在
  const targetPath = getTranslationPath(changed, targetLocale);
  
  // 4. 如果不存在，通过 DeepL 创建
  if (!exists(targetPath)) {
    const translated = await translateWithDeepL(content);
    writeFile(targetPath, translated);
  }
  
  // 5. 更新 frontmatter 时间戳
  updateLastSync(targetPath);
}
\`\`\`

### 4. DeepL 集成

\`\`\`javascript
async function translateWithDeepL(text, targetLang) {
  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': \`DeepL-Auth-Key \${process.env.DEEPL_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: [text],
      target_lang: targetLang.toUpperCase()
    })
  });
  
  const data = await response.json();
  return data.translations[0].text;
}
\`\`\`

## 最佳实践

### 内容结构
- 技术术语保持英文（使用 <code> 标签）
- 将可翻译字符串与元数据分离
- 使用一致的标题层级

### 翻译质量
- 发布前审查机器翻译
- 维护领域术语词汇表
- 测试链接和图片路径在两种语言下均可用

### Git 工作流
1. 用主要语言撰写内容（如英文）
2. 提交触发自动翻译
3. 审查并优化译文版本
4. 同时推送两种语言版本

## 监控同步状态

创建仪表板显示：
- 译文过时的文件
- 译文日期 vs 源文件日期
- DeepL API 使用情况与费用

## 常见问题

**问题**：翻译改变了源格式  
**解决方案**：使用 Markdown 感知翻译，保留 frontmatter

**问题**：DeepL 速率限制  
**解决方案**：实现请求队列和缓存

**问题**：自动提交时的 Git 冲突  
**解决方案**：翻译前先拉取，手动处理冲突

## 成本优化

- 缓存重复短语
- 使用 DeepL 免费 API（< 50 万字符/月）
- 只翻译变更的段落，而非整个文件

此工作流可节省数小时的手动翻译时间，同时保持跨语言的内容质量。`,
      tags: ["i18n", "自动化", "写作"],
      updatedAt: "2025-07-15",
    },
    {
      id: "pagefind-snippets",
      slug: "pagefind-snippets",
      title: "Pagefind 检索定制笔记",
      summary: "设计 Pagefind UI，突出标签、代码块与阅读时间元数据。",
      content: `# Pagefind 检索定制

在 Astro 项目中自定义 Pagefind 搜索 UI 的实用代码片段。

## 安装

\`\`\`bash
npm install -D pagefind
\`\`\`

## 基础集成

\`\`\`javascript
// 在 Astro 组件中
import { pagefind } from 'pagefind';

// 初始化搜索
const search = await pagefind.search("query");
\`\`\`

## 展示自定义元数据

### 标签

\`\`\`html
<!-- 添加到内容中 -->
<article data-pagefind-body data-pagefind-meta="tags:React,TypeScript">
  <!-- 内容 -->
</article>
\`\`\`

### 代码块

\`\`\`javascript
// 自定义过滤器用于代码块
{
  "selectors": {
    "code[class*='language-']": {
      "data-pagefind-index-attrs": "class"
    }
  }
}
\`\`\`

### 阅读时间

\`\`\`html
<meta property="pagefind:reading_time" content="5 分钟阅读" />
\`\`\`

## UI 自定义

### 搜索模态组件

\`\`\`astro
---
// SearchModal.astro
const { lang } = Astro.props;
---
<div id="search-modal" class="hidden">
  <div id="search"></div>
</div>

<script>
  import { PagefindUI } from "@pagefind/default-ui";
  
  const search = new PagefindUI({
    element: "#search",
    showSubResults: true,
    excerptLength: 30,
    translations: {
      placeholder: "搜索笔记...",
      no_results: "未找到笔记"
    }
  });
</script>
\`\`\`

### 自定义结果模板

\`\`\`javascript
search.on("result", (result) => {
  return \`
    <article>
      <h3>\${result.meta.title}</h3>
      <div class="tags">
        \${result.meta.tags?.map(tag => \`<span>#\${tag}</span>\`).join('')}
      </div>
      <p>\${result.excerpt}</p>
      <span class="reading-time">\${result.meta.reading_time}</span>
    </article>
  \`;
});
\`\`\`

## 高级功能

### 按标签分面搜索

\`\`\`javascript
const filters = {
  tags: await pagefind.filters()
};

// 按特定标签筛选
const results = await pagefind.search("query", {
  filters: { tags: ["Astro"] }
});
\`\`\`

### 高亮匹配

\`\`\`javascript
pagefind.highlight({
  mark: {
    className: "search-highlight",
    style: "background: yellow;"
  }
});
\`\`\`

### 键盘导航

\`\`\`javascript
document.addEventListener('keydown', (e) => {
  // Cmd/Ctrl + K 打开搜索
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  }
});
\`\`\`

## 构建配置

\`\`\`javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [
    // Pagefind 在构建后运行
  ],
  build: {
    // 确保 pagefind 可以索引 dist 文件夹
  }
});
\`\`\`

## 性能提示

1. **仅索引必要内容**：对侧边栏、页脚使用 \`data-pagefind-ignore\`
2. **懒加载搜索**：仅在打开搜索时导入 Pagefind
3. **防抖查询**：最后一次按键后等待 300ms
4. **缓存结果**：将近期搜索存储在 sessionStorage

## 示例：完整实现

查看 GitHub 仓库获取完整示例，包含：
- 键盘快捷键
- 标签筛选
- 阅读时间显示
- 移动端响应式模态框
- 深色模式支持

**仓库地址**：https://github.com/zhouzhiou/pagefind-snippets

此设置提供快速的客户端搜索，无需服务器或外部服务。`,
      tags: ["Astro", "搜索", "设计"],
      updatedAt: "2025-06-02",
      link: "https://github.com/zhouzhiou/pagefind-snippets",
    },
  ],
};

export const noteTagsByLocale: Record<Locale, string> = {
  en: "Tags",
  zh: "标签",
};

export function getNoteBySlug(locale: Locale, slug: string): NoteEntry | undefined {
  return notesByLocale[locale]?.find((item) => item.slug === slug);
}


