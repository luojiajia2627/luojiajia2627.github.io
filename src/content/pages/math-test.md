---
title: 数学排版测试 · Markdown
description: 中文、推荐指标与多行推导的排版回归用例。
---

## 文章目录

## 行内公式与中文

这是排版用的最小示例：用户 $u$ 的候选集合为 $R_u$，命中数为 $|R_u \cap T_u^K|$。
中文和公式 $x_i^2 + y_{i+1} \leq \alpha$ 应自然衔接。
金额使用转义美元符号：\$20；代码 `$x_i$` 保持原样。

## Recall@K 与 NDCG@K

仅用于测试：设 $R_u$ 非空，且 $\operatorname{IDCG}@K(u)>0$，展示如下指标。

$$
\operatorname{Recall}@K(u)=\frac{|R_u\cap T_u^K|}{|R_u|}
$$

$$
\begin{aligned}
\operatorname{DCG}@K(u)
  &= \sum_{i=1}^{K}\frac{2^{r_{u,i}}-1}{\log_2(i+1)} \\
\operatorname{NDCG}@K(u)
  &= \frac{\operatorname{DCG}@K(u)}{\operatorname{IDCG}@K(u)}
\end{aligned}
$$

## 多行推导、矩阵与符号

$$
\begin{aligned}
\mathcal{L}(\theta)
  &= \frac{1}{N}\sum_{i=1}^{N}(\theta^\top x_i-y_i)^2 \\
\nabla_\theta\mathcal{L}
  &= \frac{2}{N}\sum_{i=1}^{N}(\theta^\top x_i-y_i)x_i \\
  &= \frac{2}{N}X^\top(X\theta-y)
\end{aligned}
$$

$$
X=\begin{bmatrix}1 & x_1 \\ 1 & x_2\end{bmatrix},\quad
\theta=\begin{pmatrix}\theta_0 \\ \theta_1\end{pmatrix}
$$

$$
\forall x\in\mathbb{R}^d,\quad
\mathbb{E}[X]=\int_{-\infty}^{\infty}x\,p(x)\,\mathrm{d}x,\quad
\sigma=\sqrt{\frac{1}{N}\sum_{i=1}^N(x_i-\mu)^2}
$$

## 插件兼容与窄屏压力测试

> [!note] Obsidian 提示框
> 行内公式 $\alpha+\beta=\gamma$ 与块公式均应可见。
>
> $$
> p(x)=\frac{1}{\sqrt{2\pi}}e^{-x^2/2}
> $$

| 示例 | 行内公式          |
| ---- | ----------------- |
| 分式 | $\frac{a_i}{b_i}$ |

下面故意保留一条较长的公式，在手机上只让公式区域横向滚动。

$$
\underbrace{\operatorname{score}(u,i_1)+\operatorname{score}(u,i_2)+\operatorname{score}(u,i_3)+\operatorname{score}(u,i_4)+\operatorname{score}(u,i_5)+\operatorname{score}(u,i_6)}_{\text{long formula for mobile scrolling}}=\sum_{j=1}^{6}\operatorname{score}(u,i_j)
$$

```tex
% 代码块中的美元符号和 LaTeX 不应渲染为公式
$x_i$ \frac{a}{b}
```
