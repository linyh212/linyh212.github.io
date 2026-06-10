import type { CollectionEntry } from "astro:content"
import { parsePath } from "./domain";

export type ContentEntry = CollectionEntry<"content">

export function getMeta(entry: ContentEntry) {
  const d = entry.data
  const pathParts = parsePath(entry.id);

  return {
    root: d.root ?? pathParts.root,
    group: d.group ?? pathParts.group,
    slug: d.slug ?? pathParts.slug
  }
}