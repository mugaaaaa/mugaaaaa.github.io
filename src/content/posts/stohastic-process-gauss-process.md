---
title: "随机过程：Gauss 过程"
published: 2026-06-03
description: "随机过程中的 Gauss 过程"
tags: [Stohastic Process, Math, Gauss Process]
category: math
draft: false
lang: zh_CN
---


# 多元 Gauss 分布

$$
f_X(\vec{x}) = \frac{1}{(2\pi)^{n/2}\sqrt{|\Sigma|}} e^{-(\vec{x}-\vec{\mu})^T \Sigma^{-1} (\vec{x}-\vec{\mu})}
$$

对比一元： 
$$
f_X(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

## 
下证： $\int_{\mathbb{R}^n} f_X(\vec{x}) d\vec{x} = 1$

$$
\begin{aligned}
\int_{\mathbb{R}^n} f_X(\vec{x}) d\vec{x} &= \int_{\mathbb{R}^n} \frac{e^{-\frac{1}{2}(\vec{x}-\vec{\mu})^T \Sigma^{-1} (\vec{x}-\vec{\mu})}}{(2\pi)^{n/2}\sqrt{|\Sigma|}} d\vec{x} \\
&= \int_{\mathbb{R}^n} \frac{e^{-\frac{1}{2}(\vec{x}-\vec{\mu})^T U^T \Lambda^{-1} U (\vec{x}-\vec{\mu})}}{(2\pi)^{n/2}\sigma_1\sigma_2\cdots\sigma_n} d\vec{x}
\end{aligned}
$$

*(旁注：$\vec{y} = U(\vec{x}-\vec{\mu})$)*

$$
\begin{aligned}
\quad &= \int_{\mathbb{R}^n} \frac{e^{-\frac{1}{2}\vec{y}^T \Lambda \vec{y}}}{(2\pi)^{n/2}\sigma_1\sigma_2\cdots\sigma_n} \frac{1}{|U|} d\vec{y} \\
&= \int_{-\infty}^{+\infty} \frac{1}{\sqrt{2\pi}\sigma_1} e^{-\frac{y_1^2}{2\sigma_1^2}} dy_1 \cdots \int_{-\infty}^{+\infty} \frac{1}{\sqrt{2\pi}\sigma_n} e^{-\frac{y_n^2}{2\sigma_n^2}} dy_n \\
&= 1 \cdot \cdots \cdot 1 \\
&= 1
\end{aligned}
$$

#### 1.2 多元 Gauss 分布的特征函数

$$
\begin{aligned}
\varphi_{\vec{X}}(\vec{x}) &= E(e^{j\omega^T \vec{x}}) \\
&= \int_{\mathbb{R}^n} e^{j\omega^T \vec{x}} \frac{e^{-\frac{1}{2}(\vec{x}-\vec{\mu})^T \Sigma^{-1} (\vec{x}-\vec{\mu})}}{(2\pi)^{n/2} \cdot \sqrt{|\Sigma|}} d\vec{x} \\
&= \int_{\mathbb{R}^n} \frac{e^{j\omega^T \vec{x} - \frac{1}{2}(\vec{x}-\vec{\mu})^T \Sigma^{-1} (\vec{x}-\vec{\mu})}}{(2\pi)^{n/2} \cdot \sqrt{|\Sigma|}} d\vec{x} \\

& = e^{j\vec{\omega}^T \vec{\mu} - \frac{1}{2} \vec{\omega}^T \Sigma \vec{\omega}} \int_{\mathbb{R}^n} \frac{e^{-\frac{1}{2} (\vec{y} - j\Sigma\vec{\omega})^T \Sigma^{-1} (\vec{y} - j\Sigma\vec{\omega})}}{(2\pi)^{n/2}\sqrt{|\Sigma|}} d\vec{y}\\
&= = e^{j\vec{\omega}^T \vec{\mu} - \frac{1}{2} \vec{\omega}^T \Sigma \vec{\omega}} 
\end{aligned}
$$

> 原积分的指数部分为：
> $$
> j\vec{\omega}^T \vec{x} - \frac{1}{2}(\vec{x}-\vec{\mu})^T \Sigma^{-1} (\vec{x}-\vec{\mu})
> $$
> 
> 令 $\vec{y} = \vec{x} - \vec{\mu}$:
> $$
> \begin{aligned}
> & j\vec{\omega}^T (\vec{y} + \vec{\mu}) - \frac{1}{2}\vec{y}^T \Sigma^{-1} \vec{y} \\
> =& j\vec{\omega}^T \vec{\mu} + j\vec{\omega}^T \vec{y} - \frac{1}{2}\vec{y}^T \Sigma^{-1} \vec{y} \\
> =& j\vec{\omega}^T \vec{\mu} - \frac{1}{2} \left[ \vec{y}^T \Sigma^{-1} \vec{y} - 2j\vec{\omega}^T \vec{y} \right]
> \end{aligned}
> $$
> 
> 其中 $j\vec{\omega}^T \vec{\mu}$ 是个常数项，现在对中括号里的 $\left[ \vec{y}^T \Sigma^{-1} \vec{y} - 2j\vec{\omega}^T \vec{y} \right]$ 进行配方。
> 
> 假设配方后的形式为 $(\vec{y}-\vec{a})^T \Sigma^{-1} (\vec{y}-\vec{a}) + C$，将其展开：
> $$
> \begin{aligned}
> & (\vec{y}-\vec{a})^T \Sigma^{-1} (\vec{y}-\vec{a}) \\
> =& \vec{y}^T \Sigma^{-1} \vec{y} - \vec{y}^T \Sigma^{-1} \vec{a} - \vec{a}^T \Sigma^{-1} \vec{y} + \vec{a}^T \Sigma^{-1} \vec{a}
> \end{aligned}
> $$
> 
> 因为协方差矩阵的逆矩阵 $\Sigma^{-1}$ 是对称阵，所以 $\vec{y}^T \Sigma^{-1} \vec{a} = \vec{a}^T \Sigma^{-1} \vec{y}$。因此上面的式子可以合并中间两项：
> $$
> = \vec{y}^T \Sigma^{-1} \vec{y} - 2\vec{a}^T \Sigma^{-1} \vec{y} + \vec{a}^T \Sigma^{-1} \vec{a}
> $$
> 
> 为了让它和我们的目标 $\vec{y}^T \Sigma^{-1} \vec{y} - 2j\vec{\omega}^T \vec{y}$ 对应，我们需要令一次项相等：
> $$
> 2\vec{a}^T \Sigma^{-1} \vec{y} = - 2j\vec{\omega}^T \vec{y}
> $$
> 
> 由此解得 $\vec{a}$：
> $$
> \begin{aligned}
> \vec{a}^T \Sigma^{-1} &= j\vec{\omega}^T \\
> \text{两边转置：} \quad \Sigma^{-1} \vec{a} &= j\vec{\omega} \\
> \text{左乘 } \Sigma \text{：} \quad \vec{a} &= j\Sigma\vec{\omega}
> \end{aligned}
> $$
> 
> 配方多出来的常数项是 $\vec{a}^T \Sigma^{-1} \vec{a}$，把刚才求得的 $\vec{a} = j\Sigma\vec{\omega}$ 代入：
> $$
> \begin{aligned}
> \vec{a}^T \Sigma^{-1} \vec{a} &= (j\vec{\omega}^T \Sigma) \Sigma^{-1} (j\Sigma \vec{\omega}) \\
> &= j^2 \vec{\omega}^T (\Sigma \Sigma^{-1}) \Sigma \vec{\omega} \\
> &= -\vec{\omega}^T \Sigma \vec{\omega}
> \end{aligned}
> $$
> 
> 配方结果为：
> $$
> \begin{aligned}
> \vec{y}^T \Sigma^{-1} \vec{y} - 2j\vec{\omega}^T \vec{y} &= (\vec{y}-\vec{a})^T \Sigma^{-1} (\vec{y}-\vec{a}) - \vec{a}^T \Sigma^{-1} \vec{a} \\
> &= (\vec{y} - j\Sigma\vec{\omega})^T \Sigma^{-1} (\vec{y} - j\Sigma\vec{\omega}) - (-\vec{\omega}^T \Sigma \vec{\omega}) \\
> &= (\vec{y} - j\Sigma\vec{\omega})^T \Sigma^{-1} (\vec{y} - j\Sigma\vec{\omega}) + \vec{\omega}^T \Sigma \vec{\omega}
> \end{aligned}
> $$
