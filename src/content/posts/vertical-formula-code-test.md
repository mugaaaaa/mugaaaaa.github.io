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

本文用于观察纯直排版式下，公式与代码块的当前行为（暂未做任何竖排适配）。

## 行内公式

正文里夹一个行内公式 \(E = mc^2\)，看它在竖排列流中如何摆放；再来一个 Dollar 形式 $a^2 + b^2 = c^2$，以及带上下标的 \(\sum_{i=1}^{n} a_i x^i\)。

观察重点：公式盒子是否被旋转、是否打断列流、基线是否错位。

## 块级公式

下面是 LaTeX 方括号块级公式：

\[
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
\]

Dollar 双美元块级公式：

$$
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
$$

观察重点：块级公式是横排居中，还是被卷入竖排列流。

## 列表中的公式

- 行内 \(\nabla \cdot \mathbf{E} = \rho/\varepsilon_0\)
- Dollar 形式 $\lim_{x \to 0} \frac{\sin x}{x} = 1$

## 表格中的公式

| 符号 | 公式 |
| --- | --- |
| 求和 | \(\sum_{i=1}^{n} a_i\) |
| 分式 | $\dfrac{a}{b}$ |

观察重点：表格是否回退为横排，单元格内公式是否正常。

## 代码块

普通 JavaScript 代码块：

```js
const tex = "\\(E = mc^2\\)";
function f(x) { return x ** 2; }
```

行内代码 `\(x\)` 与 `$y$`。

观察重点：代码块在竖排页面里是否回退为横排、是否横向滚动、缩进是否保留。

## 训点块对照

```kanbun
學[レ]而時習フ[レ]之、不[二]亦説[一]乎。
```

最后一段普通直排文字，用于观察公式块与代码块前后的列距与换行表现。
