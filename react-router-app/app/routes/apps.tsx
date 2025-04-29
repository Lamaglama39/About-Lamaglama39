import type { Route } from "./+types/apps";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Apps | Lamaglama39" },
    { name: "description", content: "開発したアプリケーション一覧" },
  ];
}

export default function Apps() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  // アプリケーションのサンプルデータ
  const apps = [
    {
      id: 1,
      title: "ポートフォリオサイト",
      description: "React Router v7とTailwind CSSを使用した個人ポートフォリオサイト",
      technologies: ["React", "TypeScript", "Cloudflare", "Tailwind CSS"],
      imageUrl: "/app-portfolio.png",
      link: "https://github.com/Lamaglama39/portfolio-site"
    },
    {
      id: 2,
      title: "GitHub Actionsサンプル",
      description: "さまざまなGitHub Actionsのワークフロー集",
      technologies: ["GitHub Actions", "CI/CD", "Docker"],
      imageUrl: "/app-github.png",
      link: "https://github.com/Lamaglama39/github-actions-for-ci"
    },
    {
      id: 3,
      title: "Terraform AWS Modules",
      description: "AWS環境を構築するためのTerraformモジュール集",
      technologies: ["Terraform", "AWS", "IaC"],
      imageUrl: "/app-terraform.png",
      link: "https://github.com/Lamaglama39/terraform-aws-modules"
    }
  ];

  return (
    <main className={`min-h-screen p-6 md:p-8 lg:p-12 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">アプリケーション</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map(app => (
            <div key={app.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {app.imageUrl ? (
                  <img src={app.imageUrl} alt={app.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-4xl text-gray-400 dark:text-gray-500">🚀</div>
                )}
              </div>
              
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{app.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{app.description}</p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {app.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={app.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 rounded transition-colors"
                >
                  詳細を見る
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 
