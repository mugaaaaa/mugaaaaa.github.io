---
title: "代数结构：环的理想"
published: 2026-06-11
description: "环的理想"
tags: [Modern Algebra, Ring, Ideal, Math]
category: math
draft: false
lang: zh_CN
---

## 环的理想

**环的理想**是环 \(R\) 的一个加法子群 \(I\)，并满足“吸收律”：对任意 \(r \in R\) 和 \(a \in I\)，有 \(r a \in I\)（左理想）、\(a r \in I\)（右理想）或两者兼有（双边理想）。直观上，理想是通过与环中任意元素相乘后仍留在子集内的结构，因而可以用来定义**商环** \(R/I\)，如同正规子群在群论中的角色。  

常见概念：  
- **主理想**：由一个元素生成，\((a) = \{ ra \mid r \in R \}\)（在交换环中）。  
- **素理想**：若 \(ab \in I\)，则 \(a \in I\) 或 \(b \in I\)（类似素数）。  
- **极大理想**：没有严格包含它的非平凡理想，此时商环为域。  
- 理想在环同态中起**核**的作用，同态基本定理与线性变换的零空间类比。  

> **具体例子：**  
> 1. **整数环 \(\mathbb{Z}\)**：所有形如 \(n\mathbb{Z} = \{ kn \mid k \in \mathbb{Z} \}\) 的子集都是理想。例如 \(2\mathbb{Z}\)（偶数集）是理想，且是主理想 \((2)\)。  
> 2. **多项式环 \(F[x]\)**：由 \(x\) 生成的主理想 \((x)\) 包含所有常数项为零的多项式。\((x)\) 也是极大理想，因为商环 \(F[x]/(x) \cong F\) 是一个域。  
> 3. **矩阵环 \(M_n(\mathbb{R})\)**：这个非交换环的理想结构很特殊：它只有**平凡理想** \(\{0\}\) 和整个环（因此是单环）。任何非零双边理想一定等于全矩阵环。  
> 4. **连续函数环 \(C[0,1]\)**：在某点 \(x_0\) 处取值为零的所有函数构成一个极大理想 \(I_{x_0} = \{ f \in C[0,1] \mid f(x_0)=0 \}\)，商环同构于 \(\mathbb{R}\)，体现了理想与“零点集”的对应。

### 理想的运算

| 运算及形式 | $\mathbb{Z}$ 中的表现 |
| - | - |
| $I + J = \{x + y \| x \in I, y \in J\}$ | $\langle a \rangle  + \langle b \rangle  = \langle gcd(a, b) \rangle$ |
| $I \bigcap J = \{x \| x \in I \text{ 且 } x \in J\}$ | $\langle a \rangle  \bigcap \langle b \rangle  = \langle lcm(a, b) \rangle$ |
| $IJ = \{\sum x_i y_i \| x_i \in I, y_i \in J\}$ | $\langle a \rangle \langle b \rangle  = \langle ab \rangle$ |

### 主理想

#### 主理想的定义

设 $R$ 是环，$a$ 是 $R$ 的元素，记所有包含 $a$ 的理想构成的集合为 $\Sigma = \{I \triangleleft R \mid a \in I\}$，显然 $R \in \Sigma$，所以 $\Sigma$ 非空，令

$$\langle a \rangle = \bigcap_{I \in \Sigma} I$$

则 $\langle a \rangle$ 是理想，而且是包含 $a$ 的最小理想。这个理想称为由 $a$ 生成的**主理想（principal ideal）**。


#### 主理想的形式

**定理 2.2.3** 设 $R$ 是环，$a \in R$，则：

