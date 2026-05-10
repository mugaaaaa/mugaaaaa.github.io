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
  if (!home.includes('min-h-[100svh]')) {
    failures.push('hero should use min-h-[100svh]');
  }
  if (!home.includes('href="/posts/"')) {
    failures.push('home latest posts section should link to /posts/');
  }
  for (const component of ['CommandPalette', 'MobileGlassDock', 'NowQueueGlass', 'PostFilterGlass']) {
    if (!home.includes(component)) {
      failures.push(`home should use ${component}`);
    }
  }
  if (/(Touhou|东方\s*Project|Gensokyo|幻想乡)/i.test(home)) {
    failures.push('home copy should not emphasize Touhou Project');
  }
}

if (existsSync(join(root, 'src/pages/posts/index.astro'))) {
  const postsIndex = read('src/pages/posts/index.astro');
  if (!postsIndex.includes('timeline-month') || !postsIndex.includes('timeline-line')) {
    failures.push('posts index should render a vertical timeline grouped by month');
  }
  if (!postsIndex.includes('ProgressGlass') || !postsIndex.includes('sections={timelineSections}')) {
    failures.push('posts index should include a right-side glass month index');
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
