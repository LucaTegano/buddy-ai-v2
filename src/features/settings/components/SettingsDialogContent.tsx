"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Settings,
  Bell,
  Wand2,
  ServerCog,
  LucideSquareUser,
  CircleUserRound,
  LucideProps,
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from "react";
// --- FIX: Import usePathname ---
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from 'next-themes';
import { changeLanguage } from '@/lib/i18n/i18n.global';

// ... (NavItem, SettingRow, SettingRowWithDescription components remain unchanged)
const NavItem = ({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ElementType<LucideProps>;
  label: string;
  active?: boolean;
}) => {
  const activeClasses = active
    ? "bg-brand-subtle text-brand-primary font-semibold"
    : "text-text-secondary hover:bg-secondary hover:text-text-primary";
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeClasses}`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
};
const SettingRow = ({ label, children }: { label: string; children: React.ReactNode; }) => {
  return (
    <div className="flex items-center justify-between w-md">
      <span className="text-text-primary text-sm">{label}</span>
      <div>{children}</div>
    </div>
  );
};


export function SettingsDialogContent({ className }: { className?: string }) {
  const router = useRouter();
  // --- FIX: Get the current pathname ---
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [currentLang, setCurrentLang] = useState('auto');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const detectedLang = i18n.language;
    setCurrentLang(detectedLang);
  }, [i18n.language]);

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  // --- FIX: Updated language change handler ---
  const handleLanguageChange = (newLang: string) => {
    let targetLang = newLang;
    if (newLang === 'auto') {
      targetLang = navigator.language.substring(0, 2);
    }
    
    // Set the cookie via i18next instance
    changeLanguage(targetLang);

    // Get the current path without the language prefix
    const currentPathWithoutLocale = pathname.substring(3); // e.g., /en/settings -> /settings

    // Construct the new path
    const newPath = `/${targetLang}${currentPathWithoutLocale}`;

    // Navigate to the new path. This is a client-side navigation.
    router.push(newPath);
  };
  
  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`bg-surface border-3 border-border-subtle  text-text-primary max-w-6xl h-[620px] rounded-xl shadow-lg shadow-subtle overflow-hidden ${className}`}
    >
      <div className="flex h-full">
        {/* Left Sidebar */}
        <aside className="w-[280px] bg-surface p-4 flex flex-col border-r border-border-subtle flex-shrink-0">
          <div className="h-10 flex items-start">
            <Button
              onClick={() => router.push('/home')}
              variant="ghost"
              size="icon"
              className="text-text-secondary hover:text-text-primary hover:bg-secondary"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <nav className="mt-2 space-y-1">
            <NavItem icon={Settings} label={t('settings.general')} active />
            <NavItem icon={Wand2} label={t('settings.customization')}/>
          </nav>
        </aside>

        {/* Right Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-semibold mb-8 text-text-primary">{t('settings.general')}</h1>
          <div className="flex flex-col gap-6">
            <SettingRow label={t('settings.theme.label')}>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-[180px] bg-secondary border-border-subtle focus:ring-brand-primary">
                  <SelectValue placeholder={t('settings.theme.system')} />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border-subtle text-text-primary">
                  <SelectItem value="system">{t('settings.theme.system')}</SelectItem>
                  <SelectItem value="light">{t('settings.theme.light')}</SelectItem>
                  <SelectItem value="dark">{t('settings.theme.dark')}</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <Separator className="bg-border-subtle" />

            <SettingRow label={t('settings.language.label')}>
              <Select value={currentLang} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[240px] bg-secondary border-border-subtle focus:ring-brand-primary">
                  <SelectValue placeholder={t('settings.language.auto')} />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border-subtle text-text-primary">
                  <SelectItem value="auto">{t('settings.language.auto')}</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
          </div>
        </main>
      </div>
    </div>
  );
}