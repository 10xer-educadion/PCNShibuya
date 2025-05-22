import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pcn.naranchu.jp/',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    build: {
      target: 'es2020',
      minify: 'esbuild',
    },
  },
  integrations: [
    react(),
    tailwind(),
    sitemap(),
  ],
});
