---
title: "图论：图的基本概念"
published: 2026-06-09
description: "图的定义、分类、特殊图、同构、度与可图化判定"
tags: [Graph Theory , Math]
category: math
draft: true
lang: zh_CN
---

# 图论及其应用：第一周课程总结

第一周主要解决两个问题：什么样的对象可以称为“图”，以及怎样用顶点、边、度、同构和度序列这些基本语言描述一张图。下面的图示默认把边画成无向边；若图中出现方向、权重或多重边，需要在定义中额外说明。

## 模块一：图的数学定义与核心术语

### 1. 图的集合表示

图通常记作

$$
G=(V,E)
$$

其中 $V$ 是非空有限集合，元素称为**顶点**；$E$ 是边的集合。若讨论无向简单图，边可以看成 $V$ 中两个不同顶点构成的无序对。

```mermaid
flowchart LR
    G["图 G=(V,E)"] --> V["顶点集 V={a,b,c,d}"]
    G --> E["边集 E={ab,ac,bc,cd}"]

    subgraph Pic["对应图形"]
        direction TB
        a((a)) --- b((b))
        a --- c((c))
        b --- c
        c --- d((d))
    end

    E -.-> Pic

    classDef set fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef node fill:#f1fff0,stroke:#59a85d,stroke-width:2px;
    class G,V,E set;
    class a,b,c,d node;
```

### 2. 阶数、边数、关联与相邻

* **阶数**：顶点数，记作 $n(G)=|V|$。
* **边数**：边数，记作 $m(G)=|E|$。
* 若边 $e$ 的端点是 $u,v$，记作 $e=uv$，则称 $e$ 与 $u,v$ **关联**。
* 若两个顶点被同一条边连接，则称这两个顶点**相邻**。
* 若两条边有公共端点，则称这两条边**相邻**。

```mermaid
flowchart LR
    u((u)) ---|e=uv| v((v))
    v ---|f=vw| w((w))

    note1["u 与 v 相邻"]
    note2["e 与 f 相邻: 公共端点 v"]
    note1 -.-> u
    note1 -.-> v
    note2 -.-> v

    classDef vertex fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef note fill:#fff7e6,stroke:#f0a23a,stroke-width:2px;
    class u,v,w vertex;
    class note1,note2 note;
```

## 模块二：图的分类与数学特征

### 1. 平凡图、空图、简单图

* **平凡图**：$n(G)=1$ 且 $m(G)=0$。
* **空图**：$m(G)=0$。注意空图可以有多个顶点，只是没有边。
* **简单图**：不含环、不含重边的图。课程中若没有特别说明，通常默认讨论简单图。

```mermaid
flowchart LR
    subgraph T["平凡图"]
        t((v))
    end

    subgraph N["空图 N4"]
        direction TB
        n1((v1))
        n2((v2))
        n3((v3))
        n4((v4))
    end

    subgraph S["简单图"]
        direction TB
        s1((v1)) --- s2((v2))
        s2 --- s3((v3))
        s3 --- s1
    end

    classDef example fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    class t,n1,n2,n3,n4,s1,s2,s3 example;
```

### 2. 环与重边

**环**是端点重合的边，即 $e=uu$；**重边**是连接同一对顶点的多条边。含环或重边的图不是简单图。

Mermaid 不适合精确画重边，这里用两条标注边表达“同一对端点之间有多条边”的意思。

```mermaid
flowchart LR
    subgraph Loop["有环"]
        u((u)) --- loop["e=uu"]
        loop --- u
    end

    subgraph Multi["有重边"]
        a((a)) ---|e1| b((b))
        a ---|e2| b
    end

    subgraph Simple["简单图不允许"]
        ok1((x)) --- ok2((y))
        ok2 --- ok3((z))
    end

    classDef bad fill:#fff1f0,stroke:#d45b5b,stroke-width:2px;
    classDef good fill:#f1fff0,stroke:#59a85d,stroke-width:2px;
    class u,loop,a,b bad;
    class ok1,ok2,ok3 good;
```

