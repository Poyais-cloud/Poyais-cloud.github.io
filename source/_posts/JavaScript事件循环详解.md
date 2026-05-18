---
title: JavaScript事件循环详解：宏任务与微任务执行顺序
date: 2026-04-25 20:20:00
tags:
  - JavaScript
  - 事件循环
  - 异步
  - 前端面试
categories:
  - 前端面试
---

# JavaScript 的事件循环（Event Loop）是怎么工作的？宏任务和微任务执行顺序？

## 自测关键词

- **单线程** + 为什么需要事件循环
- **调用栈** / **任务队列** / **Web API**
- **宏任务**：script、setTimeout、setInterval、I/O
- **微任务**：Promise.then、queueMicrotask、MutationObserver
- 执行规则口诀：**一个宏任务 → 清空所有微任务 → 渲染 → 下一个宏任务**

---

## 标准答案

JS 是单线程，浏览器通过事件循环协调异步任务：**主线程同步代码执行完 → 清空整个微任务队列 → 浏览器视情况渲染 → 取下一个宏任务执行**，循环往复。微任务有"插队"特性，永远比下一个宏任务先执行。

---

## 为什么需要事件循环

JS 设计成单线程是为了避免 DOM 操作冲突（多线程同时改 DOM 谁说了算？）。但单线程一旦遇到耗时任务（网络请求、定时器）就会卡死。所以浏览器把异步任务交给其他线程（定时器线程、网络线程等），完成后通过"任务队列"回到主线程执行回调，主线程通过"事件循环"不断检查队列。

---

## 宏任务 vs 微任务

| 类型 | 来源 | 常见 API |
|------|------|----------|
| 宏任务 (MacroTask) | 浏览器/宿主发起 | `<script>`、`setTimeout`、`setInterval`、I/O、UI 渲染、`MessageChannel`、`postMessage` |
| 微任务 (MicroTask) | JS 引擎自身发起 | `Promise.then/catch/finally`、`queueMicrotask`、`MutationObserver`、`process.nextTick`(Node) |

---

## 执行模型

```
┌─ 取一个宏任务执行（首次是整段 script）
│
├─ 同步代码塞进调用栈，依次执行完
│
├─ 用栈空了 → 清空整个微任务队列（执行过程中产生的新微任务也要在本轮清完）
│
├─ 浏览器决定是否渲染（rAF / 重排重绘）
│
└─ 取下一个宏任务 → 回到第一步
```

---

## 经典代码题

```js
console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')
// 输出：1 4 3 2
// 解析：1 4 是同步；3 是微任务（本轮清空）；2 是宏任务（下一轮）
```

进阶题（async/await 本质是 Promise）：

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')   // 等价于 promise.then(...)，是微任务
}
async function async2() { console.log('async2') }

console.log('script start')
setTimeout(() => console.log('setTimeout'), 0)
async1()
Promise.resolve().then(() => console.log('promise1'))
console.log('script end')

// 输出：
// script start → async1 start → async2 → script end
// → async1 end → promise1 → setTimeout
```

---

## 易错点 & 高频追问

- **`async/await` 的执行顺序**：`await` 后面的代码相当于放进了 `.then` 的回调里，是微任务。
- **`setTimeout(fn, 0)` 不是真的 0ms**：HTML5 规范最小延迟 4ms；且要等同步代码 + 微任务 + 渲染都做完才轮到。
- **微任务里产生的新微任务**：会在**本轮**继续执行（直到队列清空），而不是延到下一轮。
- **Node.js 的事件循环不一样**：有 6 个阶段（timers / pending / poll / check / close 等），`process.nextTick` 优先级比所有微任务还高。
- **追问：为什么 JS 是单线程？** 因为如果多线程同时操作 DOM，会引发不可预知的冲突；HTML5 的 Web Worker 提供了独立线程能力，但不能直接操作 DOM。
- **追问：requestAnimationFrame 是宏任务还是微任务？** 都不是。它是浏览器渲染前调用的回调，独立于 task 队列，每帧执行一次。

---

## 面试话术

"JS 是单线程的，所有异步任务靠事件循环来协调。具体来说，主线程把同步代码执行完之后，会先清空整个微任务队列——比如 Promise.then、queueMicrotask 这些；清完之后浏览器视情况进行一次渲染，然后才取下一个宏任务，比如 setTimeout 或者 I/O 回调。所以微任务永远比下一个宏任务先执行，这也是为什么 `setTimeout(fn, 0)` 看起来没那么及时。一个常见的延伸是 async/await——await 后面那段代码本质上是 Promise.then 的回调，所以它属于微任务。"