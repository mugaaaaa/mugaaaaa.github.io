const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const transformKanbunCodeBlocks = (node) => {
  if (!node || !Array.isArray(node.children)) {
    return;
  }

  node.children = node.children.map((child) => {
    if (child.type === 'code' && child.lang === 'kanbun') {
      return {
        type: 'html',
        value: `<div class="kanbun kanbun-source">\n${escapeHtml(child.value)}\n</div>`,
      };
    }

    transformKanbunCodeBlocks(child);
    return child;
  });
};

export default function remarkKanbun() {
  return (tree) => {
    transformKanbunCodeBlocks(tree);
  };
}
