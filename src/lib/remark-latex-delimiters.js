const markdownEscapedPunctuation = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
const inlineMathPattern = /\\\(([\s\S]*?)\\\)/g;

const decodeMarkdownEscapes = (value) => value.replace(markdownEscapedPunctuation, '$1');

const inlineMathNode = (value) => ({
  type: 'inlineMath',
  value,
  data: {
    hName: 'code',
    hProperties: { className: ['language-math', 'math-inline'] },
    hChildren: [{ type: 'text', value }],
  },
});

const displayMathNode = (value) => ({
  type: 'math',
  meta: null,
  value,
  data: {
    hName: 'pre',
    hChildren: [
      {
        type: 'element',
        tagName: 'code',
        properties: { className: ['language-math', 'math-display'] },
        children: [{ type: 'text', value }],
      },
    ],
  },
});

const sourceForNode = (node, file) => {
  const start = node.position?.start?.offset;
  const end = node.position?.end?.offset;

  if (typeof file.value !== 'string' || typeof start !== 'number' || typeof end !== 'number') {
    return undefined;
  }

  return file.value.slice(start, end);
};

const splitInlineLatexMath = (node, source) => {
  const children = [];
  let lastIndex = 0;

  for (const match of source.matchAll(inlineMathPattern)) {
    const [matched, value] = match;
    const index = match.index ?? 0;
    const before = source.slice(lastIndex, index);

    if (before) {
      children.push({ ...node, value: decodeMarkdownEscapes(before), position: undefined });
    }

    children.push(inlineMathNode(value));
    lastIndex = index + matched.length;
  }

  const after = source.slice(lastIndex);
  if (after) {
    children.push({ ...node, value: decodeMarkdownEscapes(after), position: undefined });
  }

  return children;
};

const transformInlineLatexMath = (node, file) => {
  if (!node || !Array.isArray(node.children)) {
    return;
  }

  node.children = node.children.flatMap((child) => {
    if (child.type === 'text') {
      const source = sourceForNode(child, file);
      if (source?.includes('\\(')) {
        return splitInlineLatexMath(child, source);
      }
    }

    transformInlineLatexMath(child, file);
    return child;
  });
};

const displayMathValue = (source) => {
  const trimmed = source.trim();
  const match = trimmed.match(/^\\\[([\s\S]*?)\\\]$/);
  return match?.[1].trim();
};

export default function remarkLatexDelimiters() {
  return (tree, file) => {
    if (!Array.isArray(tree.children)) {
      return;
    }

    tree.children = tree.children.map((child) => {
      if (child.type === 'paragraph') {
        const source = sourceForNode(child, file);
        const math = source ? displayMathValue(source) : undefined;

        if (math !== undefined) {
          return displayMathNode(math);
        }
      }

      transformInlineLatexMath(child, file);
      return child;
    });
  };
}
