import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://zhouzhiou.com',
  alias: {
    '@': './src',
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap()
  ],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
  prefetch: true,
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
    routing: 'manual',
  },
});
