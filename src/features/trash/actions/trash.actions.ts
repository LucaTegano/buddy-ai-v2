
import { useTrashStore } from '@/features/trash/store/trash.store';

export const useTrashActions = () => {
  const { loadTrashItems, restoreItem, deleteItem, emptyTrash } = useTrashStore();

  return {
    loadTrashItems,
    restoreItem,
    deleteItem,
    emptyTrash,
  };
};
