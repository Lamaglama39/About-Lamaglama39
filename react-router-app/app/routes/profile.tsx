import type { Route } from "./+types/profile";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile | Lamaglama39" },
    { name: "description", content: "プロフィール情報とスキルセット" },
  ];
}

export default function Profile() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className={`min-h-screen p-6 md:p-8 lg:py-12 lg:px-16 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* プロフィール情報 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">プロフィール</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Lamaglama39</h2>
              <p className="text-gray-600 dark:text-gray-300">
                インフラエンジニア → クラウドエンジニア → Web開発者
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">主な業務</h2>
              <p className="text-gray-600 dark:text-gray-300">
                クラウドインフラ構築、CI/CD構築、バックエンド開発、フロントエンド開発
              </p>
            </div>
          </div>
        </div>

        {/* スキルセット */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">スキルセット</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">フロントエンド</h2>
              <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                <li>React</li>
                <li>TypeScript</li>
                <li>Next.js</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">バックエンド</h2>
              <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                <li>Node.js</li>
                <li>Python</li>
                <li>Go</li>
                <li>Firebase</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">インフラ</h2>
              <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                <li>AWS</li>
                <li>GCP</li>
                <li>Terraform</li>
                <li>Docker</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">その他</h2>
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
    </main>
  );
} 