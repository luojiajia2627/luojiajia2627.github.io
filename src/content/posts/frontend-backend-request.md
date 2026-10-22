---
title: "一个请求的旅程：从页面交互到后端接口"
pubDatetime: 2026-10-22T08:00:00+08:00
description: "用一个简单的文章列表请求，梳理加载状态、HTTP 响应与错误处理，让前后端协作更清晰。"
category: 前后端开发
tags: [TypeScript, HTTP, Web]
demo: true
draft: false
---

点击一个按钮之后，页面并不会立刻得到想要的数据。把请求的每个阶段明确下来，往往能让界面和接口都更容易维护。

## 先约定响应结构

以文章列表为例，接口可以返回文章数组和分页信息。真正接入前，前后端还需要一起确认字段类型、空列表的含义、错误格式和分页规则。

```json
{
  "items": [{ "id": "hello-world", "title": "第一篇技术笔记" }],
  "page": 1,
  "total": 1
}
```

这段 JSON 只是接口形状的示例。当前博客是静态站点，文章在构建时生成，并没有运行此接口。

## 为请求准备四种状态

一个列表页面至少需要考虑：初始、加载中、成功和失败。成功时，结果还可能是空列表。

把这些状态先写在纸上，再开始写请求代码，会更容易发现遗漏的交互。

## 不只处理网络错误

Fetch 遇到 HTTP 错误状态时，并不一定会拒绝 Promise。因此，读取响应数据之前，需要按业务需求检查响应状态。

```typescript
async function loadPosts() {
  const response = await fetch("/api/posts");

  if (!response.ok) {
    throw new Error("请求失败，状态码：" + response.status);
  }

  return response.json();
}
```

这个示例还可以继续补充请求取消、响应数据校验和界面状态管理。先把最小流程跑通，再逐步完善，会更容易定位问题。

## 用浏览器验证一次完整流程

打开开发者工具，分别观察正常响应、空列表与失败响应。检查按钮是否可以重复点击、加载提示是否及时消失、错误信息是否能帮助用户继续操作。

参考：[MDN · 使用 Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)。
