---
title: "一些经典损失函数的推导"
published: 2026-06-03
description: "用极大似然估计推导一些经典的损失函数"
tags: [Machine Learning, Math, MLE, MSE, BCE, CCE, KL Divergence]
category: math
draft: false
lang: zh_CN
---

# 由 Gauss 分布推 MSE
$$y = f(x) + \epsilon$$
由中心极限定理，设 $\epsilon \sim N(0, \sigma^2)$
则 $y \sim N(f(x), \sigma^2)$
$$p(y|x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(y-f(x))^2}{2\sigma^2}}$$
设为 $N$ 个独立样本，
构造似然函数：
$$L = \prod_{i=1}^N p(y_i|x_i)$$
$$\log L = \sum_{i=1}^N \log \left[ \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(y-f(x))^2}{2\sigma^2}} \right]$$
$$= \sum_{i=1}^N \left[ \log \frac{1}{\sqrt{2\pi}\sigma} - \frac{(y-f(x))^2}{2\sigma^2} \right]$$
$$= N \log \frac{1}{\sqrt{2\pi}\sigma} - \frac{1}{2\sigma^2} \underbrace{\sum_{i=1}^N (y-f(x))^2}_{MSE}$$
要 $L$ 最大化，需最小 $\sum_{i=1}^N (y-f(x))^2$，即 MSE

---

② 由 Bernoulli 分布推 BCE
$$p(y|x) = p^y(1-p)^{1-y}$$
$$L = \prod_{i=0}^{N-1} p(y_i|x_i) = \prod_{i=0}^{N-1} p_i^{y_i}(1-p_i)^{1-y_i}$$
$$\log L = \sum_{i=0}^{N-1} \left( y_i \log p_i + (1-y_i) \log (1-p_i) \right)$$
要最大化 $\log L$，即要最小化
$$Loss = -\log L = -\sum_{i=0}^{N-1} [y_i \log p_i + (1-y_i) \log (1-p_i)]$$
即 BCE

---

# 推 CCE
真实标签 $\mathbf{y} \in \mathbb{R}^K$，为 One-hot 编码，只有 $1$ 个 $c \in \{0, 1, \dots, K-1\}$ 使得 $y_c = 1$，而其它的分量都为 $0$
模型预测 $\mathbf{p} = (p_0, p_1, \dots, p_{K-1}) \in \mathbb{R}^K$，为概率预测
$$p(\mathbf{y}|x) = \prod_{k=0}^{K-1} p_k^{y_k}$$
$$= p_0^{y_0} \cdot p_1^{y_1} \dots p_c^{y_c} \dots p_{K-1}^{y_{K-1}}$$
$$= p_0^0 \cdot p_1^0 \dots p_c^1 \dots p_{K-1}^0$$
$$= 1 \cdot 1 \dots p_c \dots 1 = p_c^{y_c}$$

设为 $N$ 个独立同分布样本，
$$L = \prod_{i=1}^N p(\mathbf{y}^{(i)}|x^{(i)})$$
$$L = \prod_{i=0}^{N-1} p(\mathbf{y}_i|x_i) = \prod_{i=0}^{N-1} \prod_{k=0}^{K-1} (p_{i,k})^{y_{i,k}}$$
$$\log L = \sum_{i=0}^{N-1} \sum_{k=0}^{K-1} y_{i,k} \log p_{i,k}$$
要最大化 $\log L$，即最小化
$$Loss = -\log L = -\sum_{i=0}^{N-1} \sum_{k=0}^{K-1} y_{i,k} \log p_{i,k}$$
即 CCE

---

# KL 散度(相对熵)
交叉熵：$H(P,Q) = -\sum_x P(x) \log Q(x)$
（用 $Q$ 编码 $P$ 的总代价）
信息熵：$H(P) = -\sum_x P(x) \log P(x)$
KL 散度：$D_{KL}(P||Q) = H(P,Q) - H(P)$
$$= -\sum_x P(x) \log Q(x) - \left( -\sum_x P(x) \log P(x) \right)$$
$$= \sum_x P(x) \log \frac{P(x)}{Q(x)}$$
