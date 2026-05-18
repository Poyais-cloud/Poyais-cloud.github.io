# Blog Authoring Guide

This is the operating manual for writing posts without rethinking the blog
structure every time.

## Daily Rule

Work only in this directory:

```bash
/Users/poyais/my-blog-source
```

Use these folders:

```text
source/_posts/   published posts
source/_drafts/  drafts that will not be published
source/img/      blog images
source/css/      custom UI CSS
source/js/       custom UI JS
```

Do not write posts in `/Users/poyais/my-blog`. That directory is the `master`
publish-output worktree.

## Categories vs Tags

Use categories as the shelf. Use tags as labels.

Categories answer:

```text
Where does this article live?
```

Tags answer:

```text
What topics does this article touch?
```

One post should normally have one category path and two to five tags.

## Category Map

Use this fixed map unless you intentionally add a new long-term topic.

| Topic | Category | Tags | Top Image |
| --- | --- | --- | --- |
| ClawTime | `[ClawTime, 2026-广州南沙]` | `ClawTime` | `false` |
| 编译原理 | `[SCNU期末试卷, 编译原理]` | `编译原理` | `/img/compiler-top.jpg` |
| 大学物理 | `[SCNU期末试卷, 大学物理]` | `大学物理`, chapter tag | `/img/physics-top.jpg` |
| 操作系统 | `操作系统` | `操作系统`, chapter tag | `false` |
| 前端 | `前端面试` | `JavaScript`, `前端面试`, specific tags | `false` |
| 博客维护 | `博客维护` | `博客`, `Hexo`, `部署` | `false` |

## Front Matter Templates

ClawTime:

```yaml
---
title: ClawTime 01 — 标题
date: 2026-05-17 23:00:00
tags:
  - ClawTime
categories:
  - [ClawTime, 2026-广州南沙]
cover: false
top_img: false
---
```

编译原理:

```yaml
---
title: 编译原理 - 词法分析
date: 2026-04-26 01:00:00
tags:
  - 编译原理
categories:
  - [SCNU期末试卷, 编译原理]
mathjax: true
cover: false
top_img: /img/compiler-top.jpg
---
```

大学物理:

```yaml
---
title: 大学物理 - 力学
date: 2026-04-27 00:18:00
tags:
  - 大学物理
  - 力学
categories:
  - [SCNU期末试卷, 大学物理]
mathjax: true
cover: false
top_img: /img/physics-top.jpg
---
```

前端:

```yaml
---
title: JavaScript事件循环详解
date: 2026-04-25 20:20:00
tags:
  - JavaScript
  - 前端面试
categories:
  - 前端面试
cover: false
top_img: false
---
```

## Header Config Cheat Sheet

`_config.yml` controls the whole Hexo site:

| Field | Meaning |
| --- | --- |
| `title` | Browser title and site name |
| `subtitle` | Site subtitle |
| `description` | SEO/social description |
| `author` | Author name |
| `url` | Public GitHub Pages URL |
| `permalink` | Post URL format |
| `theme` | Theme name, currently `butterfly` |
| `deploy.branch` | Publish target, currently `master` |

`_config.butterfly.yml` controls the visual theme:

| Field | Meaning |
| --- | --- |
| `menu` | Top navigation links |
| `avatar.img` | Sidebar avatar |
| `index_img` | Homepage header image |
| `default_top_img` | Default page/post header image |
| `background` | Site background image |
| `footer_img` | Footer background |
| `subtitle.sub` | Typewriter subtitle text |
| `theme_color` | Green theme color |
| `inject.head` | Custom CSS injection |
| `inject.bottom` | Custom JS injection |

The green UI lives in:

```text
source/css/custom-green.css
source/js/custom-green.js
```

## Obsidian Workflow

Keep writing and learning in Obsidian. When one note is ready for the blog, use
the import command to make a blog copy with proper front matter.

Example:

```bash
cd /Users/poyais/my-blog-source
npm run import:obsidian -- --file "/path/to/Obsidian/Note.md" --type frontend
```

Supported types:

```text
clawtime
compiler
physics
os
frontend
blog
```

The command creates a draft by default. Review it, then move it from
`source/_drafts` to `source/_posts` when ready.

Reusable front matter templates also live in:

```text
templates/
```

Preview:

```bash
npm run preview
```

Publish only after checking:

```bash
npm run posts
npm run deploy
```

## Obsidian Syntax Compatibility

Obsidian features are useful while writing, but not all of them render cleanly
on Hexo.

Safe for blog posts:

```text
# headings
normal Markdown links: [title](/path/)
normal Markdown images: ![alt](/img/name.png)
tables
code blocks
LaTeX when `mathjax: true` is enabled
```

Use with care:

```text
[[double links]]
![[embedded notes]]
![[image.png]]
callouts like [!note]
tags written as #tag inside text
```

Recommended rule:

```text
Obsidian private notes can use full Obsidian syntax.
Blog posts should use standard Markdown as much as possible.
```

For a public blog post, prefer:

```markdown
[编译原理目录](/notes/compiler/)
![图片说明](/img/example.png)
```

instead of:

```markdown
[[编译原理目录]]
![[example.png]]
```

Double links are still fine inside drafts while writing. Before publishing,
replace important double links with normal Markdown links so readers can click
them on the website.
