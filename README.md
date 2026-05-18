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

## 在 Obsidian 里编辑

可以把这个目录作为一个单独的 Obsidian Vault 打开：

```text
/Users/poyais/my-blog-source
```

推荐只编辑：

```text
source/_drafts/
source/_posts/
README.md
BLOG_AUTHORING_GUIDE.md
```

新建文章默认放草稿：

```text
source/_drafts/
```

图片附件默认放：

```text
source/img/
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

现在已经配置 GitHub Actions。通常只需要把源码推到 `source`，
GitHub 会自动生成并更新 `master`：

```bash
git add .
git commit -m "Update blog source"
git push origin source
```

手动 `npm run deploy` 仍然可用，但日常优先使用 `git push origin source`
触发自动部署。

## 从 Obsidian 导入文章

先导入成草稿：

```bash
npm run import:obsidian -- --file "/你的Obsidian文章路径.md" --type frontend
```

类型目前可以选这些：

```text
clawtime
compiler
physics
os
frontend
math
blog
```

导入后文章会出现在：

```text
source/_drafts/对应类型/
```

预览：

```bash
npm run preview
```

确认要发布时，把文件从：

```text
source/_drafts/对应类型/
```

移动到：

```text
source/_posts/对应类型/
```

建议按主题放到对应子文件夹：

```text
source/_posts/clawtime/
source/_posts/frontend/
source/_posts/compiler/
source/_posts/physics/
source/_posts/os/
source/_posts/math/
source/_posts/blog/
```

注意：源码文件可以分文件夹，但文章 URL 由 front matter 里的
`permalink` 固定。不要为了改文件夹而改线上链接。

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

# 数学
categories:
  - 数学
tags:
  - 数学
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
