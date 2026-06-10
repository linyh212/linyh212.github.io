import { getCollection } from "astro:content";
import { getMeta } from "./core";
import { getDomainEntries, getGroupsByRoot } from "./domain";

export async function generateSlugRoutes(root: string, groupParamName: string) {
  const entries = await getCollection("content", ({ id }) => id.startsWith(`${root}/`));
  
  return entries.map((entry) => {
    const m = getMeta(entry);
    return {
      params: {
        [groupParamName]: m.group,
        slug: m.slug,
      },
      props: { entry }
    };
  });
}

export async function generateAllSlugRoutes(rootParamName: string, groupParamName: string) {
  const entries = await getCollection("content");

  return entries.map((entry) => {
    const m = getMeta(entry);
    return {
      params: {
        [rootParamName]: m.root,
        [groupParamName]: m.group,
        slug: m.slug,
      },
      props: { entry }
    };
  });
}

export async function generateGroupRoutes(root: string, rootParamName: string, groupParamName: string) {
  const entries = await getDomainEntries(root); // Get all entries for the specific root
  const uniqueGroups = new Set<string>();

  for (const entry of entries) {
    const m = getMeta(entry);
    uniqueGroups.add(m.group);
  }

  return Array.from(uniqueGroups).map((groupName) => ({
    params: {
      [rootParamName]: root,
      [groupParamName]: groupName,
    },
    props: {
      group: groupName,
    }
  }));
}

export async function generateAllGroupRoutes(rootParamName: string, groupParamName: string) {
  const allEntries = await getCollection("content");
  const groupsByRoot = getGroupsByRoot(allEntries);

  return Object.entries(groupsByRoot).flatMap(([root, groups]) =>
    groups.map((groupName) => ({
      params: {
        [rootParamName]: root,
        [groupParamName]: groupName,
      },
      props: {
        group: groupName,
      }
    }))
  );
}