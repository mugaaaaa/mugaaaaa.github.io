---
title: "信号与系统：傅立叶级数和各种变换"
published: 2026-06-01
description: "连续/离散傅立叶级数，连续/离散傅立叶变换，拉普拉斯变换，z 变换"
tags: [Signals and Systems, Fourier Transform, Math]
category: math
draft: false
lang: zh_CN
---

## 0. 地图

```
            周期信号                非周期信号             加收敛因子(全平面/ROC)
   CT │   CTFS  ──── T→∞ ────►   CTFT  ──── jω→s=σ+jω ───►  Laplace
      │   a_k(离散谱)            X(jω)(连续谱)               X(s)
      │     ▲                      ▲                          ▲
      │  采样/对偶              采样z=e^{sT}                z=e^{sT}
      │     ▼                      ▼                          ▼
   DT │   DTFS  ──── N→∞ ────►   DTFT  ── e^{jω}→z=re^{jω} ─► Z 变换
            a_k(N周期)           X(e^{jω})(2π周期)           X(z)
```

1. **周期 → 非周期**：把周期 $T$（或 $N$）推到无穷，离散谱线 $a_k$ 变成连续谱 $X(j\omega)$。即 FS 是 FT 的"离散谱版"，FT 是 FS 的"$T\to\infty$ 极限"。
2. **傅里叶 → 广义（Laplace / Z）**：傅里叶只在虚轴 $j\omega$（CT）/ 单位圆 $e^{j\omega}$（DT）上取值，对增长信号不收敛。乘上收敛因子 $e^{-\sigma t}$ 即得 Laplace（$s=\sigma+j\omega$）；DT 里把 $e^{j\omega}$ 放大成 $z=re^{j\omega}$ 即得 Z。所以 **FT = Laplace 在 $s=j\omega$ 上的切片**，**DTFT = Z 在 $|z|=1$ 上的切片**（前提：ROC 含该轴/圆）。
3. **CT ↔ DT 双胞胎**：左右两行结构完全对称，差异只在"微分↔差分、积分↔累加、虚轴↔单位圆、左半平面↔单位圆内"。映射桥梁是 $z=e^{sT}$（采样）。

## 1. 定义式总表（分析式=正变换，综合式=反变换）

| 变换 | 适用信号 | 分析式（正） | 综合式（反） | 频率/复变量 | 谱性质 | 需 ROC？ |
|---|---|---|---|---|---|---|
| **CTFS** | CT 周期 $T$ | $a_k=\dfrac1T\displaystyle\int_T x(t)e^{-jk\omega_0 t}\,dt$ | $x(t)=\displaystyle\sum_{k=-\infty}^{\infty} a_k e^{jk\omega_0 t}$ | $k\omega_0$（离散） | 离散、非周期 | 否 |
| **CTFT** | CT 非周期 | $X(j\omega)=\displaystyle\int_{-\infty}^{\infty} x(t)e^{-j\omega t}\,dt$ | $x(t)=\dfrac1{2\pi}\displaystyle\int_{-\infty}^{\infty} X(j\omega)e^{j\omega t}\,d\omega$ | $\omega$（连续） | 连续、非周期 | 否 |
| **Laplace** | CT 一般 | $X(s)=\displaystyle\int_{-\infty}^{\infty} x(t)e^{-st}\,dt$ | $x(t)=\dfrac1{2\pi j}\displaystyle\int_{\sigma-j\infty}^{\sigma+j\infty} X(s)e^{st}\,ds$ | $s=\sigma+j\omega$ | 复平面 | **是** |
| **DTFS** | DT 周期 $N$ | $a_k=\dfrac1N\displaystyle\sum_{n=\langle N\rangle} x[n]e^{-jk\Omega_0 n}$ | $x[n]=\displaystyle\sum_{k=\langle N\rangle} a_k e^{jk\Omega_0 n}$ | $k\Omega_0$（离散） | 离散、**$N$ 周期** | 否 |
| **DTFT** | DT 非周期 | $X(e^{j\omega})=\displaystyle\sum_{n=-\infty}^{\infty} x[n]e^{-j\omega n}$ | $x[n]=\dfrac1{2\pi}\displaystyle\int_{2\pi} X(e^{j\omega})e^{j\omega n}\,d\omega$ | $\omega$（连续） | 连续、**$2\pi$ 周期** | 否 |
| **Z** | DT 一般 | $X(z)=\displaystyle\sum_{n=-\infty}^{\infty} x[n]z^{-n}$ | $x[n]=\dfrac1{2\pi j}\displaystyle\oint X(z)z^{n-1}\,dz$ | $z=re^{j\omega}$ | 复平面 | **是** |

