import React from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from './EmptyState';
import { DocumentDuplicateIcon } from '@/app/components/icons';

const EmptyNotes: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <EmptyState
            icon={<DocumentDuplicateIcon />}
            title={t('home.noNotesTitle')}
            subtitle={t('home.noNotesSubtitle')}
        />
    );
};

export default EmptyNotes;