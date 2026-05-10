import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');
const requiredFiles = [
  'src/content.config.ts',
  'src/pages/posts/index.astro',
  'src/pages/posts/[slug].astro',
  'src/components/CommandPalette.tsx',
  'src/components/MobileGlassDock.tsx',
  'src/components/NowQueueGlass.tsx',
  'src/components/PostFilterGlass.tsx',
  'src/components/ProgressGlass.tsx',
  'src/i18n/ui.ts',
  'src/pages/en/index.astro',
  'src/pages/en/posts/index.astro',
  'src/pages/en/posts/[slug].astro',
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`missing ${file}`);
  }
}

const postsDir = join(root, 'src/content/posts');
const postFiles = existsSync(postsDir)
  ? readdirSync(postsDir).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
  : [];

if (postFiles.length < 3) {
  failures.push('expected at least 3 markdown posts in src/content/posts');
}

if (existsSync(join(root, 'src/pages/index.astro'))) {
  const home = read('src/pages/index.astro');
  const homeSource = existsSync(join(root, 'src/components/pages/HomePage.astro'))
    ? read('src/components/pages/HomePage.astro')
    : home;
  if (!homeSource.includes('min-h-[100svh]')) {
    failures.push('hero should use min-h-[100svh]');
  }
  if (!homeSource.includes("localizedPath(locale, '/posts/'")) {
    failures.push('home latest posts section should link to localized all-posts path');
  }
  for (const component of ['CommandPalette', 'MobileGlassDock', 'NowQueueGlass', 'PostFilterGlass']) {
    if (!homeSource.includes(component)) {
      failures.push(`home should use ${component}`);
    }
  }
  if (/(Touhou|东方\s*Project|Gensokyo|幻想乡)/i.test(homeSource)) {
    failures.push('home copy should not emphasize Touhou Project');
  }
  for (const implementationPhrase of [
    'Markdown 文章会被渲染成独立页面',
    '筛选条和搜索层使用玻璃',
    '真实账号可以集中',
    '之后收进 More',
  ]) {
    if (homeSource.includes(implementationPhrase)) {
      failures.push(`home copy should avoid implementation phrase: ${implementationPhrase}`);
    }
  }
}

if (existsSync(join(root, 'src/pages/posts/index.astro'))) {
  const postsIndex = existsSync(join(root, 'src/components/pages/PostsIndexPage.astro'))
    ? read('src/components/pages/PostsIndexPage.astro')
    : read('src/pages/posts/index.astro');
  if (!postsIndex.includes('timeline-month') || !postsIndex.includes('timeline-line')) {
    failures.push('posts index should render a vertical timeline grouped by month');
  }
  if (!postsIndex.includes('ProgressGlass') || !postsIndex.includes('sections={timelineSections}')) {
    failures.push('posts index should include a right-side glass month index');
  }
}

if (existsSync(join(root, 'src/i18n/ui.ts'))) {
  const i18n = read('src/i18n/ui.ts');
  for (const token of ['zh', 'en', 'localizedPath', 'languageSwitchPath']) {
    if (!i18n.includes(token)) {
      failures.push(`i18n module should define ${token}`);
    }
  }
}

if (existsSync(join(root, 'src/components/ProgressGlass.tsx'))) {
  const progress = read('src/components/ProgressGlass.tsx');
  if (!/scroll/i.test(progress) || !/progress/i.test(progress)) {
    failures.push('ProgressGlass should track scroll progress');
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`blog check passed with ${postFiles.length} markdown posts`);
