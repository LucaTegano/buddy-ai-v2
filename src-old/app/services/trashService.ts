// Trash Service
import httpClient from './httpClient';
import { API_ENDPOINTS } from './apiConfig';
import { Note } from '@/app/models/types';

class TrashService {
  async getAllTrashNotes(): Promise<Note[]> {
    return await httpClient.get<Note[]>(API_ENDPOINTS.TRASH.GET_ALL);
  }

  async moveNoteToTrash(id: string): Promise<any> {
    return await httpClient.post(API_ENDPOINTS.TRASH.MOVE(id));
  }

  async restoreNoteFromTrash(id: string): Promise<Note> {
    return await httpClient.post<Note>(API_ENDPOINTS.TRASH.RESTORE(id));
  }

  async deleteNotePermanently(id: string): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.TRASH.DELETE(id));
  }

  async emptyTrash(): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.TRASH.EMPTY);
  }
}

export default new TrashService();