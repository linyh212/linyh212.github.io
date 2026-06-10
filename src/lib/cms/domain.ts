import { getCollection } from "astro:content"
import { getMeta, type ContentEntry } from "./core"

export async function getDomainEntries(root: string) {
  return await getCollection("content", ({ id }) => id.startsWith(`${root}/`));
}

export async function getGroupEntries(root: string, group: string) {
  const entries = await getDomainEntries(root);
  return getGroupEntriesByRoot(entries, root, group);
}

export function parsePath(id: string) {
  const parts = id.split("/");

  return {
    root: parts[0] ?? "unknown",
    group: parts[1] ?? "general",
    slug: parts.at(-1),
  };
}

export function getGroupsByRoot(entries: ContentEntry[]) {
  const groupsByRoot: { [key: string]: string[] } = {};
  for (const entry of entries) {
    const meta = getMeta(entry);
    if (!groupsByRoot[meta.root]) {
      groupsByRoot[meta.root] = [];
    }
    if (!groupsByRoot[meta.root].includes(meta.group)) {
      groupsByRoot[meta.root].push(meta.group);
    }
  }
  return groupsByRoot;
}

export function getGroupEntriesByRoot(entries: ContentEntry[], root: string, group: string) {
  return entries.filter((entry) => {
    const meta = getMeta(entry);
    return meta.root === root && meta.group === group;
  });
}

export function formatGroupMeta(entries: ContentEntry[]) {
  if (entries.length === 0) return '';
  const dates = entries.map(entry => new Date(entry.data.date || 0)).filter(d => !isNaN(d.getTime()));
  if (dates.length === 0) return '';

  const latestDate = new Date(Math.max(...dates.map(d => d.getTime())));
  return latestDate.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getRootGroupTitle(root: string) {
  // This could be extended with a map for custom titles
  return root.charAt(0).toUpperCase() + root.slice(1);
}