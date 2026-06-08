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
f_X(\mathbf{x}) = \frac{1}{(2\pi)^{n/2}\sqrt{|\Sigma|}} e^{-(\mathbf{x}-\boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x}-\boldsymbol{\mu})}
$$

对比一元： 
$$
f_X(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

## 
下证： $\int_{\mathbb{R}^n} f_X(\mathbf{x}) d\mathbf{x} = 1$

$$
\begin{aligned}
\int_{\mathbb{R}^n} f_X(\mathbf{x}) d\mathbf{x} &= \int_{\mathbb{R}^n} \frac{e^{-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x}-\boldsymbol{\mu})}}{(2\pi)^{n/2}\sqrt{|\Sigma|}} d\mathbf{x} \\
&= \int_{\mathbb{R}^n} \frac{e^{-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T U^T \Lambda^{-1} U (\mathbf{x}-\boldsymbol{\mu})}}{(2\pi)^{n/2}\sigma_1\sigma_2\cdots\sigma_n} d\mathbf{x}
\end{aligned}
$$

*(旁注：$\mathbf{y} = U(\mathbf{x}-\boldsymbol{\mu})$)*

$$
\begin{aligned}
\quad &= \int_{\mathbb{R}^n} \frac{e^{-\frac{1}{2}\mathbf{y}^T \Lambda \mathbf{y}}}{(2\pi)^{n/2}\sigma_1\sigma_2\cdots\sigma_n} \frac{1}{|U|} d\mathbf{y} \\
&= \int_{-\infty}^{+\infty} \frac{1}{\sqrt{2\pi}\sigma_1} e^{-\frac{y_1^2}{2\sigma_1^2}} dy_1 \cdots \int_{-\infty}^{+\infty} \frac{1}{\sqrt{2\pi}\sigma_n} e^{-\frac{y_n^2}{2\sigma_n^2}} dy_n \\
&= 1 \cdot \cdots \cdot 1 \\
&= 1
\end{aligned}
$$

#### 1.2 多元 Gauss 分布的特征函数

$$
\begin{aligned}
\varphi_{\mathbf{X}}(\mathbf{x}) &= E(e^{j\omega^T \mathbf{x}}) \\
&= \int_{\mathbb{R}^n} e^{j\omega^T \mathbf{x}} \frac{e^{-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x}-\boldsymbol{\mu})}}{(2\pi)^{n/2} \cdot \sqrt{|\Sigma|}} d\mathbf{x} \\
&= \int_{\mathbb{R}^n} \frac{e^{j\omega^T \mathbf{x} - \frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x}-\boldsymbol{\mu})}}{(2\pi)^{n/2} \cdot \sqrt{|\Sigma|}} d\mathbf{x} \\

& = e^{j\boldsymbol{\omega}^T \boldsymbol{\mu} - \frac{1}{2} \boldsymbol{\omega}^T \Sigma \boldsymbol{\omega}} \int_{\mathbb{R}^n} \frac{e^{-\frac{1}{2} (\mathbf{y} - j\Sigma\boldsymbol{\omega})^T \Sigma^{-1} (\mathbf{y} - j\Sigma\boldsymbol{\omega})}}{(2\pi)^{n/2}\sqrt{|\Sigma|}} d\mathbf{y}\\
&= = e^{j\boldsymbol{\omega}^T \boldsymbol{\mu} - \frac{1}{2} \boldsymbol{\omega}^T \Sigma \boldsymbol{\omega}} 
\end{aligned}
$$

