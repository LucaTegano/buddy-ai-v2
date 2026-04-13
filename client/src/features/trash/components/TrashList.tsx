
'use client';

import { useEffect } from 'react';
import { useTrashStore } from '@/features/trash/store/trash.store';
import TrashListItem from '@/features/trash/components/TrashListItem';
import EmptyTrash from '@/features/trash/components/EmptyTrash';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrashList() {
  const { trashItems, isLoading, loadTrashItems } = useTrashStore();

  useEffect(() => {
    loadTrashItems();
  }, [loadTrashItems]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (trashItems.length === 0) {
    return <EmptyTrash />;
  }

  return (
    <div className="space-y-2">
      {trashItems.map((item) => (
        <TrashListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
