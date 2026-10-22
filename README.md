# 罗佳佳 Lily · 技术博客

极简中文技术博客，围绕**扩散语言模型、推荐算法、前后端开发**组织内容。基于 [AstroPaper](https://github.com/satnaing/astro-paper) 的 MIT 开源模板定制，保留原始 LICENSE 与署名。

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
- 本站无需数据库或后台服务。首版未接入评论或访问统计。

模板来源：[satnaing/astro-paper](https://github.com/satnaing/astro-paper)，初始提交 35cfa7fbe0b897306d27670d3819e55d5205f3dd。代码许可证见 LICENSE；正文的授权可由作者自行另行指定。
