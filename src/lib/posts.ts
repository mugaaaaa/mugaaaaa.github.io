import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'posts'>;
export type PostSearchItem = {
  title: string;
  href: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
};

export function postSlug(post: Pick<BlogPost, 'id'>) {
  return post.id.replace(/\.mdx?$/, '').replace(/\/index$/, '');
}

export function postHref(post: Pick<BlogPost, 'id'>) {
  return `/posts/${postSlug(post)}/`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date);
}

export function monthLabel(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(date);
}

export function monthId(date: Date) {
  return `month-${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function readingTime(post: Pick<BlogPost, 'body'>) {
  const words = post.body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .trim()
    .split(/\s+|(?=[\u4e00-\u9fa5])/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 420));
}

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );
}

export function groupPostsByMonth(posts: BlogPost[]) {
  return sortPosts(posts).reduce<
    Array<{ id: string; label: string; posts: BlogPost[] }>
  >((groups, post) => {
    const id = monthId(post.data.published);
    const current = groups.at(-1);

    if (current?.id === id) {
      current.posts.push(post);
      return groups;
    }

    groups.push({
      id,
      label: monthLabel(post.data.published),
      posts: [post],
    });
    return groups;
  }, []);
}

export function toSearchItems(posts: BlogPost[]): PostSearchItem[] {
  return sortPosts(posts).map((post) => ({
    title: post.data.title,
    href: postHref(post),
    date: formatDate(post.data.published),
    category: post.data.category ?? 'Note',
    tags: post.data.tags,
    description: post.data.description || '一篇还在继续补充的笔记。',
  }));
}
