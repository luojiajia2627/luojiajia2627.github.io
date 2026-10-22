# 罗佳佳 Lily · 技术博客

冷白与钴蓝的个人实验室风格技术博客，围绕**扩散语言模型、推荐算法、前后端开发**组织内容。基于 [AstroPaper](https://github.com/satnaing/astro-paper) 的 MIT 开源模板定制，保留原始 LICENSE 与署名。

正式发布地址配置为 **https://luojiajia2627.github.io/**。本地完成开发并不代表线上已经发布；是否上线以 GitHub Actions 的部署结果为准。

## 本地使用

要求 Node.js 24 与 pnpm 11.25.0。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

生产构建会检查 TypeScript、生成静态页面，并为中文全文搜索创建静态 JSON 索引：

```bash
pnpm build
pnpm preview
```

日常开发地址通常是 http://localhost:4321。开发模式修改正文后，刷新搜索页即可更新索引；生产部署时索引会随构建自动生成。完整生产版本可用 pnpm preview 查看。

## 写第一篇文章

```bash
pnpm new-post my-first-post
```

编辑生成的 src/content/posts/my-first-post.md：

```yaml
---
title: "我的第一篇技术笔记"
pubDatetime: 2026-10-22T10:00:00+08:00
description: "这一篇文章解决的问题。"
category: 前后端开发
tags: [TypeScript, 学习笔记]
draft: true
demo: false
---
```

- 推荐分类：扩散语言模型、推荐算法、前后端开发；也可以直接写新分类，分类页会自动生成。
- draft: true 的草稿不会出现在文章列表、搜索、RSS 或静态文章页面。
- 准备发布时改成 draft: false。日期使用自己的实际发布时间；未来时间的文章在该时间之后重新构建才会发布。
- 修改旧文章时，可添加 modDatetime 字段记录更新时间。
- 首页、列表、分类、标签、归档和 RSS 均由文章自动生成，无需重复维护。
- 文章目录从二级、三级标题自动生成；代码块支持语法高亮与复制。

当前四篇文章均标记为 **demo: true**，页面会显示“示例文章”。发布正式内容前可删除 src/content/posts/ 下这四个示例文件，或替换正文并将 demo 改为 false。示例内容用于体验排版，不代表个人研究成果。

## 发布到 GitHub Pages

1. 在 luojiajia2627 账号下创建公开仓库 **luojiajia2627.github.io**。如果仓库已存在，先检查其中内容，避免覆盖。
2. 将本项目的全部源码（包含 .github/workflows/、package.json、pnpm-lock.yaml）推送到仓库的 main 分支。不要上传 node_modules/ 或 dist/。
3. 打开仓库 Settings → Pages，将 Build and deployment 的 Source 设置为 **GitHub Actions**。
4. 在 Actions 中确认 **Deploy Lily Blog** 成功。完成后访问 https://luojiajia2627.github.io/。

本项目已包含 .github/workflows/deploy.yml。每次向 main 推送修改都会自动检查、构建和发布，不需要购买域名或服务器，也无需手动上传 dist。

仓库的 origin 已指向上述目标仓库；upstream 保留 AstroPaper 模板来源。首次推送前请确保登录的是 luojiajia2627 账号，且目标仓库确实属于自己。

## 常用修改位置

| 内容                        | 文件                       |
| --------------------------- | -------------------------- |
| 博客名称、域名、GitHub 链接 | astro-paper.config.ts      |
| 首页介绍                    | src/pages/index.astro      |
| 关于我                      | src/content/pages/about.md |
| 文章                        | src/content/posts/         |
| 三个默认分类的介绍          | src/utils/getCategories.ts |
| 明暗配色                    | src/styles/theme.css       |
| 中文界面文案                | src/i18n/lang/zh-CN.ts     |
| 网页图标                    | public/favicon.svg         |
| 分享卡片                    | public/default-og.png      |

分享卡片已经预先生成，构建无需访问外部字体服务。若要重新生成，可编辑 scripts/generate-og.mjs 后执行 node scripts/generate-og.mjs。

## 功能与来源

- 中文界面、响应式排版、明暗主题及偏好保存。
- Markdown / MDX、分类标签、按时间归档、分页。
- 按需加载的静态全文搜索（中文原词匹配，支持多关键词）、RSS、sitemap、SEO 元数据。
- 本站无需自建数据库或服务器。评论存储于本仓库的 GitHub Issues，读者通过 GitHub 留言，博客按需显示；未接入访问统计。

模板来源：[satnaing/astro-paper](https://github.com/satnaing/astro-paper)，初始提交 35cfa7fbe0b897306d27670d3819e55d5205f3dd。代码许可证见 LICENSE；正文的授权可由作者自行另行指定。

## 个人思考

```bash
pnpm new-thought a-question-worth-keeping
```

草稿会写入 `src/content/posts/thoughts/`，自动包含 `kind: thought` 和 `category: 个人思考`。写完后设置 `draft: false` 并推送。思考单独展示在 `/thoughts/`，同时进入搜索、标签、归档和 RSS。现有一篇示例，发布自己的内容时替换正文并设置 `demo: false`。

## 上传与发布 PDF

最方便的方式：打开博客「资料」→「上传 PDF（作者入口）」→ 登录 GitHub → 选择文件 → Commit changes。文件进入 `public/documents/` 后，资料库会自动收录，并生成阅读页、下载链接与评论区。等待 Actions 成功即可查看。

- GitHub 网页上传每个文件上限 25 MB，建议压缩后再发布。
- 文件可以单独上传，无需写文章。建议使用 `diffusion-reading-notes.pdf` 这样的文件名。
- 访问权限由 GitHub 控制，只有仓库有写入权限的人能上传；读者可以阅读、下载和评论。
- 资料上传到公开仓库后即为公开文件。`draft` 只能隐藏入口，不能使 PDF 私密。
- 网页阅读器基于 Mozilla PDF.js，支持翻页、缩放和本页文字提取；手机也可以直接在页面内阅读。字体与解码资源随站点托管，不依赖外部 CDN。

也可以本地导入：

```bash
pnpm add-pdf "/完整路径/你的文档.pdf" diffusion-reading-notes "扩散语言模型阅读笔记"
git add public/documents/
git commit -m "docs: publish reading notes PDF"
git push origin main
```

此命令会复制 PDF 并创建同名 JSON。可编辑 JSON 补充资料信息（手动上传 PDF 时也可另外创建）：

```json
{
  "title": "扩散语言模型阅读笔记",
  "description": "这份资料主要记录了什么。",
  "date": "2026-10-22",
  "tags": ["扩散模型", "论文阅读"],
  "demo": false,
  "draft": false
}
```

例如 `public/documents/diffusion-reading-notes.pdf` 对应同目录的 `diffusion-reading-notes.json`，阅读页为 `/library/diffusion-reading-notes/`。省略 JSON 时，默认使用文件名作为标题。搜索会收录 PDF 的标题、简介和标签，不解析 PDF 全文。`publishing-guide.pdf` 是功能示例，可以删除 PDF 与同名 JSON（同时移除示例文章里的对应附件）。

文章或思考也可挂 PDF 附件，在 Markdown 顶部加入：

```yaml
attachments:
  - title: 扩散语言模型阅读笔记
    file: /documents/diffusion-reading-notes.pdf
```

## 读者评论与管理

每篇已发布文章、个人思考与 PDF 页面底部都有独立评论区。读者点击「在 GitHub 评论」→ 登录 GitHub → 在关联 Issue 留言 → 等待约一分钟自动发布，再返回博客刷新，即可看到评论。博客以纯文本安全显示留言；完整 Markdown 格式、回复与表情可在 GitHub 中阅读。无需安装第三方 GitHub App。

每次发布时，工作流自动为新内容创建评论 Issue，生成 `comment-threads.json` 映射，并把评论快照发布到博客；正文的标题更改不会丢失已有评论。工作流仅额外使用 `issues: write`，自动令牌不会进入网页源码。不要删除评论 Issue 正文开头的 `lily-blog` 标记。

- 管理评论：仓库 → Issues → 对应的 `[博客评论]`，可删除不合适的留言或锁定讨论。
- 对某篇文章或思考关闭评论入口：frontmatter 添加 `comments: false`。
- 新增、编辑或删除博客评论时，会自动触发一次更新。评论按需加载，每页 20 条；读者读取博客自身的评论快照，不受 GitHub 公共 API 频率限制。若网络加载失败，可重试或前往 GitHub。
- 单纯本地 `pnpm build` 不会创建线上 Issue；评论映射在 GitHub Actions 中自动生成。本地预览时出现无法读取评论提示属预期；线上可正常加载。