> 原积分的指数部分为：
> $$
> j\boldsymbol{\omega}^T \mathbf{x} - \frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x}-\boldsymbol{\mu})
> $$
> 
> 令 $\mathbf{y} = \mathbf{x} - \boldsymbol{\mu}$:
> $$
> \begin{aligned}
> & j\boldsymbol{\omega}^T (\mathbf{y} + \boldsymbol{\mu}) - \frac{1}{2}\mathbf{y}^T \Sigma^{-1} \mathbf{y} \\
> =& j\boldsymbol{\omega}^T \boldsymbol{\mu} + j\boldsymbol{\omega}^T \mathbf{y} - \frac{1}{2}\mathbf{y}^T \Sigma^{-1} \mathbf{y} \\
> =& j\boldsymbol{\omega}^T \boldsymbol{\mu} - \frac{1}{2} \left[ \mathbf{y}^T \Sigma^{-1} \mathbf{y} - 2j\boldsymbol{\omega}^T \mathbf{y} \right]
> \end{aligned}
> $$
> 
> 其中 $j\boldsymbol{\omega}^T \boldsymbol{\mu}$ 是个常数项，现在对中括号里的 $\left[ \mathbf{y}^T \Sigma^{-1} \mathbf{y} - 2j\boldsymbol{\omega}^T \mathbf{y} \right]$ 进行配方。
> 
> 假设配方后的形式为 $(\mathbf{y}-\mathbf{a})^T \Sigma^{-1} (\mathbf{y}-\mathbf{a}) + C$，将其展开：
> $$
> \begin{aligned}
> & (\mathbf{y}-\mathbf{a})^T \Sigma^{-1} (\mathbf{y}-\mathbf{a}) \\
> =& \mathbf{y}^T \Sigma^{-1} \mathbf{y} - \mathbf{y}^T \Sigma^{-1} \mathbf{a} - \mathbf{a}^T \Sigma^{-1} \mathbf{y} + \mathbf{a}^T \Sigma^{-1} \mathbf{a}
> \end{aligned}
> $$
> 
> 因为协方差矩阵的逆矩阵 $\Sigma^{-1}$ 是对称阵，所以 $\mathbf{y}^T \Sigma^{-1} \mathbf{a} = \mathbf{a}^T \Sigma^{-1} \mathbf{y}$。因此上面的式子可以合并中间两项：
> $$
> = \mathbf{y}^T \Sigma^{-1} \mathbf{y} - 2\mathbf{a}^T \Sigma^{-1} \mathbf{y} + \mathbf{a}^T \Sigma^{-1} \mathbf{a}
> $$
> 
> 为了让它和我们的目标 $\mathbf{y}^T \Sigma^{-1} \mathbf{y} - 2j\boldsymbol{\omega}^T \mathbf{y}$ 对应，我们需要令一次项相等：
> $$
> 2\mathbf{a}^T \Sigma^{-1} \mathbf{y} = - 2j\boldsymbol{\omega}^T \mathbf{y}
> $$
> 
> 由此解得 $\mathbf{a}$：
> $$
> \begin{aligned}
> \mathbf{a}^T \Sigma^{-1} &= j\boldsymbol{\omega}^T \\
> \text{两边转置：} \quad \Sigma^{-1} \mathbf{a} &= j\boldsymbol{\omega} \\
> \text{左乘 } \Sigma \text{：} \quad \mathbf{a} &= j\Sigma\boldsymbol{\omega}
> \end{aligned}
> $$
> 
> 配方多出来的常数项是 $\mathbf{a}^T \Sigma^{-1} \mathbf{a}$，把刚才求得的 $\mathbf{a} = j\Sigma\boldsymbol{\omega}$ 代入：
> $$
> \begin{aligned}
> \mathbf{a}^T \Sigma^{-1} \mathbf{a} &= (j\boldsymbol{\omega}^T \Sigma) \Sigma^{-1} (j\Sigma \boldsymbol{\omega}) \\
> &= j^2 \boldsymbol{\omega}^T (\Sigma \Sigma^{-1}) \Sigma \boldsymbol{\omega} \\
> &= -\boldsymbol{\omega}^T \Sigma \boldsymbol{\omega}
> \end{aligned}
> $$
> 
> 配方结果为：
> $$
> \begin{aligned}
> \mathbf{y}^T \Sigma^{-1} \mathbf{y} - 2j\boldsymbol{\omega}^T \mathbf{y} &= (\mathbf{y}-\mathbf{a})^T \Sigma^{-1} (\mathbf{y}-\mathbf{a}) - \mathbf{a}^T \Sigma^{-1} \mathbf{a} \\
> &= (\mathbf{y} - j\Sigma\boldsymbol{\omega})^T \Sigma^{-1} (\mathbf{y} - j\Sigma\boldsymbol{\omega}) - (-\boldsymbol{\omega}^T \Sigma \boldsymbol{\omega}) \\
> &= (\mathbf{y} - j\Sigma\boldsymbol{\omega})^T \Sigma^{-1} (\mathbf{y} - j\Sigma\boldsymbol{\omega}) + \boldsymbol{\omega}^T \Sigma \boldsymbol{\omega}
> \end{aligned}
> $$

注：一元 Gauss 特征函数：$\varphi_X(\omega) = e^{j\omega\mu - \frac{1}{2}\omega^2\sigma^2}$

