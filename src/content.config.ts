import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    description: z.string().default(''),
    image: z.string().default(''),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    lang: z.string().default('zh_CN'),
  }),
});

export const collections = { posts };
