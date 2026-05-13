import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkKanbun from './src/lib/remark-kanbun.js';
import remarkRuby from './src/lib/remark-ruby.js';

export default defineConfig({
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkMath, remarkRuby, remarkKanbun],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
