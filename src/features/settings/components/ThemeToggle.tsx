import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

const ThemeToggle: React.FC = () => {
    const { t } = useTranslation();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    // Until the component is mounted, we'll return null to avoid hydration mismatch
    if (!mounted) {
        return null;
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    
    return (
        <div className="flex items-center justify-between p-3 -m-3 rounded-lg hover:bg-primary/80 transition-colors">
            <label htmlFor="theme-toggle" className="text-sm font-medium text-text-primary">
                {t('settings.theme')}
            </label>
            <div className="flex items-center gap-2">
                <span className={`text-sm ${theme === 'light' ? 'text-brand-primary font-semibold' : 'text-brand-subtle-2'}`}>
                    {t('settings.light')}
                </span>
                <button
                    id="theme-toggle"
                    onClick={toggleTheme}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${theme === 'light' ? 'bg-brand-primary' : 'bg-brand-subtle-2'}`}>
                    <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            theme === 'light' ? 'translate-x-1' : 'translate-x-6'
                        }`}
                    />
                </button>
                <span className={`text-sm ${theme === 'dark' ? 'text-brand-primary font-semibold' : 'text-brand-subtle-2'}`}>
                    {t('settings.dark')}
                </span>
            </div>
        </div>
    );
};

export default ThemeToggle;