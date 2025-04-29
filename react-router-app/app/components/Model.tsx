import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

// モデルローダーコンポーネント - クライアントサイドのみでロードされる
const ThreeDModel = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <iframe 
        src="/model-viewer.html" 
        className="w-full h-full border-0"
        title="Lama 3D Model"
      />
    </div>
  );
};

// クライアントサイドのみのコンポーネント
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? <>{children}</> : null;
};

export default function Model() {
  const location = useLocation();
  
  // アルパカページ（ルートパスと/alpaca）では背景モデルを表示しない
  if (location.pathname === '/' || location.pathname === '/alpaca') {
    return null;
  }
  
  return (
    <div className="relative">
      <ClientOnly>
        <ThreeDModel />
      </ClientOnly>
    </div>
  );
}
