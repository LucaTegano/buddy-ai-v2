import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

interface SettingsHeaderProps {
    onBack: () => void;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onBack }) => {
    const { t } = useTranslation();
    
    return (
        <div className="relative flex items-center justify-center p-4 sm:p-6 border-b border-border-subtle">
            <button
                onClick={onBack}
                className="absolute left-4 sm:left-6 p-2 rounded-full hover:bg-primary/80 transition-colors"
                aria-label={t('settings.goBack')}
            >
                <ArrowLeft className="w-6 h-6 text-brand-subtle-2" />
            </button>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                {t('settings.title')}
            </h1>
        </div>
    );
};

export default SettingsHeader;