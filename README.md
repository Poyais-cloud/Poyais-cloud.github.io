# Poyais Blog 发布工作流

这是给自己看的操作说明。日常只进这个目录：

```bash
cd /Users/poyais/my-blog-source
```

不要在 `/Users/poyais/my-blog` 写文章。那里是线上网站生成结果。

## 你只需要记住

```text
source/_drafts/类型/  = 草稿，不发布
source/_posts/类型/   = 正式文章，会发布

push 到 source 分支 = GitHub Actions 自动更新博客
master 分支 = 机器生成的网站成品，不手改
```

## 目录

```text
source/_drafts/
  blog/
  clawtime/
  compiler/
  frontend/
  math/
  os/
  physics/

source/_posts/
  blog/
  clawtime/
  compiler/
  frontend/
  math/
  os/
  physics/

templates/   文章表头模板
tools/       Obsidian 导入脚本
source/img/  博客图片
```

## 从 Obsidian 导入一篇文章

例子：

```bash
npm run import:obsidian -- --file "/Users/poyais/Poyais的知识库/05-前端面试REVIEW/01 - 前端面试-JavaScript核心.md" --type frontend
```

可用类型：

```text
frontend
math
clawtime
compiler
physics
os
blog
```

导入后会进入：

```text
source/_drafts/对应类型/
```

## 直接新建博客草稿

在 Obsidian 打开这个 Vault：

```text
/Users/poyais/my-blog-source
```

新文件放进对应草稿目录，例如：

```text
source/_drafts/frontend/我的文章.md
source/_drafts/math/我的数学文章.md
```

文章开头必须有 front matter。可以复制：

```text
templates/frontend.md
templates/math.md
templates/clawtime.md
templates/compiler.md
templates/physics.md
```

## 预览

```bash
npm run preview
```

打开：

```text
http://localhost:4000/
```

## 发布新文章

1. 把文章从草稿移动到正式目录：

```text
source/_drafts/frontend/我的文章.md
        ↓
source/_posts/frontend/我的文章.md
```

2. 检查会发布哪些文章：

```bash
npm run posts
```

3. 提交到 source：

```bash
git status
git add source/_posts/对应类型/文章.md
git commit -m "Publish new post"
git push origin source
```

推送后 GitHub Actions 会自动：

```text
npm run build
生成 public/
推送到 master
更新 https://poyais-cloud.github.io/
```

不需要手动 `npm run deploy`。

## 修改已发布文章

只改：

```text
source/_posts/对应类型/文章.md
```

然后：

```bash
npm run preview
git status
git add source/_posts/对应类型/文章.md
git commit -m "Update post"
git push origin source
```

不要改：

```text
/Users/poyais/my-blog/2026/...
```

那里是生成后的 HTML，下次自动部署会覆盖。

## 新增分类

如果只是手动写文章，新增两个文件夹即可：

```bash
mkdir -p source/_drafts/ai source/_posts/ai
```

文章 front matter 自己写：

```yaml
---
title: AI文章标题
date: 2026-05-18 10:30:00
permalink: 2026/05/18/ai-title/
tags:
  - AI
categories:
  - AI实践
cover: false
top_img: false
---
```

如果想支持：

```bash
--type ai
```

再改：

```text
tools/import-obsidian-post.mjs
templates/ai.md
README.md
BLOG_AUTHORING_GUIDE.md
```

## 分类和标签

```text
categories = 书架
tags       = 关键词
```

例子：

```yaml
categories:
  - 前端面试
tags:
  - JavaScript
  - 前端面试
```

```yaml
categories:
  - [SCNU期末试卷, 编译原理]
tags:
  - 编译原理
```

## Obsidian 双链

草稿阶段可以用：

```markdown
[[双链]]
![[图片.png]]
```

发布前，重要链接建议改成标准 Markdown：

```markdown
[显示文字](/目标路径/)
![图片说明](/img/example.png)
```

## 主题

博客使用：

```text
Hexo + Butterfly + 自定义绿色 UI
```

绿色 UI 在：

```text
source/css/custom-green.css
source/js/custom-green.js
```

主题配置在：

```text
_config.yml
_config.butterfly.yml
```

## 最短流程

```text
写到 _drafts
预览
移到 _posts
git status
git add 这次要发布的文件
git commit
git push origin source
自动上线
```
