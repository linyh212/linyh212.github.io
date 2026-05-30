import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const project = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/project',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
  }),
})

export const collections = {
  project,
}
