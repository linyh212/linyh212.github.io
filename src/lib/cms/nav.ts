import { getMeta } from './core'
import type { ContentEntry } from './types'

export function buildNav(entries: ContentEntry[]) {
  const tree: Record<string, Record<string, ContentEntry[]>> = {}

  for (const entry of entries) {
    const { root, group } = getMeta(entry)

    if (!tree[root]) tree[root] = {}
    if (!tree[root][group]) tree[root][group] = []

    tree[root][group].push(entry)
  }

  return tree
}