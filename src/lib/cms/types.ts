import type { CollectionEntry } from 'astro:content'

export type ContentEntry = CollectionEntry<'content'>

export type ContentMeta = {
  root: string
  group: string
  slug: string
}