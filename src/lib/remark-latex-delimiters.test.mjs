import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
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
  // Astro enables GFM by default and registers it before user remark plugins.
  const processor = applyRemarkPlugins(
    unified().use(remarkParse).use(remarkGfm),
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

  it('splits display math inside ordered list items', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('1. 其他内容\n   \\[\n   a^2 + b^2 = c^2\n   \\]');
    const list = tree.children[0];
    const listItem = list.children[0];

    assert.equal(list.type, 'list');
    assert.equal(list.ordered, true);
    assert.deepEqual(
      listItem.children.map((child) => child.type),
      ['paragraph', 'math'],
    );
    assert.equal(listItem.children[0].children[0].value, '其他内容');
    assert.equal(listItem.children[1].value, 'a^2 + b^2 = c^2');
  });

  it('treats \\(...\\) as inline math inside ordered list items', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('1. 编号公式：\\(E = mc^2\\)。');
    const list = tree.children[0];
    const paragraph = list.children[0].children[0];

    assert.equal(list.type, 'list');
    assert.equal(list.ordered, true);
    assert.deepEqual(
      paragraph.children.map((child) => child.type),
      ['text', 'inlineMath', 'text'],
    );
    assert.equal(paragraph.children[1].value, 'E = mc^2');
  });

  it('renders display math after a list when it is unindented (CommonMark block boundary)', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('- 其他内容\n\\[\na^2 + b^2 = c^2\n\\]');

    assert.deepEqual(
      tree.children.map((child) => child.type),
      ['list', 'math'],
    );
    assert.equal(tree.children[0].children[0].children[0].children[0].value, '其他内容');
    assert.equal(tree.children[1].value, 'a^2 + b^2 = c^2');
  });

  it('treats \\(...\\) as inline math inside table cells', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins(
      '| 符号 | 含义 |\n| --- | --- |\n| \\(\\sum_i a_i\\) | 求和 |',
    );
    const cell = tree.children[0].children[1].children[0];

    assert.deepEqual(
      cell.children.map((child) => child.type),
      ['inlineMath'],
    );
    assert.equal(cell.children[0].value, '\\sum_i a_i');
  });

  it('keeps two directly adjacent inline math spans separate', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('紧邻的两个公式：\\(a\\)\\(b\\)。');
    const paragraph = tree.children[0];
    const maths = paragraph.children.filter((child) => child.type === 'inlineMath');

    assert.deepEqual(maths.map((m) => m.value), ['a', 'b']);
  });

  it('leaves delimiters inside inline code untouched', async () => {
    const tree = await parseMarkdownWithAstroRemarkPlugins('行内代码 `\\(x\\)` 不应渲染为公式。');
    const paragraph = tree.children[0];

    assert.deepEqual(
      paragraph.children.map((child) => child.type),
      ['text', 'inlineCode', 'text'],
    );
    assert.equal(paragraph.children[1].value, '\\(x\\)');
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
