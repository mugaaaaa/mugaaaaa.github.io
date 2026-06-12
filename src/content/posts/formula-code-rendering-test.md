---
title: "公式与代码渲染测试（横排）"
published: 2026-04-20T12:00:00
description: "集中测试横排正文中各种上下文下的公式与代码渲染：行内、块级、表格、列表、引用、代码隔离与边界情况。"
tags: [Test, Math, Code]
category: test
draft: false
lang: zh_CN
---

# 公式与代码渲染测试

本文集中测试 `\(\)`、`\[\]`、`$...$`、`$$...$$` 在各种上下文中的渲染，以及代码块对公式分隔符的隔离。

## 1. 行内公式

- LaTeX 分隔符：质能方程 \(E = mc^2\)，与中文标点相邻\(a^2 + b^2 = c^2\)。
- Dollar 分隔符：欧拉恒等式 $e^{i\pi} + 1 = 0$。
- 一行多个公式：\(\alpha\)、\(\beta\)、\(\gamma\) 三个希腊字母，以及 $x_1, x_2, \dots, x_n$。
- 嵌入粗体：**重点 \(\nabla \cdot \mathbf{E} = \rho/\varepsilon_0\)**，以及 *斜体 \(\sin^2\theta + \cos^2\theta = 1\)*。
- 下标上标混合：\(\sum_{i=1}^{n} a_i x^i\) 与 \(\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}\)。

## 2. 块级公式

LaTeX 方括号分隔符：

\[
\frac{\partial f}{\partial t} = \alpha \frac{\partial^2 f}{\partial x^2}
\]

Dollar 双美元分隔符：

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

多行对齐环境：

\[
\begin{aligned}
(a+b)^2 &= a^2 + 2ab + b^2 \\
(a-b)^2 &= a^2 - 2ab + b^2
\end{aligned}
\]

矩阵：

$$
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}, \quad
\det(A) = 1\cdot 4 - 2\cdot 3 = -2
$$

## 3. 表格中的公式（曾经的痛点）

| 符号 | LaTeX 分隔符 | Dollar 分隔符 |
| --- | --- | --- |
| 求和 | \(\sum_{i=1}^{n} a_i\) | $\sum_{i=1}^{n} a_i$ |
| 分式 | \(\dfrac{a}{b}\) | $\dfrac{a}{b}$ |
| 根号 | \(\sqrt{x^2 + y^2}\) | $\sqrt{x^2 + y^2}$ |
| 矩阵 | \(\begin{smallmatrix} 1 & 0 \\ 0 & 1 \end{smallmatrix}\) | $\vec{v} \cdot \vec{w}$ |

## 4. 列表中的公式

无序列表：

- 梯度 \(\nabla f\) 与散度 \(\nabla \cdot \mathbf{F}\)
- 行内 $\lim_{x \to 0} \frac{\sin x}{x} = 1$
- 缩进的块级公式：
  \[
  \oint_C \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}
  \]

有序列表：

1. 第一步：定义 \(f(x) = x^2\)
2. 第二步：求导 \(f'(x) = 2x\)
3. 第三步：$\int f(x)\,dx = \frac{x^3}{3} + C$

## 5. 引用中的公式

> 行内公式 \(P(A \mid B) = \dfrac{P(B \mid A)P(A)}{P(B)}\) 应当渲染。
> 块级公式同样测试：
> \[
> \mathbb{E}[X] = \int_{-\infty}^{\infty} x f(x)\,dx
> \]

> - 引用里的列表项 \(\sigma^2 = \mathbb{E}[(X - \mu)^2]\)
> - 第二项 $H(X) = -\sum_i p_i \log p_i$

## 6. 代码隔离（公式分隔符不应被渲染）

行内代码：`\(x\)` 与 `$y$` 应原样显示，不渲染为公式。

带语言的代码块（JavaScript）：

```js
// 这里的 \( 和 \[ 以及 $ 都应原样保留
const tex = "\\(E = mc^2\\)";
const price = `$${100 + 20}`;
function f(x) { return x ** 2; }
```

Python：

```python
# 反斜杠括号 \(not math\) 和美元 $5 应原样显示
def integrate(f, a, b, n=1000):
    h = (b - a) / n
    return sum(f(a + i * h) for i in range(n)) * h
```

无语言代码块：

```
\[ 这不是块级公式 \]
$$ 这也不是 $$
```

波浪号围栏：

~~~
\(也不是行内公式\)
~~~

## 7. 边界情况

- 货币写法是否被误判为公式：花了 $5 买苹果，又花了 $10 买梨。
- 转义美元：价格是 \$100 而不是公式。
- 紧邻的两个公式：\(a\)\(b\)。
- 跨中文标点：设 \(X\sim\mathcal{N}(\mu,\sigma^2)\)，则……

## 8. 长代码（横向滚动）

```js
const reallyLongLine = "abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789_abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
```
