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
  Wand2,
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
    ? "bg-brand-primary/10 text-brand-primary font-bold shadow-sm"
    : "text-text-secondary hover:bg-secondary/50 hover:text-text-primary translate-x-0 hover:translate-x-1";
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ease-out group ${activeClasses}`}
    >
      <Icon className={`h-5 w-5 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
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
      className={`bg-surface border border-border-subtle text-text-primary max-w-4xl w-full h-[600px] rounded-2xl shadow-xl shadow-subtle overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 ${className}`}
    >
      <div className="flex h-full">
        {/* Left Sidebar */}
        <aside className="w-64 bg-secondary/30 p-4 flex flex-col border-r border-border-subtle flex-shrink-0">
          <div className="h-10 flex items-start">
            <Button
              onClick={() => router.push('/home')}
              variant="ghost"
              size="icon"
              className="text-text-secondary hover:text-text-primary hover:bg-secondary rounded-xl"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <nav className="mt-4 space-y-1">
            <NavItem icon={Settings} label={t('settings.general')} active />
            <NavItem icon={Wand2} label={t('settings.customization')}/>
          </nav>
        </aside>

        {/* Right Content */}
        <main className="flex-1 p-10 overflow-y-auto bg-surface">
          <h1 className="text-2xl font-bold mb-8 text-text-primary">{t('settings.general')}</h1>
          <div className="flex flex-col gap-8 max-w-xl">
            <SettingRow label={t('settings.theme.label')}>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-[180px] bg-secondary/50 border-border-subtle focus:ring-brand-primary rounded-xl">
                  <SelectValue placeholder={t('settings.theme.system')} />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border-subtle text-text-primary rounded-xl">
                  <SelectItem value="system">{t('settings.theme.system')}</SelectItem>
                  <SelectItem value="light">{t('settings.theme.light')}</SelectItem>
                  <SelectItem value="dark">{t('settings.theme.dark')}</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <Separator className="bg-border-subtle/50" />

            <SettingRow label={t('settings.language.label')}>
              <Select value={currentLang} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[200px] bg-secondary/50 border-border-subtle focus:ring-brand-primary rounded-xl">
                  <SelectValue placeholder={t('settings.language.auto')} />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border-subtle text-text-primary rounded-xl">
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