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

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
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
