// Search Service
import httpClient from './httpClient';
import { API_ENDPOINTS } from './apiConfig';
import { Note } from '@/app/models/types';

class SearchService {
  async searchNotes(query: string): Promise<Note[]> {
    if (!query.trim()) {
      return [];
    }
    return await httpClient.get<Note[]>(API_ENDPOINTS.SEARCH.NOTES(query));
  }
}

export default new SearchService();