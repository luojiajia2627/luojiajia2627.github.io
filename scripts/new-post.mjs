import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("用法：pnpm new-post my-first-post（使用小写字母、数字和连字符）");
  process.exit(1);
}
const directory = fileURLToPath(new URL("../src/content/posts/", import.meta.url));
const filename = resolve(directory, slug + ".md");
const date = new Date().toISOString();
const content = ["---", 'title: "在这里填写文章标题"', "pubDatetime: " + date, 'description: "用一句话概括这篇笔记。"', "category: 前后端开发", "tags: [笔记]", "draft: true", "demo: false", "---", "", "## 想解决的问题", "", "在这里开始写作。", "", "## 尝试与发现", "", "", "## 结论与参考", ""].join("\n");
try {
  await mkdir(directory, { recursive: true });
  await writeFile(filename, content, { flag: "wx" });
  console.log("已创建草稿：" + filename);
  console.log("写完后将 draft 改为 false，提交到 GitHub 即可发布。");
} catch (error) {
  console.error(error.code === "EEXIST" ? "同名文章已存在，请换一个文件名。" : error.message);
  process.exit(1);
}
