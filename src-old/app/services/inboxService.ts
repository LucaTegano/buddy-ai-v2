// Inbox Service
import httpClient from './httpClient';
import { API_ENDPOINTS } from './apiConfig';
import { InboxMessage } from '@/app/models/types';

class InboxService {
  async getAllMessages(): Promise<InboxMessage[]> {
    return await httpClient.get<InboxMessage[]>(API_ENDPOINTS.INBOX.GET_ALL);
  }

  async getUnreadMessages(): Promise<InboxMessage[]> {
    return await httpClient.get<InboxMessage[]>(API_ENDPOINTS.INBOX.UNREAD);
  }

  async markAsRead(id: string): Promise<InboxMessage> {
    return await httpClient.put<InboxMessage>(API_ENDPOINTS.INBOX.MARK_READ(id), {});
  }

  async deleteMessage(id: string): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.INBOX.DELETE(id));
  }
}

export default new InboxService();