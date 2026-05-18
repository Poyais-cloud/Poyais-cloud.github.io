---
title: GitHub Pages 博客部署踩坑复盘
date: 2026-05-18 11:05:00
permalink: 2026/05/18/blog-deploy-pitfalls-review/
tags:
  - 博客
  - Hexo
  - 部署
  - Git
categories:
  - 博客工作流
cover: false
top_img: false
---

这次博客混乱的核心问题，不是「写一篇 Markdown 为什么这么难」，而是博客系统里同时存在三层东西：写作源码、生成后的网页、GitHub Pages 的展示分支。如果没有把这三层分清楚，每一次发布文章都像是在赌。

## 最重要的结论

我的博客现在应该这样理解：

```text
/Users/poyais/my-blog-source
source 分支
写文章、改配置、改主题、改工作流

/Users/poyais/my-blog
master 分支
GitHub Pages 正在展示的静态网站成品
不要手改
```

日常写博客，只进：

```bash
cd /Users/poyais/my-blog-source
```

不要在 `/Users/poyais/my-blog` 里改文章，也不要在 `master` 分支上写 Markdown。`master` 是机器生成结果，下次部署会被覆盖。

## 坑一：分不清源码和成品

Hexo 博客不是直接把 Markdown 放到 GitHub Pages 就结束。它有一个生成过程：

```text
Markdown / 配置 / 主题
        ↓
npm run build
        ↓
public/ 里的 HTML / CSS / JS / 图片
        ↓
推送到 master
        ↓
GitHub Pages 展示网页
```

所以真正要维护的是源码，不是生成后的 HTML。

如果我在生成后的 `2026/05/.../index.html` 里改内容，看起来可能暂时有效，但下一次部署就会丢。因为这些文件不是源头。

## 坑二：main、master、source 三个分支混在一起

这次最容易混乱的地方是分支含义不清楚。

现在应该只记两个分支：

```text
source = 博客源码分支
master = GitHub Pages 展示分支
```

`source` 里应该有：

```text
source/_posts/
source/_drafts/
source/css/custom-green.css
source/js/custom-green.js
_config.yml
_config.butterfly.yml
package.json
.github/workflows/deploy.yml
```

`master` 里应该有：

```text
index.html
2026/
archives/
categories/
tags/
css/
js/
img/
README.md
```

`main` 曾经放过一些旧的或失败的部署内容，导致判断变得更乱。后面已经把默认分支改成 `source`，并删除了旧的 `main`，避免以后继续误推。

## 坑三：把文章推到了错误分支

如果文章或配置推到了 `main`，但 GitHub Actions 监听的是 `source`，那就不会触发正确部署。

正确逻辑是：

```text
改源码
commit 到 source
push origin source
GitHub Actions 自动构建
自动推送成品到 master
```

所以日常发布时最后一步应该是：

```bash
git push origin source
```

不是推 `main`，也不是手动去改 `master`。

## 坑四：绿色 UI 差点丢掉

绿色背景的 UI 是之前为了优化前端页面做的，不是 Butterfly 默认自带的东西。

准确说：

```text
Butterfly = 基础主题
custom-green.css / custom-green.js = 我自己的绿色 UI 定制层
```

现在绿色 UI 的源头在：

```text
source/css/custom-green.css
source/js/custom-green.js
source/img/avatar.jpg
source/img/site-bg.jpg
source/img/top-bg.jpg
```

主题注入配置在：

```text
_config.butterfly.yml
```

如果只保存了 `master` 里的生成结果，却没有把这些自定义 CSS、JS、图片和配置放回 `source`，那么下一次重新构建时，绿色 UI 就会消失。

这就是为什么「能在线上看到」不等于「源码里已经保存好了」。

## 坑五：发布一篇文章不只需要复制 Markdown

理论上写 Markdown 就够了，但 Hexo 还需要文章头部的 front matter。

例如：

```yaml
---
title: 文章标题
date: 2026-05-18 11:05:00
permalink: 2026/05/18/article-slug/
tags:
  - 博客
categories:
  - 博客工作流
cover: false
top_img: false
---
```

front matter 决定了：

```text
标题
发布时间
固定链接
分类
标签
是否使用封面图
是否使用顶部图
```

如果表头写错，可能出现：

```text
页面不生成
分类错乱
链接变化
主题显示异常
构建失败
```

所以后面最稳定的方式是：

```text
从 templates/ 复制表头
或者用 npm run import:obsidian 自动生成表头
```

## 坑六：草稿和正式文章混在一起

现在应该这样区分：

```text
source/_drafts/类型/ = 草稿，不发布
source/_posts/类型/  = 正式文章，会发布
```

比如：

```text
source/_drafts/frontend/xxx.md
source/_posts/frontend/xxx.md
```

草稿可以在 Obsidian 里慢慢写。确定要上线，再移动到 `_posts`，想清楚这个从obsidian上传的方式，感觉整个清爽了许多。

## 坑七：文件夹分类和博客分类不是一回事

源码里的文件夹是给我自己管理文件用的：

```text
source/_posts/frontend/
source/_posts/compiler/
source/_posts/physics/
```

网页上的分类来自 front matter：

```yaml
categories:
  - 前端面试
```

或者：

```yaml
categories:
  - [SCNU期末试卷, 编译原理]
```

也就是说，放在哪个文件夹，主要影响我本地好不好找；网页上显示什么分类，主要看 `categories`。

