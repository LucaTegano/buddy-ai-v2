import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon } from '@/app/components/icons';

interface LegalLinksProps {
    onOpenTos: () => void;
    onOpenPrivacyPolicy: () => void;
}

const LegalLinks: React.FC<LegalLinksProps> = ({ onOpenTos, onOpenPrivacyPolicy }) => {
    const { t } = useTranslation();
    
    return (
        <div className="space-y-1">
            <button 
                onClick={onOpenTos} 
                className="w-full flex items-center justify-between p-3 -m-3 rounded-lg hover:bg-primary/80 transition-colors"
            >
                <span className="text-sm font-medium text-text-primary">{t('settings.tosLink')}</span>
                <ChevronRightIcon className="w-5 h-5 text-brand-subtle-2"/>
            </button>
            <button 
                onClick={onOpenPrivacyPolicy} 
                className="w-full flex items-center justify-between p-3 -m-3 rounded-lg hover:bg-primary/80 transition-colors"
            >
                <span className="text-sm font-medium text-text-primary">{t('settings.privacyLink')}</span>
                <ChevronRightIcon className="w-5 h-5 text-brand-subtle-2"/>
            </button>
        </div>
    );
};

export default LegalLinks;