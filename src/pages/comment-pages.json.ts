import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import { getDocuments } from "@/utils/getDocuments";
export async function GET() {
  const posts = getSortedPosts(await getCollection("posts")).filter(
    post => post.data.comments
  );
  const docs = await getDocuments();
  const pages = [
    ...posts.map(post => ({
      path: getPostUrl(post.id, post.filePath),
      title: post.data.title,
    })),
    ...docs.map(doc => ({ path: doc.url, title: doc.title })),
  ];
  return Response.json(pages);
}
