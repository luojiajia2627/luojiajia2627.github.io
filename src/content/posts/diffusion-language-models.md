---
title: "扩散语言模型：从逐词生成到逐步去噪"
pubDatetime: 2026-10-22T10:00:00+08:00
description: "以 LLaDA 为阅读起点，整理离散扩散、掩码预测与生成过程中的几个关键问题。"
category: 扩散语言模型
tags: [Diffusion, LLM, 论文阅读]
demo: true
draft: false
---

理解一种生成方法，可以先从一个问题开始：模型在每一步，究竟需要预测什么？

## 从预测对象开始

自回归语言模型通常按序预测下一个 token。以 LLaDA 为代表的掩码扩散语言模型，则从部分或全部被掩码的序列出发，逐步预测、恢复被遮盖的内容。

这里需要区分两个层次：**训练时构造什么任务**，以及**推理时如何安排生成步骤**。把这两个问题拆开，有助于读懂代码里的掩码比例、采样步数和位置选择。

## 阅读时先记下三个问题

1. 加噪过程如何把原始文本变成训练输入？
2. 训练损失计算在哪些位置，又如何加权？
3. 生成时一次恢复哪些位置，依据是什么？

这些问题可以整理成一张简表，读论文和读代码时分别补充。

| 观察点   | 需要记录的内容              |
| -------- | --------------------------- |
| 数据状态 | 哪些 token 已知，哪些被掩码 |
| 模型输出 | 各位置的 token 分布         |
| 生成策略 | 位置选择、步数与采样设置    |
| 评估条件 | 提示词、长度、解码参数      |

## 用最小例子观察生成

不急着跑完整基准，可以先固定一段短输入，记录每次迭代的序列状态。下面只是帮助理解流程的伪代码，并非某个模型的实际采样器。

```python
sequence = initialize_with_masks(prompt)

for step in range(num_steps):
    predictions = model(sequence)
    positions = choose_positions(sequence, predictions, step)
    sequence = fill_selected_positions(sequence, predictions, positions)
```

观察中间状态，比只看最终生成文本更容易发现自己没有理解的步骤。

## 下一步的笔记

继续阅读时，可以把训练目标和生成策略分别画成流程图，再用官方实现核对每个步骤。是否更快、是否更准确，需要在明确的任务和评估条件下比较。

参考：[LLaDA 官方代码仓库](https://github.com/ML-GSAI/LLaDA)、[训练说明](https://github.com/ML-GSAI/LLaDA/blob/main/GUIDELINES.md)。
