// src/components/layout/PolicySidebar.tsx
"use client"; // Necessario per usare il hook usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// La nuova lista di link come richiesto
const navLinks = [
  { href: '/policies', label: 'Policy' },
  { href: '/policies/terms-of-service', label: 'Terms of Service' },
];

export function PolicySidebar() {
  const pathname = usePathname();

  return (
    // La magia è qui: `justify-center` centra verticalmente il contenuto
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-60 flex-col justify-center bg-black p-6">
      <nav>
        <ul className="space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors ${
                    isActive
                      ? 'text-white font-medium' // Stile per il link attivo
                      : 'text-zinc-400 hover:text-white' // Stile per i link non attivi
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}