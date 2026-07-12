import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: "https://astro.thamara.co.uk",
  adapter: vercel(),
  devToolbar: {
    enabled: false
  }
});