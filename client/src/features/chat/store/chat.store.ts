import { create } from 'zustand';
import { getChatHistory, sendMessage } from '@/features/chat/services/ai-chat.service';
import { ChatState,AiChatMessageDto,ChatMessage } from '@/features/chat/types/AiChat';

export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}


export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    { role: MessageRole.MODEL, text: "Hello! I'm your Study Buddy. How can I help you learn today?" }
  ],
  isChatPanelOpen: true,
  isLoading: false,
  noteId: null,

  setNoteId: (noteId: number) => set({ noteId }),

  toggleChatPanel: () => set((state) => ({ isChatPanelOpen: !state.isChatPanelOpen })),

  loadChatHistory: async () => {
    const { noteId } = get();
    if (!noteId) return;

    set({ isLoading: true });
    try {
      const history: AiChatMessageDto[] = await getChatHistory(noteId);
      const formattedMessages: ChatMessage[] = history.map(msg => ({
        role: msg.role.toLowerCase() as MessageRole,
        text: msg.content,
      }));
      set({ messages: formattedMessages });
    } catch (error) {
      console.error(error);
      set({ messages: [{ role: MessageRole.MODEL, text: "I'm sorry, I couldn't load the chat history." }] });
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (message: string) => {
    const { noteId } = get();
    if (!message.trim() || !noteId) return;

    set({ isLoading: true });
    const newUserMessage: ChatMessage = { role: MessageRole.USER, text: message };
    set(state => ({ messages: [...state.messages, newUserMessage] }));

    try {
      const aiResponse: AiChatMessageDto = await sendMessage(noteId, message);
      const formattedAiMessage: ChatMessage = {
        role: aiResponse.role.toLowerCase() as MessageRole,
        text: aiResponse.content,
      };
      set(state => ({ messages: [...state.messages, formattedAiMessage] }));
    } catch (error) {
      console.error(error);
      set(state => ({ messages: [...state.messages, { role: MessageRole.MODEL, text: "I'm sorry, I ran into a problem. Please try again." }] }));
    } finally {
      set({ isLoading: false });
    }
  },
}));