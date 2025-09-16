
import { AiChatMessageDto,SendMessageRequestDto } from '@/features/chat/types/AiChat';
import apiClient from '@/shared/api/apiClient';

const AI_CHAT_API_PREFIX = '/note';

export const sendMessage = async (noteId: number, message: string): Promise<AiChatMessageDto> => {
  const request: SendMessageRequestDto = { message };
  const response = await apiClient.post(`${AI_CHAT_API_PREFIX}/${noteId}/chat`, request);
  return response.data;
};

export const getChatHistory = async (noteId: number): Promise<AiChatMessageDto[]> => {
  const response = await apiClient.get(`${AI_CHAT_API_PREFIX}/${noteId}/chat`);
  return response.data;
};
