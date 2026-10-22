import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import { getSortedPosts } from "./getSortedPosts";

export const TOPICS = [
  {
    name: "扩散语言模型",
    description: "从离散扩散、去噪过程，到语言生成的研究笔记。",
  },
  {
    name: "推荐算法",
    description: "记录召回、排序与评估，理解推荐系统里的每一个选择。",
  },
  {
    name: "前后端开发",
    description: "从页面到接口，把想法一步步变成可以使用的产品。",
  },
];

export function getCategories(posts: CollectionEntry<"posts">[]) {
  const visible = getSortedPosts(posts);
  const names = [
    ...new Set([
      ...TOPICS.map(topic => topic.name),
      ...visible.map(post => post.data.category),
    ]),
  ];
  return names.map(name => ({
    name,
    slug: slugifyStr(name),
    description:
      TOPICS.find(topic => topic.name === name)?.description ??
      "这个方向的文章与实践记录。",
    posts: visible.filter(post => post.data.category === name),
  }));
}
