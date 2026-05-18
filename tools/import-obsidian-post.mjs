#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const TYPES = {
  clawtime: {
    folder: 'clawtime',
    tags: ['ClawTime'],
    categories: [['ClawTime', '2026-广州南沙']],
    cover: false,
    top_img: false,
  },
  compiler: {
    folder: 'compiler',
    tags: ['编译原理'],
    categories: [['SCNU期末试卷', '编译原理']],
    mathjax: true,
    cover: false,
    top_img: '/img/compiler-top.jpg',
  },
  physics: {
    folder: 'physics',
    tags: ['大学物理'],
    categories: [['SCNU期末试卷', '大学物理']],
    mathjax: true,
    cover: false,
    top_img: '/img/physics-top.jpg',
  },
  os: {
    folder: 'os',
    tags: ['操作系统'],
    categories: ['操作系统'],
    cover: false,
    top_img: false,
  },
  frontend: {
    folder: 'frontend',
    tags: ['前端面试'],
    categories: ['前端面试'],
    cover: false,
    top_img: false,
  },
  math: {
    folder: 'math',
    tags: ['数学'],
    categories: ['数学'],
    mathjax: true,
    cover: false,
    top_img: false,
  },
  blog: {
    folder: 'blog',
    tags: ['博客', 'Hexo'],
    categories: ['博客维护'],
    cover: false,
    top_img: false,
  },
};

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (!value.startsWith('--')) continue;
    const key = value.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function stripFrontMatter(content) {
  if (!content.startsWith('---\n')) return content.trimStart();
  const end = content.indexOf('\n---', 4);
  if (end === -1) return content.trimStart();
  return content.slice(end + 4).trimStart();
}

function slugify(input) {
  return input
    .trim()
    .replace(/[\\/:*?"<>|#]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function yamlList(values, indent = 2) {
  if (!Array.isArray(values)) return `${' '.repeat(indent)}- ${values}`;
  return values
    .map((value) => {
      if (Array.isArray(value)) return `${' '.repeat(indent)}- [${value.join(', ')}]`;
      return `${' '.repeat(indent)}- ${value}`;
    })
    .join('\n');
}

function permalinkFor(date, slug) {
  const [day] = date.split(' ');
  return `${day.replaceAll('-', '/')}/${slug}/`;
}

function frontMatter({ title, typeConfig, date, slug }) {
  const lines = [
    '---',
    `title: ${title}`,
    `date: ${date}`,
    `permalink: ${permalinkFor(date, slug)}`,
    'tags:',
    yamlList(typeConfig.tags),
    'categories:',
    yamlList(typeConfig.categories),
  ];

  if (typeConfig.mathjax) lines.push('mathjax: true');
  lines.push(`cover: ${typeConfig.cover}`);
  lines.push(`top_img: ${typeConfig.top_img}`);
  lines.push('---', '');

  return lines.join('\n');
}

function nowString() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return [
    now.getFullYear(),
    '-',
    pad(now.getMonth() + 1),
    '-',
    pad(now.getDate()),
    ' ',
    pad(now.getHours()),
    ':',
    pad(now.getMinutes()),
    ':',
    pad(now.getSeconds()),
  ].join('');
}

const args = parseArgs(process.argv.slice(2));

if (!args.file || !args.type) {
  console.error('Usage: npm run import:obsidian -- --file "/path/Note.md" --type frontend [--title "Title"] [--publish]');
  process.exit(1);
}

const typeConfig = TYPES[args.type];
if (!typeConfig) {
  console.error(`Unknown type "${args.type}". Supported: ${Object.keys(TYPES).join(', ')}`);
  process.exit(1);
}

const sourcePath = path.resolve(args.file);
const raw = fs.readFileSync(sourcePath, 'utf8');
const body = stripFrontMatter(raw);
const title = args.title || path.basename(sourcePath, path.extname(sourcePath));
const targetDir = path.join(args.publish ? 'source/_posts' : 'source/_drafts', typeConfig.folder);
const targetPath = path.join(process.cwd(), targetDir, `${slugify(title)}.md`);
fs.mkdirSync(path.join(process.cwd(), targetDir), { recursive: true });

if (fs.existsSync(targetPath) && !args.overwrite) {
  console.error(`Refusing to overwrite existing file: ${targetPath}`);
  console.error('Pass --overwrite if you intentionally want to replace it.');
  process.exit(1);
}

const date = nowString();
const slug = slugify(title);
const output = `${frontMatter({ title, typeConfig, date, slug })}${body}`;
fs.writeFileSync(targetPath, output);

console.log(`Imported: ${targetPath}`);
console.log(args.publish ? 'Status: post, will be published' : 'Status: draft, will not be published yet');
