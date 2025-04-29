import type { Route } from "./+types/blog";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ブログ | Lamaglama39" },
    { name: "description", content: "技術ブログ記事一覧" },
  ];
}

export default function Blog() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  // ブログ記事のサンプルデータ
  const articles = [
    {
      id: 1,
      title: "React Router v7の新機能について",
      date: "2023-06-15",
      excerpt: "React Router v7で導入された新機能と変更点を解説します。",
      tags: ["React", "フロントエンド", "ルーティング"],
      url: "/blog/react-router-v7"
    },
    {
      id: 2,
      title: "CloudflareとRemixでサーバーレスWebアプリを構築する",
      date: "2023-05-20",
      excerpt: "CloudflareワーカーとRemixを使用して高速なWeb体験を実現する方法について解説します。",
      tags: ["Cloudflare", "Remix", "サーバーレス"],
      url: "/blog/cloudflare-remix"
    },
    {
      id: 3,
      title: "GitHub ActionsでCI/CDパイプラインを自動化する",
      date: "2023-04-10", 
      excerpt: "GitHub Actionsを使用してCI/CDパイプラインを構築し、デプロイを自動化する方法を紹介します。",
      tags: ["GitHub", "CI/CD", "DevOps"],
      url: "/blog/github-actions-cicd"
    },
    {
      id: 4,
      title: "Terraformを使用したインフラのコード化",
      date: "2023-03-05",
      excerpt: "Terraformを使用してAWSインフラをコード化し、再現性のある環境を構築する方法を解説します。",
      tags: ["Terraform", "AWS", "IaC"],
      url: "/blog/terraform-aws"
    }
  ];

  return (
    <main className={`min-h-screen p-6 md:p-8 lg:p-12 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">技術ブログ</h1>
        
        <div className="space-y-8">
          {articles.map(article => (
            <article key={article.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{article.title}</h2>
                <time className="text-sm text-gray-500 dark:text-gray-400">{article.date}</time>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <a 
                href={article.url} 
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 rounded transition-colors"
              >
                続きを読む
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 
