import { create } from 'zustand';
import { getChatHistory, sendMessage } from '@/features/chat/services/ai-chat.service';
import { ChatState,AiChatMessageDto,ChatMessage, MessageRole } from '@/features/chat/types/AiChat';

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isChatPanelOpen: true,
  isLoading: false,
  noteId: null,

  setNoteId: (noteId: number) => set({ noteId }),

  toggleChatPanel: () => set((state) => ({ isChatPanelOpen: !state.isChatPanelOpen })),

  loadChatHistory: async () => {
    const { noteId } = get();
    console.log('[ChatStore] loadChatHistory called for noteId:', noteId);
    if (!noteId) return;

    set({ isLoading: true });
    try {
      const history: AiChatMessageDto[] = await getChatHistory(noteId);
      console.log('[ChatStore] History loaded, length:', history.length);
      
      const formattedMessages: ChatMessage[] = history.map(msg => ({
        role: msg.role === 'USER' ? MessageRole.USER : MessageRole.MODEL,
        text: msg.content,
      }));
      set({ messages: formattedMessages });
    } catch (error) {
      console.error('[ChatStore] Error loading history:', error);
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
        role: aiResponse.role === 'USER' ? MessageRole.USER : MessageRole.MODEL,
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
