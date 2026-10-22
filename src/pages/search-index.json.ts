import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import type { SearchPost } from "@/types/search";
import config from "@/config";

export async function GET() {
  const posts = getSortedPosts(await getCollection("posts"));
  const index: SearchPost[] = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    category: post.data.category,
    tags: post.data.tags,
    date: post.data.pubDatetime.toISOString(),
    demo: post.data.demo,
    url: getPostUrl(post.id, post.filePath, config.site.lang),
    content: (post.body ?? "")
      .replace(/```[\w-]*/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]*>/g, " ")
      .replace(/[#>*_`~|]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  }));
  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
