import type { Route } from "./+types/home";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lamaglama39 | ホーム" },
    { name: "description", content: "Lamaglama39のポートフォリオサイト" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className={`min-h-screen p-4 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* ヒーローセクション */}
      <section className="py-6 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Lamaglama39
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            インフラエンジニア / クラウドエンジニア / Web開発者
          </p>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            モダンなウェブ技術とクラウドインフラの実装を得意とするエンジニア
          </p>
        </div>
      </section>
      
      {/* プロフィールセクション */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/40 rounded-xl mb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">プロフィール</h2>
          
          <div className="space-y-8">
            {/* プロフィール情報 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">自己紹介</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Lamaglama39</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    インフラエンジニア → クラウドエンジニア → Web開発者としてキャリアを積んできました。
                    クラウドサービスを活用したスケーラブルなアーキテクチャ設計と実装を得意としています。
                    フロントエンドからバックエンド、インフラまで一貫した開発経験を持ち、モダンな技術スタックを用いた
                    プロジェクト推進に貢献しています。
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">主な業務</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    クラウドインフラ構築、CI/CD構築、IaC実装、バックエンド開発、フロントエンド開発、
                    チームマネジメント、技術選定
                  </p>
                </div>
              </div>
            </div>

            {/* スキルセット */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">スキルセット</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">フロントエンド</h4>
                  <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                    <li>React / React Router</li>
                    <li>TypeScript</li>
                    <li>Next.js / Remix</li>
                    <li>Tailwind CSS</li>
                    <li>Three.js</li>
                    <li>Testing Library / Jest</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">バックエンド</h4>
                  <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                    <li>Node.js / Express</li>
                    <li>Python / FastAPI</li>
                    <li>Go</li>
                    <li>Firebase / Supabase</li>
                    <li>GraphQL</li>
                    <li>REST API設計</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">インフラ</h4>
                  <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                    <li>AWS (EC2, Lambda, S3, CloudFront)</li>
                    <li>GCP (Cloud Run, Cloud Functions)</li>
                    <li>Terraform / CloudFormation</li>
                    <li>Docker / Kubernetes</li>
                    <li>Cloudflare</li>
                    <li>Serverless Architecture</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">その他</h4>
                  <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                    <li>CI/CD (GitHub Actions, CircleCI)</li>
                    <li>GitOps / DevOps</li>
                    <li>マイクロサービス設計</li>
                    <li>アジャイル開発</li>
                    <li>パフォーマンス最適化</li>
                    <li>セキュリティベストプラクティス</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 職歴 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">職歴</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">フルスタックエンジニア</h4>
                  <p className="text-gray-700 dark:text-gray-300">株式会社テックイノベーション（2021年〜現在）</p>
                  <ul className="list-disc ml-5 mt-2 text-gray-600 dark:text-gray-400">
                    <li>クラウドネイティブなWebアプリケーション開発</li>
                    <li>Serverless技術を活用したマイクロサービス設計と実装</li>
                    <li>IaCによるインフラ自動化とCI/CDパイプライン構築</li>
                    <li>技術ブログの執筆とナレッジ共有</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 dark:border-green-400 pl-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">クラウドエンジニア</h4>
                  <p className="text-gray-700 dark:text-gray-300">株式会社クラウドソリューションズ（2018年〜2021年）</p>
                  <ul className="list-disc ml-5 mt-2 text-gray-600 dark:text-gray-400">
                    <li>AWSを中心としたクラウドインフラ設計と構築</li>
                    <li>大規模システムの移行プロジェクト推進</li>
                    <li>運用自動化とコスト最適化の取り組み</li>
                    <li>クライアントへの技術コンサルティング</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 dark:border-purple-400 pl-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">インフラエンジニア</h4>
                  <p className="text-gray-700 dark:text-gray-300">株式会社ITサービス（2015年〜2018年）</p>
                  <ul className="list-disc ml-5 mt-2 text-gray-600 dark:text-gray-400">
                    <li>オンプレミスサーバーの構築と運用</li>
                    <li>ネットワーク設計と監視システム導入</li>
                    <li>クラウド移行計画の策定と実行</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 連絡先 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">連絡先</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <a 
                  href="https://github.com/lamaglama39" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">🐱</span>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">GitHub</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">lamaglama39</p>
                  </div>
                </a>

                <a 
                  href="https://twitter.com/lamaglama39" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">🐦</span>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">Twitter</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">@lamaglama39</p>
                  </div>
                </a>

                <a 
                  href="https://zenn.dev/lamaglama39" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">📝</span>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">Zenn</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">lamaglama39</p>
                  </div>
                </a>

                <a 
                  href="mailto:contact@lamaglama39.dev" 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">✉️</span>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">メール</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">contact@lamaglama39.dev</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
