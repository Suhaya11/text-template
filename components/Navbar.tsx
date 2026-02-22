"use client";

import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { BiSun, BiMoon, BiMessageDetail, BiUser, BiLogOut, BiHome } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export default function Navbar({ user }: { user?: any }) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 z-50 px-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-green-600 dark:text-green-500">
        ADUST Connect
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <BiMoon size={24} /> : <BiSun size={24} />}
        </button>

        {user ? (
          <>
            <Link href="/" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" title="Home">
              <BiHome size={24} />
            </Link>
            <Link href="/chat" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" title="Messages">
              <BiMessageDetail size={24} />
            </Link>
            <Link href={`/profile/${user.id}`} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" title="Profile">
              <BiUser size={24} />
            </Link>
            {user.role === 'admin' && (
              <Link href="/admin" className="text-sm font-semibold text-red-500 hover:text-red-600 px-2">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
              title="Logout"
            >
              <BiLogOut size={24} />
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-green-600">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