## 模块三：特殊形态的图与公式

### 1. 完全图

**完全图**是任意两个不同顶点之间都恰好有一条边相连的简单图，$n$ 阶完全图记作 $K_n$。

$$
m(K_n)=\frac{n(n-1)}{2}
$$

```mermaid
flowchart LR
    subgraph K3["K3"]
        direction TB
        a1((1)) --- a2((2))
        a2 --- a3((3))
        a3 --- a1
    end

    subgraph K4["K4"]
        direction TB
        b1((1)) --- b2((2))
        b1 --- b3((3))
        b1 --- b4((4))
        b2 --- b3
        b2 --- b4
        b3 --- b4
    end

    classDef full fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    class a1,a2,a3,b1,b2,b3,b4 full;
```

公式的来源是：每条边对应一个二元顶点子集，所以边数就是从 $n$ 个顶点中选 $2$ 个的组合数。

### 2. 二部图与完全二部图

若顶点集能分成两个非空且不相交的部分 $X,Y$，并且所有边都跨越 $X$ 与 $Y$，则称图为**二部图**。

完全二部图 $K_{m,n}$ 表示 $X$ 中每个顶点都与 $Y$ 中每个顶点相连：

$$
m(K_{m,n})=mn
$$

```mermaid
flowchart LR
    subgraph X["X 部"]
        direction TB
        x1((x1))
        x2((x2))
    end

    subgraph Y["Y 部"]
        direction TB
        y1((y1))
        y2((y2))
        y3((y3))
    end

    x1 --- y1
    x1 --- y2
    x1 --- y3
    x2 --- y1
    x2 --- y2
    x2 --- y3

    classDef left fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef right fill:#fff7e6,stroke:#f0a23a,stroke-width:2px;
    class x1,x2 left;
    class y1,y2,y3 right;
```

上图是 $K_{2,3}$。二部图的常用判定定理是：一个图是二部图当且仅当它不包含奇圈。

```mermaid
flowchart LR
    subgraph Even["偶圈 C4: 可以二染色"]
        direction TB
        e1((x1)) --- e2((y1))
        e2 --- e3((x2))
        e3 --- e4((y2))
        e4 --- e1
    end

    subgraph Odd["奇圈 C3: 二染色失败"]
        direction TB
        o1((a)) --- o2((b))
        o2 --- o3((c))
        o3 --- o1
    end

    classDef ok fill:#f1fff0,stroke:#59a85d,stroke-width:2px;
    classDef bad fill:#fff1f0,stroke:#d45b5b,stroke-width:2px;
    class e1,e2,e3,e4 ok;
    class o1,o2,o3 bad;
```

### 3. 补图

对于简单图 $G=(V,E)$，它的**补图**记作 $\bar{G}=(V,\bar{E})$。补图与原图顶点集相同，边集取完全图 $K_n$ 中那些不属于 $E$ 的边。

$$
m(G)+m(\bar{G})=\frac{n(n-1)}{2}
$$

```mermaid
flowchart LR
    subgraph G["原图 G"]
        direction TB
        ga((a)) --- gb((b))
        gb --- gc((c))
        gd((d))
    end

    subgraph C["补图 Gbar"]
        direction TB
        ca((a)) --- cc((c))
        ca --- cd((d))
        cb((b)) --- cd
        cc --- cd
    end

    classDef original fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef complement fill:#fff7e6,stroke:#f0a23a,stroke-width:2px;
    class ga,gb,gc,gd original;
    class ca,cb,cc,cd complement;
```

原图中有 $ab,bc$，所以补图中不再出现这两条边，而补上 $ac,ad,bd,cd$。

### 4. 正则图

若图中每个顶点的度都等于 $k$，则称图为 **$k$-正则图**。因为所有度数之和等于 $nk$，由握手定理可得：

$$
nk=2m
$$

