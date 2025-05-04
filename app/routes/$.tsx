import type { Route } from "./+types/$";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 - ページが見つかりません | Lamaglama39" },
    { name: "description", content: "お探しのページは見つかりませんでした。" },
  ];
}

export default function NotFound() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-6 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <h1 className="text-9xl font-bold text-cyan-500 dark:text-cyan-400">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">ページが見つかりません</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2 mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/" 
            className="px-6 py-3 font-semibold text-white bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 rounded-lg transition-colors"
          >
            ホームに戻る
          </Link>
          <Link 
            to="/blog" 
            className="px-6 py-3 font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 hover:bg-cyan-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            ブログを見る
          </Link>
        </div>
        
        {/* 404アニメーション */}
        <div className="mt-12 text-6xl text-gray-300 dark:text-gray-700 font-mono overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i} 
              className={`whitespace-nowrap mb-2`}
              style={{
                animation: `marquee ${10 + i * 2}s linear infinite`,
                animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
              }}
            >
              <span className="mr-4">404</span>
              <span className="mr-4">Not Found</span>
              <span className="mr-4">404</span>
              <span className="mr-4">Not Found</span>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}} />
    </main>
  );
} 