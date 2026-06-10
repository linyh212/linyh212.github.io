import { getCollection } from "astro:content";
import { getMeta } from "./core";
import { getRootGroupTitle } from "./domain";
import { parsePath } from "./domain";

export function buildProjectTree(entries) {
  const map = new Map();

  for (const entry of entries) {
    const parts = entry.id?.split("/") ?? [];

    const { root, group } = parsePath(entry.id);
    
    if (!map.has(root)) {
      map.set(root, {
        root,
        title: getRootGroupTitle(root),
        groups: [],
      });
    }

    const node = map.get(root);

    let g = node.groups.find((x) => x.name === group);

    if (!g) {
      g = {
        name: group,
        count: 0,
        meta: "",
        href: `/project/${root}/${group}`,
      };
      node.groups.push(g);
    }

    g.count++;
  }

  return Array.from(map.values());
}