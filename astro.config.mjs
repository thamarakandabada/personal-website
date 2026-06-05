import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // Example adapter

export default defineConfig({
  output: 'hybrid', // Allows static by default, but opts-in to SSR when needed
  adapter: vercel(),
});
