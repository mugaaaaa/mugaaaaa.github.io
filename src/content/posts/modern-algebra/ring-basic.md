---
title: "代数结构：环"
published: 2026-05-30
description: "代数结构（近世代数）中的环相关"
tags: [Modern Algebra, Ring, Math]
category: math
draft: false
lang: zh_CN
---

# 环的基本概念
## 环的定义
环是一个代数结构，由一个非空集合 \(R\) 和两个二元运算（加法 \(+\), 乘法 \(\cdot\)）组成，满足：

1. **加法群**：\((R, +)\) 构成阿贝尔群（交换群），存在零元 \(0\) 且每个元有负元。  
2. **乘法半群**：\((R, \cdot)\) 满足结合律，即 \((a \cdot b) \cdot c = a \cdot (b \cdot c)\)。 **不要求满足交换律**（如矩阵环 $M_n(\mathbb{R})$）
3. **分配律**：乘法对加法满足左右分配律：  
   \(a \cdot (b + c) = a \cdot b + a \cdot c\)，  
   \((b + c) \cdot a = b \cdot a + c \cdot a\)。

若乘法有单位元 \(1\)，则称**含幺环**；若乘法可交换，则称**交换环**。

## 环的各种子概念之间的关系

```mermaid
graph TD
    %% 样式定义
    classDef ringStyle fill:#f9f0ff,stroke:#d3adf7,stroke-width:2px;
    classDef commStyle fill:#fff7e6,stroke:#ffd591,stroke-width:2px;
    classDef domainStyle fill:#e6f7ff,stroke:#91d5ff,stroke-width:2px;
    classDef factorStyle fill:#feffe6,stroke:#fffb8f,stroke-width:2px;
    classDef fieldStyle fill:#f6ffed,stroke:#b7eb8f,stroke-width:2px;
    
    %% 节点定义
    Ring["<b>环 (Ring)</b><br/>• (R,+) 是阿贝尔群<br/>• (R,·) 满足结合律<br/>• 满足乘法对加法的分配律"]:::ringStyle
    
    CommRing["<b>交换环 (Commutative Ring)</b><br/>• 乘法满足交换律<br/>• <i>(如: 连续函数环)</i>"]:::commStyle
    
    CRing1["<b>含单位元交换环</b><br/>• 存在乘法单位元 1"]:::commStyle
    
    Division["<b>除环 / 体 (Division Ring)</b><br/>• 包含单位元 1<br/>• <b>所有非零元都有乘法逆元</b><br/>• 乘法不一定满足交换律<br/>• <i>(如: 四元数数环)</i>"]:::ringStyle

    Domain["<b>整环 (Integral Domain)</b><br/>• 含单位元的交换环<br/>• <b>无零因子</b> (ab=0 ⇒ a=0 或 b=0)<br/>• <i>(如: 偶数环不是, 整数环是)</i>"]:::domainStyle
    
    UFD["<b>唯一分解整环 (UFD)</b><br/>• 每一个非零非逆元<br/>都可以唯一分解为不可约元的乘积<br/>• <i>(如: 多项式环 Z[x])</i>"]:::factorStyle
    
    PID["<b>主理想整环 (PID)</b><br/>• 其中的每一个理想都是主理想<br/>(由单个元素生成)<br/>• <i>(如: 整数环 Z)</i>"]:::factorStyle
    
    ED["<b>欧几里得整环 (ED)</b><br/>• 可以进行<b>带余除法</b><br/>• 存在欧几里得函数 d(x)<br/>• <i>(如: 高斯整数环 Z[i], 常用多项式环 F[x])</i>"]:::factorStyle
    
    Field["<b>域 (Field)</b><br/>• 交换的除环<br/>• 结构最完美的数域<br/>• <i>(如: Q, R, C)</i>"]:::fieldStyle

    %% 关系连接
    Ring --> |"+ 乘法交换律"| CommRing
    CommRing --> |"+ 乘法单位元 1"| CRing1
    CRing1 --> |"+ 无零因子"| Domain
    
    Ring --> |"+ 单位元 1<br/>+ 非零元有逆元"| Division
    Division --> |"+ 乘法交换律"| Field
    
    Domain --> |"+ 满足唯一分解性"| UFD
    UFD --> |"+ 理想皆由单元素生成"| PID
    PID --> |"+ 存在带余除法"| ED
    ED --> |"所有非零非逆元皆可除"| Field
    
    %% 间接升级线（虚线表示包含关系的跳跃或等价路径）
    Domain -.-> |"有限个元素"| Field
    
    %% 包裹框表示包含层次 (由大到小)
    subgraph 因子分解层 [整环的精细分类]
        Domain
        UFD
        PID
        ED
    end
```