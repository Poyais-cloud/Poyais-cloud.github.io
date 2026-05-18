---
title: Hexo博客部署完整工作流
date: 2026-04-27
permalink: 2026/04/27/Hexo博客部署工作流/
tags: [博客, Hexo, 部署]
---

# Hexo博客部署完整工作流

## 一、文章规范

### Front Matter必须包含
```yaml
---
title: 文章标题
date: 2026-04-27 00:18:00
tags: [标签1, 标签2]
categories: [分类1, 分类2]
---
```

**缺少字段会导致**：首页显示"无标题"、分类失效

## 二、部署命令（完整版）

```bash
# 1. 生成静态文件
cd ~/my-blog
hexo clean && hexo generate

# 2. 推送到GitHub Pages
cd public
git init && git add -A && git commit -m "更新博客"
git remote add origin https://github.com/Poyais-cloud/Poyais-cloud.github.io.git
git push origin main:master --force
```

**关键点**：推送到 `master` 分支（不是 `main`）

## 三、验证部署

```bash
# 等待60秒后检查
sleep 60 && curl -sL "https://poyais-cloud.github.io" | grep -o 'article-title[^>]*>[^<]*' | head -5
```

## 四、禁用封面图片

编辑 `_config.butterfly.yml`：
```yaml
cover:
  index_enable: false
  aside_enable: false
  archives_enable: false
  default_cover:

default_top_img:
```

## 五、常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| 首页"无标题" | 缺少title字段 | 补全front matter |
| 网站不更新 | 推错分支 | 推送到master分支 |
| 有封面图 | 主题默认开启 | 修改config禁用 |

## 六、快速部署脚本

可保存为 `deploy.sh`：
```bash
#!/bin/bash
cd ~/my-blog
hexo clean && hexo generate
cd public
git init && git add -A && git commit -m "$(date '+%Y-%m-%d %H:%M') 更新"
git push origin main:master --force
echo "部署完成！等待1分钟后访问 https://poyais-cloud.github.io"
```
