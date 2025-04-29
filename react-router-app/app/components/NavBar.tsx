import React, { useState, useEffect } from 'react';
import { Link } from "react-router";

export default function NavBar() {
  // ダークモード状態管理
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-2 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/space-lama.png" alt="Lamaglama39" className="w-8 h-8 rounded-full" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Lamaglama39</span>
        </Link>
      </div>
      <ul className="flex gap-6 items-center">
        <li>
          <Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 font-semibold transition-colors">Profile</Link>
        </li>
        <li>
          <Link to="/blog" className="text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 font-semibold transition-colors">Blog</Link>
        </li>
        <li>
          <Link to="/apps" className="text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 font-semibold transition-colors">Apps</Link>
        </li>
        <li>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}
