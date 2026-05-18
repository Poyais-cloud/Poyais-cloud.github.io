# Poyais Blog 使用说明

这份 README 是日常发布博客时看的。只记一个目录：

```bash
cd /Users/poyais/my-blog-source
```

不要在 `/Users/poyais/my-blog` 里写文章。那里是线上网站生成结果。

## 目录关系

```text
/Users/poyais/my-blog-source
  source/_posts/   已发布文章的 Markdown
  source/_drafts/  草稿，不会发布
  source/img/      博客图片
  templates/       Front Matter 模板
  tools/           辅助脚本

/Users/poyais/my-blog
  线上成品 HTML/CSS/JS
  不手改
```

## 最常用命令

看会发布哪些文章：

```bash
npm run posts
```

看草稿：

```bash
npm run drafts
```

本地预览，不发布：

```bash
npm run preview
```

确认没问题后发布：

```bash
npm run deploy
```

发布后把源码同步到 GitHub：

```bash
git add .
git commit -m "Update blog source"
git push origin source
```

## 从 Obsidian 导入文章

先导入成草稿：

```bash
npm run import:obsidian -- --file "/你的Obsidian文章路径.md" --type frontend
```

类型只能选这些：

```text
clawtime
compiler
physics
os
frontend
blog
```

导入后文章会出现在：

```text
source/_drafts/
```

预览：

```bash
npm run preview
```

确认要发布时，把文件从：

```text
source/_drafts/
```

移动到：

```text
source/_posts/
```

然后：

```bash
npm run posts
npm run deploy
git add .
git commit -m "Publish new post"
git push origin source
```

## 修改已发布文章

只改 `source/_posts/` 里的 Markdown。

例如：

```text
source/_posts/clawtime-01-hunter.md
```

改完：

```bash
npm run preview
npm run deploy
git add .
git commit -m "Update post"
git push origin source
```

不要改：

```text
/Users/poyais/my-blog/2026/...
```

那里是生成后的 HTML，下次发布会被覆盖。

## 分类规则

`categories` 是书架，`tags` 是标签。

常用分类：

```yaml
# ClawTime
categories:
  - [ClawTime, 2026-广州南沙]
tags:
  - ClawTime

# 编译原理
categories:
  - [SCNU期末试卷, 编译原理]
tags:
  - 编译原理

# 大学物理
categories:
  - [SCNU期末试卷, 大学物理]
tags:
  - 大学物理
  - 力学

# 前端
categories:
  - 前端面试
tags:
  - JavaScript
  - 前端面试
```

## 主题结构

博客仍然使用 Butterfly：

```yaml
theme: butterfly
```

绿色 UI 在这里：

```text
source/css/custom-green.css
source/js/custom-green.js
```

主题配置在这里：

```text
_config.yml
_config.butterfly.yml
```

