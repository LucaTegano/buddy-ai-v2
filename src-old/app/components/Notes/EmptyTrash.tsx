import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrashIcon } from '@/app/components/icons';

const EmptyTrash: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <div className="text-center h-full flex flex-col items-center justify-center text-text-secondary">
            <TrashIcon className="w-16 h-16 mb-4 text-text-disabled" />
            <h2 className="text-lg font-semibold">{t('trash.emptyTitle')}</h2>
            <p className="max-w-xs mt-1">{t('trash.emptyMessage')}</p>
        </div>
    );
};

export default EmptyTrash;