## 坑八：Obsidian 语法不等于博客语法

Obsidian 里可以写：

```markdown
[[双链]]
![[图片.png]]
```

但 Hexo 更稳定的是标准 Markdown：

```markdown
[显示文字](/目标路径/)
![图片说明](/img/example.png)
```

所以草稿阶段可以随便用 Obsidian 语法，发布前重要链接和图片最好检查一遍。

## 坑九：没有先预览就推送

发布前应该先本地预览：

```bash
npm run preview
```

打开：

```text
http://localhost:4000/
```

确认页面、图片、分类、链接都正常，再提交和推送。

## 坑十：git add . 容易把无关改动带上去

`git add .` 很方便，但也危险。它会把当前目录所有变更都加入提交。

更稳的方式是先看状态：

```bash
git status
```

然后只 add 本次要发布的文件：

```bash
git add source/_posts/frontend/xxx.md
git commit -m "Publish frontend post"
git push origin source
```

如果这次还改了图片，就一起 add 图片：

```bash
git add source/_posts/frontend/xxx.md source/img/xxx.png
```

## 坑十一：不知道出错时该看哪里

如果线上没更新，按这个顺序查：

```text
1. 我是不是 push 到 source 了
2. GitHub Actions 有没有跑
3. Actions 是成功还是失败
4. master 分支有没有更新
5. GitHub Pages 有没有重新发布
6. 浏览器是不是缓存
```

本地先看：

```bash
git status
git branch --show-current
git log --oneline -5
```

如果当前不是 `source`，先停下来，不要乱提交。

## 坑十二：回退要回退源码，不要直接改 master

如果一篇文章发错了，正确做法是回到 `source` 改源码：

```text
改 source/_posts/...
commit
push origin source
自动重新部署 master
```

如果要撤回一篇文章，可以把它从 `_posts` 移回 `_drafts`：

```text
source/_posts/frontend/xxx.md
        ↓
source/_drafts/frontend/xxx.md
```

然后：

```bash
git status
git add source/_posts/frontend/xxx.md source/_drafts/frontend/xxx.md
git commit -m "Move post back to drafts"
git push origin source
```

不要直接删除 `master/2026/.../index.html`。那是结果，不是源头。

## 坑十三：没有把工作流写成 AI 能复用的 Skill

这次还有一个很重要的收获：很多混乱不是因为 AI 不会做，而是因为每次都要重新解释上下文。

比如我每次都要告诉 AI：

```text
这个仓库是 Hexo
source 是源码
master 是生成结果
绿色 UI 不能丢
_drafts 是草稿
_posts 是正式文章
不要 git add .
不要乱改 /Users/poyais/my-blog
```

这些东西如果只存在聊天记录里，下次换一个窗口、换一个 AI、换一次上下文，就可能又丢掉。

所以 Skill 的意义是：把「这个项目特有的操作规则」写成一份 AI 可以主动读取的说明。

这次我新增了一个本地插件和 skill：

```text
plugins/blog-knowledge-base/
plugins/blog-knowledge-base/skills/blog-workflow/SKILL.md
.agents/plugins/marketplace.json
```

它不是 Obsidian 插件，而是给 AI 用的博客知识库插件。

这个 skill 里面写清楚了：

```text
1. 只在 /Users/poyais/my-blog-source 工作
2. source 是源码分支
3. master 是 GitHub Pages 成品分支
4. 发布文章要从 _drafts 移到 _posts
5. 构建前后要检查 npm run build 和 git status
6. 绿色 UI 在 custom-green.css / custom-green.js
7. 不要把无关改动一起提交
8. 不要直接修改生成后的 HTML
```

这对我来说很关键，因为博客不是一个单纯的 Markdown 文件夹，而是一个包含写作、主题、构建、部署、分支关系的工作流。Skill 就像是给 AI 的项目说明书，能减少每次重新解释，也能降低误删 UI、推错分支、提交错文件的风险。

以后如果我要让 AI 帮我发博客，可以直接说：

```text
请先按 blog-workflow skill 检查这个博客仓库，然后帮我发布这篇文章。
```

这样 AI 应该先理解规则，再做动作。

## 日常最短流程

写新文章：

```text
1. 在 Obsidian 打开 /Users/poyais/my-blog-source
2. 在 source/_drafts/类型/ 写文章
3. 预览：npm run preview
4. 确认发布：移动到 source/_posts/类型/
5. git status
6. git add 本次文章和图片
7. git commit -m "Publish xxx"
8. git push origin source
9. GitHub Actions 自动上线
```

修改旧文章：

```text
1. 改 source/_posts/类型/文章.md
2. npm run preview
3. git status
4. git add 这篇文章
5. git commit -m "Update xxx"
6. git push origin source
```

## 现在对这个博客系统的理解

博客不是一个文件夹，而是一条流水线，workflow：

```text
我写 Markdown
        ↓
Hexo 根据配置和主题生成网页
        ↓
GitHub Actions 自动构建
        ↓
master 保存网页成品
        ↓
GitHub Pages 展示 master
```

只要记住「只维护 source，master 由机器生成」，很多混乱都会消失。

真正该保护的是：

```text
source/_posts/
source/_drafts/
source/img/
source/css/custom-green.css
source/js/custom-green.js
_config.yml
_config.butterfly.yml
.github/workflows/deploy.yml
```

只要这些源头文件清楚，博客就不会因为一次发布而把 UI、图片、文章结构弄丢。