# 多元 Gauss 分布性质：
1. 线性性质

**1.1 线性变换不变性**
$\mathbf{X} = (X_1, X_2 \cdots X_n)^T \sim N(\boldsymbol{\mu}, \Sigma)$， $C \in \mathbb{R}^{m \times n}$，
则随机向量 $\mathbf{Y} = C\mathbf{X} \sim N(C\boldsymbol{\mu}, C\Sigma C^T)$

证明：
$$
\begin{aligned}
\varphi_{\mathbf{Y}}(\boldsymbol{\omega}) &= E[e^{j\boldsymbol{\omega}^T\mathbf{Y}}] \\
&= E[e^{j\boldsymbol{\omega}^TC\mathbf{X}}] \\
&= E[e^{j(C^T\boldsymbol{\omega})^T\mathbf{X}}] \\
&= e^{j(C^T\boldsymbol{\omega})^T\boldsymbol{\mu} - \frac{1}{2}(C^T\boldsymbol{\omega})^T\Sigma(C^T\boldsymbol{\omega})} \\
&= e^{j\boldsymbol{\omega}^TC\boldsymbol{\mu} - \frac{1}{2}\boldsymbol{\omega}^TC\Sigma C^T\boldsymbol{\omega}}
\end{aligned}
$$

对比得
$\boldsymbol{\mu}' = C\boldsymbol{\mu}$
$\Sigma' = C\Sigma C^T$

**1.2 反命题：**
$\mathbf{X} = (X_1, X_2 \cdots X_n)^T$ 服从 $n$ 元 Gauss 分布 $\iff$ 任取 $\mathbf{c} = (c_1, c_2 \cdots c_n)^T \in \mathbb{R}^n$，其线性组合 $\mathbf{c}^T\mathbf{X} = c_1X_1 + \cdots + c_nX_n$ 都服从一元 Gauss 分布

证：① 必要性：略，上方已证

② 充分性：设 $E(\mathbf{X}) = \boldsymbol{\mu}$，$Cov(\mathbf{X}, \mathbf{X}) = \Sigma$

令 $Y = \mathbf{c}^T\mathbf{X}$

$$
\begin{aligned}
E(Y) &= E(\mathbf{c}^T\mathbf{X}) = \mathbf{c}^T\boldsymbol{\mu} \\
D(Y) &= D(\mathbf{c}^T\mathbf{X}) = E[(\mathbf{c}^T\mathbf{X} - \mathbf{c}^T\boldsymbol{\mu})^2] \\
&= E[\{\mathbf{c}^T(\mathbf{X} - \boldsymbol{\mu})\}^2] \\
&= E[\mathbf{c}^T(\mathbf{X} - \boldsymbol{\mu})(\mathbf{X} - \boldsymbol{\mu})^T\mathbf{c}] \\
&= \mathbf{c}^T E[(\mathbf{X} - \boldsymbol{\mu})(\mathbf{X} - \boldsymbol{\mu})^T] \mathbf{c} \\
&= \mathbf{c}^T\Sigma\mathbf{c}
\end{aligned}
$$

$Y$ 服从一元 Gauss 分布，故

$$
\begin{aligned}
\varphi_Y(\omega) &= E(e^{j\omega Y}) \\
&= e^{j\mathbf{c}^T\boldsymbol{\mu}\omega - \frac{1}{2}(\mathbf{c}^T\Sigma\mathbf{c})\omega^2}
\end{aligned}
$$

任取 $\mathbf{c} \in \mathbb{R}^n$，

$$
\begin{aligned}
\varphi_{\mathbf{X}}(\mathbf{c}) &= E(e^{j\mathbf{c}^T\mathbf{X}}) = E(e^{jY}) \\
&= \varphi_Y(\omega)|_{\omega=1} \\
&= e^{j\mathbf{c}^T\boldsymbol{\mu} - \frac{1}{2}\mathbf{c}^T\Sigma\mathbf{c}}
\end{aligned}
$$

$\mathbf{c}$ 是任取的，充当一般 $\boldsymbol{\omega}$ 的作用。

故 $\mathbf{X} \sim N(\boldsymbol{\mu}, \Sigma)$

**1.3** 若 $\mathbf{X} = (X_1, X_2 \cdots X_n)^T$ 服从 $n$ 元 Gauss 分布，

---

**6.2.2 独立性**

