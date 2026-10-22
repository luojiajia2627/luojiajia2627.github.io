import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://luojiajia2627.github.io/",
    title: "罗佳佳 Lily",
    description: "罗佳佳 Lily 的技术笔记，记录扩散语言模型、推荐算法与前后端开发中的学习、思考和实践。",
    author: "罗佳佳 Lily",
    profile: "https://github.com/luojiajia2627",
    ogImage: "default-og.png",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: { perPage: 8, perIndex: 5, scheduledPostMargin: 0 },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "local",
  },
  socials: [{ name: "github", url: "https://github.com/luojiajia2627", linkTitle: "Lily 的 GitHub" }],
  shareLinks: [],
});
