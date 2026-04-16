"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/lib/i18n/i18n.global';
import { useSettingsStore } from "../store/settings.store";
import { Personality } from "../types/Personality";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Settings,
  Wand2,
  LucideProps,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ... (NavItem, SettingRow components)
const NavItem = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ElementType<LucideProps>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  const activeClasses = active
    ? "bg-brand-primary/10 text-brand-primary font-bold shadow-sm"
    : "text-text-secondary hover:bg-secondary/50 hover:text-text-primary translate-x-0 hover:translate-x-1";
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ease-out group ${activeClasses}`}
    >
      <Icon className={`h-5 w-5 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
      <span>{label}</span>
    </button>
  );
};

const SettingRow = ({ label, children }: { label: string; children: React.ReactNode; }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md">
      <span className="text-text-primary text-sm font-medium">{label}</span>
      <div>{children}</div>
    </div>
  );
};

const SettingRowWithDescription = ({
  label,
  description,
  children
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-start justify-between w-full max-w-md gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-text-primary text-sm font-medium">{label}</span>
        <p className="text-text-secondary text-xs leading-relaxed max-w-[280px]">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};


export function SettingsDialogContent({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [currentLang, setCurrentLang] = useState('auto');
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'customization'>('general');

  const {
    personality,
    setPersonality,
    customInstructions,
    setCustomInstructions,
    isCustomizationEnabled,
    setIsCustomizationEnabled,
    setTheme: setStoreTheme,
    setLanguage: setStoreLanguage,
    saveUserSettings,
    loadUserSettings,
  } = useSettingsStore();

  useEffect(() => {
    setMounted(true);
    loadUserSettings();
  }, [loadUserSettings]);

  useEffect(() => {
    const detectedLang = i18n.language;
    setCurrentLang(detectedLang);
    setStoreLanguage(detectedLang);
  }, [i18n.language, setStoreLanguage]);

  const handleThemeChange = async (value: string) => {
    setTheme(value);
    setStoreTheme(value);
  };

  const handleLanguageChange = (newLang: string) => {
    let targetLang = newLang;
    if (newLang === 'auto') {
      targetLang = navigator.language.substring(0, 2);
    }
    
    changeLanguage(targetLang);
    setStoreLanguage(targetLang);

    const currentPathWithoutLocale = pathname.substring(3);
    const newPath = `/${targetLang}${currentPathWithoutLocale}`;
    router.push(newPath);
  };
  
  if (!mounted) {
    return null;
  }

  const handleSave = async () => {
    try {
      await saveUserSettings();
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

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
            <NavItem
              icon={Settings}
              label={t('settings.general')}
              active={activeTab === 'general'}
              onClick={() => setActiveTab('general')}
            />
            <NavItem
              icon={Wand2}
              label={t('settings.customization')}
              active={activeTab === 'customization'}
              onClick={() => setActiveTab('customization')}
            />
          </nav>
        </aside>

        {/* Right Content */}
        <main className="flex-1 p-10 overflow-y-auto bg-surface flex flex-col">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-8 text-text-primary">
              {activeTab === 'general' ? t('settings.general') : t('settings.customization')}
            </h1>

            {activeTab === 'general' ? (
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
            ) : (
              <div className="flex flex-col gap-8 max-w-xl">
                <SettingRowWithDescription
                  label={t('settings.enable')}
                  description="Enable custom personality and instructions for your buddy."
                >
                  <Switch
                    checked={isCustomizationEnabled}
                    onCheckedChange={(checked) => setIsCustomizationEnabled(checked)}
                  />
                </SettingRowWithDescription>

                {isCustomizationEnabled && (
                  <>
                    <Separator className="bg-border-subtle/50" />
                    <SettingRow label="Buddy Personality">
                      <Select value={personality} onValueChange={(val) => setPersonality(val as Personality)}>
                        <SelectTrigger className="w-[180px] bg-secondary/50 border-border-subtle focus:ring-brand-primary rounded-xl">
                          <SelectValue placeholder="Choose a personality" />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-border-subtle text-text-primary rounded-xl">
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="robot">Robot</SelectItem>
                          <SelectItem value="nerd">Nerd</SelectItem>
                        </SelectContent>
                      </Select>
                    </SettingRow>

                    <Separator className="bg-border-subtle/50" />
                    
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="custom-instructions" className="text-sm font-medium">
                        Custom Instructions
                      </Label>
                      <textarea
                        id="custom-instructions"
                        placeholder="e.g. Talk like a pirate, be concise..."
                        className="w-full min-h-[120px] p-4 bg-secondary/50 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all resize-none"
                        value={customInstructions}
                        onChange={(e) => setCustomInstructions(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border-subtle">
             <Button
                variant="outline"
                className="rounded-xl px-6"
                onClick={() => router.push('/home')}
              >
                Cancel
              </Button>
              <Button
                className="bg-brand-primary hover:bg-brand-hover text-white rounded-xl px-8"
                onClick={handleSave}
              >
                Save Changes
              </Button>
          </div>
        </main>
      </div>
    </div>
  );
}