$\mathbf{X}_1 \in \mathbb{R}^n$, $\mathbf{X}_2 \in \mathbb{R}^m$ 服从联合 Gauss 分布，均值向量分别为 $\boldsymbol{\mu}_1 \in \mathbb{R}^n$ 和 $\boldsymbol{\mu}_2 \in \mathbb{R}^m$，则 $\mathbf{X} = \begin{pmatrix} \mathbf{X}_1 \\ \mathbf{X}_2 \end{pmatrix}$ 的协方差矩阵

$$
\Sigma_{\mathbf{X}} = \begin{pmatrix} \Sigma_{11} & \Sigma_{12} \\ \Sigma_{21} & \Sigma_{22} \end{pmatrix}
$$

$$
\Sigma_{11} = Cov(\mathbf{X}_1, \mathbf{X}_1) = E[(\mathbf{X}_1 - \boldsymbol{\mu}_1)(\mathbf{X}_1 - \boldsymbol{\mu}_1)^T]
$$
$\Sigma_{22}$ 同理

$$
\begin{aligned}
\Sigma_{12} &= E[(\mathbf{X}_1 - \boldsymbol{\mu}_1)(\mathbf{X}_2 - \boldsymbol{\mu}_2)^T] = \Sigma_{21}^T \\
&= Cov(\mathbf{X}_1, \mathbf{X}_2)
\end{aligned}
$$

则：$\mathbf{X}_1, \mathbf{X}_2$ 相互独立 $\iff \Sigma_{12} = 0$

---

证明：① 必要性：

$$
\begin{aligned}
\Sigma_{12} &= E\{(\mathbf{X}_1 - \boldsymbol{\mu}_1)(\mathbf{X}_2 - \boldsymbol{\mu}_2)^T\} \\
&= (E(\mathbf{X}_1) - \boldsymbol{\mu}_1) \cdot (E(\mathbf{X}_2) - \boldsymbol{\mu}_2)^T \\
&= 0 \cdot 0 = 0
\end{aligned}
$$

一元 Gauss 特征函数：$\varphi_X(\omega) = e^{j\omega\mu - \frac{1}{2}\omega^2\sigma^2}$

多元 Gauss 分布性质：
1. 线性性质

**1.1 线性变换不变性**
$\mathbf{X} = (X_1, X_2 \cdots X_n)^T \sim N(\boldsymbol{\mu}, \Sigma)$， $C \in \mathbb{R}^{m \times n}$，
则随机向量 $\mathbf{Y} = C\mathbf{X} \sim N(C\boldsymbol{\mu}, C\Sigma C^T)$

证明：
$$
\begin{aligned}
\varphi_{\mathbf{Y}}(\boldsymbol{\omega}) &= E[e^{j\boldsymbol{\omega}^T\mathbf{Y}}] \\
&= E[e^{j\boldsymbol{\omega}^TC\mathbf{X}}] \\
&= E[e^{j(C^T\boldsymbol{\omega})^T\mathbf{X}}] \\
&= e^{j(C^T\boldsymbol{\omega})^T\boldsymbol{\mu} - \frac{1}{2}(C^T\boldsymbol{\omega})^T\Sigma(C^T\boldsymbol{\omega})} \\
&= e^{j\boldsymbol{\omega}^TC\boldsymbol{\mu} - \frac{1}{2}\boldsymbol{\omega}^TC\Sigma C^T\boldsymbol{\omega}}
\end{aligned}
$$

对比得
$\boldsymbol{\mu}' = C\boldsymbol{\mu}$
$\Sigma' = C\Sigma C^T$

**1.2 反命题：**
$\mathbf{X} = (X_1, X_2 \cdots X_n)^T$ 服从 $n$ 元 Gauss 分布 $\iff$ 任取 $\mathbf{c} = (c_1, c_2 \cdots c_n)^T \in \mathbb{R}^n$，其线性组合 $\mathbf{c}^T\mathbf{X} = c_1X_1 + \cdots + c_nX_n$ 都服从一元 Gauss 分布

---

证：① 必要性：略，上方已证

② 充分性：设 $E(\mathbf{X}) = \boldsymbol{\mu}$，$Cov(\mathbf{X}, \mathbf{X}) = \Sigma$

令 $Y = \mathbf{c}^T\mathbf{X}$

