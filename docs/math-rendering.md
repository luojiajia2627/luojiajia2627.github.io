# 数学公式排版

Astro 7 使用 `markdown.processor: unified(...)`。`remark-math` 解析数学语法，
`rehype-katex` 在生产构建时生成 HTML 与 MathML；`@astrojs/mdx` 自动继承同一处理链，
不需要在 MDX 配置中重复注册。保留原有的目录、目录折叠、Obsidian 提示框和 Shiki 高亮。

KaTeX CSS 与字体由 Vite 从 npm 包打包到本站，不依赖 CDN 或浏览器端公式脚本。
直接依赖的 `katex` 与 `rehype-katex` 使用同一 `0.16.x` 版本线，避免字体、CSS 与渲染器错配。
公式沿用正文颜色；长块公式在自身区域横向滚动。

## 写作语法

与 Obsidian 常用语法一致，行内公式用单美元符号，块公式使用独占行的双美元符号：

```markdown
用户 $u$ 的命中率为 $\frac{|R_u\cap T_u^K|}{|R_u|}$。

$$
\begin{aligned}
\mathcal{L}(\theta)&=\frac{1}{N}\|X\theta-y\|_2^2 \\
\nabla_\theta\mathcal{L}&=\frac{2}{N}X^\top(X\theta-y)
\end{aligned}
$$

$$
X=\begin{bmatrix}1 & x_1 \\ 1 & x_2\end{bmatrix}
$$
```

`.md` 和 `.mdx` 的数学区域都可直接写 LaTeX 的反斜杠和花括号。
金额中的美元符号写作 `\$20`；代码中的 `$...$` 保持原样。
公式放在提示框时，每行（包括空行与 `$$`）均须带 `>` 引用前缀。
优先把中文说明放在公式外；公式内的短文本可用 `\text{...}`。

这是常用数学语法兼容，不是完整 Obsidian/MathJax 环境：第三方 Obsidian 插件、
MathJax 扩展和整个 LaTeX 文档不在支持范围内；可用命令参见
[KaTeX 支持表](https://katex.org/docs/supported.html)。`\(...\)` 和 `\[...\]`
不是本处理链的公式分隔符，请使用 `$` / `$$`。

## 回归验证

- `/math-test/markdown/`：中文、Recall@K、NDCG@K、梯度推导、矩阵、分式、上下标、
  常用符号、提示框、表格、代码与长公式。
- `/math-test/mdx/`：独立的 MDX 数学用例与 JSX，验证继承关系。
- 两页标记 `noindex, nofollow`，排除 sitemap；不属于 posts 集合，
  不进入文章列表、RSS、站内搜索或正式文章的相邻导航。

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install --with-deps chromium --only-shell
pnpm test:math
```

测试针对生产构建运行 Chromium，在 1280、390、320 像素宽度和明暗主题下验证
HTML/MathML、字体加载、提示框、可展开目录、代码保留、主题按钮、页面宽度和公式局部滚动。
另以禁用 JavaScript 的上下文检查预渲染结果。每种视口保存完整截图到 Playwright 测试结果。
PR 的 CI 同样执行生产构建与这些检查，固定使用 Playwright 支持的 Ubuntu 24.04，
避免 `ubuntu-latest` 升级后先于浏览器测试工具的系统支持。

本地也可用 `pnpm dev` 打开两页，手动检查分式、根号、矩阵和滚动后的公式末尾。
`pnpm preview` 用于检查 `dist/` 中的最终产物。自动测试中的手机验证为 Chromium 窄屏，
不代表 iOS Safari 或 Android 真机测试。
