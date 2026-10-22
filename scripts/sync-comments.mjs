// Runs after the site build in GitHub Actions. No credentials enter the site bundle.
import { readFile, writeFile } from "node:fs/promises";
const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GH_TOKEN;
if (!repo || !token) throw new Error("评论同步需要 GitHub Actions 的 GITHUB_REPOSITORY 和 GH_TOKEN。");
const pages = JSON.parse(await readFile("dist/comment-pages.json", "utf8"));
const api = async (path, method = "GET", body) => {
  const response = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    method,
    headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!response.ok) throw new Error(`GitHub 评论同步失败：${method} ${path} (${response.status})`);
  return response.json();
};
// Include closed threads: closing comments should never create a replacement thread.
const issues = [];
for (let page = 1; ; page++) {
  const batch = await api(`/issues?state=all&per_page=100&page=${page}`);
  issues.push(...batch.filter(issue => !issue.pull_request));
  if (batch.length < 100) break;
}
const map = {};
for (const page of pages) {
  const encodedPath = new URL(page.path, "https://luojiajia2627.github.io").pathname;
  const path = "/" + encodedPath.split("/").filter(Boolean).join("/") + "/";
  const marker = `<!-- lily-blog:${path} -->`;
  let issue = issues.find(item => item.body?.includes(marker));
  if (!issue) {
    issue = await api("/issues", "POST", {
      title: `[博客评论] ${page.title}`,
      body: `${marker}\n\n这篇内容的评论区：\n\n[${page.title}](https://luojiajia2627.github.io${path})\n\n欢迎交流问题、补充资料和不同观点。评论会显示在博客对应页面中。`,
    });
    console.log(`已创建评论区 #${issue.number}：${page.title}`);
  }
  map[path] = { number: issue.number, url: issue.html_url };
}
await writeFile("dist/comment-threads.json", JSON.stringify(map));
console.log(`评论区已同步，共 ${Object.keys(map).length} 个。`);
