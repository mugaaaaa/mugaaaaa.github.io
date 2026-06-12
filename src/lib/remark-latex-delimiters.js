// Normalizes LaTeX-style math delimiters (`\(...\)` and `\[...\]`) into the dollar
// delimiters that `remark-math` understands, on the *raw* Markdown source before it
// is parsed. Doing this at the source level (rather than patching the already-parsed
// syntax tree) lets `remark-math` perform all placement, so math renders correctly in
// every context it supports — paragraphs, tables, list items, blockquotes, footnotes —
// without per-context special casing.
//
// Fenced and inline code spans are masked out first so delimiters inside code are left
// untouched.

// Private-use sentinels that cannot appear in real Markdown. They stash code spans
// while delimiters are rewritten, then are restored verbatim.
const OPEN = String.fromCharCode(0xe000);
const CLOSE = String.fromCharCode(0xe001);

const INLINE = '$';
const DISPLAY = '$$';

// Matches a display span `\[...\]` (group 1) or an inline span `\(...\)` (group 2).
const MATH_SPAN = /\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g;
// Zero-width space inserted between two directly adjacent spans so their dollar
// delimiters don't merge into an ambiguous run (e.g. `\(a\)\(b\)` -> `$a$​$b$`).
const SEPARATOR = String.fromCharCode(0x200b);

const RESTORE = new RegExp(`${OPEN}(\\d+)${CLOSE}`, 'g');

export const normalizeMathDelimiters = (source) => {
  if (typeof source !== 'string' || (!source.includes('\\(') && !source.includes('\\['))) {
    return source;
  }

  const masks = [];
  const stash = (value) => `${OPEN}${masks.push(value) - 1}${CLOSE}`;

  const masked = source
    .replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, stash)
    .replace(/(`+)(?:[^`]|(?!\1)`)*\1/g, stash);

  let converted = '';
  let lastIndex = 0;
  let previousEnd = -1;

  for (const match of masked.matchAll(MATH_SPAN)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    const isDisplay = match[1] !== undefined;
    const delimiter = isDisplay ? DISPLAY : INLINE;
    const body = isDisplay ? match[1] : match[2];

    const between = masked.slice(lastIndex, start);
    converted += (between === '' && start === previousEnd) ? SEPARATOR : between;
    converted += `${delimiter}${body}${delimiter}`;

    lastIndex = end;
    previousEnd = end;
  }

  converted += masked.slice(lastIndex);

  return converted.replace(RESTORE, (_, index) => masks[Number(index)]);
};

export default function remarkLatexDelimiters() {
  const processor = this;

  return (tree, file) => {
    const source = String(file.value);
    const normalized = normalizeMathDelimiters(source);

    if (normalized === source) {
      return;
    }

    tree.children = processor.parse(normalized).children;
  };
}