> 对称性记忆：**时域离散 ⇄ 频域周期**（DTFS/DTFT 的谱是周期的）；**时域周期 ⇄ 频域离散**（FS 的谱是谱线）。CTFT 时域连续非周期、频域也连续非周期，最"对称"。

---

## 2. 性质大对比

> CT 家族、DT 家族两张表（微分/差分、积分/累加形式不同）。
> "⊇ $R$" 表示 ROC 至少包含原 ROC，可能因零极点对消而扩大。

### 表 A · CT 家族（CTFS / CTFT / Laplace）

| 性质 | 时域 | **CTFS** $a_k$ | **CTFT** $X(j\omega)$ | **Laplace** $X(s)$（含 ROC） |
|---|---|---|---|---|
| 线性 | $\alpha x+\beta y$ | $\alpha a_k+\beta b_k$ | $\alpha X+\beta Y$ | $\alpha X+\beta Y$，ROC ⊇ $R_x\cap R_y$ |
| 时移 | $x(t-t_0)$ | $a_k\,e^{-jk\omega_0 t_0}$ | $e^{-j\omega t_0}X(j\omega)$ | $e^{-st_0}X(s)$，ROC 不变 |
| 频移 / 调制 | $e^{jM\omega_0 t}x(t)$ ／ $e^{j\omega_c t}x(t)$ | $a_{k-M}$ | $X(j(\omega-\omega_c))$ | $X(s-s_0)$（$e^{s_0 t}x$），ROC $\to R+\mathrm{Re}[s_0]$ |
| 时间反折 | $x(-t)$ | $a_{-k}$ | $X(-j\omega)$ | $X(-s)$，ROC $\to -R$ |
| 时间尺度 | $x(at)$ | 谱仍 $a_k$，基频变 $a\omega_0$（$a>0$） | $\dfrac1{\lvert a\rvert}X\!\left(\dfrac{j\omega}{a}\right)$ | $\dfrac1{\lvert a\rvert}X\!\left(\dfrac{s}{a}\right)$，ROC $\to aR$ |
| 共轭 | $x^*(t)$ | $a_{-k}^*$ | $X^*(-j\omega)$ | $X^*(s^*)$，ROC $R$ |
| **卷积** | $x*y$ | $T\,a_k b_k$（周期卷积时） | $X(j\omega)Y(j\omega)$ | $X(s)Y(s)$，ROC ⊇ $R_x\cap R_y$ |
| 相乘（频域卷积） | $x(t)y(t)$ | $\displaystyle\sum_l a_l b_{k-l}$（周期卷积） | $\dfrac1{2\pi}X*Y$ | —（一般不用） |
| **时域微分** | $\dfrac{dx}{dt}$ | $jk\omega_0\,a_k$ | $j\omega\,X(j\omega)$ | $sX(s)$，ROC ⊇ $R$ |
| 频域微分 | $t\,x(t)$ | — | $j\dfrac{d}{d\omega}X(j\omega)$ | $-\dfrac{dX}{ds}$（即 $-t\,x\leftrightarrow \frac{dX}{ds}$） |
| **时域积分** | $\displaystyle\int_{-\infty}^{t}x\,d\tau$ | $\dfrac{1}{jk\omega_0}a_k$（需 $a_0=0$，$k\neq0$） | $\dfrac1{j\omega}X(j\omega)+\pi X(0)\delta(\omega)$ | $\dfrac1s X(s)$，ROC ⊇ $R\cap\{\mathrm{Re}[s]>0\}$ |
| Parseval | 能量/功率 | $\dfrac1T\displaystyle\int_T\lvert x\rvert^2dt=\displaystyle\sum_k\lvert a_k\rvert^2$ | $\displaystyle\int\lvert x\rvert^2dt=\dfrac1{2\pi}\displaystyle\int\lvert X\rvert^2d\omega$ | —（用 FT 版） |
| 对偶 | — | — | $x(t)\!\leftrightarrow\!X(j\omega)\Rightarrow X(jt)\!\leftrightarrow\!2\pi x(-\omega)$ | — |

