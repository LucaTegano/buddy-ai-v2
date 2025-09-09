import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
    currentLanguage: string;
    onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
    const { t } = useTranslation();
    
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => onLanguageChange('en')}
                className={`flex-1 py-2 px-3 text-sm text-text-primary font-medium rounded-md border-2 transition-colors ${
                    currentLanguage === 'en' ? 'bg-brand-subtle-2 border-brand-primary' : 'bg-surface border-border-subtle hover:border-brand-hover'
                }`}
            >
                {t('language.english')}
            </button>
            <button
                onClick={() => onLanguageChange('it')}
                className={`flex-1 py-2 px-3 text-text-primary text-sm font-medium rounded-md border-2 transition-colors ${
                    currentLanguage === 'it' ? 'bg-brand-subtle-2 border-brand-primary' : 'bg-surface border-border-subtle hover:border-brand-hover'
                }`}
            >
                {t('language.italian')}
            </button>
        </div>
    );
};

export default LanguageSelector;