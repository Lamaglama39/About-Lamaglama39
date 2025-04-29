import type { AppData } from '~/components/AppCard';

export const appData: AppData[] = [
  {
    id: 1,
    title: "About Lamaglama39",
    description: "今見ているポートフォリオです。\n無心でラマをくるくる回して遊んでみてね。",
    technologies: ["React", "TypeScript", "Cloudflare", "Tailwind CSS"],
    imageUrl: "apps/about-lamaglama39-info.png",
    link: "https://lamaglama39.dev/",
    github: "https://github.com/Lamaglama39/About-Lamaglama39"
  },
  {
    id: 2,
    title: "無限ぷちぷち",
    description: "懐かしの無限ぷちぷち...。\nあの頃には出来なかった真の無限ぷちぷちをご堪能ください。",
    technologies: ["JavaScript", "HTML5", "CSS3", "AWS CloudFront"],
    imageUrl: "apps/infinite-puchi-info.png",
    link: "https://d3a5y9l67jnuw.cloudfront.net/",
    github: "https://github.com/Lamaglama39/bubblewrap-paradise"
  },
  {
    id: 3,
    title: "タイピング・パラダイス",
    description: "四方から文字が襲い掛かるカオスなタイピングゲームです。\n一味違ったタイピング体験ができます。",
    technologies: ["React", "JavaScript", "AWS CloudFront", "Game"],
    imageUrl: "apps/typing-paradise-info.png",
    link: "https://d3n4v8721djrpd.cloudfront.net/",
    github: "https://github.com/Lamaglama39/typing-paradise"
  }
]; 