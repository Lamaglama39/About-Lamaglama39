import type { Route } from "./+types/blog";
import { useEffect, useState } from "react";
import { getAllArticles, type Article } from "../utils/getBlogArticles";

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
  
  // コンポーネントマウント時に記事データを取得
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // 複数ソースから記事を取得して統合
        const allArticles = await getAllArticles();
        
        setArticles(allArticles);
        setError(null);
        setLoaded(true);
        setLoading(false);
      } catch (err) {
        console.error('記事の取得に失敗しました:', err);
        setError('記事の取得中にエラーが発生しました。');
        setArticles([]);
        setLoaded(true);
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

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
          <div className="space-y-8">
            {articles.map(article => (
              <article key={article.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{article.title}</h2>
                  <div className="flex items-center space-x-2">
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
                    <time className="text-sm text-gray-500 dark:text-gray-400">{article.date}</time>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                
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
        )}
      </div>
    </main>
  );
} 
