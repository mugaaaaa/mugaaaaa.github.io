---
title: "随机过程：扩散模型"
published: 2026-06-12
description: "扩散模型的相关数学推导"
tags: [Stochastic Process, Math, Gauss Process, Diffusion Model]
category: math
draft: false
lang: zh_CN
---

> 还在写

# 正向过程

# 反向条件概率 $q(\boldsymbol{x}_{t-1} | \boldsymbol{x}_t, \boldsymbol{x}_0)$ 推导

### 1. 贝叶斯公式展开
根据贝叶斯公式，反向条件概率密度可以写为：
$$q(\boldsymbol{x}_{t-1} | \boldsymbol{x}_t, \boldsymbol{x}_0) = \frac{q(\boldsymbol{x}_t | \boldsymbol{x}_{t-1}, \boldsymbol{x}_0) q(\boldsymbol{x}_{t-1} | \boldsymbol{x}_0)}{q(\boldsymbol{x}_t | \boldsymbol{x}_0)}$$

> $$
> q(\boldsymbol{x}_t | \boldsymbol{x}_{t-1}, \boldsymbol{x}_0) = \frac{1}{(2\pi)^{\frac{n}{2}} \sqrt{(1 - \alpha_t)^n}} \exp \left( -\frac{(\boldsymbol{x}_t - \sqrt{\alpha_t}\boldsymbol{x}_{t-1})^\mathrm{T}(\boldsymbol{x}_t - \sqrt{\alpha_t}\boldsymbol{x}_{t-1})}{2(1 - \alpha_t)} \right) 
> $$
>
> $$
> q(\boldsymbol{x}_{t-1} | \boldsymbol{x}_0) = \frac{1}{(2\pi)^{\frac{n}{2}} \sqrt{(1 - \bar{\alpha}_{t-1})^n}} \exp \left( -\frac{(\boldsymbol{x}_{t-1} - \sqrt{\bar{\alpha}_{t-1}}\boldsymbol{x}_0)^\mathrm{T}(\boldsymbol{x}_{t-1} - \sqrt{\bar{\alpha}_{t-1}}\boldsymbol{x}_0)}{2(1 - \bar{\alpha}_{t-1})} \right)
> $$
>
> $$
> q(\boldsymbol{x}_t | \boldsymbol{x}_0) = \frac{1}{(2\pi)^{\frac{n}{2}} \sqrt{(1 - \bar{\alpha}_t)^n}} \exp \left( -\frac{(\boldsymbol{x}_t - \sqrt{\bar{\alpha}_t}\boldsymbol{x}_0)^\mathrm{T}(\boldsymbol{x}_t - \sqrt{\bar{\alpha}_t}\boldsymbol{x}_0)}{2(1 - \bar{\alpha}_t)} \right)
> $$

由于高斯分布的乘除法结果依然是高斯分布，我们只需关注指数 $e$ 内部的二次型。忽略归一化常数，将三个已知的高斯分布概率密度函数代入上式，其指数部分（取负号后）可以表示为：
$$J = \frac{\|\boldsymbol{x}_t - \sqrt{\alpha_t}\boldsymbol{x}_{t-1}\|^2}{2(1 - \alpha_t)} + \frac{\|\boldsymbol{x}_{t-1} - \sqrt{\bar{\alpha}_{t-1}}\boldsymbol{x}_0\|^2}{2(1 - \bar{\alpha}_{t-1})} - \frac{\|\boldsymbol{x}_t - \sqrt{\bar{\alpha}_t}\boldsymbol{x}_0\|^2}{2(1 - \bar{\alpha}_t)}$$

由于最终目的是求关于自变量 $\boldsymbol{x}_{t-1}$ 的高斯分布，所有不包含 $\boldsymbol{x}_{t-1}$ 的项（如最后一项纯涉及 $\boldsymbol{x}_t$ 和 $\boldsymbol{x}_0$ 的项）在配方时都可以统一归入常数项 $c$ 中。因此我们聚焦于前两项的展开：
$$J = \frac{\|\boldsymbol{x}_t\|^2 - 2\sqrt{\alpha_t}\boldsymbol{x}_{t-1}^\mathrm{T}\boldsymbol{x}_t + \alpha_t \|\boldsymbol{x}_{t-1}\|^2}{2(1 - \alpha_t)} + \frac{\|\boldsymbol{x}_{t-1}\|^2 - 2\sqrt{\bar{\alpha}_{t-1}}\boldsymbol{x}_{t-1}^\mathrm{T}\boldsymbol{x}_0 + \bar{\alpha}_{t-1} \|\boldsymbol{x}_0\|^2}{2(1 - \bar{\alpha}_{t-1})} + c$$

---

### 2. 按 $\boldsymbol{x}_{t-1}$ 的次数合并同类项
重新梳理上式，将其写成关于 $\boldsymbol{x}_{t-1}$ 的二次型标准式 $J = \frac{1}{2} \left[ A \|\boldsymbol{x}_{t-1}\|^2 - 2 \boldsymbol{B}^\mathrm{T} \boldsymbol{x}_{t-1} \right] + c'$：

