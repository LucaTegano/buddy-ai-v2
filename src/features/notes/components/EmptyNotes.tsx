import React from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentDuplicateIcon } from '@/shared/components/icons';

export const EmptyNotes: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <div className="text-center p-8 bg-primary rounded-lg border-2 border-dashed border-border-subtle">
            <div className="mx-auto w-12 h-12 text-text-disabled">
                <DocumentDuplicateIcon />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-text-primary">{t('home.noNotesTitle')}</h3>
            <p className="mt-1 text-sm text-text-secondary">{t('home.noNotesSubtitle')}</p>
        </div>
    );
};