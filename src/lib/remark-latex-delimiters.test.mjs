import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import astroConfig from '../../astro.config.mjs';

const applyRemarkPlugins = (processor, plugins) => {
  for (const plugin of plugins) {
    if (Array.isArray(plugin)) {
      processor.use(plugin[0], plugin[1]);
      continue;
    }

    processor.use(plugin);
  }

  return processor;
};

const parseMarkdownWithAstroRemarkPlugins = async (source) => {
  const processor = applyRemarkPlugins(
    unified().use(remarkParse),
    astroConfig.markdown.remarkPlugins,
  );
  const tree = processor.parse(source);
  await processor.run(tree, { value: source });
  return tree;
};

describe('LaTeX math delimiters in Markdown', () => {
  it('treats \\(...\\) as inline math', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('横排公式：\\(E = mc^2\\)。');
    const paragraph = tree.children[0];

    assert.equal(paragraph.type, 'paragraph');
    assert.deepEqual(
      paragraph.children.map((child) => child.type),
      ['text', 'inlineMath', 'text'],
    );
    assert.equal(paragraph.children[1].value, 'E = mc^2');
  });

  it('treats \\[...\\] as display math', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('\\[\na^2 + b^2 = c^2\n\\]');

    assert.equal(tree.children[0].type, 'math');
    assert.equal(tree.children[0].value, 'a^2 + b^2 = c^2');
  });
});
