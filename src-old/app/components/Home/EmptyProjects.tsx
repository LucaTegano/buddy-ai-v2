import React from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from './EmptyState';
import { UsersIcon } from '@/app/components/icons';

const EmptyProjects: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <EmptyState
            icon={<UsersIcon />}
            title={t('home.noProjectsTitle')}
            subtitle={t('home.noProjectsSubtitle')}
        />
    );
};

export default EmptyProjects;