---
title: 编译原理期末复习
date: 2026-04-27 00:00:00
type: "compiler"
top_img: /img/compiler-top.jpg
mathjax: true
---

<style>
.series-nav {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(90, 143, 106, 0.15);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}
.series-nav h2 {
  margin-top: 0;
  color: #3a5f4a;
  border-bottom: 1px solid rgba(90, 143, 106, 0.2);
  padding-bottom: 10px;
}
.series-nav ul {
  list-style: none;
  padding-left: 0;
}
.series-nav li {
  margin: 8px 0;
  padding: 10px 14px;
  background: rgba(90, 143, 106, 0.06);
  border-radius: 6px;
  transition: all 0.2s ease;
}
.series-nav li:hover {
  background: rgba(90, 143, 106, 0.12);
}
.series-nav a {
  color: #3a5f4a;
  text-decoration: none;
}
.series-nav small {
  color: #888;
}
</style>

<div class="series-nav">
<h2>编译原理期末复习</h2>

<p>本笔记基于 5 套往年试卷整理，按知识模块分类</p>

<h4>试卷清单</h4>

| 代号 | 全称 | 题量结构 |
|---|---|---|
| A | 2019 上半年（网工卷） | 单选/填空/简答/计算构造 |
| B | 2020 年 6 月 | 填空/简答/分析/综合 |
| C | 2021 年 1 月（18 级） | 填空/单选/简答/计算 |
| D | 2022（流出题） | 单选填空/简答/综合构造 |
| E | 2025（23 级） | 填空单选/简答/综合 |

<h4>知识模块</h4>

<ul>
<li><a href="/2026/04/26/编译原理-01-词法分析/">01 - 词法分析</a><br><small>正则表达式、NFA/DFA、词法程序</small></li>
<li><a href="/2026/04/26/编译原理-02-文法构造与等价变换/">02 - 文法构造与等价变换</a><br><small>消左递归、提左公因子</small></li>
<li><a href="/2026/04/26/编译原理-03-自顶向下分析/">03 - 自顶向下分析</a><br><small>FIRST/FOLLOW、LL(1)、递归下降</small></li>
<li><a href="/2026/04/26/编译原理-04-LR分析/">04 - LR 分析</a><br><small>LR(0)、SLR(1)、LALR(1) 项目集族</small></li>
<li><a href="/2026/04/26/编译原理-05-语义分析与中间代码/">05 - 语义分析与中间代码</a><br><small>属性文法、四元组、回填技术</small></li>
<li><a href="/2026/04/26/编译原理-06-综合扩展题/">06 - 综合扩展题</a><br><small>TINY 语言改写、开放题</small></li>
<li><a href="/2026/04/26/编译原理-99-试卷原题汇总/">99 - 试卷原题汇总</a><br><small>按试卷顺序逐题列表</small></li>
</ul>
</div>

---

## 通用做题 SOP

> **Note** 编译原理通用解题流程
> 1. **辨题型**：文法变换、自顶向下分析、LR 分析、语义计算、词法构造
> 2. **化简文法**：消除左递归 / 提左公因子 / 拓广文法（LR 必做）
> 3. **机械化套路**：FIRST/FOLLOW 表、项目集闭包、GOTO 转移按表格化推
> 4. **验算一致性**：LL(1)/SLR(1) 表无冲突
> 5. **画图**：DFA、项目集族、语法树

## 高频踩坑提醒

1. **拓广文法**忘加 $S' \to S$
2. **FOLLOW 集**漏掉结束符 `#`
3. **闭包计算**漏推：`A → α·Bβ` 时要把所有 `B → ·γ` 加进来
4. **SLR(1) 与 LALR(1) 区别**：SLR 用 FOLLOW 判归约
5. **左递归判别**：直接 `A → Aα` vs 间接 `A → Bα, B → Aβ`
