import type { CollectionEntry } from 'astro:content'

export type ContentEntry = CollectionEntry<'content'>

export function getContentId(entry: ContentEntry) {
  return String(entry.id)
}

export function getContentRoot(entry: ContentEntry) {
  return getContentId(entry).split('/')[0] ?? ''
}

export function getGroupName(entry: ContentEntry) {
  const parts = getContentId(entry).split('/')
  return parts.length > 1 ? parts[1] : parts[0]
}

export function getUniqueGroups(entries: ContentEntry[]) {
  return [...new Set(entries.map(getGroupName))].sort()
}

export function getRoots(entries: ContentEntry[]) {
  return [...new Set(entries.map(getContentRoot))].sort()
}

export function getGroupsByRoot(entries: ContentEntry[]) {
  return getRoots(entries).reduce((acc: Record<string, string[]>, root) => {
    acc[root] = [...new Set(entries
      .filter((entry) => getContentRoot(entry) === root)
      .map(getGroupName))].sort()
    return acc
  }, {})
}

export function getGroupEntries(entries: ContentEntry[], group: string) {
  return entries.filter((entry) => getGroupName(entry) === group)
}

export function getGroupEntriesByRoot(entries: ContentEntry[], root: string, group: string) {
  return entries.filter((entry) => getContentRoot(entry) === root && getGroupName(entry) === group)
}

export function getRootGroupTitle(root: string) {
  if (root === 'project') return 'Projects'
  if (root === 'note') return 'Notes'
  return root.charAt(0).toUpperCase() + root.slice(1)
}

export function formatGroupMeta(entries: ContentEntry[]) {
  const dates = entries
    .map((entry) => entry.data?.date)
    .filter((value): value is Date => value instanceof Date)

  if (dates.length === 0) return ''
  const latest = new Date(Math.max(...dates.map((date) => date.valueOf())))
  return latest.toLocaleDateString('zh-TW')
}