```mermaid
flowchart LR
    subgraph C4["2-正则图 C4"]
        direction TB
        a((a)) --- b((b))
        b --- c((c))
        c --- d((d))
        d --- a
    end

    subgraph K4["3-正则图 K4"]
        direction TB
        p((p)) --- q((q))
        p --- r((r))
        p --- s((s))
        q --- r
        q --- s
        r --- s
    end

    classDef regular fill:#f1fff0,stroke:#59a85d,stroke-width:2px;
    class a,b,c,d,p,q,r,s regular;
```

若 $n$ 与 $k$ 同时为奇数，则 $nk$ 是奇数，不可能等于偶数 $2m$。所以正则图的阶数和度数不能同时为奇数。

## 模块四：图的同构

### 1. 同构定义

设 $G_1=(V_1,E_1)$，$G_2=(V_2,E_2)$。若存在双射

$$
f:V_1\to V_2
$$

使得任意 $u,v\in V_1$ 都满足

$$
uv\in E_1 \Longleftrightarrow f(u)f(v)\in E_2,
$$

则称 $G_1$ 与 $G_2$ 同构，记作 $G_1\cong G_2$。

```mermaid
flowchart LR
    subgraph G1["G1"]
        direction TB
        a((a)) --- b((b))
        b --- c((c))
        c --- d((d))
        d --- a
    end

    subgraph G2["G2"]
        direction TB
        w((w)) --- x((x))
        x --- y((y))
        y --- z((z))
        z --- w
    end

    a -. "f(a)=w" .-> w
    b -. "f(b)=x" .-> x
    c -. "f(c)=y" .-> y
    d -. "f(d)=z" .-> z

    classDef left fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef right fill:#fff7e6,stroke:#f0a23a,stroke-width:2px;
    class a,b,c,d left;
    class w,x,y,z right;
```

同构强调“连接关系一样”，不是“画出来的位置一样”。一张图可以被拉伸、旋转、换名字，只要邻接关系保持不变，就仍然是同构的。

### 2. 同构的必要条件

判断同构时常先检查必要条件：

* $n(G_1)=n(G_2)$；
* $m(G_1)=m(G_2)$；
* 度序列完全相同；
* 圈的结构、连通分支数等结构特征相同。

这些条件是必要条件，不一定是充分条件。也就是说，条件不满足时一定不同构；条件满足时还要继续找具体的顶点对应。

```mermaid
flowchart TB
    start["判断 G1 与 G2 是否同构"] --> n["阶数相同?"]
    n -->|否| no1["不同构"]
    n -->|是| m["边数相同?"]
    m -->|否| no2["不同构"]
    m -->|是| d["度序列相同?"]
    d -->|否| no3["不同构"]
    d -->|是| f["尝试构造保持邻接的双射 f"]
    f --> result["找到则同构, 找不到则不同构"]

    classDef check fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef stop fill:#fff1f0,stroke:#d45b5b,stroke-width:2px;
    classDef good fill:#f1fff0,stroke:#59a85d,stroke-width:2px;
    class start,n,m,d,f check;
    class no1,no2,no3 stop;
    class result good;
```

## 模块五：顶点的度与基本定理

### 1. 度、最大度与最小度

与顶点 $v$ 关联的边数称为 $v$ 的**度**，记作 $d(v)$。若允许环，每个环在计算度数时算作 $2$ 次。

图中所有顶点度的最大值记作 $\Delta(G)$，最小值记作 $\delta(G)$。对 $n$ 阶简单图，有：

$$
0\le \delta(G)\le d(v)\le \Delta(G)\le n-1
$$

```mermaid
flowchart LR
    a((a)) --- b((b))
    a --- c((c))
    b --- c
    c --- d((d))
    c --- e((e))

    da["d(a)=2"]
    db["d(b)=2"]
    dc["d(c)=4"]
    dd["d(d)=1"]
    de["d(e)=1"]

    da -.-> a
    db -.-> b
    dc -.-> c
    dd -.-> d
    de -.-> e

    classDef vertex fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef degree fill:#fff7e6,stroke:#f0a23a,stroke-width:2px;
    class a,b,c,d,e vertex;
    class da,db,dc,dd,de degree;
```

