import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pageSource = await readFile(
  new URL('./pages/PostDetailPage.astro', import.meta.url),
  'utf8',
);
const cssSource = await readFile(
  new URL('../styles/global.css', import.meta.url),
  'utf8',
);

test('post detail page enhances Mermaid blocks without copy controls', () => {
  assert.match(pageSource, /pre\[data-language="mermaid"\] > code/);
  assert.match(pageSource, /import\('mermaid'\)/);
  assert.match(pageSource, /enhanceMermaidDiagrams/);
  assert.match(pageSource, /pre\.dataset\.language === 'mermaid'/);
  assert.match(pageSource, /data-mermaid-ready/);
});

test('article styles provide responsive Mermaid diagram containers', () => {
  assert.match(cssSource, /\.prose-content \.mermaid-diagram \{/);
  assert.match(cssSource, /\.prose-content \.mermaid-diagram svg \{/);
  assert.match(cssSource, /\.prose-content-vertical-page \.mermaid-diagram \{/);
  assert.match(cssSource, /\.prose-content \.mermaid-diagram-error \{/);
});
