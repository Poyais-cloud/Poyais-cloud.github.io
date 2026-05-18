# Blog UI Recovery Plan

## Current conclusion

The green UI is not a broken custom theme. It is a custom layer on top of
Butterfly.

The real problem was that the custom layer existed mainly in generated static
HTML/CSS on the published `master` branch, while the Hexo source files did not
fully describe it. Running `hexo deploy` from that incomplete source could
overwrite the published green UI.

## Layer model

There are two separate layers:

1. Source layer: `_config.yml`, `_config.butterfly.yml`, `source/_posts`,
   `source/css`, `source/js`, `source/img`, `source/video`, `package.json`.
2. Publish layer: generated static files such as `index.html`, `css/index.css`,
   `2026/.../index.html`, `img/...`, `video/...`.

The correct workflow is:

```bash
source files
  -> hexo clean
  -> hexo generate
  -> public/
  -> deploy public/ to GitHub Pages
```

Do not hand-edit generated HTML as the long-term workflow.

## Green UI source files restored

The green UI is now represented in source files:

- `_config.yml`: site title, subtitle, description, deployment target.
- `_config.butterfly.yml`: Butterfly menu, avatar, background images,
  subtitle, green theme color, custom CSS/JS injection.
- `source/css/custom-green.css`: green visual layer and rain-drop CSS.
- `source/js/custom-green.js`: rain effect, announcement text change, click
  ripple effect.
- `source/img/avatar.jpg`: restored avatar.
- `source/img/site-bg.jpg`: site background.
- `source/img/top-bg.jpg`: header background.
- `source/video/violet.mp4`: optional local video asset; not tracked in Git
  because it is large and is not required by the current green UI.
- `package.json`: includes Hexo, Butterfly, deployer, server, and generators.

## Important safety rule

Do not run:

```bash
npx hexo deploy
```

until the generated `public/` output has been reviewed.

Reason: `source/_posts` currently contains ClawTime 02 and ClawTime 03, so a
full Hexo deployment would publish them too. This is expected Hexo behavior, not
a UI bug.

## Local verification commands

List posts that will be published:

```bash
cd /Users/poyais/my-blog
npm run posts
```

List drafts that will not be published:

```bash
cd /Users/poyais/my-blog
npm run drafts
```

Generate locally:

```bash
cd /Users/poyais/my-blog
npm run build
```

Preview generated static files:

```bash
cd /Users/poyais/my-blog
npm run preview
```

Open:

```text
http://localhost:4000/
http://localhost:4000/2026/05/17/clawtime-01-hunter/
```

Check that the page includes:

- `Hi! I'm Poyais`
- `/css/custom-green.css`
- `/js/custom-green.js`
- `/img/avatar.jpg`
- `/img/site-bg.jpg`
- `/img/top-bg.jpg`

## Future publishing workflow

After the source branch is cleaned up and reviewed, the normal workflow should
be:

```bash
cd /Users/poyais/my-blog
npm run posts
npm run deploy
```

Before deploying, confirm the list of posts that will be published:

```bash
find source/_posts -maxdepth 1 -type f -name '*.md' | sort
```

If a post should not be published yet, keep it in `source/_drafts`, not
`source/_posts`.

## Remaining cleanup

The repository still needs a clean source branch policy:

- `master`: GitHub Pages publish output only.
- `source`: Hexo source files only.

The current `origin/source` points to an old static publish state, so it should
not be trusted as the real source branch until it is rebuilt.
