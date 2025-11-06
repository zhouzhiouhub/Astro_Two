import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const target = process.env.DEPLOY_TARGET || 'prod';
const isGitHubPages = target === 'gh';

const siteFromEnv = process.env.SITE_URL?.replace(/\/$/, '');
const baseFromEnv = process.env.SITE_BASE ?? undefined;

const site = siteFromEnv || (isGitHubPages ? 'https://zhouzhiouhub.github.io' : undefined);
const base = baseFromEnv || (isGitHubPages ? '/Astro_Two/' : '/');

export default defineConfig({
  site,
  base,
  alias: {
    '@': './src',
  },
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
  prefetch: true,
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
    routing: 'manual',
  },
});
