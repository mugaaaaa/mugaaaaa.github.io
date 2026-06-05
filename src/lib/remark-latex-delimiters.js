const markdownEscapedPunctuation = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
const inlineMathPattern = /\\\(([\s\S]*?)\\\)/g;
const displayMathPattern = /(^|\n)[ \t]*\\\[([\s\S]*?)\\\][ \t]*(?=\n|$)/g;

const decodeMarkdownEscapes = (value) => value.replace(markdownEscapedPunctuation, '$1');
const normalizeBlockquoteContinuation = (value) => value.replace(/\n[ \t]*>[ \t]?/g, '\n');

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

  return normalizeBlockquoteContinuation(file.value.slice(start, end));
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

const inlineChildrenFromSource = (source, node = { type: 'text' }) => {
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

const trimTextBoundary = (child, side) => {
  const pattern = side === 'start' ? /^\s+/ : /\s+$/;
  const value = child.value.replace(pattern, '');
  return value ? { ...child, value, position: undefined } : undefined;
};

const trimInlineTextBoundaries = (children) => {
  const trimmed = [...children];

  while (trimmed[0]?.type === 'text') {
    const child = trimTextBoundary(trimmed[0], 'start');
    if (child) {
      trimmed[0] = child;
      break;
    }

    trimmed.shift();
  }

  while (trimmed.at(-1)?.type === 'text') {
    const child = trimTextBoundary(trimmed.at(-1), 'end');
    if (child) {
      trimmed[trimmed.length - 1] = child;
      break;
    }

    trimmed.pop();
  }

  return trimmed;
};

const paragraphNodeFromChildren = (children, file) => {
  if (!children.length) {
    return undefined;
  }

  const paragraph = {
    type: 'paragraph',
    children,
  };

  transformInlineLatexMath(paragraph, file);

  const trimmedChildren = trimInlineTextBoundaries(paragraph.children);
  if (!trimmedChildren.length) {
    return undefined;
  }

  return {
    ...paragraph,
    children: trimmedChildren,
  };
};

const splitDisplayLatexMathInText = (node, source) => {
  const nodes = [];
  let lastIndex = 0;
  let hasDisplayMath = false;

  for (const match of source.matchAll(displayMathPattern)) {
    const [matched, leadingBreak, value] = match;
    const index = match.index ?? 0;
    const mathStart = index + leadingBreak.length;
    const before = source.slice(lastIndex, mathStart);

    if (before) {
      nodes.push(...inlineChildrenFromSource(before, node));
    }

    nodes.push(displayMathNode(value.trim()));
    lastIndex = index + matched.length;
    hasDisplayMath = true;
  }

  if (!hasDisplayMath) {
    return undefined;
  }

  const after = source.slice(lastIndex);
  if (after) {
    nodes.push(...inlineChildrenFromSource(after, node));
  }

  return nodes;
};

const splitDisplayLatexMath = (paragraph, file) => {
  const nodes = [];
  let currentChildren = [];
  let hasDisplayMath = false;

  const pushCurrentParagraph = () => {
    const paragraphNode = paragraphNodeFromChildren(currentChildren, file);
    currentChildren = [];

    if (paragraphNode) {
      nodes.push(paragraphNode);
    }
  };

  for (const child of paragraph.children) {
    if (child.type === 'text') {
      const source = sourceForNode(child, file);
      const parts = source ? splitDisplayLatexMathInText(child, source) : undefined;

      if (parts) {
        hasDisplayMath = true;

        for (const part of parts) {
          if (part.type === 'math') {
            pushCurrentParagraph();
            nodes.push(part);
            continue;
          }

          currentChildren.push(part);
        }

        continue;
      }
    }

    currentChildren.push(child);
  }

  if (!hasDisplayMath) {
    return undefined;
  }

  pushCurrentParagraph();
  return nodes;
};

export default function remarkLatexDelimiters() {
  const transformLatexDelimiters = (node, file) => {
    if (!Array.isArray(node.children)) {
      return;
    }

    node.children = node.children.flatMap((child) => {
      if (child.type === 'paragraph') {
        const nodes = splitDisplayLatexMath(child, file);

        if (nodes) {
          return nodes;
        }

        transformInlineLatexMath(child, file);
        return child;
      }

      transformLatexDelimiters(child, file);
      return child;
    });
  };

  return (tree, file) => {
    transformLatexDelimiters(tree, file);
  };
}
