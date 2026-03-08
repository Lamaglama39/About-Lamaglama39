/**
 * Server-side blog article fetcher with KV caching.
 * Fetches articles from Qiita, Zenn, and DevelopersIO,
 * then stores them in Cloudflare KV for fast retrieval.
 */

import { DOMParser } from "@xmldom/xmldom";

const KV_KEY = "blog_articles";

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
 * Retry utility with exponential backoff.
 */
const retry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, i))
        );
        console.log(`Retry ${i + 1}/${maxRetries}...`);
      }
    }
  }

  throw lastError;
};

/**
 * Fetch articles from Qiita API.
 */
const fetchQiitaArticles = async (): Promise<Article[]> => {
  const response = await fetch(
    "https://qiita.com/api/v2/users/lamaglama39/items"
  );

  if (!response.ok) {
    throw new Error(`Qiita API returned status: ${response.status}`);
  }

  const data = (await response.json()) as QiitaArticle[];

  if (!data || data.length === 0) {
    throw new Error("No articles found from Qiita");
  }

  return data.map((item, index) => ({
    id: index + 1000,
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
 * Fetch articles from Zenn API.
 */
const fetchZennArticles = async (): Promise<Article[]> => {
  const response = await fetch(
    "https://zenn.dev/api/articles?username=lamaglama39&order=latest"
  );

  if (!response.ok) {
    throw new Error(`Zenn API returned status: ${response.status}`);
  }

  const data = (await response.json()) as ZennApiResponse;

  if (!data.articles || data.articles.length === 0) {
    throw new Error("No articles found from Zenn");
  }

  return data.articles.map((item, index) => ({
    id: index + 1,
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
  }));
};

/**
 * Fetch articles from DevelopersIO RSS feed.
 * No CORS proxy needed on server-side.
 */
const fetchDevelopersIOArticles = async (): Promise<Article[]> => {
  const response = await fetch(
    "https://dev.classmethod.jp/author/akaike/feed/",
    {
      headers: {
        Accept: "application/xml, text/xml, */*",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`RSS feed returned status: ${response.status}`);
  }

  const xmlText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");

  const items = xmlDoc.getElementsByTagName("item");

  if (!items || items.length === 0) {
    throw new Error("No articles found in RSS feed");
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
    const date = pubDate
      ? new Date(pubDate).toISOString().split("T")[0]
      : "";

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
      id: 2000 + i,
      title: title || "",
      date,
      excerpt: excerpt || "",
      tags,
      url,
      source: "DevelopersIO",
    });
  }

  if (articles.length === 0) {
    throw new Error("No articles found after parsing RSS feed");
  }

  return articles;
};

/**
 * Fetch all articles from all sources, merge and sort by date.
 */
export const fetchAllArticles = async (): Promise<Article[]> => {
  const results = await Promise.allSettled([
    retry(() => fetchQiitaArticles()),
    retry(() => fetchZennArticles()),
    retry(() => fetchDevelopersIOArticles()),
  ]);

  const articles: Article[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      articles.push(...result.value);
    } else {
      console.error("Failed to fetch articles:", result.reason);
    }
  }

  // 日付降順でソート
  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return articles;
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
  kv: KVNamespace
): Promise<Article[]> => {
  const cached = await kv.get(KV_KEY);

  if (cached) {
    return JSON.parse(cached) as Article[];
  }

  // KVが空の場合は直接取得してKVに保存
  console.log("KV cache is empty, fetching directly...");
  const articles = await fetchAllArticles();

  if (articles.length > 0) {
    await kv.put(KV_KEY, JSON.stringify(articles));
  }

  return articles;
};
