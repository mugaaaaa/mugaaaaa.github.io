---
title: "公式与代码渲染测试（直排）"
published: 2026-04-20T12:30:00
description: "在纯直排页面中测试行内公式、块级公式、表格公式与代码块的当前渲染行为，用于观察是否需要竖排适配。"
tags: [Test, Math, Code, Vertical]
category: test
draft: false
lang: zh_CN
layout: vertical
---

# 直排中的公式与代码

仅用于观察纯直排版式下，公式与代码块的当前行为，暂未做任何竖排适配。

## 行内公式

行内公式 \(E = mc^2\)，

双 Dollar 形式： $a^2 + b^2 = c^2$

带上下标 \(\sum_{i=1}^{n} a_i x^i\)。

## 块级公式

 LaTeX 方括号块级公式：

\[
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
\]

Dollar 双美元块级公式：

$$
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
$$

## 列表中的公式

- 行内 \(\nabla \cdot \mathbf{E} = \rho/\varepsilon_0\)
- Dollar 形式 $\lim_{x \to 0} \frac{\sin x}{x} = 1$

## 表格中的公式

| 符号 | 公式 |
| --- | --- |
| 求和 | \(\sum_{i=1}^{n} a_i\) |
| 分式 | $\dfrac{a}{b}$ |

## 代码块

```js
const tex = "\\(E = mc^2\\)";
function f(x) { return x ** 2; }
```

行内代码 `\(x\)` 、 `$y$`。


## 训点块对照

```kanbun
學[レ]而時習フ[レ]之、不[二]亦説[一]乎。
```
