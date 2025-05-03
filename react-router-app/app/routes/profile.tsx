import type { Route } from "./+types/profile";
import { useEffect, useState } from "react";
import { FaReact, FaPython, FaNodeJs, FaAws, FaGoogle, FaCloudflare } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiBlender, SiFlask, SiDeno, SiJavascript, SiThreedotjs, SiGithub, SiX, SiZenn, SiQiita, SiGnubash, SiDocker, SiKubernetes, SiHelm, SiAnsible, SiTerraform, SiGooglecloud } from "react-icons/si";
import { SkillSection } from "~/components/SkillSection";
import { ContactSection } from "~/components/ContactSection";
import { CareerItem } from "~/components/CareerItem";

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

  // スキルデータの定義
  const skills = [
    { Icon: SiJavascript, name: "JavaScript", color: "text-orange-500" },
    { Icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
    { Icon: FaPython, name: "Python", color: "text-yellow-500" },
    { Icon: SiGnubash, name: "Bash", color: "text-white" },
    { Icon: FaReact, name: "React", color: "text-blue-300" },
    { Icon: SiNextdotjs, name: "Next.js", color: "text-white" },
    { Icon: SiBlender, name: "Blender", color: "text-orange-300" },
    { Icon: SiThreedotjs, name: "Three.js", color: "text-green-300" },
    { Icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
    { Icon: SiDeno, name: "Deno", color: "text-white" },
    { Icon: SiFlask, name: "Flask", color: "text-white" },
    { Icon: SiTerraform, name: "Terraform", color: "text-purple-500" },
    { Icon: SiAnsible, name: "Ansible", color: "text-red-600" },
    { Icon: SiDocker, name: "Docker", color: "text-blue-500" },
    { Icon: SiKubernetes, name: "Kubernetes", color: "text-blue-500" },
    { Icon: SiHelm, name: "Helm", color: "text-blue-500" },
    { Icon: FaAws, name: "AWS", color: "text-orange-500" },
    { Icon: SiGooglecloud, name: "Google Cloud", color: "text-yellow-500" },
    { Icon: FaCloudflare, name: "Cloudflare", color: "text-orange-500" },
  ];

  // 連絡先データの定義
  const contacts = [
    { Icon: SiGithub, url: "https://github.com/lamaglama39" },
    { Icon: SiX, url: "https://x.com/lamaglama39" },
    { Icon: SiZenn, url: "https://zenn.dev/lamaglama39" },
    { Icon: SiQiita, url: "https://qiita.com/lamaglama39" },
    { Icon: <h1 className="text-4xl text-blue-900">D</h1>, url: "https://dev.classmethod.jp/author/akaike/" },
  ];

  // キャリアデータの定義
  const careerItems = [
    {
      period: "2025/02",
      company: "株式会社クラスメソッド",
      details: [
        "クラウドエンジニア/ソリューションアーキテクト",
        "クラウドコンサルティング",
        "コスト最適化支援",
        "セキュリティアセスメント",
        "IaCを用いたインフラ自動化"
      ]
    },
    {
      period: "2021/02",
      company: "株式会社アクシス・クリエイト",
      details: [
        "インフラエンジニア",
        "クラウド設計/構築",
        "システム運用/保守",
        "AWS/GCPを用いたマルチクラウド環境構築",
        "IaCを用いたインフラ自動化",
        "SRE",
      ]
    }
  ];

  return (
    <main className={`min-h-screen p-6 md:p-8 lg:py-12 lg:px-16 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">プロフィール</h1>

        {/* プロフィール */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lamaglama39</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">誕生日:1998/07/29</h2>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">好きなもの:🦀🦐🦙🪴</h2>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">生息地:日本,東京都</h2>
              <p>観葉植物を愛するインフラエンジニアです。</p>
              <p>最近はチランジアと触れ合っています。</p>
            </div>
            
            {/* キャリア */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">キャリア:</h2>
              <div className="pl-1">
                {careerItems.map((item, index) => (
                  <CareerItem
                    key={index}
                    period={item.period}
                    company={item.company}
                    details={item.details}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* スキルセット - 視覚的なバージョン */}
        <div className="dark:bg-gray-800 p-6 md:p-10 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">スキルセット</h1>          
          <SkillSection skills={skills} />
        </div>

        {/* 連絡先 */}
        <div className="dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">連絡先</h1>
          <ContactSection contacts={contacts} />
        </div>
      </div>
    </main>
  );
} 