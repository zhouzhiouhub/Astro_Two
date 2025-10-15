import { defineCollection, z } from 'astro:content';

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    locale: z.enum(['en','zh']),
    question: z.string(),
    order: z.number().default(0),
  })
});

export const collections = {
  faq,
};

