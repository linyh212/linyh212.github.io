import type { CollectionEntry } from "astro:content"

export type ContentEntry = CollectionEntry<"content">

export type ContentMeta = {
  root: string
  group: string
  slug: string
}

export function parsePath(id: string): ContentMeta {
  const parts = id.split("/")
  const root = parts[0] ?? "unknown"
  const group = parts.length > 2 ? parts[1] : "general"
  const slug = parts.at(-1)?.replace(/\.[^/.]+$/, "") ?? ""

  return {
    root,
    group,
    slug,
  }
}

export function getMeta(entry: ContentEntry) {
  const d = (entry.data || {}) as Record<string, any>;
  const pathParts = parsePath(entry.id)

  return {
    root: typeof d.root === 'string' ? d.root : pathParts.root,
    group: typeof d.group === 'string' ? d.group : pathParts.group,
    slug: typeof d.slug === 'string' ? d.slug : pathParts.slug,
  }
}