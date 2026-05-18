---
name: blog-workflow
description: Use when helping Poyais write, import, preview, publish, debug, or organize posts in the Hexo GitHub Pages blog. This covers source/master branch rules, drafts vs posts, Obsidian imports, front matter, green UI preservation, and safe Git deployment.
---

# Poyais Blog Workflow

This skill is for working in the Poyais Hexo blog source repository.

## First Rule

Work in:

```bash
/Users/poyais/my-blog-source
```

Do not edit `/Users/poyais/my-blog` for source changes. That path is the generated GitHub Pages output.

## Branch Model

```text
source = blog source, Markdown, config, workflow, custom UI
master = generated static site served by GitHub Pages
```

Normal deployment:

```text
push source -> GitHub Actions -> build Hexo -> force-push public/ to master
```

Never fix content by editing `master`. Fix the source files and redeploy.

## Important Paths

```text
source/_drafts/<topic>/ = drafts, not published
source/_posts/<topic>/  = published Markdown posts
source/img/             = images
templates/              = front matter templates
tools/import-obsidian-post.mjs = Obsidian import helper
```

Current topic folders:

```text
blog
clawtime
compiler
frontend
math
os
physics
```

## Green UI

The theme is:

```text
Hexo + Butterfly + custom green UI
```

Preserve these source files:

```text
source/css/custom-green.css
source/js/custom-green.js
source/img/avatar.jpg
source/img/site-bg.jpg
source/img/top-bg.jpg
_config.yml
_config.butterfly.yml
```

Do not remove the CSS/JS injection from `_config.butterfly.yml`.

## Publishing a Draft

Move the final Markdown from `_drafts` to `_posts`:

```bash
mv source/_drafts/blog/example.md source/_posts/blog/example.md
```

Build locally:

```bash
npm run build
```

Commit only relevant files:

```bash
git status
git add source/_posts/blog/example.md
git commit -m "Publish example post"
git push origin source
```

Avoid `git add .` unless the user explicitly asks to include all changes.

## Editing a Published Post

Edit:

```text
source/_posts/<topic>/<post>.md
```

Then:

```bash
npm run build
git status
git add source/_posts/<topic>/<post>.md
git commit -m "Update <post>"
git push origin source
```

## Obsidian Import

Example:

```bash
npm run import:obsidian -- --file "/Users/poyais/Poyais的知识库/05-前端面试REVIEW/01 - 前端面试-JavaScript核心.md" --type frontend
```

Supported types are defined in:

```text
tools/import-obsidian-post.mjs
```

Manual writing only needs matching folders and valid front matter. Script support for a new `--type` requires updating the import script and templates.

## Front Matter

Every post needs front matter:

```yaml
---
title: Article title
date: 2026-05-18 10:30:00
permalink: 2026/05/18/article-slug/
tags:
  - Tag
categories:
  - Category
cover: false
top_img: false
---
```

Keep `permalink` stable. Moving source files should not change old URLs.

## Git Safety

Always inspect status first:

```bash
git status --short --branch
```

Unrelated local changes may exist. Do not revert or stage them.

Use targeted staging:

```bash
git add path/to/file.md
```

Do not run destructive Git commands unless the user explicitly asks.

## Useful Checks

```bash
npm run posts
npm run drafts
npm run build
gh run list --repo Poyais-cloud/Poyais-cloud.github.io --branch source --limit 3
```
