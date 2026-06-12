export const locales = ['zh', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';
export const languageOptions: Array<{ locale: Locale; label: string; shortLabel: string }> = [
  { locale: 'zh', label: '中文', shortLabel: '中' },
  { locale: 'en', label: 'English', shortLabel: 'EN' },
  { locale: 'ja', label: '日本語', shortLabel: '日' },
];

const endQuote = [
  { text: '色', ruby: 'いろ' },
  { text: 'は' },
  { text: '匂', ruby: 'にほ' },
  { text: 'へと、' },
  { text: '散', ruby: 'ち' },
  { text: 'りぬるを。' },
] as const;

export const ui = {
  zh: {
    htmlLang: 'zh-CN',
    languageName: '中文',
    languageSwitchLabel: 'EN',
    nav: {
      home: 'Home',
      volume: 'Volume',
      posts: 'Posts',
      socials: 'Socials',
      search: 'Search',
      searchPosts: 'Search posts',
      latestPosts: 'Latest posts',
      backTop: 'Back to top',
      language: 'Language',
      theme: 'Theme',
    },
    search: {
      placeholder: 'Search posts, tags, categories',
      close: 'Close search',
      empty: 'No matching posts.',
    },
    common: {
      posts: 'Posts',
      tags: 'Tags',
      min: 'Min',
      read: 'Read',
      type: 'Type',
      date: 'Date',
      home: 'Home',
      note: 'Note',
      fallbackDescription: '继续补充中...',
      minutesRead: (minutes: number) => `${minutes} min read`,
    },
    home: {
      metaDescription:
        "Mugaaaaa's Blog, a personal notebook for code, linguistics, research notes, and daily writing.",
      eyebrow: 'Personal notebook / Since 2026',
      heroSubtitle:
        '记录代码、语言学与生活',
      latestTitle: 'Latest Posts',
      volumeIntro: '专栏入口',
      latestIntro:
        '近期帖子',
      viewAllPosts: 'View all posts',
      socialsIntro: '社交媒体',
      socialsList: 'GitHub / QQ / Bilibili / Reserved',
      nextEyebrow: 'Next draft',
      nextHeading: '',
      queueTitle: 'Queue',
      queueItems: ['Tag index and RSS', 'Volume index page', 'Image metadata captions'],
      endLabel: 'END',
      endQuote,
      volumes: {
        paperNotes: '论文/科研笔记',
        anime: 'ACGN相关',
        linguists: '语言学相关',
        technology: '技术/工程记录',
        music: '音乐与听感',
        chore: '日常杂记',
      },
      socials: {
        github: '代码仓库',
        qq: '平时主要用 QQ',
        bilibili: '不怎么发视频了（',
        reserved: '预留',
      },
    },
    postsIndex: {
      metaDescription: "All posts from Mugaaaaa's Blog arranged as a chronological timeline.",
      title: "Posts | Mugaaaaa's Blog",
      eyebrow: 'All posts',
      heading: 'Timeline',
      intro:
        '按发布时间倒序排列，月份索引',
      activeTag: (tag: string) => `当前筛选：${tag}。`,
      empty: '没有找到这个标签下的文章。',
      showAll: 'Show all posts',
      total: 'Total',
    },
    postDetail: {
      reading: 'Reading',
      intro: 'Intro',
      article: 'Article',
      allPosts: 'All posts',
      backToPosts: 'Back to posts',
      newer: 'Newer',
      older: 'Older',
      outline: 'Outline',
      adjacent: 'Adjacent',
      noOutline: '这篇文章还没有二级目录',
      copyCode: 'Copy',
      copiedCode: 'Copied',
    },
    filter: {
      label: 'Filter',
      all: 'All',
    },
    nowQueue: {
      title: 'Now / Queue',
      next: 'Next',
      draftFallback: 'New draft',
    },
  },
  en: {
    htmlLang: 'en',
    languageName: 'English',
    languageSwitchLabel: '中文',
    nav: {
      home: 'Home',
      volume: 'Volume',
      posts: 'Posts',
      socials: 'Socials',
      search: 'Search',
      searchPosts: 'Search posts',
      latestPosts: 'Latest posts',
      backTop: 'Back to top',
      language: 'Language',
      theme: 'Theme',
    },
    search: {
      placeholder: 'Search posts, tags, categories',
      close: 'Close search',
      empty: 'No matching posts.',
    },
    common: {
      posts: 'Posts',
      tags: 'Tags',
      min: 'Min',
      read: 'Read',
      type: 'Type',
      date: 'Date',
      home: 'Home',
      note: 'Note',
      fallbackDescription: 'More to come...',
      minutesRead: (minutes: number) => `${minutes} min read`,
    },
    home: {
      metaDescription:
        "Mugaaaaa's Blog, a personal notebook for code, linguistics, research notes, and daily writing.",
      eyebrow: 'Personal notebook / Since 2026',
      heroSubtitle:
        'Notes on code, linguistics, and life',
      latestTitle: 'Latest Posts',
      volumeIntro:
        'Collection index',
      latestIntro:
        'Recent posts',
      viewAllPosts: 'View all posts',
      socialsIntro: 'Social media',
      socialsList: 'GitHub / QQ / Bilibili / Reserved',
      nextEyebrow: 'Next draft',
      nextHeading: '',
      queueTitle: 'Queue',
      queueItems: ['Tag index and RSS', 'Volume index page', 'Image metadata captions'],
      endLabel: 'END',
      endQuote,
      volumes: {
        paperNotes: 'Paper / research notes',
        anime: 'ACGN related',
        linguists: 'Linguistics related',
        technology: 'Technology and engineering notes',
        music: 'Music and listening notes',
        chore: 'Daily chores and fragments',
      },
      socials: {
        github: 'Code repositories',
        qq: 'Mostly on QQ',
        bilibili: 'Not posting videos much lately (',
        reserved: 'Reserved',
      },
    },
    postsIndex: {
      metaDescription: "All posts from Mugaaaaa's Blog arranged as a chronological timeline.",
      title: "Posts | Mugaaaaa's Blog",
      eyebrow: 'All posts',
      heading: 'Timeline',
      intro:
        'Reverse chronological order, month index',
      activeTag: (tag: string) => `Filtered by: ${tag}.`,
      empty: 'No posts found for this tag.',
      showAll: 'Show all posts',
      total: 'Total',
    },
    postDetail: {
      reading: 'Reading',
      intro: 'Intro',
      article: 'Article',
      allPosts: 'All posts',
      backToPosts: 'Back to posts',
      newer: 'Newer',
      older: 'Older',
      outline: 'Outline',
      adjacent: 'Adjacent',
      noOutline: 'This article has no level-two outline yet',
      copyCode: 'Copy',
      copiedCode: 'Copied',
    },
    filter: {
      label: 'Filter',
      all: 'All',
    },
    nowQueue: {
      title: 'Now / Queue',
      next: 'Next',
      draftFallback: 'New draft',
    },
  },
  ja: {
    htmlLang: 'ja',
    languageName: '日本語',
    languageSwitchLabel: '中文',
    nav: {
      home: 'Home',
      volume: 'Volume',
      posts: 'Posts',
      socials: 'Socials',
      search: 'Search',
      searchPosts: 'Search posts',
      latestPosts: 'Latest posts',
      backTop: 'Back to top',
      language: 'Language',
      theme: 'Theme',
    },
    search: {
      placeholder: 'Search posts, tags, categories',
      close: 'Close search',
      empty: 'No matching posts.',
    },
    common: {
      posts: 'Posts',
      tags: 'Tags',
      min: 'Min',
      read: 'Read',
      type: 'Type',
      date: 'Date',
      home: 'Home',
      note: 'Note',
      fallbackDescription: '追記中...',
      minutesRead: (minutes: number) => `${minutes} min read`,
    },
    home: {
      metaDescription:
        "Mugaaaaa's Blog, a personal notebook for code, linguistics, research notes, and daily writing.",
      eyebrow: 'Personal notebook / Since 2026',
      heroSubtitle:
        'コード、言語学と生活の記録',
      latestTitle: 'Latest Posts',
      volumeIntro:
        'コレクション入口',
      latestIntro:
        '最近の投稿',
      viewAllPosts: 'View all posts',
      socialsIntro: 'ソーシャルメディア',
      socialsList: 'GitHub / QQ / Bilibili / Reserved',
      nextEyebrow: 'Next draft',
      nextHeading: '',
      queueTitle: 'Queue',
      queueItems: ['Tag index and RSS', 'Volume index page', 'Image metadata captions'],
      endLabel: 'END',
      endQuote,
      volumes: {
        paperNotes: '論文/研究ノート',
        anime: 'ACGN 関連',
        linguists: '言語学関連',
        technology: '技術と開発の記録',
        music: '音楽と聴取メモ',
        chore: '日常の雑記',
      },
      socials: {
        github: 'コードリポジトリ',
        qq: '普段は主に QQ',
        bilibili: '最近はあまり動画を投稿していません（',
        reserved: '予約枠',
      },
    },
    postsIndex: {
      metaDescription: "All posts from Mugaaaaa's Blog arranged as a chronological timeline.",
      title: "Posts | Mugaaaaa's Blog",
      eyebrow: 'All posts',
      heading: 'Timeline',
      intro:
        '公開日時の降順、月別インデックス',
      activeTag: (tag: string) => `現在のフィルター：${tag}。`,
      empty: 'このタグの記事は見つかりません。',
      showAll: 'Show all posts',
      total: 'Total',
    },
    postDetail: {
      reading: 'Reading',
      intro: 'Intro',
      article: 'Article',
      allPosts: 'All posts',
      backToPosts: 'Back to posts',
      newer: 'Newer',
      older: 'Older',
      outline: 'Outline',
      adjacent: 'Adjacent',
      noOutline: 'この文章にはまだ二級見出しがありません',
      copyCode: 'Copy',
      copiedCode: 'Copied',
    },
    filter: {
      label: 'Filter',
      all: 'All',
    },
    nowQueue: {
      title: 'Now / Queue',
      next: 'Next',
      draftFallback: 'New draft',
    },
  },
} as const;

export function normalizeLocale(locale: string | undefined): Locale {
  return locale === 'en' || locale === 'ja' ? locale : defaultLocale;
}

export function getTranslations(locale: string | undefined) {
  return ui[normalizeLocale(locale)];
}

export function localizedPath(locale: string | undefined, path: string) {
  const normalized = normalizeLocale(locale);
  if (/^[a-z]+:\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tencent:')) {
    return path;
  }

  if (normalized === defaultLocale) {
    return path;
  }

  if (path === '/') {
    return `/${normalized}/`;
  }

  return `/${normalized}${path.startsWith('/') ? path : `/${path}`}`;
}

export function languageSwitchPath(targetLocale: string | undefined, pathname: string) {
  const withoutPrefix = pathname.replace(/^\/(en|ja)(?=\/|$)/, '') || '/';

  return localizedPath(targetLocale, withoutPrefix);
}
