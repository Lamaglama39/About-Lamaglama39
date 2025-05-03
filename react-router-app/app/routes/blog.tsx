import type { Route } from "./+types/blog";
import { useEffect, useState } from "react";
import { getAllArticles, type Article } from "../utils/getBlogArticles";
import { getCachedBlogData, setBlogCache, updateBlogCache } from "../utils/blogCache";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ブログ | Lamaglama39" },
    { name: "description", content: "技術ブログ記事一覧" },
  ];
}

export default function Blog() {
  const [loaded, setLoaded] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // ページング用のステート
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 1ページあたり10件の記事を表示
  
  // コンポーネントマウント時に記事データを取得（キャッシュがあればそれを使用）
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // まずキャッシュをチェック
        const cachedData = getCachedBlogData();
        
        if (cachedData) {
          // キャッシュがあれば使用
          console.log('キャッシュからブログデータを読み込みました');
          setArticles(cachedData.articles);
          setCurrentPage(cachedData.currentPage);
          setError(cachedData.error);
          setLoaded(true);
          setLoading(false);
          return;
        }
        
        // キャッシュがなければ新たにデータを取得
        setLoading(true);
        
        // 複数ソースから記事を取得して統合
        const allArticles = await getAllArticles();
        
        setArticles(allArticles);
        setError(null);
        
        // キャッシュにデータを保存
        setBlogCache({
          articles: allArticles,
          currentPage: 1,
          error: null
        });
        
        setLoaded(true);
        setLoading(false);
      } catch (err) {
        console.error('記事の取得に失敗しました:', err);
        const errorMessage = '記事の取得中にエラーが発生しました。';
        setError(errorMessage);
        setArticles([]);
        
        // エラー情報もキャッシュ
        setBlogCache({
          articles: [],
          currentPage: 1,
          error: errorMessage
        });
        
        setLoaded(true);
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  // URLのハッシュが変更されたときにページを切り替える
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#page-')) {
        const page = parseInt(hash.substring(6), 10);
        if (!isNaN(page) && page > 0 && page <= Math.ceil(articles.length / itemsPerPage)) {
          setCurrentPage(page);
          
          // ページ情報をキャッシュに保存
          updateBlogCache({ currentPage: page });
        }
      }
    };
    
    // 初期ロード時とハッシュ変更時に実行
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [articles.length]);

  // 現在のページに表示する記事を取得
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return articles.slice(startIndex, endIndex);
  };
  
  // 表示する記事
  const currentArticles = getCurrentPageItems();
  
  // 全ページ数
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  
  // ページ移動ハンドラー
  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      window.location.hash = `page-${page}`;
      setCurrentPage(page);
      // ページトップにスクロール
      window.scrollTo(0, 0);
    }
  };
  
  // ページネーションコンポーネント
  const Pagination = () => {
    if (totalPages <= 1) return null;
    
    // 表示するページ番号の範囲を決定（現在のページの前後2ページまで）
    const pageNumbers = [];
    const range = 2; // 前後に表示するページ数
    
    let startPage = Math.max(1, currentPage - range);
    let endPage = Math.min(totalPages, currentPage + range);
    
    // 必ず5ページ分は表示するようにする（可能な場合）
    if (endPage - startPage + 1 < 5) {
      if (startPage === 1) {
        endPage = Math.min(5, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - 4);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="flex justify-center items-center space-x-2 my-8">
        {/* 先頭ページへ */}
        <button 
          onClick={() => goToPage(1)}
          className={`px-3 py-1 rounded transition-colors ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        
        {/* 前のページへ */}
        <button 
          onClick={() => goToPage(currentPage - 1)}
          className={`px-3 py-1 rounded transition-colors ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          disabled={currentPage === 1}
        >
          &lsaquo;
        </button>
        
        {/* ページ番号 */}
        {pageNumbers.map(number => (
          <button 
            key={number}
            onClick={() => goToPage(number)}
            className={`px-3 py-1 rounded ${
              currentPage === number
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            } transition-colors`}
          >
            {number}
          </button>
        ))}
        
        {/* 次のページへ */}
        <button 
          onClick={() => goToPage(currentPage + 1)}
          className={`px-3 py-1 rounded transition-colors ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          disabled={currentPage === totalPages}
        >
          &rsaquo;
        </button>
        
        {/* 最後のページへ */}
        <button 
          onClick={() => goToPage(totalPages)}
          className={`px-3 py-1 rounded transition-colors ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <main className={`min-h-screen p-6 md:p-8 lg:p-12 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">技術ブログ</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg mb-6">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        ) : (
          <>
            {articles.length > 0 ? (
              <>
                {/* 現在のページ情報 */}
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {totalPages > 1 && (
                    <p>全{articles.length}件中 {(currentPage - 1) * itemsPerPage + 1}〜{Math.min(currentPage * itemsPerPage, articles.length)}件を表示（{currentPage}/{totalPages}ページ）</p>
                  )}
                </div>
                
                {/* 上部ページネーション - より目立つスタイル */}
                {totalPages > 1 && (
                  <div className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <Pagination />
                  </div>
                )}
                
                {/* 記事リスト */}
                <div className="space-y-8">
                  {currentArticles.map(article => (
                    <article key={article.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{article.title}</h2>
                      </div>
                      
                      {/* 投稿元サイトと投稿日を横に並べる */}
                      <div className="mb-3 flex items-center space-x-3">
                        {article.source && (
                          <span className={`px-2 py-1 text-xs font-bold rounded ${
                            article.source === 'Zenn' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                            : article.source === 'DevelopersIO'
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          }`}>
                            {article.source}
                          </span>
                        )}
                        <time className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {article.date}
                        </time>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <a 
                          href={article.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 rounded transition-colors"
                        >
                          続きを読む
                        </a>
                        
                        {/* 記事の統計情報を表示 */}
                        <div className="flex items-center space-x-4">
                          {article.likes_count !== undefined && (
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                              {article.likes_count}
                            </div>
                          )}
                          
                          {article.comments_count !== undefined && (
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              {article.comments_count}
                            </div>
                          )}
                          
                          {article.page_views_count !== undefined && article.page_views_count > 0 && (
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {article.page_views_count}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                
                {/* 下部ページネーション */}
                {totalPages > 1 && (
                  <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Pagination />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
                <p className="text-yellow-700 dark:text-yellow-300">記事が見つかりませんでした。</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
} 