**单边 Laplace 微分（带初值，解微分方程用）**：
$$\dot x\to s\mathcal X(s)-x(0^-),\qquad \ddot x\to s^2\mathcal X(s)-s\,x(0^-)-x'(0^-)$$
**初值**：$x(0^+)=\lim\limits_{s\to\infty}sX(s)$；**终值**：$\lim\limits_{t\to\infty}x(t)=\lim\limits_{s\to0}sX(s)$（须除 $s{=}0$ 外极点全在左半平面）。

### 表 B · DT 家族（DTFS / DTFT / Z）

| 性质 | 时域 | **DTFS** $a_k$ | **DTFT** $X(e^{j\omega})$ | **Z** $X(z)$（含 ROC） |
|---|---|---|---|---|
| 线性 | $\alpha x+\beta y$ | $\alpha a_k+\beta b_k$ | $\alpha X+\beta Y$ | $\alpha X+\beta Y$，ROC ⊇ $R_x\cap R_y$ |
| 时移 | $x[n-n_0]$ | $a_k\,e^{-jk\Omega_0 n_0}$ | $e^{-j\omega n_0}X(e^{j\omega})$ | $z^{-n_0}X(z)$，ROC 不变（可能增删 $0,\infty$） |
| 频移 / 调制 | $e^{jM\Omega_0 n}x[n]$ ／ $z_0^{\,n}x[n]$ | $a_{k-M}$ | $X(e^{j(\omega-\omega_0)})$ | $X(z/z_0)$，ROC $\to \lvert z_0\rvert R$ |
| 时间反折 | $x[-n]$ | $a_{-k}$ | $X(e^{-j\omega})$ | $X(1/z)$，ROC $\to 1/R$ |
| 时间扩展 | $x_{(m)}[n]$（插 $m{-}1$ 个零） | — | $X(e^{jm\omega})$ | $X(z^m)$ |
| 共轭 | $x^*[n]$ | $a_{-k}^*$ | $X^*(e^{-j\omega})$ | $X^*(z^*)$，ROC $R$ |
| **卷积** | $x*y$ | $N\,a_k b_k$（周期卷积时） | $X(e^{j\omega})Y(e^{j\omega})$ | $X(z)Y(z)$，ROC ⊇ $R_x\cap R_y$ |
| 相乘（频域卷积） | $x[n]y[n]$ | $\displaystyle\sum_{l=\langle N\rangle} a_l b_{k-l}$（周期卷积） | $\dfrac1{2\pi}X\circledast Y$（$2\pi$ 周期卷积） | —（一般不用） |
| **一阶差分** | $x[n]-x[n-1]$ | $(1-e^{-jk\Omega_0})a_k$ | $(1-e^{-j\omega})X(e^{j\omega})$ | $(1-z^{-1})X(z)$，ROC ⊇ $R\cap\{\lvert z\rvert>0\}$ |
| 频域微分 | $n\,x[n]$ | — | $j\dfrac{d}{d\omega}X(e^{j\omega})$ | $-z\dfrac{dX}{dz}$ |
| **累加** | $\displaystyle\sum_{m=-\infty}^{n}x[m]$ | $\dfrac{1}{1-e^{-jk\Omega_0}}a_k$（$k\neq0$） | $\dfrac{X(e^{j\omega})}{1-e^{-j\omega}}+\pi X(e^{j0})\!\!\displaystyle\sum_{k}\delta(\omega-2\pi k)$ | $\dfrac{1}{1-z^{-1}}X(z)$，ROC ⊇ $R\cap\{\lvert z\rvert>1\}$ |
| Parseval | 能量/功率 | $\dfrac1N\displaystyle\sum_{n=\langle N\rangle}\lvert x\rvert^2=\displaystyle\sum_{k=\langle N\rangle}\lvert a_k\rvert^2$ | $\displaystyle\sum_n\lvert x\rvert^2=\dfrac1{2\pi}\displaystyle\int_{2\pi}\lvert X\rvert^2d\omega$ | —（用 DTFT 版） |

