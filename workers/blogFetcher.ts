/**
 * Server-side blog article fetcher with KV caching.
 * Fetches articles from Qiita, Zenn, and DevelopersIO,
 * then stores them in Cloudflare KV for fast retrieval.
 */

import { DOMParser } from "@xmldom/xmldom";

const KV_KEY = "blog_articles";

// Cloudflare Workersのサブリクエスト上限は50回/実行
// 3ソース合計で上限を超えないようにページ数を制限
const MAX_PAGES_QIITA = 5;
const MAX_PAGES_ZENN = 5;
// DevelopersIOはRSSのページネーションが効かないため1ページのみ
const MAX_PAGES_DEVIO = 1;

export interface Article {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  url: string;
  source: string;
  likes_count?: number;
  page_views_count?: number;
  comments_count?: number;
}

interface QiitaArticle {
  id: string;
  title: string;
  created_at: string;
  body: string;
  tags: Array<{ name: string }>;
  url: string;
  likes_count: number;
  page_views_count?: number;
  comments_count: number;
}

interface ZennApiResponse {
  articles: Array<{
    id: number;
    title: string;
    slug: string;
    published_at: string;
    emoji: string;
    body_letters_count: number;
    likes_count: number;
    views_count: number;
    comments_count: number;
    article_type: string;
    publication_name?: string;
    user: {
      id: number;
      username: string;
      name: string;
    };
  }>;
  next_page: number | null;
  total_count: number | null;
}

/**
 * Fetch all articles from Qiita API with pagination.
 * Uses per_page=100 and follows pages until no more results.
 */
const fetchQiitaArticles = async (): Promise<Article[]> => {
  const allData: QiitaArticle[] = [];
  let page = 1;
  const perPage = 100;

  while (page <= MAX_PAGES_QIITA) {
    const response = await fetch(
      `https://qiita.com/api/v2/users/lamaglama39/items?page=${page}&per_page=${perPage}`,
    );

    if (!response.ok) {
      throw new Error(`Qiita API returned status: ${response.status}`);
    }

    const data = (await response.json()) as QiitaArticle[];

    if (!data || data.length === 0) {
      break;
    }

    allData.push(...data);

    // 取得件数がper_page未満なら最後のページ
    if (data.length < perPage) {
      break;
    }

    page++;
  }

  if (allData.length === 0) {
    throw new Error("No articles found from Qiita");
  }

  console.log(`Qiita: fetched ${allData.length} articles (${page} pages)`);

  return allData.map((item) => ({
    id: 0,
    title: item.title,
    date: item.created_at.split("T")[0],
    excerpt: item.body.substring(0, 150).replace(/\r?\n/g, " ") + "...",
    tags: item.tags.map((tag) => tag.name),
    url: item.url,
    source: "Qiita",
    likes_count: item.likes_count,
    page_views_count: item.page_views_count || 0,
    comments_count: item.comments_count,
  }));
};

/**
 * Fetch all articles from Zenn API with pagination.
 * Follows next_page until null.
 */
const fetchZennArticles = async (): Promise<Article[]> => {
  const allArticles: Article[] = [];
  let page: number | null = 1;

  let pageCount = 0;
  while (page !== null && pageCount < MAX_PAGES_ZENN) {
    pageCount++;
    const response = await fetch(
      `https://zenn.dev/api/articles?username=lamaglama39&order=latest&page=${page}`,
      {
        headers: {
          "User-Agent": "about-lamaglama39/1.0",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Zenn API returned status: ${response.status}`);
    }

    const data = (await response.json()) as ZennApiResponse;

    if (!data.articles || data.articles.length === 0) {
      break;
    }

    for (const item of data.articles) {
      allArticles.push({
        id: 0,
        title: item.title,
        date: item.published_at
          ? item.published_at.split("T")[0]
          : new Date().toISOString().split("T")[0],
        excerpt: `${item.emoji} この記事は約${item.body_letters_count}文字です。`,
        tags: [],
        url: `https://zenn.dev/${item.user.username}/articles/${item.slug}`,
        source: "Zenn",
        likes_count: item.likes_count || 0,
        page_views_count: item.views_count || 0,
        comments_count: item.comments_count || 0,
      });
    }

    page = data.next_page;
  }

  if (allArticles.length === 0) {
    throw new Error("No articles found from Zenn");
  }

  console.log(`Zenn: fetched ${allArticles.length} articles`);

  return allArticles;
};

/**
 * Parse RSS XML and extract articles.
 */
