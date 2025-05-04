import { useEffect, useState } from "react";
import { emojiToDataUrl, fallbackEmojiDataUrl } from "~/utils/emojiToDataUrl";

interface EmojiLinkFaviconProps {
  emoji: string;
  size?: number;
}

/**
 * 絵文字をファビコンとして設定するコンポーネント
 */
export function EmojiLinkFavicon({ emoji, size = 32 }: EmojiLinkFaviconProps) {
  const [faviconUrl, setFaviconUrl] = useState<string>(fallbackEmojiDataUrl);
  
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof document !== "undefined") {
      try {
        // 絵文字をData URLに変換
        const dataUrl = emojiToDataUrl(emoji, size);
        setFaviconUrl(dataUrl);
      } catch (error) {
        console.error("絵文字のファビコン生成エラー:", error);
      }
    }
  }, [emoji, size]);

  return (
    <>
      <link rel="icon" type="image/png" href={faviconUrl} />
      <link rel="apple-touch-icon" href={faviconUrl} />
    </>
  );
} 