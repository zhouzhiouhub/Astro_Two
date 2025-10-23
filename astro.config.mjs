import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://example.com',
  alias: {
    '@': './src',
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap()
  ],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
  prefetch: true,
});