上图的度序列为 $(4,2,2,1,1)$，所以 $\Delta(G)=4$，$\delta(G)=1$。

### 2. 握手定理

在任何图 $G=(V,E)$ 中，所有顶点的度数之和等于边数的两倍：

$$
\sum_{v\in V}d(v)=2m
$$

原因是：每条边有两个端点，因此在统计所有顶点度数时，每条边都被数了两次。

```mermaid
flowchart TB
    subgraph Graph["图 G 有 5 条边"]
        direction LR
        a((a)) --- b((b))
        a --- c((c))
        b --- c
        c --- d((d))
        d --- e((e))
    end

    edges["每条边贡献 2 个端点"] --> sum["度数总和 = 2m = 10"]
    sum --> odd["奇度顶点个数必为偶数"]

    classDef graphNode fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef theorem fill:#f1fff0,stroke:#59a85d,stroke-width:2px;
    class a,b,c,d,e graphNode;
    class edges,sum,odd theorem;
```

推论：任意图中，奇度顶点个数一定是偶数。因为所有度数之和是偶数，而偶数度顶点的贡献本来就是偶数，所以奇数度顶点的个数也必须为偶数。

### 3. 至少两个顶点度数相同

**定理 4**：任何阶数 $n\ge 2$ 的简单图中，至少有两个顶点的度数完全相同。

证明思路是鸽巢原理。简单图中每个顶点的度数只能在 $0$ 到 $n-1$ 之间取值，但不可能同时出现度数 $0$ 和度数 $n-1$：若有一个顶点度数为 $n-1$，它与所有其他顶点相邻，就不会存在孤立点。

```mermaid
flowchart TB
    n["n 个顶点"] --> range["可能度数看似有 0,1,...,n-1"]
    range --> conflict["0 与 n-1 不能同时出现"]
    conflict --> boxes["实际最多只有 n-1 个度数盒子"]
    boxes --> pigeon["n 个顶点放进 n-1 个盒子"]
    pigeon --> same["至少两个顶点度数相同"]

    classDef proof fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    class n,range,conflict,boxes,pigeon,same proof;
```

## 模块六：度序列与可图化判定

### 1. 度序列与可图化

将图中所有顶点的度按照从大到小排列，得到的非负整数序列称为**度序列**，常记作

$$
\Pi=(d_1,d_2,\dots,d_n),\qquad d_1\ge d_2\ge \cdots\ge d_n
$$

若存在一个简单图以该序列作为度序列，则称这个序列是**可图的**。

```mermaid
flowchart LR
    subgraph G["一个图 G"]
        direction TB
        a((a)) --- b((b))
        a --- c((c))
        b --- c
        c --- d((d))
        c --- e((e))
    end

    G --> deg["各点度数: 2,2,4,1,1"]
    deg --> seq["排序后度序列: (4,2,2,1,1)"]

    classDef graphNode fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef seqStyle fill:#fff7e6,stroke:#f0a23a,stroke-width:2px;
    class a,b,c,d,e graphNode;
    class deg,seq seqStyle;
```

度序列判定先看两个必要条件：

* 度数之和必须为偶数；
* 最大度必须满足 $d_1\le n-1$。

但这两个条件还不够，还需要 Havel-Hakimi 定理。

### 2. Havel-Hakimi 定理

对非负整数序列

$$
\Pi=(d_1,d_2,\dots,d_n),\quad d_1\ge d_2\ge \cdots\ge d_n,
$$

删除第一项 $d_1$，并把后面 $d_1$ 项各减 $1$，得到衍生序列：