**Z 初值/终值（因果序列）**：初值 $x[0]=\lim\limits_{z\to\infty}X(z)$；终值 $\lim\limits_{n\to\infty}x[n]=\lim\limits_{z\to1}(1-z^{-1})X(z)$（须 $(1-z^{-1})X(z)$ 极点全在单位圆内）。

---

## 3. CT ↔ DT 类比对照（一行一个"翻译"）

| 概念 | CT（Laplace/FT） | DT（Z/DTFT） | 桥梁 |
|---|---|---|---|
| 基本算子 | 微分 $\dfrac{d}{dt}\leftrightarrow s$（或 $j\omega$） | 移位/差分 $x[n-1]\leftrightarrow z^{-1}$ | $z=e^{sT}$ |
| 逆算子 | 积分 $\int\leftrightarrow \dfrac1s$ | 累加 $\sum\leftrightarrow \dfrac1{1-z^{-1}}$ | — |
| 特征函数 | $e^{st}$（$H(s)e^{st}$） | $z^n$（$H(z)z^n$） | $z=e^{sT}$ |
| 频率轴 | 虚轴 $s=j\omega$ | 单位圆 $z=e^{j\omega}$ | 虚轴整条 ↔ 单位圆绕一圈 |
| 稳定区 | 左半平面 $\mathrm{Re}[s]<0$ | 单位圆内 $\lvert z\rvert<1$ | $z=e^{sT}$ 把左半平面映入圆内 |
| 频域微分 | $-t\,x(t)\leftrightarrow \dfrac{dX}{ds}$ | $-n\,x[n]\leftrightarrow z\dfrac{dX}{dz}$ | — |
| 周期性 | 频谱**不**周期 | 频谱 $2\pi$ 周期（$z=e^{j\omega}$ 转一圈复现） | 采样导致频谱周期化 |

> 一句话：**DT 没有"微分"，用"差分/移位"；没有"积分"，用"累加"。** 凡 CT 里见到 $s$，DT 对应位置多半是 $(1-z^{-1})$ 或 $z^{-1}$。

---

## 4. LTI 系统分析对比（核心考点）

对 LTI 系统，复指数是**特征函数**：输入 $e^{st}$（或 $z^n$）→ 输出 $H(s)e^{st}$（或 $H(z)z^n$），$H$ 即**系统函数**（冲激响应的变换）。

| 项目 | 连续 LTI | 离散 LTI |
|---|---|---|
| 特征函数 | $e^{st}$ | $z^n$ |
| 系统函数 | $H(s)=\displaystyle\int h(t)e^{-st}dt=\dfrac{Y(s)}{X(s)}$ | $H(z)=\displaystyle\sum h[n]z^{-n}=\dfrac{Y(z)}{X(z)}$ |
| 频率响应 | $H(j\omega)=H(s)\big\vert_{s=j\omega}$（需 ROC 含虚轴） | $H(e^{j\omega})=H(z)\big\vert_{z=e^{j\omega}}$（需 ROC 含单位圆） |
| 由方程求 $H$ | 微分方程 $\displaystyle\sum_{k}a_k\frac{d^k y}{dt^k}=\sum_k b_k\frac{d^k x}{dt^k}$ ⟹ $H(s)=\dfrac{\sum_k b_k s^k}{\sum_k a_k s^k}$ | 差分方程 $\displaystyle\sum_k a_k y[n-k]=\sum_k b_k x[n-k]$ ⟹ $H(z)=\dfrac{\sum_k b_k z^{-k}}{\sum_k a_k z^{-k}}$ |
| 级联 | $H_1H_2$ | $H_1H_2$ |
| 并联 | $H_1+H_2$ | $H_1+H_2$ |
| 反馈 | $\dfrac{H_1}{1+H_1H_2}$ | $\dfrac{H_1}{1+H_1H_2}$ |
| **因果性** | $h(t)=0,\ t<0$ ⟺ ROC 是**最右极点右侧**的右半平面（且 $H$ 真分式） | $h[n]=0,\ n<0$ ⟺ ROC 是**最外极点外侧**（含 $z=\infty$） |
| **稳定性**（BIBO） | $\int\lvert h\rvert dt<\infty$ ⟺ ROC **包含虚轴** $j\omega$ | $\sum\lvert h\rvert<\infty$ ⟺ ROC **包含单位圆** $\lvert z\rvert=1$ |
| 因果+稳定 | 全部极点在**左半平面** | 全部极点在**单位圆内** |

