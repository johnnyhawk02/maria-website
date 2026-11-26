import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    photos: z.array(z.string()).nullish().transform((v) => v ?? []),
    price: z.string().nullish().transform((v) => v ?? ''),
    category: z.string().nullish().transform((v) => v ?? ''),
    code: z.string().nullish().transform((v) => v ?? ''),
    featured: z.boolean().nullish().transform((v) => v ?? false),
    order: z.number().nullish().transform((v) => v ?? 100),
  }),
});

export const collections = { products };
