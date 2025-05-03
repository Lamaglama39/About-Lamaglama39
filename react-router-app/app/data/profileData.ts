import { FaReact, FaPython, FaNodeJs, FaAws, FaCloudflare } from "react-icons/fa";
import { FaGolang, FaRust } from "react-icons/fa6";
import { 
  SiTypescript, SiRemix, SiBlender, SiDeno, SiJavascript, 
  SiThreedotjs, SiGithub, SiX, SiZenn, SiQiita, SiGnubash, 
  SiDocker, SiKubernetes, SiHelm, SiAnsible, SiTerraform, SiGooglecloud 
} from "react-icons/si";

// プロフィール情報
export const profileInfo = {
  name: "Lamaglama39",
  birthday: "1998/07/29",
  favorites: "🦀🦐🦙🪴💻",
  location: "日本,東京",
  bio: [
    "観葉植物を愛するインフラエンジニアです。",
    "最近はチランジアと触れ合っています。"
  ]
};

// キャリアデータ
export const careerItems = [
  {
    period: "2021/02",
    company: "株式会社アクシス・クリエイト",
    details: [
      "インフラエンジニア",
      "SRE",
      "システム設計/構築",
      "システム運用/保守",
      "AWS/GCPを用いたマルチクラウド環境構築",
    ]
  },
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
];

// 連絡先データ
export const contactLinks = [
  { Icon: SiGithub, url: "https://github.com/lamaglama39" },
  { Icon: SiX, url: "https://x.com/lamaglama39" },
  { Icon: SiZenn, url: "https://zenn.dev/lamaglama39" },
  { Icon: SiQiita, url: "https://qiita.com/lamaglama39" },
  { 
    // 開発者サイトのDマーク
    Icon: "D_MARK", 
    url: "https://dev.classmethod.jp/author/akaike/" 
  },
];

// スキルデータ
export const skillsData = [
  { Icon: SiJavascript, name: "JavaScript", color: "text-orange-500" },
  { Icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
  { Icon: FaPython, name: "Python", color: "text-yellow-500" },
  { Icon: FaGolang, name: "Golang", color: "text-blue-500" },
  { Icon: FaRust, name: "Rust", color: "text-red-500" },
  { Icon: SiGnubash, name: "Bash", color: "text-white" },
  { Icon: FaReact, name: "React", color: "text-blue-300" },
  { Icon: SiRemix, name: "Remix", color: "text-white" },
  { Icon: SiBlender, name: "Blender", color: "text-orange-300" },
  { Icon: SiThreedotjs, name: "Three.js", color: "text-green-300" },
  { Icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
  { Icon: SiDeno, name: "Deno", color: "text-white" },
  { Icon: SiTerraform, name: "Terraform", color: "text-purple-500" },
  { Icon: SiAnsible, name: "Ansible", color: "text-red-600" },
  { Icon: SiDocker, name: "Docker", color: "text-blue-500" },
  { Icon: SiKubernetes, name: "Kubernetes", color: "text-blue-500" },
  { Icon: SiHelm, name: "Helm", color: "text-blue-500" },
  { Icon: FaAws, name: "AWS", color: "text-orange-500" },
  { Icon: SiGooglecloud, name: "Google Cloud", color: "text-yellow-500" },
  { Icon: FaCloudflare, name: "Cloudflare", color: "text-orange-500" },
]; 