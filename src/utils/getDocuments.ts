import { readdir, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { z } from "astro/zod";

const directory = resolve("public/documents") + "/";
const metadataSchema = z.object({
  title: z.string().optional(),
  description: z.string().default("打开这份 PDF，在线阅读或下载到本地。"),
  date: z
    .string()
    .refine(
      value =>
        /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)),
      "资料日期应为 YYYY-MM-DD"
    )
    .optional(),
  tags: z.array(z.string()).default([]),
  demo: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export async function getDocuments() {
  let files: string[];
  try {
    files = await readdir(directory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const documents = await Promise.all(
    files
      .filter(file => /\.pdf$/i.test(file))
      .map(async file => {
        const slug = file.replace(/\.pdf$/i, "");
        let raw = {};
        try {
          raw = JSON.parse(await readFile(directory + slug + ".json", "utf8"));
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
        }
        const metadata = metadataSchema.parse(raw);
        const info = await stat(directory + file);
        return {
          ...metadata,
          slug,
          title: metadata.title ?? slug.replace(/[-_]/g, " "),
          filename: file,
          file: "/documents/" + encodeURIComponent(file),
          url: "/library/" + encodeURIComponent(slug) + "/",
          size: info.size,
          sizeLabel:
            info.size < 1024 * 1024
              ? Math.max(1, Math.round(info.size / 1024)) + " KB"
              : (info.size / 1024 / 1024).toFixed(1) + " MB",
        };
      })
  );
  return documents
    .filter(doc => !doc.draft)
    .sort(
      (a, b) =>
        (b.date ?? "").localeCompare(a.date ?? "") ||
        a.title.localeCompare(b.title, "zh-CN")
    );
}
export type BlogDocument = Awaited<ReturnType<typeof getDocuments>>[number];
