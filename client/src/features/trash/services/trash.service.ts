
import { TRASH_ENDPOINTS } from '@/features/trash/api/trash.api';
import { TrashItem } from '@/features/trash/types';
import apiClient from '@/shared/api/apiClient';

export const getTrashItems = async (): Promise<TrashItem[]> => {
  const response = await apiClient.get(TRASH_ENDPOINTS.GET_ALL);
  return response.data;
};

export const restoreTrashItem = async (id: number): Promise<void> => {
  await apiClient.post(TRASH_ENDPOINTS.RESTORE(id));
};

export const deleteTrashItem = async (id: number): Promise<void> => {
  await apiClient.delete(TRASH_ENDPOINTS.DELETE(id));
};

export const emptyTrash = async (): Promise<void> => {
  await apiClient.delete(TRASH_ENDPOINTS.EMPTY);
};
