import { defineCollection, z } from 'astro:content';

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    locale: z.enum(['en','zh']),
    question: z.string(),
    order: z.number().default(0),
  })
});

// Blog posts collection with simple locale-aware schema
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    locale: z.enum(['en','zh']),
    slugBase: z.string(),
    title: z.string(),
    description: z.string().optional(),
    date: z.string().or(z.date()),
    tags: z.array(z.string()).default([]),
  })
});

export const collections = {
  faq,
  posts,
};