$$
\Pi'=(d_2-1,d_3-1,\dots,d_{d_1+1}-1,d_{d_1+2},\dots,d_n)
$$

则 $\Pi$ 可图当且仅当 $\Pi'$ 可图。

直观理解：度最大的那个顶点需要连出 $d_1$ 条边，于是先让它连接当前度数最高的 $d_1$ 个顶点，并把这些顶点的剩余需求各减 $1$。

```mermaid
flowchart TB
    start["输入度序列 Pi"] --> sort["按非增顺序排序"]
    sort --> zero["是否全为 0?"]
    zero -->|是| yes["可图"]
    zero -->|否| pick["取最大度 d1 并删除"]
    pick --> enough["剩余项是否至少 d1 个?"]
    enough -->|否| no1["不可图"]
    enough -->|是| reduce["前 d1 项各减 1"]
    reduce --> negative["是否出现负数?"]
    negative -->|是| no2["不可图"]
    negative -->|否| sort

    classDef step fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef good fill:#f1fff0,stroke:#59a85d,stroke-width:2px;
    classDef bad fill:#fff1f0,stroke:#d45b5b,stroke-width:2px;
    class start,sort,zero,pick,enough,reduce,negative step;
    class yes good;
    class no1,no2 bad;
```

### 3. 一个完整例子

判断序列 $(3,3,2,2,2)$ 是否可图：

```mermaid
flowchart LR
    s0["(3,3,2,2,2)"] --> s1["删 3, 后 3 项减 1: (2,1,1,2)"]
    s1 --> s2["重排: (2,2,1,1)"]
    s2 --> s3["删 2, 后 2 项减 1: (1,0,1)"]
    s3 --> s4["重排: (1,1,0)"]
    s4 --> s5["删 1, 后 1 项减 1: (0,0)"]
    s5 --> s6["全为 0, 可图"]

    classDef seq fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    classDef ok fill:#f1fff0,stroke:#59a85d,stroke-width:2px;
    class s0,s1,s2,s3,s4,s5 seq;
    class s6 ok;
```

对应的一张简单图可以画成：

```mermaid
flowchart LR
    a((a)) --- b((b))
    a --- c((c))
    a --- d((d))
    b --- c
    b --- e((e))
    d --- e

    classDef vertex fill:#f1fff0,stroke:#59a85d,stroke-width:2px;
    class a,b,c,d,e vertex;
```

顶点度数分别为 $3,3,2,2,2$，与原序列一致。

## 本周知识图谱

```mermaid
flowchart TB
    graphDef["图 G=(V,E)"] --> terms["顶点/边/阶数/边数"]
    terms --> relation["关联与相邻"]

    graphDef --> kinds["图的分类"]
    kinds --> simple["简单图"]
    kinds --> empty["空图"]
    kinds --> loopMulti["环与重边"]

    graphDef --> special["特殊图"]
    special --> complete["完全图"]
    special --> bipartite["二部图"]
    special --> complement["补图"]
    special --> regular["正则图"]

    graphDef --> iso["同构"]
    iso --> invariant["阶数/边数/度序列等不变量"]

    graphDef --> degree["顶点的度"]
    degree --> handshake["握手定理"]
    handshake --> odd["奇度顶点个数为偶数"]
    degree --> sameDegree["至少两个顶点度数相同"]

    degree --> seq["度序列"]
    seq --> graphical["可图化"]
    graphical --> hh["Havel-Hakimi 判定"]

    classDef concept fill:#eef6ff,stroke:#5b8def,stroke-width:2px;
    class graphDef,terms,relation,kinds,simple,empty,loopMulti,special,complete,bipartite,complement,regular,iso,invariant,degree,handshake,odd,sameDegree,seq,graphical,hh concept;
```

第一周的核心是把图论语言搭起来：先用 $G=(V,E)$ 描述对象，再用度、特殊图、同构和度序列这些工具提取结构信息。后续的子图、连通性、最短路和矩阵表示都建立在这些基本概念之上。
