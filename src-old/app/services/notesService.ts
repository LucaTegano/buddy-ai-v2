// Notes Service
import httpClient from './httpClient';
import { API_ENDPOINTS } from './apiConfig';
import { Note } from '@/app/models/types';

class NotesService {
  async getAllNotes(): Promise<Note[]> {
    return await httpClient.get<Note[]>(API_ENDPOINTS.NOTES.GET_ALL);
  }

  async getNoteById(id: string): Promise<Note> {
    return await httpClient.get<Note>(API_ENDPOINTS.NOTES.UPDATE(id));
  }

  async createNote(note: Partial<Note>): Promise<Note> {
    return await httpClient.post<Note>(API_ENDPOINTS.NOTES.CREATE, note);
  }

  async updateNote(id: string, note: Partial<Note>): Promise<Note> {
    return await httpClient.put<Note>(API_ENDPOINTS.NOTES.UPDATE(id), note);
  }

  async deleteNote(id: string): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.NOTES.DELETE(id));
  }

  async moveNoteToTrash(id: string): Promise<any> {
    return await httpClient.post(API_ENDPOINTS.TRASH.MOVE(id));
  }
}

export default new NotesService();