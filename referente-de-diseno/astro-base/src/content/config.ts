import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    reading: z.number().int().positive().default(5),
    category: z.enum(['filosofia', 'educacion', 'ia']),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
