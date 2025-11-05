import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zhouzhiou.asia',
  alias: {
    '@': './src',
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap()
  ],
  prefetch: true,
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
    routing: 'manual',
  },
});
