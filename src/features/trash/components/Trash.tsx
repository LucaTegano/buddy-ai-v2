
'use client';

import { useTranslation } from 'react-i18next';
import TrashList from '@/features/trash/components/TrashList';
import { Button } from '@/components/ui/button';
import { useTrashStore } from '@/features/trash/store/trash.store';

export default function Trash() {
  const { t } = useTranslation();
  const { emptyTrash } = useTrashStore();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('trash.title')}</h1>
        <button
          className="rounded-md border-2 border-feedback-error shadow-sm px-4 py-2 bg-feedback-error text-base font-medium text-text-primary hover:opacity-70 focus:outline-none sm:text-sm cursor-pointer"
          onClick={emptyTrash}
        >
          {t('trash.emptyTrashButton')}
        </button>
      </div>
      <TrashList />
    </div>
  );
}
