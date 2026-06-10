import { getCollection } from 'astro:content'
import { getMeta } from './core'
import type { ContentEntry } from './types'

export async function getAllEntries(): Promise<ContentEntry[]> {
  return await getCollection('content')
}

export function filterByRoot(entries: ContentEntry[], root: string) {
  return entries.filter((e) => getMeta(e).root === root)
}

export function filterByGroup(
  entries: ContentEntry[],
  root: string,
  group: string
) {
  return entries.filter((e) => {
    const m = getMeta(e)
    return m.root === root && m.group === group
  })
}

export function findBySlug(
  entries: ContentEntry[],
  root: string,
  group: string,
  slug: string
) {
  return entries.find((e) => {
    const m = getMeta(e)
    return m.root === root && m.group === group && m.slug === slug
  })
}