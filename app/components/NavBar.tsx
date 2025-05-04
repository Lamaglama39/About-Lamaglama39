import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <nav className="dark:bg-gray-900 px-4 py-2 flex justify-center items-center w-full">
        <div className="container flex items-center max-w-5xl mx-auto">
          {/* ロゴ（左端に配置） */}
          <div className="flex-none md:w-1/4 flex justify-center md:justify-start">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/space-lama.webp" alt="Lamaglama39" className="w-12 h-12 rounded-full" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Lamaglama39</span>
            </Link>
          </div>
          
          {/* ハンバーガーメニューボタン (モバイル表示時のみ) */}
          <button 
            className="md:hidden ml-auto flex-none flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 cursor-pointer"
            onClick={toggleMenu}
            aria-label="メニュー"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-transform duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-opacity duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-transform duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          
          {/* デスクトップ用メニュー（中央に配置） */}
          <ul className="hidden md:flex flex-grow gap-8 items-center justify-center">
            <li>
              <Link to="/profile" className="text-xl text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 font-semibold transition-colors">Profile</Link>
            </li>
            <li>
              <Link to="/blog" className="text-xl text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 font-semibold transition-colors">Blog</Link>
            </li>
            <li>
              <Link to="/apps" className="text-xl text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 font-semibold transition-colors">Apps</Link>
            </li>
          </ul>
          
          {/* 右側の余白用の要素 */}
          <div className="hidden md:block md:w-1/4"></div>
        </div>
      </nav>
      
      {/* モバイル用メニュー（常に存在するがvisibilityで制御） */}
      <div 
        className={`absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg md:hidden z-40 transition-all duration-300 ease-in-out ${menuOpen ? 'translate-y-0 opacity-100 visible' : 'translate-y-[-10px] opacity-0 invisible'}`}
      >
        <ul className="flex flex-col py-4">
          <li className="py-2 border-b border-gray-200 dark:border-gray-700">
            <Link 
              to="/profile" 
              className="block w-full px-4 text-xl text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
          </li>
          <li className="py-2 border-b border-gray-200 dark:border-gray-700">
            <Link 
              to="/blog" 
              className="block w-full px-4 text-xl text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li className="py-2">
            <Link 
              to="/apps" 
              className="block w-full px-4 text-xl text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Apps
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
