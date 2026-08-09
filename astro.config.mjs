import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: "https://thamara.co.uk",
  adapter: vercel(),
  devToolbar: {
    enabled: false
  },
  build: {
    inlineStylesheets: `always`,
  },
  integrations: [
    sitemap({
      xslURL: '/sitemap.xslt'
    }),
  ],
});