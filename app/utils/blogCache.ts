import type { Article } from "./getBlogArticles";

interface BlogCache {
  articles: Article[];
  timestamp: number;
  currentPage: number;
  error: string | null;
}

// キャッシュの有効期限（ミリ秒）
const CACHE_TTL = 5 * 60 * 1000; // 5分

// キャッシュキー
const BLOG_CACHE_KEY = 'lamaglama39_blog_cache_data';

/**
 * キャッシュからブログ記事データを取得
 */
export const getCachedBlogData = (): BlogCache | null => {
  try {
    // クライアントサイドのみで実行
    if (typeof window === 'undefined') return null;
    
    const cachedData = localStorage.getItem(BLOG_CACHE_KEY);
    if (!cachedData) return null;
    
    const parsedData = JSON.parse(cachedData) as BlogCache;
    
    // キャッシュが有効期限切れかどうかチェック
    const now = Date.now();
    if (now - parsedData.timestamp > CACHE_TTL) {
      // 期限切れの場合はキャッシュを削除して null を返す
      localStorage.removeItem(BLOG_CACHE_KEY);
      return null;
    }
    
    return parsedData;
  } catch (error) {
    console.error('キャッシュの読み込みに失敗:', error);
    return null;
  }
};

/**
 * ブログ記事データをキャッシュに保存
 */
export const setBlogCache = (data: Omit<BlogCache, 'timestamp'>): void => {
  try {
    // クライアントサイドのみで実行
    if (typeof window === 'undefined') return;
    
    const cacheData: BlogCache = {
      ...data,
      timestamp: Date.now()
    };
    
    localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('キャッシュの保存に失敗:', error);
  }
};

/**
 * ブログキャッシュを更新
 */
export const updateBlogCache = (updates: Partial<Omit<BlogCache, 'timestamp'>>): void => {
  try {
    // クライアントサイドのみで実行
    if (typeof window === 'undefined') return;
    
    const cachedData = getCachedBlogData();
    if (!cachedData) return;
    
    const updatedData: BlogCache = {
      ...cachedData,
      ...updates,
      timestamp: Date.now() // タイムスタンプを更新
    };
    
    localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('キャッシュの更新に失敗:', error);
  }
};

/**
 * ブログキャッシュを削除
 */
export const clearBlogCache = (): void => {
  try {
    // クライアントサイドのみで実行
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(BLOG_CACHE_KEY);
  } catch (error) {
    console.error('キャッシュの削除に失敗:', error);
  }
}; 