* **二次项 $\|\boldsymbol{x}_{t-1}\|^2$ 的系数 $A$：**
$$A = \frac{\alpha_t}{1 - \alpha_t} + \frac{1}{1 - \bar{\alpha}_{t-1}}$$

* **一次项 $\boldsymbol{x}_{t-1}$ 的系数向量 $\boldsymbol{B}$：**
$$\boldsymbol{B} = \frac{\sqrt{\alpha_t}}{1 - \alpha_t} \boldsymbol{x}_t + \frac{\sqrt{\bar{\alpha}_{t-1}}}{1 - \bar{\alpha}_{t-1}} \boldsymbol{x}_0$$

---

### 3. 计算条件方差 $\sigma_{t-1}^2$
根据多元高斯分布的性质，二次项系数 $A$ 即为方差的倒数（精度），即 $\frac{1}{\sigma_{t-1}^2} = A$：
$$\frac{1}{\sigma_{t-1}^2} = \frac{\alpha_t}{1 - \alpha_t} + \frac{1}{1 - \bar{\alpha}_{t-1}}$$

对右边进行通分化简：
$$\frac{1}{\sigma_{t-1}^2} = \frac{\alpha_t(1 - \bar{\alpha}_{t-1}) + (1 - \alpha_t)}{(1 - \alpha_t)(1 - \bar{\alpha}_{t-1})}$$
$$\frac{1}{\sigma_{t-1}^2} = \frac{\alpha_t - \alpha_t\bar{\alpha}_{t-1} + 1 - \alpha_t}{(1 - \alpha_t)(1 - \bar{\alpha}_{t-1})} = \frac{1 - \bar{\alpha}_t}{(1 - \alpha_t)(1 - \bar{\alpha}_{t-1})}$$

两边取倒数，得到条件方差的闭式解：
$$\sigma_{t-1}^2 = \frac{(1 - \alpha_t)(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t}$$

---

### 4. 计算条件均值 $\boldsymbol{\mu}_{t-1}$
标准高斯分布配方后一次项的形式为 $\frac{1}{\sigma_{t-1}^2} \boldsymbol{\mu}_{t-1}^\mathrm{T} \boldsymbol{x}_{t-1}$，比对刚才的一次项系数 $\boldsymbol{B}$ 可得：
$$\frac{1}{\sigma_{t-1}^2} \boldsymbol{\mu}_{t-1} = \boldsymbol{B} = \frac{\sqrt{\alpha_t}}{1 - \alpha_t} \boldsymbol{x}_t + \frac{\sqrt{\bar{\alpha}_{t-1}}}{1 - \bar{\alpha}_{t-1}} \boldsymbol{x}_0$$

两边同乘以刚刚算出的 $\sigma_{t-1}^2$：
$$\boldsymbol{\mu}_{t-1} = \left[ \frac{(1 - \alpha_t)(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t} \right] \cdot \left[ \frac{\sqrt{\alpha_t}}{1 - \alpha_t} \boldsymbol{x}_t + \frac{\sqrt{\bar{\alpha}_{t-1}}}{1 - \bar{\alpha}_{t-1}} \boldsymbol{x}_0 \right]$$

将各项分别展开并约分：
* **$\boldsymbol{x}_t$ 的系数：** $\frac{(1 - \alpha_t)(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t} \cdot \frac{\sqrt{\alpha_t}}{1 - \alpha_t} = \frac{\sqrt{\alpha_t}(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t}$
* **$\boldsymbol{x}_0$ 的系数：** $\frac{(1 - \alpha_t)(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t} \cdot \frac{\sqrt{\bar{\alpha}_{t-1}}}{1 - \bar{\alpha}_{t-1}} = \frac{\sqrt{\bar{\alpha}_{t-1}}(1 - \alpha_t)}{1 - \bar{\alpha}_t}$

由此得到条件均值的闭式解：
$$\boldsymbol{\mu}_{t-1} = \frac{\sqrt{\alpha_t}(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t} \boldsymbol{x}_t + \frac{\sqrt{\bar{\alpha}_{t-1}}(1 - \alpha_t)}{1 - \bar{\alpha}_t} \boldsymbol{x}_0$$

---

### 5. 最终概率密度函数
通过配方，最终的条件概率密度函数完全确定，其服从多元高斯分布：
$$q(\boldsymbol{x}_{t-1} | \boldsymbol{x}_t, \boldsymbol{x}_0) = \mathcal{N}\left(\boldsymbol{x}_{t-1}; \boldsymbol{\mu}_{t-1}, \sigma_{t-1}^2 \boldsymbol{I}\right)$$
$$q(\boldsymbol{x}_{t-1} | \boldsymbol{x}_t, \boldsymbol{x}_0) = \frac{1}{(2\pi)^{\frac{n}{2}} \sigma_{t-1}^n} \exp \left( -\frac{(\boldsymbol{x}_{t-1} - \boldsymbol{\mu}_{t-1})^\mathrm{T}(\boldsymbol{x}_{t-1} - \boldsymbol{\mu}_{t-1})}{2\sigma_{t-1}^2} \right)$$