const parseRssItems = (
  xmlText: string,
  source: string = "DevelopersIO",
): Article[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  const items = xmlDoc.getElementsByTagName("item");

  if (!items || items.length === 0) {
    return [];
  }

  const articles: Article[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const titleNode = item.getElementsByTagName("title")[0];
    const title = titleNode
      ? titleNode.textContent?.replace(/\!\[CDATA\[|\]\]/g, "").trim()
      : "";

    const linkNode = item.getElementsByTagName("link")[0];
    const url = linkNode ? linkNode.textContent || "" : "";

    const dateNode = item.getElementsByTagName("pubDate")[0];
    const pubDate = dateNode ? dateNode.textContent || "" : "";
    const date = pubDate ? new Date(pubDate).toISOString().split("T")[0] : "";

    const descNode = item.getElementsByTagName("description")[0];
    const excerpt = descNode
      ? descNode.textContent?.replace(/\!\[CDATA\[|\]\]/g, "").trim() || ""
      : "";

    const categoryNodes = item.getElementsByTagName("category");
    const tags: string[] = [];
    for (let j = 0; j < categoryNodes.length; j++) {
      const categoryNode = categoryNodes[j];
      const category = categoryNode.textContent
        ?.replace(/\!\[CDATA\[|\]\]/g, "")
        .trim();
      if (category) {
        tags.push(category);
      }
    }

    articles.push({
      id: 0,
      title: title || "",
      date,
      excerpt: excerpt || "",
      tags,
      url,
      source,
    });
  }

  return articles;
};

/**
 * Fetch all articles from DevelopersIO RSS feed with pagination.
 * WordPress RSS supports ?paged=N parameter.
 * No CORS proxy needed on server-side.
 */
const fetchDevelopersIOArticles = async (): Promise<Article[]> => {
  const allArticles: Article[] = [];
  let page = 1;

  while (page <= MAX_PAGES_DEVIO) {
    const url =
      page === 1
        ? "https://dev.classmethod.jp/author/akaike/feed/"
        : `https://dev.classmethod.jp/author/akaike/feed/?paged=${page}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/xml, text/xml, */*",
      },
    });

    // WordPressは最終ページを超えると404を返す
    if (response.status === 404) {
      break;
    }

    if (!response.ok) {
      throw new Error(`RSS feed returned status: ${response.status}`);
    }

    const xmlText = await response.text();
    const articles = parseRssItems(xmlText, "DevelopersIO");

    if (articles.length === 0) {
      break;
    }

    allArticles.push(...articles);
    page++;
  }

  if (allArticles.length === 0) {
    throw new Error("No articles found from DevelopersIO RSS feed");
  }

  console.log(
    `DevelopersIO: fetched ${allArticles.length} articles (${page - 1} pages)`,
  );

  return allArticles;
};

/**
 * Fetch all articles from tortoise-tech-blog RSS feed.
 */
const fetchTortoiseTechBlogArticles = async (): Promise<Article[]> => {
  const response = await fetch(
    "https://tortoise-tech-blog.lamaglama39.dev/index.xml",
    {
      headers: {
        Accept: "application/xml, text/xml, */*",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `tortoise-tech-blog RSS feed returned status: ${response.status}`,
    );
  }

  const xmlText = await response.text();
  const articles = parseRssItems(xmlText, "リクガメてっく。");

  if (articles.length === 0) {
    throw new Error("No articles found from tortoise-tech-blog");
  }

  console.log(`tortoise-tech-blog: fetched ${articles.length} articles`);

  return articles;
};

/**
 * Fetch all articles from all sources, merge and sort by date.
 */
export const fetchAllArticles = async (): Promise<Article[]> => {
  const results = await Promise.allSettled([
    fetchQiitaArticles(),
    fetchZennArticles(),
    fetchDevelopersIOArticles(),
    fetchTortoiseTechBlogArticles(),
  ]);

  const articles: Article[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      articles.push(...result.value);
    } else {
      console.error("Failed to fetch articles:", result.reason);
    }
  }

  // URLベースで重複を除去
  const seen = new Set<string>();
  const unique = articles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });

  // 日付降順でソート
  unique.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // マージ・ソート後に連番IDを振る
  unique.forEach((article, index) => {
    article.id = index + 1;
  });

  return unique;
};

/**
 * Fetch articles and store them in KV.
 */
export const updateBlogCache = async (kv: KVNamespace): Promise<void> => {
  console.log("Updating blog cache...");
  const articles = await fetchAllArticles();

  if (articles.length > 0) {
    await kv.put(KV_KEY, JSON.stringify(articles));
    console.log(`Blog cache updated: ${articles.length} articles stored`);
  } else {
    console.warn("No articles fetched, skipping KV update");
  }
};

/**
 * Get cached articles from KV.
 * Falls back to direct fetch if KV is empty.
 */
export const getCachedArticles = async (
  kv: KVNamespace,
): Promise<Article[]> => {
  const cached = await kv.get(KV_KEY);

  if (cached) {
    return JSON.parse(cached) as Article[];
  }

  // KVが空の場合はログを出して空配列を返す
  // 次回のCron Triggerで自動的にKVにデータが保存される
  console.warn("KV cache is empty. Waiting for next scheduled update.");
  return [];
};
