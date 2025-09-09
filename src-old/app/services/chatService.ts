// Chat Service
import httpClient from './httpClient';
import { API_ENDPOINTS } from './apiConfig';
import { ChatMessage } from '@/app/models/types';

class ChatService {
  async getChatHistory(): Promise<ChatMessage[]> {
    return await httpClient.get<ChatMessage[]>(API_ENDPOINTS.CHAT.HISTORY);
  }

  async sendMessage(message: string): Promise<ChatMessage> {
    return await httpClient.post<ChatMessage>(API_ENDPOINTS.CHAT.SEND, { message });
  }

  async clearChatHistory(): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.CHAT.CLEAR);
  }
}

export default new ChatService();