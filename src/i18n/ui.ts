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
      fallbackDescription: '一篇还在继续补充的笔记。',
      minutesRead: (minutes: number) => `${minutes} min read`,
    },
    home: {
      metaDescription:
        "Mugaaaaa's Blog, a personal notebook for code, linguistics, research notes, and daily writing.",
      eyebrow: 'Personal notebook / Since 2026',
      heroSubtitle:
        '记录代码、语言、阅读与日常观察。把零散的问题写清楚，也把正在形成的想法留在这里。',
      latestTitle: 'Latest Posts',
      volumeIntro: '长期整理的主题入口。论文、动画、语言学笔记会先在这里汇总。',
      latestIntro:
        '最近写下的笔记、摘录和实验记录。按时间向前推进，也允许中途留下未完成的问题。',
      viewAllPosts: 'View all posts',
      socialsIntro: '站外入口和更轻量的联系渠道。',
      socialsList: 'GitHub / QQ / Bilibili / Reserved',
      nextEyebrow: 'Next draft',
      nextHeading: '下一篇还可以粗糙，但要清楚。',
      queueTitle: 'Queue',
      queueItems: ['Tag index and RSS', 'Volume index page', 'Image metadata captions'],
      endLabel: 'END',
      endQuote,
      volumes: {
        paperNotes: '论文阅读、方法摘要和实验笔记。',
        anime: '动画、角色和观看记录。',
        linguists: '语言学片段、阅读摘录和问题清单。',
      },
      socials: {
        github: '代码、实验项目和公开仓库会优先放在这里。',
        qq: '更即时的联络入口，QQ 号可以直接从这里看到。',
        bilibili: '视频、动态和收藏清单可以放在这个入口。',
        reserved: '预留给之后新增的社交媒体或邮箱入口。',
      },
    },
    postsIndex: {
      metaDescription: "All posts from Mugaaaaa's Blog arranged as a chronological timeline.",
      title: "Posts | Mugaaaaa's Blog",
      eyebrow: 'All posts',
      heading: 'Timeline',
      intro:
        '所有文章按发布时间倒序排列。每个月是一个节点，右侧索引用来快速跳转。',
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
      noOutline: '这篇文章还没有二级目录。',
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
      fallbackDescription: 'A note that is still being expanded.',
      minutesRead: (minutes: number) => `${minutes} min read`,
    },
    home: {
      metaDescription:
        "Mugaaaaa's Blog, a personal notebook for code, linguistics, research notes, and daily writing.",
      eyebrow: 'Personal notebook / Since 2026',
      heroSubtitle:
        'Notes on code, language, reading, and daily observations. Loose questions become clearer here while ideas are still forming.',
      latestTitle: 'Latest Posts',
      volumeIntro:
        'Long-running collections for paper notes, animation, linguistics, and whatever grows large enough to deserve an index.',
      latestIntro:
        'Recent notes, excerpts, and experiments, arranged by time and allowed to keep a few unfinished questions.',
      viewAllPosts: 'View all posts',
      socialsIntro: 'External profiles and lighter ways to get in touch.',
      socialsList: 'GitHub / QQ / Bilibili / Reserved',
      nextEyebrow: 'Next draft',
      nextHeading: 'A draft can stay rough, but it should stay readable.',
      queueTitle: 'Queue',
      queueItems: ['Tag index and RSS', 'Volume index page', 'Image metadata captions'],
      endLabel: 'END',
      endQuote,
      volumes: {
        paperNotes: 'Paper reading, method summaries, and experiment notes.',
        anime: 'Animation, characters, and viewing records.',
        linguists: 'Linguistics fragments, reading excerpts, and open questions.',
      },
      socials: {
        github: 'Code, experiments, and public repositories live here first.',
        qq: 'A direct chat entry. The QQ number is shown here for quick access.',
        bilibili: 'Video posts, activity, and public collections can live here.',
        reserved: 'A spare slot for another profile or email entry later.',
      },
    },
    postsIndex: {
      metaDescription: "All posts from Mugaaaaa's Blog arranged as a chronological timeline.",
      title: "Posts | Mugaaaaa's Blog",
      eyebrow: 'All posts',
      heading: 'Timeline',
      intro:
        'All posts are arranged in reverse chronological order. Each month becomes a node, and the glass index jumps between them.',
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
      noOutline: 'This article does not have a level-two outline yet.',
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
      fallbackDescription: 'まだ加筆中のノート。',
      minutesRead: (minutes: number) => `${minutes} min read`,
    },
    home: {
      metaDescription:
        "Mugaaaaa's Blog, a personal notebook for code, linguistics, research notes, and daily writing.",
      eyebrow: 'Personal notebook / Since 2026',
      heroSubtitle:
        'コード、言語、読書、日々の観察を記録する場所。散らばった問いを少しずつ読みやすく整える。',
      latestTitle: 'Latest Posts',
      volumeIntro:
        '長く続けるテーマの入口。論文、アニメ、言語学のノートをここにまとめる。',
      latestIntro:
        '最近のノート、抜粋、実験記録。時間順に並べつつ、未完成の問いもそのまま残す。',
      viewAllPosts: 'View all posts',
      socialsIntro: '外部プロフィールと軽い連絡先。',
      socialsList: 'GitHub / QQ / Bilibili / Reserved',
      nextEyebrow: 'Next draft',
      nextHeading: '粗い下書きでも、読める形にはしておく。',
      queueTitle: 'Queue',
      queueItems: ['Tag index and RSS', 'Volume index page', 'Image metadata captions'],
      endLabel: 'END',
      endQuote,
      volumes: {
        paperNotes: '論文読解、手法メモ、実験ノート。',
        anime: 'アニメ、キャラクター、視聴記録。',
        linguists: '言語学の断片、読書抜粋、問いの一覧。',
      },
      socials: {
        github: 'コード、実験、公開リポジトリはここに置く。',
        qq: 'より直接的な連絡先。QQ 番号もここで確認できる。',
        bilibili: '動画、動態、公開コレクションへの入口。',
        reserved: '今後追加するプロフィールやメール用の空き枠。',
      },
    },
    postsIndex: {
      metaDescription: "All posts from Mugaaaaa's Blog arranged as a chronological timeline.",
      title: "Posts | Mugaaaaa's Blog",
      eyebrow: 'All posts',
      heading: 'Timeline',
      intro:
        'すべての記事を公開日の新しい順に並べる。月ごとの節点と右側の索引で移動できる。',
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
      noOutline: 'この文章にはまだ二級見出しがありません。',
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
