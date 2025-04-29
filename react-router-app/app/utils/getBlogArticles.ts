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

/**
 * Qiita APIから記事を取得
 */
export const getQiitaArticles = async (): Promise<Article[]> => {
  try {
    // Qiita API v2を利用
    const response = await fetch("https://qiita.com/api/v2/users/lamaglama39/items", {
      headers: {
        // トークンがあれば利用（ないと取得制限がある）
        ...(import.meta.env.VITE_QIITA_ACCESS_TOKEN && {
          Authorization: `Bearer ${import.meta.env.VITE_QIITA_ACCESS_TOKEN}`
        })
      }
    });
    
    if (!response.ok) {
      throw new Error(`Qiita API returned status: ${response.status}`);
    }
    
    const data = await response.json() as QiitaArticle[];
    
    // 記事データを標準形式に変換
    return data.map((item, index) => ({
      id: index + 1000, // 他のソースとIDが被らないよう大きな数値から始める
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
  } catch (error) {
    console.error("Error fetching from Qiita, using fallback data:", error);
    // Qiitaのフォールバックデータを返す
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
    // Zenn API を使用して記事を取得
    const response = await fetch("https://zenn.dev/api/articles?username=lamaglama39&order=latest");
    
    if (!response.ok) {
      throw new Error(`Zenn API returned status: ${response.status}`);
    }
    
    const data = await response.json() as ZennApiResponse;
    
    // 記事が見つからなかった場合は空配列を返す
    if (!data.articles || data.articles.length === 0) {
      console.log("No articles found on Zenn");
      return [];
    }
    
    // 記事データを標準形式に変換
    return data.articles.map((item, index) => ({
      id: index + 1, // IDは1から始める
      title: item.title,
      date: item.published_at ? item.published_at.split("T")[0] : new Date().toISOString().split("T")[0],
      excerpt: `${item.emoji} この記事は約${item.body_letters_count}文字です。`, // 本文は提供されていないのでプレースホルダー
      tags: [], // API結果にタグがないためデフォルトは空配列
      url: `https://zenn.dev/${item.user.username}/articles/${item.slug}`,
      source: "Zenn",
      likes_count: item.likes_count || 0,
      page_views_count: item.views_count || 0,
      comments_count: item.comments_count || 0
    }));
  } catch (error) {
    console.error("Error fetching from Zenn, using fallback data:", error);
    // Zennのフォールバックデータを返す
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
    console.log("Fetching DevelopersIO articles from RSS feed");
    
    // CORS問題を回避するために、別のプロキシサービスを使用
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
    const articles: Article[] = [];
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // タイトルの取得
      const titleNode = item.getElementsByTagName("title")[0];
      const title = titleNode ? titleNode.textContent?.replace(/\!\[CDATA\[|\]\]/g, "").trim() : "";
      
      // リンクの取得
      const linkNode = item.getElementsByTagName("link")[0];
      const url = linkNode ? linkNode.textContent || "" : "";
      
      // 公開日の取得
      const dateNode = item.getElementsByTagName("pubDate")[0];
      const pubDate = dateNode ? dateNode.textContent || "" : "";
      const date = pubDate ? new Date(pubDate).toISOString().split("T")[0] : "";
      
      // 説明の取得
      const descNode = item.getElementsByTagName("description")[0];
      const excerpt = descNode ? descNode.textContent?.replace(/\!\[CDATA\[|\]\]/g, "").trim() || "" : "";
      
      // タグの取得
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
        id: 2000 + i, // IDはユニークになるように2000から始める
        title: title || "",
        date,
        excerpt: excerpt || "",
        tags,
        url,
        source: "DevelopersIO"
      });
    }
    
    console.log(`Got ${articles.length} articles from DevelopersIO`);
    return articles;
  } catch (error) {
    console.error("Error with ClassMethod articles, using fallback data:", error);
    
    // 失敗した場合はフォールバックの静的データを返す
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