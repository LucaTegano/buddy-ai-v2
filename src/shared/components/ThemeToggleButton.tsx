import React from 'react';
import { useTranslation } from 'react-i18next';
import { SunIcon, MoonIcon } from '@/shared/components/icons';
import { ThemeToggleButtonProps } from '@/shared/types/Theme';

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ theme, onToggle, className = '' }) => {
    const { t } = useTranslation();
    return (
        <button
            onClick={onToggle}
            className={`p-2 rounded-full text-text-secondary hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-primary transition-colors ${className}`}
            aria-label={t('theme.toggle', { context: theme === 'light' ? 'dark' : 'light' })}
        >
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>
    );
};

export default ThemeToggleButton;