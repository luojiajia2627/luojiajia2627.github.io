import type { SearchPost } from "@/types/search";
export const normalizeSearch = (text: string) =>
  text.normalize("NFKC").toLocaleLowerCase().replace(/\s+/g, " ").trim();

export function searchPosts(posts: SearchPost[], query: string): SearchPost[] {
  const terms = normalizeSearch(query).split(" ").filter(Boolean);
  if (!terms.length) return [];
  return posts
    .map(post => {
      const fields = [
        post.title,
        post.description,
        post.category + " " + post.tags.join(" "),
        post.content,
      ].map(normalizeSearch);
      if (!terms.every(term => fields.some(field => field.includes(term))))
        return { post, score: 0 };
      const score = terms.reduce(
        (sum, term) =>
          sum +
          fields.reduce(
            (points, field, index) =>
              points + (field.includes(term) ? [12, 5, 4, 1][index] : 0),
            0
          ),
        0
      );
      return { post, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .map(result => result.post);
}
