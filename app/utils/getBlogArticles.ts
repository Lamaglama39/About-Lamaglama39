import { DOMParser } from '@xmldom/xmldom';

/**
 * 技術ブログ記事を取得するユーティリティ関数
 */

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
    }
  }>;
  next_page: number | null;
  total_count: number | null;
}

// リトライ処理のためのユーティリティ関数
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
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        console.log(`リトライ ${i + 1}/${maxRetries}...`);
      }
    }
  }
  
  throw lastError;
};

/**
 * Qiita APIから記事を取得
 */
export const getQiitaArticles = async (): Promise<Article[]> => {
  try {
    const fetchArticles = async () => {
      const response = await fetch("https://qiita.com/api/v2/users/lamaglama39/items", {
        headers: {
          ...(import.meta.env.VITE_QIITA_ACCESS_TOKEN && {
            Authorization: `Bearer ${import.meta.env.VITE_QIITA_ACCESS_TOKEN}`
          })
        }
      });
      
      if (!response.ok) {
        throw new Error(`Qiita API returned status: ${response.status}`);
      }
      
      const data = await response.json() as QiitaArticle[];
      
      if (!data || data.length === 0) {
        throw new Error("No articles found");
      }
      
      return data.map((item, index) => ({
        id: index + 1000,
        title: item.title,
        date: item.created_at.split("T")[0],
        excerpt: item.body.substring(0, 150).replace(/\r?\n/g, " ") + "...",
        tags: item.tags.map(tag => tag.name),
        url: item.url,
        source: "Qiita",
        likes_count: item.likes_count,
        page_views_count: item.page_views_count || 0,
        comments_count: item.comments_count
      }));
    };

    return await retry(fetchArticles);
  } catch (error) {
    console.error("Error fetching from Qiita, using fallback data:", error);
    return getQiitaFallbackData();
  }
};

/**
 * Qiita記事のフォールバックデータ
 */
const getQiitaFallbackData = (): Article[] => {
  return [
    {
      id: 1001,
      title: "Qiita デモ記事",
      date: "1970-01-01",
      excerpt: "Qiita デモ記事",
      tags: ["Qiita", "デモ記事"],
      url: "https://qiita.com/lamaglama39/items/sample1",
      source: "Qiita",
      likes_count: 45,
      page_views_count: 1200,
      comments_count: 8
    },
  ];
};

/**
 * Zenn APIから記事を取得
 */
export const getZennArticles = async (): Promise<Article[]> => {
  try {
    const fetchArticles = async () => {
      const response = await fetch("https://zenn.dev/api/articles?username=lamaglama39&order=latest");
      
      if (!response.ok) {
        throw new Error(`Zenn API returned status: ${response.status}`);
      }
      
      const data = await response.json() as ZennApiResponse;
      
      if (!data.articles || data.articles.length === 0) {
        throw new Error("No articles found");
      }
      
      return data.articles.map((item, index) => ({
        id: index + 1,
        title: item.title,
        date: item.published_at ? item.published_at.split("T")[0] : new Date().toISOString().split("T")[0],
        excerpt: `${item.emoji} この記事は約${item.body_letters_count}文字です。`,
        tags: [],
        url: `https://zenn.dev/${item.user.username}/articles/${item.slug}`,
        source: "Zenn",
        likes_count: item.likes_count || 0,
        page_views_count: item.views_count || 0,
        comments_count: item.comments_count || 0
      }));
    };

    return await retry(fetchArticles);
  } catch (error) {
    console.error("Error fetching from Zenn, using fallback data:", error);
    return getZennFallbackData();
  }
};

/**
 * Zenn記事のフォールバックデータ
 */
const getZennFallbackData = (): Article[] => {
  return [
    {
      id: 1,
      title: "Zenn デモ記事",
      date: "1970-01-01",
      excerpt: "Zenn デモ記事",
      tags: [],
      url: "https://zenn.dev/lamaglama39/articles/nextjs-typescript-blog",
      source: "Zenn",
      likes_count: 124,
      page_views_count: 3500,
      comments_count: 18
    },
  ];
};

/**
 * クラスメソッドのRSSフィードから記事を取得
 */
export const getClassMethodArticles = async (): Promise<Article[]> => {
  try {
    const fetchArticles = async () => {
      console.log("Fetching DevelopersIO articles from RSS feed");
      
      const corsProxyUrl = "https://api.allorigins.win/raw?url=";
      const targetUrl = "https://dev.classmethod.jp/author/akaike/feed/";
      const proxyUrl = `${corsProxyUrl}${encodeURIComponent(targetUrl)}`;
      
      const response = await fetch(proxyUrl, {
        headers: {
          "Accept": "application/xml, text/xml, */*"
        }
      });
      
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
        const title = titleNode ? titleNode.textContent?.replace(/\!\[CDATA\[|\]\]/g, "").trim() : "";
        
        const linkNode = item.getElementsByTagName("link")[0];
        const url = linkNode ? linkNode.textContent || "" : "";
        
        const dateNode = item.getElementsByTagName("pubDate")[0];
        const pubDate = dateNode ? dateNode.textContent || "" : "";
        const date = pubDate ? new Date(pubDate).toISOString().split("T")[0] : "";
        
        const descNode = item.getElementsByTagName("description")[0];
        const excerpt = descNode ? descNode.textContent?.replace(/\!\[CDATA\[|\]\]/g, "").trim() || "" : "";
        
        const categoryNodes = item.getElementsByTagName("category");
        const tags: string[] = [];
        for (let j = 0; j < categoryNodes.length; j++) {
          const categoryNode = categoryNodes[j];
          const category = categoryNode.textContent?.replace(/\!\[CDATA\[|\]\]/g, "").trim();
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
          source: "DevelopersIO"
        });
      }
      
      if (articles.length === 0) {
        throw new Error("No articles found after parsing RSS feed");
      }
      
      console.log(`Got ${articles.length} articles from DevelopersIO`);
      return articles;
    };

    return await retry(fetchArticles);
  } catch (error) {
    console.error("Error with ClassMethod articles, using fallback data:", error);
    return getClassMethodFallbackData();
  }
};

/**
 * クラスメソッド記事のフォールバックデータ
 */
const getClassMethodFallbackData = (): Article[] => {
  return [
    {
      id: 2001,
      title: "DevelopersIO デモ記事",
      date: "2025-04-25",
      excerpt: "DevelopersIO デモ記事",
      tags: ["DevelopersIO", "デモ記事"],
      url: "https://dev.classmethod.jp/articles/kubernetes-mcp-server/",
      source: "DevelopersIO"
    },
  ];
};

/**
 * すべてのソースから記事を取得して統合
 */
export const getAllArticles = async (): Promise<Article[]> => {
  try {
    // 並行して各ソースから記事を取得
    const [qiitaArticles, zennArticles, classMethodArticles] = await Promise.all([
      getQiitaArticles(),
      getZennArticles(),
      getClassMethodArticles()
    ]);
    
    console.log(`Got articles - Qiita: ${qiitaArticles.length}, Zenn: ${zennArticles.length}, DevelopersIO: ${classMethodArticles.length}`);
    
    // すべての記事を統合して日付順にソート
    const allArticles = [...qiitaArticles, ...zennArticles, ...classMethodArticles].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return allArticles;
  } catch (error) {
    console.error("Error fetching all articles:", error);
    return []; // エラー時は空配列を返す
  }
}; 