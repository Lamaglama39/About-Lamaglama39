import type { Route } from "./+types/profile";
import { useEffect, useState } from "react";
import { SkillSection } from "~/components/SkillSection";
import { ContactSection } from "~/components/ContactSection";
import { CareerItem } from "~/components/CareerItem";
import { DMarkIcon } from "~/components/DMarkIcon";
import { profileInfo, careerItems, contactLinks, skillsData } from "~/data/profileData";

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

  // カスタムDマークアイコンを処理するための連絡先データの変換
  const contacts = contactLinks.map(contact => {
    if (contact.Icon === "D_MARK") {
      return { ...contact, Icon: DMarkIcon };
    }
    return contact;
  });

  return (
    <main className={`min-h-screen p-6 md:p-8 lg:py-12 lg:px-16 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">プロフィール</h1>

        {/* プロフィール */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">{profileInfo.name}</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">誕生日:{profileInfo.birthday}</h2>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">好きなもの:{profileInfo.favorites}</h2>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">生息地:{profileInfo.location}</h2>
              {profileInfo.bio.map((line, index) => (
                <p key={index} className="text-center">{line}</p>
              ))}
            </div>
            
            {/* キャリア */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">キャリア:</h2>
              <div className="w-fit">
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

        {/* 連絡先 */}
        <div className="dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">お問い合わせ</h1>
          <ContactSection contacts={contacts} />
        </div>

        {/* スキルセット - 視覚的なバージョン */}
        <div className="dark:bg-gray-800 p-6 md:p-10 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">スキルセット</h1>          
          <SkillSection skills={skillsData} />
        </div>

      </div>
    </main>
  );
} 