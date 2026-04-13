// src/components/layout/PolicySidebar.tsx
"use client"; // Necessario per usare il hook usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// La nuova lista di link come richiesto
const navLinks = [
  { href: '/policies', label: 'Privacy Policy' },
  { href: '/policies/terms-of-service', label: 'Terms of Service' },
];

export function PolicySidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-64 flex-col bg-secondary border-r border-border-subtle p-6 shadow-sm">
      <div className="mb-12 mt-8">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Legal & Policies</h2>
        <p className="text-xs text-text-secondary mt-1 uppercase tracking-widest font-medium">Resources</p>
      </div>
      <nav>
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center px-3 py-2 text-sm transition-all duration-200 rounded-lg ${
                    isActive
                      ? 'bg-white dark:bg-bg-primary text-brand-primary font-semibold shadow-sm ring-1 ring-border-subtle' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto pt-6 border-t border-border-subtle">
        <Link 
          href="/home" 
          className="text-xs text-text-secondary hover:text-brand-primary transition-colors flex items-center gap-2"
        >
          <span>←</span> Back to App
        </Link>
      </div>
    </aside>
  );
}