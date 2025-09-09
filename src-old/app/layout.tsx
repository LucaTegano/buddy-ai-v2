import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppInitializer } from '@/app/components/AppInizializer';
import TranslationsProvider from '@/app/components/TranslationsProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Study Buddy AI',
  description: 'Your AI-powered study assistant.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <TranslationsProvider>
          <AppInitializer />
          {children}
        </TranslationsProvider>
      </body>
    </html>
  );
}