import type { Route } from "./+types/apps";
import { useEffect, useState } from "react";
import { AppGrid } from "~/components/AppGrid";
import { appData } from "~/data/apps";

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

  return (
    <main className={`min-h-screen p-6 md:p-8 lg:p-12 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">アプリケーション</h1>
        <AppGrid apps={appData} />
      </div>
    </main>
  );
} 