$$
\begin{aligned}
E(Y) &= E(\mathbf{c}^T\mathbf{X}) = \mathbf{c}^T\boldsymbol{\mu} \\
D(Y) &= D(\mathbf{c}^T\mathbf{X}) = E[(\mathbf{c}^T\mathbf{X} - \mathbf{c}^T\boldsymbol{\mu})^2] \\
&= E[\{\mathbf{c}^T(\mathbf{X} - \boldsymbol{\mu})\}^2] \\
&= E[\mathbf{c}^T(\mathbf{X} - \boldsymbol{\mu})(\mathbf{X} - \boldsymbol{\mu})^T\mathbf{c}] \\
&= \mathbf{c}^T E[(\mathbf{X} - \boldsymbol{\mu})(\mathbf{X} - \boldsymbol{\mu})^T] \mathbf{c} \\
&= \mathbf{c}^T\Sigma\mathbf{c}
\end{aligned}
$$

$Y$ 服从一元 Gauss 分布，故

$$
\begin{aligned}
\varphi_Y(\omega) &= E(e^{j\omega Y}) \\
&= e^{j\mathbf{c}^T\boldsymbol{\mu}\omega - \frac{1}{2}(\mathbf{c}^T\Sigma\mathbf{c})\omega^2}
\end{aligned}
$$

任取 $\mathbf{c} \in \mathbb{R}^n$，

$$
\begin{aligned}
\varphi_{\mathbf{X}}(\mathbf{c}) &= E(e^{j\mathbf{c}^T\mathbf{X}}) = E(e^{jY}) \\
&= \varphi_Y(\omega)|_{\omega=1} \\
&= e^{j\mathbf{c}^T\boldsymbol{\mu} - \frac{1}{2}\mathbf{c}^T\Sigma\mathbf{c}}
\end{aligned}
$$

$\mathbf{c}$ 是任取的，充当一般 $\boldsymbol{\omega}$ 的作用。

故 $\mathbf{X} \sim N(\boldsymbol{\mu}, \Sigma)$

---

**6.2.2 独立性**

$\mathbf{X}_1 \in \mathbb{R}^n$, $\mathbf{X}_2 \in \mathbb{R}^m$ 服从联合 Gauss 分布，均值向量分别为 $\boldsymbol{\mu}_1 \in \mathbb{R}^n$ 和 $\boldsymbol{\mu}_2 \in \mathbb{R}^m$，则 $\mathbf{X} = \begin{pmatrix} \mathbf{X}_1 \\ \mathbf{X}_2 \end{pmatrix}$ 的协方差矩阵为：

$$
\Sigma_{\mathbf{X}} = \begin{pmatrix} \Sigma_{11} & \Sigma_{12} \\ \Sigma_{21} & \Sigma_{22} \end{pmatrix}
$$

$$
\Sigma_{11} = Cov(\mathbf{X}_1, \mathbf{X}_1) = E[(\mathbf{X}_1 - \boldsymbol{\mu}_1)(\mathbf{X}_1 - \boldsymbol{\mu}_1)^T]
$$
$\Sigma_{22}$ 同理。

$$
\begin{aligned}
\Sigma_{12} &= E[(\mathbf{X}_1 - \boldsymbol{\mu}_1)(\mathbf{X}_2 - \boldsymbol{\mu}_2)^T] = \Sigma_{21}^T \\
&= Cov(\mathbf{X}_1, \mathbf{X}_2)
\end{aligned}
$$

则：$\mathbf{X}_1, \mathbf{X}_2$ 相互独立 $\iff \Sigma_{12} = \mathbf{0}$

证明：

① 必要性：
若 $\mathbf{X}_1, \mathbf{X}_2$ 独立，则：
$$
\begin{aligned}
\Sigma_{12} &= E\{(\mathbf{X}_1 - \boldsymbol{\mu}_1)(\mathbf{X}_2 - \boldsymbol{\mu}_2)^T\} \\
&= (E(\mathbf{X}_1) - \boldsymbol{\mu}_1) \cdot (E(\mathbf{X}_2) - \boldsymbol{\mu}_2)^T \\
&= \mathbf{0} \cdot \mathbf{0}^T = \mathbf{0}
\end{aligned}
$$

② 充分性：
若 $\Sigma_{12} = \mathbf{0}$，则 $\Sigma_{\mathbf{X}} = \begin{pmatrix} \Sigma_{11} & \mathbf{0} \\ \mathbf{0} & \Sigma_{22} \end{pmatrix}$，其逆矩阵为 $\Sigma_{\mathbf{X}}^{-1} = \begin{pmatrix} \Sigma_{11}^{-1} & \mathbf{0} \\ \mathbf{0} & \Sigma_{22}^{-1} \end{pmatrix}$