(1) $\langle a \rangle = \left\{ \left( \sum_{i=1}^n x_i a y_i \right) + xa + ay + ma \;\middle|\; x_i, y_i, x, y \in R, n \in \mathbb{Z}^+, m \in \mathbb{Z} \right\}$
> $$
>    \underbrace{\left( \sum_{i=1}^n x_i a y_i \right)}_{\text{双边理想项}} + 
>    \underbrace{xa}_{\text{左理想项}} + 
>    \underbrace{ay}_{\text{右理想项}} + 
>    \underbrace{ma}_{\text{加法群项}} 
> $$
> 
> 双边理想项：吸收左右两侧的环乘法
> 
> 左理想项：吸收左侧环乘法
> 
> 右理想项：吸收右侧环乘法
> 
> 加法群项：在无单位元时强制包含 a 及其整数倍

随着环的性质变好（拥有单位元或交换律），上述长公式中的某些项可以互相合并：

(2) 若 $R$ **有单位元**，则：

$$\langle a \rangle = \left\{ \sum_{i=1}^n x_i a y_i \;\middle|\; x_i, y_i \in R \right\}$$

(3) 若 $R$ 是**交换环**，则：

$$\langle a \rangle = \{ xa + ma \mid x \in R, m \in \mathbb{Z} \}$$

(4) 若 $R$ 是**有单位元的交换环**，则：

$$\langle a \rangle = aR = \{ ar \mid r \in R \}$$

> 证明 $I + J$, $I \bigcap J$, $IJ$ 也是理想
> $I + J$


## 商环

设 \( R \) 是一个环，\( I \) 是 \( R \) 的一个**双边理想**。在加法商群 \( R/I = \{ r + I \mid r \in R \} \) 上定义乘法：
\[
(r + I) \cdot (s + I) = rs + I.
\]
该乘法是良定义的（因为 \( I \) 是理想，吸收律保证结果不依赖代表元选取），且满足结合律和分配律。于是 \( R/I \) 连同加法与乘法构成一个环，称为 \( R \) 模 \( I \) 的**商环**（或**剩余类环**）。

**商环的基本性质：**
- 零元为 \( 0 + I = I \)；单位元（若 \( R \) 含幺且 \( 1 \in R \)）为 \( 1 + I \)。
- 自然投影 \( \pi: R \to R/I,\; \pi(r) = r + I \) 是一个满环同态，其核恰为 \( I \)。
- **环同态基本定理**：任何环同态 \( f: R \to S \) 诱导出同构 \( R/\ker f \cong \operatorname{im} f \)。

> **常见例子：**
> 1. **整数模 n**：\( \mathbb{Z} / n\mathbb{Z} \)（理想 \( I = n\mathbb{Z} \)），得到环 \( \mathbb{Z}_n \)。
> 2. **多项式环模主理想**：\( F[x] / (p(x)) \)；当 \( p(x) \) 不可约时，商环为域（如 \( \mathbb{R}[x]/(x^2+1) \cong \mathbb{C} \)）。
> 3. **连续函数环模极大理想**：\( C[0,1] / I_{x_0} \)（其中 \( I_{x_0} = \{ f \mid f(x_0)=0 \} \)）同构于 \( \mathbb{R} \)。

## 环同态基本定理

**第一同构定理（环同态基本定理）**  
设 \(f: R \to S\) 是一个环同态，则：
- 核 \(\ker f = \{ r \in R \mid f(r) = 0 \}\) 是 \(R\) 的一个理想。
- 像 \(\operatorname{im} f = f(R)\) 是 \(S\) 的一个子环。
- 存在唯一的环同构：
- 
  \[
  \overline{f}: R/\ker f \longrightarrow \operatorname{im} f,
  \quad
  \overline{f}(r + \ker f) = f(r).
  \]
  （商环 \(R/\ker f\) 同构于同态像 \(\operatorname{im} f\)）

**定理的直观含义**  
任何环同态都可“分解”为一个满同态 \(R \to R/\ker f\) 与一个单同态 \(R/\ker f \to S\) 的合成，类比于高代中的的秩–零化度定理：定义域模掉核等于像。

> **简单例子**  
> 同态 \(f: \mathbb{Z} \to \mathbb{Z}_n,\; f(k) = k \bmod n\)，核为 \(n\mathbb{Z}\)，像为整个 \(\mathbb{Z}_n\)，因此
> \[\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n.\]