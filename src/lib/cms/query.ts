import { getCollection } from "astro:content";
import { getMeta, type ContentEntry } from "./core";

const metaCache = new WeakMap<ContentEntry, ReturnType<typeof getMeta>>();

function getCachedMeta(entry: ContentEntry) {
  let meta = metaCache.get(entry);
  if (!meta) {
    meta = getMeta(entry);
    metaCache.set(entry, meta);
  }
  return meta;
}

/** --- 資料查詢 --- */
export async function getEntries(root?: string) {
  return await getCollection("content", root ? ({ id }) => id.startsWith(`${root}/`) : undefined);
}

export function filterByGroup(entries: ContentEntry[], root: string, group: string) {
  return entries.filter((e) => {
    const m = getCachedMeta(e);
    return m.root === root && m.group === group;
  });
}

export async function getGroupEntries(root: string, group: string) {
  const entries = await getEntries(root);
  return filterByGroup(entries, root, group);
}

export function findBySlug(entries: ContentEntry[], root: string, group: string, slug: string) {
  return entries.find((e) => {
    const m = getMeta(e);
    return m.root === root && m.group === group && m.slug === slug;
  });
}

export function getGroupsMap(entries: ContentEntry[]) {
  const map: Record<string, string[]> = {};
  for (const entry of entries) {
    const { root, group } = getMeta(entry);
    if (!map[root]) map[root] = [];
    if (!map[root].includes(group)) map[root].push(group);
  }
  return map;
}

/** --- 路由生成 --- */
export async function generateSlugRoutes(root: string, groupParam: string) {
  const entries = await getEntries(root);
  return entries.map((e) => ({
    params: { [groupParam]: getMeta(e).group, slug: getMeta(e).slug },
    props: { entry: e },
  }));
}

export async function generateAllSlugRoutes(rootParam: string, groupParam: string) {
  const entries = await getEntries();
  return entries.map((e) => ({
    params: { [rootParam]: getMeta(e).root, [groupParam]: getMeta(e).group, slug: getMeta(e).slug },
    props: { entry: e },
  }));
}

export async function generateGroupRoutes(root: string, rootParam: string, groupParam: string) {
  const entries = await getEntries(root);
  const groups = new Set<string>();
  for (const e of entries) {
    groups.add(getCachedMeta(e).group);
  }
  return Array.from(groups).map((g) => ({
    params: { [rootParam]: root, [groupParam]: g },
    props: { group: g },
  }));
}

export async function generateAllGroupRoutes(rootParam: string, groupParam: string) {
  const map = getGroupsMap(await getEntries());
  return Object.entries(map).flatMap(([root, groups]) =>
    groups.map((g) => ({ params: { [rootParam]: root, [groupParam]: g }, props: { group: g } }))
  );
}

/** --- UI 導航與樹狀結構 --- */
export function buildProjectTree(entries: ContentEntry[]) {
  const rootMap = new Map<string, any>();

  for (const entry of entries) {
    const { root, group } = getCachedMeta(entry);
    
    if (!rootMap.has(root)) {
      rootMap.set(root, { root, title: formatTitle(root), groupMap: new Map() });
    }
    
    const section = rootMap.get(root);
    let g = section.groupMap.get(group);
    if (!g) {
      g = { name: group, title: formatTitle(group), count: 0, href: `/project/${root}/${group}` };
      section.groupMap.set(group, g);
    }
    g.count++;
  }

  return Array.from(rootMap.values()).map(({ groupMap, ...rest }) => ({
    ...rest,
    groups: Array.from(groupMap.values()),
  }));
}

/** --- 格式化工具 --- */
export function formatDate(entries: ContentEntry[]) {
  const maxTime = entries.reduce((max, e) => {
    const time = new Date(e.data.date || 0).getTime();
    return isNaN(time) ? max : Math.max(max, time);
  }, 0);

  return maxTime > 0
    ? new Date(maxTime).toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
}

export function formatTitle(text: string) {
  return text.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export const getAllEntries = () => getEntries();
export const getDomainEntries = (root: string) => getEntries(root);