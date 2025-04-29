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
        </div>
      </section>
      
      {/* プロフィールセクション */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/40">
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
                    インフラエンジニア → クラウドエンジニア → Web開発者
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">主な業務</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    クラウドインフラ構築、CI/CD構築、バックエンド開発、フロントエンド開発
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
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>Next.js</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">バックエンド</h4>
                  <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>Go</li>
                    <li>Firebase</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">インフラ</h4>
                  <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                    <li>AWS</li>
                    <li>GCP</li>
                    <li>Terraform</li>
                    <li>Docker</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">その他</h4>
                  <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                    <li>CI/CD</li>
                    <li>GitOps</li>
                    <li>GitHub Actions</li>
                    <li>Cloudflare</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
