import { Link } from "react-router";

export default function NavBar() {

  return (
    <nav className="dark:bg-gray-900 px-4 py-2 flex justify-center">
      <div className="flex items-center gap-2 mr-15">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/space-lama.png" alt="Lamaglama39" className="w-12 h-12 rounded-full" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Lamaglama39</span>
        </Link>
      </div>
      <ul className="flex gap-6 items-center">
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
    </nav>
  );
}