$$
f_{\mathbf{X}}(\mathbf{x}_1, \mathbf{x}_2) = \frac{e^{-\frac{1}{2} \begin{pmatrix} \mathbf{x}_1 - \boldsymbol{\mu}_1 \\ \mathbf{x}_2 - \boldsymbol{\mu}_2 \end{pmatrix}^T \begin{pmatrix} \Sigma_{11}^{-1} & \mathbf{0} \\ \mathbf{0} & \Sigma_{22}^{-1} \end{pmatrix} \begin{pmatrix} \mathbf{x}_1 - \boldsymbol{\mu}_1 \\ \mathbf{x}_2 - \boldsymbol{\mu}_2 \end{pmatrix}}}{(2\pi)^{\frac{n+m}{2}} \sqrt{|\Sigma_{\mathbf{X}}|}}
$$

其中指数部分的矩阵乘法展开为：
$$
\begin{aligned}
& \begin{pmatrix} \mathbf{x}_1 - \boldsymbol{\mu}_1 \\ \mathbf{x}_2 - \boldsymbol{\mu}_2 \end{pmatrix}^T \begin{pmatrix} \Sigma_{11}^{-1} & \mathbf{0} \\ \mathbf{0} & \Sigma_{22}^{-1} \end{pmatrix} \begin{pmatrix} \mathbf{x}_1 - \boldsymbol{\mu}_1 \\ \mathbf{x}_2 - \boldsymbol{\mu}_2 \end{pmatrix} \\
&= \begin{pmatrix} \mathbf{x}_1 - \boldsymbol{\mu}_1 \\ \mathbf{x}_2 - \boldsymbol{\mu}_2 \end{pmatrix}^T \begin{pmatrix} \Sigma_{11}^{-1}(\mathbf{x}_1 - \boldsymbol{\mu}_1) \\ \Sigma_{22}^{-1}(\mathbf{x}_2 - \boldsymbol{\mu}_2) \end{pmatrix} \\
&= (\mathbf{x}_1 - \boldsymbol{\mu}_1)^T \Sigma_{11}^{-1} (\mathbf{x}_1 - \boldsymbol{\mu}_1) + (\mathbf{x}_2 - \boldsymbol{\mu}_2)^T \Sigma_{22}^{-1} (\mathbf{x}_2 - \boldsymbol{\mu}_2)
\end{aligned}
$$

且行列式 $|\Sigma_{\mathbf{X}}| = |\Sigma_{11}| \cdot |\Sigma_{22}|$，故：
$$
\begin{aligned}
f_{\mathbf{X}}(\mathbf{x}_1, \mathbf{x}_2) &= \frac{e^{-\frac{1}{2} [(\mathbf{x}_1 - \boldsymbol{\mu}_1)^T \Sigma_{11}^{-1} (\mathbf{x}_1 - \boldsymbol{\mu}_1) + (\mathbf{x}_2 - \boldsymbol{\mu}_2)^T \Sigma_{22}^{-1} (\mathbf{x}_2 - \boldsymbol{\mu}_2)]}}{(2\pi)^{\frac{n+m}{2}} \sqrt{|\Sigma_{11}| |\Sigma_{22}|}} \\
&= \frac{e^{-\frac{1}{2}(\mathbf{x}_1 - \boldsymbol{\mu}_1)^T \Sigma_{11}^{-1} (\mathbf{x}_1 - \boldsymbol{\mu}_1)}}{(2\pi)^{n/2} \sqrt{|\Sigma_{11}|}} \cdot \frac{e^{-\frac{1}{2}(\mathbf{x}_2 - \boldsymbol{\mu}_2)^T \Sigma_{22}^{-1} (\mathbf{x}_2 - \boldsymbol{\mu}_2)}}{(2\pi)^{m/2} \sqrt{|\Sigma_{22}|}} \\
&= f_{\mathbf{X}_1}(\mathbf{x}_1) \cdot f_{\mathbf{X}_2}(\mathbf{x}_2)
\end{aligned}
$$
（即联合密度函数等于边缘密度函数的乘积，故 $\mathbf{X}_1, \mathbf{X}_2$ 独立。）