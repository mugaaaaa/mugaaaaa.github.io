import type { CollectionEntry } from 'astro:content';
import { getTranslations, localizedPath, normalizeLocale } from '../i18n/ui';

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

export function postHref(post: Pick<BlogPost, 'id'>, locale = 'zh') {
  return localizedPath(locale, `/posts/${postSlug(post)}/`);
}

export function formatDate(date: Date, locale = 'zh') {
  const normalized = normalizeLocale(locale);
  const dateLocale = normalized === 'en' ? 'en-US' : normalized === 'ja' ? 'ja-JP' : 'zh-CN';

  return new Intl.DateTimeFormat(dateLocale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date);
}

export function monthLabel(date: Date, locale = 'zh') {
  const normalized = normalizeLocale(locale);
  const dateLocale = normalized === 'en' ? 'en-US' : normalized === 'ja' ? 'ja-JP' : 'zh-CN';

  return new Intl.DateTimeFormat(dateLocale, {
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

export function groupPostsByMonth(posts: BlogPost[], locale = 'zh') {
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
      label: monthLabel(post.data.published, locale),
      posts: [post],
    });
    return groups;
  }, []);
}

export function toSearchItems(posts: BlogPost[], locale = 'zh'): PostSearchItem[] {
  const t = getTranslations(locale);

  return sortPosts(posts).map((post) => ({
    title: post.data.title,
    href: postHref(post, locale),
    date: formatDate(post.data.published, locale),
    category: post.data.category ?? t.common.note,
    tags: post.data.tags,
    description: post.data.description || t.common.fallbackDescription,
  }));
}
