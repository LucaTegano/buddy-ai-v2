'use client';

import { useTranslation } from 'react-i18next';
import { Trash2 } from 'lucide-react';

export default function EmptyTrash() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Trash2 className="h-16 w-16 text-text-disabled mb-4" />
      <h3 className="text-lg font-medium text-text-primary mb-2">
        {t('trash.emptyTitle')}
      </h3>
      <p className="text-text-secondary max-w-md">
        {t('trash.emptyDescription')}
      </p>
    </div>
  );
}