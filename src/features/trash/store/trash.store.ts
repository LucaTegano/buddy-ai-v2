
import { create } from 'zustand';
import { toast } from 'sonner';
import { TrashItem } from '@/features/trash/types';
import { getTrashItems, restoreTrashItem, deleteTrashItem, emptyTrash } from '@/features/trash/services/trash.service';

interface TrashState {
  trashItems: TrashItem[];
  isLoading: boolean;
  error: string | null;
  loadTrashItems: () => Promise<void>;
  restoreItem: (id: number) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  emptyTrash: () => Promise<void>;
}

export const useTrashStore = create<TrashState>((set) => ({
  trashItems: [],
  isLoading: false,
  error: null,

  loadTrashItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const trashItems = await getTrashItems();
      set({ trashItems, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load trash items';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  restoreItem: async (id: number) => {
    try {
      await restoreTrashItem(id);
      set((state) => ({
        trashItems: state.trashItems.filter((item) => item.id !== id),
      }));
      toast.success('Item restored successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to restore item';
      set({ error: errorMessage });
      toast.error(errorMessage);
    }
  },

  deleteItem: async (id: number) => {
    try {
      await deleteTrashItem(id);
      set((state) => ({
        trashItems: state.trashItems.filter((item) => item.id !== id),
      }));
      toast.success('Item deleted permanently');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete item';
      set({ error: errorMessage });
      toast.error(errorMessage);
    }
  },

  emptyTrash: async () => {
    try {
      await emptyTrash();
      set({ trashItems: [] });
      toast.success('Trash emptied successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to empty trash';
      set({ error: errorMessage });
      toast.error(errorMessage);
    }
  },
}));
