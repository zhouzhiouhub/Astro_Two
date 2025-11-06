import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import { remarkModifiedTime } from "./remark-modified-time.mjs";
import config from "./src/config/config.json" with { type: "json" };

// 智能检测部署环境
const isDev = import.meta.env.DEV;

// 从配置读取 GitHub 信息
const githubUser = config.site.github_user;
const githubRepo = config.site.github_repo;
const hasGitHubConfig = githubUser && githubRepo;

// 检测是否为 GitHub Pages 部署
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.DEPLOY_TARGET === 'github-pages';

// 动态配置 site 和 base
let site, base;

if (isDev) {
  // 开发环境：始终使用 localhost
  site = 'http://localhost:4321';
  base = '/';
} else {
  // 生产环境：优先级从高到低
  
  // 1. 显式指定的环境变量（最高优先级）
  if (process.env.SITE_URL) {
    site = process.env.SITE_URL;
    base = process.env.BASE_PATH || '/';
  }
  // 2. GitHub Pages 部署（CI 环境或显式指定）
  else if (isGitHubPages && hasGitHubConfig) {
    site = `https://${githubUser}.github.io/${githubRepo}`;
    base = `/${githubRepo}/`;
  }
  // 3. 默认：根路径部署（适用于 Vercel、Netlify、自定义域名等）
  else {
    site = process.env.SITE_URL || 'https://yourdomain.com';
    base = '/';
  }
}

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: config.site.trailing_slash ? "always" : "never",

  // Pure static output - no SSR or server endpoints needed
  output: "static",

  // Image optimization uses Sharp service by default in Astro 4.x
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },

  // Vite configuration
  vite: {
    build: {
      // Optimize chunks for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'aos-vendor': ['aos']
          }
        }
      }
    }
  },

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We have custom base styles in src/styles/tailwind.css
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          zh: 'zh-CN',
        }
      },
      filter: (page) => {
        // Filter out any test or debug pages
        return !page.includes('test-') && !page.includes('debug-');
      }
    }),
    mdx(),
  ],

  markdown: {
    remarkPlugins: [
      remarkModifiedTime,
      [remarkToc, { heading: "contents" }],
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
});
