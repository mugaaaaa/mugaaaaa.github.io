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

  it('splits display math out of a paragraph when it starts on the next line', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('其他内容\n\\[\na^2 + b^2 = c^2\n\\]');

    assert.deepEqual(
      tree.children.map((child) => child.type),
      ['paragraph', 'math'],
    );
    assert.equal(tree.children[0].children[0].value, '其他内容');
    assert.equal(tree.children[1].value, 'a^2 + b^2 = c^2');
  });

  it('splits display math inside blockquotes', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('> 其他内容\n> \\[\n> a^2 + b^2 = c^2\n> \\]');
    const blockquote = tree.children[0];

    assert.equal(blockquote.type, 'blockquote');
    assert.deepEqual(
      blockquote.children.map((child) => child.type),
      ['paragraph', 'math'],
    );
    assert.equal(blockquote.children[0].children[0].value, '其他内容');
    assert.equal(blockquote.children[1].value, 'a^2 + b^2 = c^2');
  });

  it('preserves inline Markdown around display math inside blockquotes', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('> **引用公式：\\(E = mc^2\\)**\n> \\[\n> a = b\n> \\]');
    const blockquote = tree.children[0];
    const paragraph = blockquote.children[0];
    const strong = paragraph.children[0];

    assert.deepEqual(
      blockquote.children.map((child) => child.type),
      ['paragraph', 'math'],
    );
    assert.equal(strong.type, 'strong');
    assert.deepEqual(
      strong.children.map((child) => child.type),
      ['text', 'inlineMath'],
    );
    assert.equal(strong.children[1].value, 'E = mc^2');
    assert.equal(blockquote.children[1].value, 'a = b');
  });

  it('preserves blockquote formatting before display math after a hard break', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('> **简单例子**  \n> 同态 \\(f: R \\to S\\)，因此\n> \\[\n> a = b\n> \\]');
    const blockquote = tree.children[0];
    const paragraph = blockquote.children[0];

    assert.deepEqual(
      blockquote.children.map((child) => child.type),
      ['paragraph', 'math'],
    );
    assert.deepEqual(
      paragraph.children.map((child) => child.type),
      ['strong', 'break', 'text', 'inlineMath', 'text'],
    );
    assert.equal(paragraph.children[0].children[0].value, '简单例子');
    assert.equal(paragraph.children[3].value, 'f: R \\to S');
    assert.equal(blockquote.children[1].value, 'a = b');
  });

  it('treats \\(...\\) as inline math inside blockquotes', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('> 引用公式：\\(E = mc^2\\)。');
    const paragraph = tree.children[0].children[0];

    assert.deepEqual(
      paragraph.children.map((child) => child.type),
      ['text', 'inlineMath', 'text'],
    );
    assert.equal(paragraph.children[1].value, 'E = mc^2');
  });

  it('splits display math inside list items', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('- 其他内容\n  \\[\n  a^2 + b^2 = c^2\n  \\]');
    const listItem = tree.children[0].children[0];

    assert.deepEqual(
      listItem.children.map((child) => child.type),
      ['paragraph', 'math'],
    );
    assert.equal(listItem.children[0].children[0].value, '其他内容');
    assert.equal(listItem.children[1].value, 'a^2 + b^2 = c^2');
  });

  it('preserves inline Markdown around display math inside list items', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('- **项目公式：\\(E = mc^2\\)**\n  \\[\n  a = b\n  \\]');
    const listItem = tree.children[0].children[0];
    const paragraph = listItem.children[0];
    const strong = paragraph.children[0];

    assert.deepEqual(
      listItem.children.map((child) => child.type),
      ['paragraph', 'math'],
    );
    assert.equal(strong.type, 'strong');
    assert.deepEqual(
      strong.children.map((child) => child.type),
      ['text', 'inlineMath'],
    );
    assert.equal(strong.children[1].value, 'E = mc^2');
    assert.equal(listItem.children[1].value, 'a = b');
  });

  it('preserves list item formatting before display math after a hard break', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('- **重点**  \n  说明 \\(f: R \\to S\\)，因此\n  \\[\n  a = b\n  \\]');
    const listItem = tree.children[0].children[0];
    const paragraph = listItem.children[0];

    assert.deepEqual(
      listItem.children.map((child) => child.type),
      ['paragraph', 'math'],
    );
    assert.deepEqual(
      paragraph.children.map((child) => child.type),
      ['strong', 'break', 'text', 'inlineMath', 'text'],
    );
    assert.equal(paragraph.children[0].children[0].value, '重点');
    assert.equal(paragraph.children[3].value, 'f: R \\to S');
    assert.equal(listItem.children[1].value, 'a = b');
  });

  it('treats \\(...\\) as inline math inside list items', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('- 项目公式：\\(E = mc^2\\)。');
    const paragraph = tree.children[0].children[0].children[0];

    assert.deepEqual(
      paragraph.children.map((child) => child.type),
      ['text', 'inlineMath', 'text'],
    );
    assert.equal(paragraph.children[1].value, 'E = mc^2');
  });

  it('splits display math from lazy continuation lines inside list items', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('- 其他内容\n\\[\na^2 + b^2 = c^2\n\\]');
    const listItem = tree.children[0].children[0];

    assert.deepEqual(
      listItem.children.map((child) => child.type),
      ['paragraph', 'math'],
    );
    assert.equal(listItem.children[0].children[0].value, '其他内容');
    assert.equal(listItem.children[1].value, 'a^2 + b^2 = c^2');
  });

  it('treats \\(...\\) as inline math inside blockquote list items', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('> * 属性权重 \\(W_{AGWE}\\)。');
    const paragraph = tree.children[0].children[0].children[0].children[0];

    assert.deepEqual(
      paragraph.children.map((child) => child.type),
      ['text', 'inlineMath', 'text'],
    );
    assert.equal(paragraph.children[1].value, 'W_{AGWE}');
  });
});
