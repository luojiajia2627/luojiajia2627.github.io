import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import type { SearchPost } from "@/types/search";
import config from "@/config";
import { getDocuments } from "@/utils/getDocuments";

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
  for (const doc of await getDocuments())
    index.push({
      title: doc.title,
      description: doc.description,
      content: doc.description,
      category: "PDF 资料",
      tags: doc.tags,
      date: doc.date ? new Date(doc.date).toISOString() : "",
      demo: doc.demo,
      url: doc.url,
    });
  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
