const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const renderPlainText = (value) => escapeHtml(value)
  .replaceAll('\\(', '(')
  .replaceAll('\\)', ')');

const rubyPattern = /([\p{Script=Han}々〻]+)(?<!\\)\(([^()\n]+)\)/gu;

export const renderRubyInline = (source) => {
  let html = '';
  let lastIndex = 0;

  for (const match of source.matchAll(rubyPattern)) {
    const [matched, base, reading] = match;
    const index = match.index ?? 0;
    html += renderPlainText(source.slice(lastIndex, index));
    html += `<ruby>${escapeHtml(base)}<rt>${escapeHtml(reading)}</rt></ruby>`;
    lastIndex = index + matched.length;
  }

  html += renderPlainText(source.slice(lastIndex));
  return html;
};

const renderRubyBlock = (source) => {
  const paragraphs = source
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const body = paragraphs
    .map((paragraph) => `<p>${renderRubyInline(paragraph)}</p>`)
    .join('\n');

  return `<div class="ruby-source">\n${body}\n</div>`;
};

const transformRubyCodeBlocks = (node) => {
  if (!node || !Array.isArray(node.children)) {
    return;
  }

  node.children = node.children.map((child) => {
    if (child.type === 'code' && child.lang === 'ruby') {
      return {
        type: 'html',
        value: renderRubyBlock(child.value),
      };
    }

    transformRubyCodeBlocks(child);
    return child;
  });
};

export default function remarkRuby() {
  return (tree) => {
    transformRubyCodeBlocks(tree);
  };
}