**解题主流程（微分/差分方程 → 代数）**：
1. 方程两边取变换（单边变换可带初值），把微分/差分换成 $s$ / $z^{-1}$ 的代数式；
2. 解出 $Y(s)$ 或 $Y(z)$（= 零状态 $H\cdot X$ + 零输入项）；
3. 部分分式展开 + 查表反变换，**务必结合 ROC 选对左边/右边项**；
4. 需要稳态/频率特性时令 $s=j\omega$ 或 $z=e^{j\omega}$ 读频率响应。

---

## 5. ROC 性质对比（Laplace，Z）

### ROC

| 规则 | Laplace（$s$ 平面） | Z（$z$ 平面） |
|---|---|---|
| 形状 | 平行虚轴的**带状/半平面** | 以原点为心的**圆环** |
| 不含极点 | ROC 内无极点 | ROC 内无极点 |
| 右边信号 | 最右极点**右侧**半平面 | 最外极点**外侧**（可含 $\infty$） |
| 左边信号 | 最左极点**左侧**半平面 | 最内极点**内侧**（可含 $0$） |
| 双边信号 | 两极点之间的**带** | 两极点之间的**环** |
| 有限长 | 全平面（可除 $0,\infty$） | 全平面（可除 $0,\infty$） |
| FT/DTFT 存在 | ROC 含虚轴 $\Leftrightarrow$ FT 收敛 | ROC 含单位圆 $\Leftrightarrow$ DTFT 收敛 |

### 易混

- **谱的周期性**：DTFS/DTFT 频谱周期（$N$ / $2\pi$），CTFS/CTFT 不周期 —— 来源是"时域离散 ⇒ 频域周期"。
- **卷积系数里的 $T$ / $N$**：FS/DTFS 的**周期卷积**定理带因子 $T$ / $N$（$Ta_kb_k$、$Na_kb_k$），FT/DTFT/Laplace/Z 的普通卷积**不带**。
- **时移因子方向**：时域右移 $t_0$ ⇒ 乘 $e^{-j\omega t_0}$ / $e^{-st_0}$ / $z^{-n_0}$（**负号、负幂**）。
- **DT 没有真正的"微分/积分"**：对应是一阶差分 $(1-z^{-1})$ 和累加 $\frac1{1-z^{-1}}$。
- **积分/累加的直流项**：FT 时域积分多出 $\pi X(0)\delta(\omega)$；DTFT 累加多出冲激串，别漏。
- **Laplace 频域微分有负号**：$-t\,x(t)\leftrightarrow \frac{dX}{ds}$；FT 是 $t\,x(t)\leftrightarrow j\frac{dX}{d\omega}$。
- **稳定判据**：CT 看"虚轴 / 左半平面"，DT 看"单位圆 / 圆内"。
- **FT 是 Laplace 的切片、DTFT 是 Z 的切片**——但仅当 ROC 真的含该轴/圆时才成立；否则傅里叶不存在（如 $u(t)$ 的 Laplace ROC 不含完整虚轴端点，需补 $\pi\delta(\omega)$）。