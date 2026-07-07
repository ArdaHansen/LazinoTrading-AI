'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/paper-trading', label: 'Paper Trading' },
  { href: '/training', label: 'KI Tests' },
  { href: '/changelog', label: 'Changelog' },
  { href: '/about', label: 'About' },
  { href: '/admin', label: 'Admin' }
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('ltai_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setIsAdmin(parsed.role === 'admin');
      } catch {
        setIsAdmin(false);
      }
    }
  }, []);

  function logout() {
    localStorage.removeItem('ltai_token');
    localStorage.removeItem('ltai_user');
    localStorage.removeItem('ltai_session_id');
    router.push('/login');
  }

  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-bold text-cyan-300">
            LT
          </span>
          <span>
            <span className="block text-base font-semibold tracking-tight">LazinoTrading AI</span>
            <span className="block text-[11px] uppercase tracking-[0.32em] text-slate-400">Research Suite</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
          {links.map((link) => {
            if (link.href === '/admin' && !isAdmin) return null;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 transition ${isActive ? 'bg-cyan-400/15 text-cyan-200' : 'hover:bg-white/10 hover:text-white'}`}
              >
                {link.label}
              </Link>
            );
          })}
          <button onClick={logout} className="rounded-full border border-white/10 px-3 py-2 transition hover:bg-white/10 hover:text-white">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
