---
locale: zh
slugBase: astro-i18n-demo
title: "Astro i18n 演示：本地化路由与内容"
description: "演示如何通过 [lang] 路由与内容集合来组织多语言文章。"
date: 2025-10-23
tags: [astro, i18n, content]
summary: "完整拆解 Astro 多语言站点实践：配置路由、维护共享字典、渲染中英文文章，并在不牺牲性能的前提下输出 hreflang、Accept-Language 等 SEO 元数据。"
cover:
  src: "/og/blog-astro-i18n.svg"
  alt: "Astro 多语言路由流程图"
canonical: "https://zhouzhiou.com/zh/blog/astro-i18n-demo"
related: ["astro-keywords"]
---

```markdown
# 🌍 Astro 国际化（i18n）路由实践指南

在构建多语言网站时，国际化（i18n）是提升全球用户体验的重要环节。  
本文将带你一步步了解如何在 **Astro** 中实现优雅的多语言（国际化）路由。

---

## 🧭 一、为什么选择 Astro 进行国际化？

Astro 是一个现代静态站点生成器，专注于性能与灵活性。  
它的核心理念是 “**岛屿架构（Islands Architecture）**” —— 让页面的静态部分保持纯净，同时只在需要的地方加载 JavaScript。

相比于 Next.js 或 Nuxt，Astro 没有内置 i18n 支持，但提供了极强的路由系统与灵活的插件生态。  
这让开发者能够根据项目规模与需求，自由定制多语言路由逻辑。

---

## 🏗️ 二、国际化路由的基本设计

常见的国际化 URL 结构有以下几种：

| 模式 | 示例 URL | 说明 |
|------|-----------|------|
| 子路径模式 | `/en/about`、`/zh/about` | 最常见且 SEO 友好 |
| 子域模式 | `en.example.com`、`zh.example.com` | 多站点部署 |
| 查询参数 | `/about?lang=zh` | 简单但不推荐用于 SEO |

在 Astro 中，我们通常选择 **子路径模式**，因为它：

- 与 Astro 的文件路由天然兼容；
- 更易被搜索引擎识别；
- 方便部署到静态主机（如 Vercel、Netlify）。

---

## 🧩 三、项目结构设计

我们可以使用如下结构来组织国际化页面：

```

src/
pages/
en/
index.astro
about.astro
zh/
index.astro
about.astro
i18n/
en.json
zh.json

````

其中：
- 每个语言子目录下的文件代表该语言版本的页面；
- `i18n` 文件夹存放文本翻译资源；
- 你可以通过自定义组件加载对应语言包。

---

## ⚙️ 四、动态加载多语言内容

可以创建一个简单的语言加载工具，例如：

```ts
// src/utils/i18n.ts
import en from '../i18n/en.json';
import zh from '../i18n/zh.json';

const languages = { en, zh };

export function getLangData(lang: string) {
  return languages[lang] || languages.en;
}
````

在页面中使用：

```astro
---
import { getLangData } from '../../utils/i18n';
const { lang } = Astro.params;
const t = getLangData(lang);
---

<html lang={lang}>
  <head>
    <title>{t.title}</title>
  </head>
  <body>
    <h1>{t.hello}</h1>
  </body>
</html>
```

---

## 🧠 五、路由参数与通配符

Astro 支持使用动态路由参数来捕获语言前缀。

```astro
// src/pages/[lang]/index.astro
---
import { getLangData } from '../../utils/i18n';
const { lang } = Astro.params;
const t = getLangData(lang);
---

<h1>{t.home_title}</h1>
```

同时，可以添加一个重定向页 `/index.astro` 来根据浏览器语言自动跳转：

```astro
---
// src/pages/index.astro
const userLang = Astro.request.headers.get('accept-language')?.split(',')[0].split('-')[0];
Astro.redirect(`/${userLang ?? 'en'}/`);
---
```

---

## 🌐 六、进阶：自动化路由与本地化链接

为了避免重复代码，我们可以抽象一个通用布局组件：

```astro
---
// src/layouts/I18nLayout.astro
const { lang, title } = Astro.props;
---
<html lang={lang}>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <nav>
      <a href={`/en/`}>English</a> | <a href={`/zh/`}>中文</a>
    </nav>
    <slot />
  </body>
</html>
```

然后在每个页面中直接引用：

```astro
---
import I18nLayout from '../../layouts/I18nLayout.astro';
import { getLangData } from '../../utils/i18n';
const { lang } = Astro.params;
const t = getLangData(lang);
---
<I18nLayout lang={lang} title={t.title}>
  <h1>{t.hello}</h1>
</I18nLayout>
```

---

## 🚀 七、部署与 SEO

* **生成静态路径**
  通过 `getStaticPaths()` 让 Astro 预生成所有语言版本：

  ```ts
  export async function getStaticPaths() {
    const langs = ['en', 'zh'];
    return langs.map((lang) => ({ params: { lang } }));
  }
  ```

* **设置 `<html lang>` 属性**
  有助于搜索引擎正确识别语言。

* **使用 `<link rel="alternate" hreflang="...">`**
  提示不同语言版本的对应关系，提高 SEO 效果。

---

## 🧩 八、结语

Astro 虽然没有开箱即用的国际化功能，但其灵活的文件路由与组件系统让实现多语言网站变得简单且优雅。
通过合理的目录设计与语言包加载机制，你可以轻松实现：

* 多语言内容切换；
* 动态路由与 SEO 友好；
* 自定义布局与语言导航。

未来，Astro 官方团队也计划引入更完善的 i18n 支持，但现在你已经可以用这些技巧构建专业的国际化网站！

---

> ✨ **小结**：
>
> * 使用子路径路由 `/[lang]/` 是最自然的 i18n 方案；
> * 利用 `getStaticPaths()` 生成多语言页面；
> * 用统一布局组件和 JSON 语言包管理翻译。

---

🧡 **作者**：ZhouZhiOu
📅 **更新日期**：2025-10-23
📘 **标签**：`Astro`、`i18n`、`Web开发`、`静态站点`

```
