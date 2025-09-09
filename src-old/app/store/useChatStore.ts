import { create } from 'zustand';
import { ChatMessage, MessageRole } from '@/app/models/types';
import { useAppStore } from './useAppStore';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  loadChatHistory: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    { role: MessageRole.MODEL, text: "Hello! I'm your Study Buddy. How can I help you learn today?" }
  ],
  isLoading: false,
  
  loadChatHistory: async () => {
    // For demo purposes, we'll use mock data
    // In a real implementation, this would fetch from the backend
    set({ messages: [
      { role: MessageRole.MODEL, text: "Hello! I'm your Study Buddy. How can I help you learn today?" }
    ] });
  },
  
  sendMessage: async (message: string) => {
    if (!message.trim()) return;

    set({ isLoading: true });
    const newUserMessage: ChatMessage = { role: MessageRole.USER, text: message };
    
    const currentMessages = get().messages;
    const updatedMessages = [...currentMessages, newUserMessage];
    set({ messages: updatedMessages });

    const { personality, customInstructions, isCustomizationEnabled } = useAppStore.getState();

    try {
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock AI response
      const aiResponse = `I'm your Study Buddy AI assistant. You asked: "${message}". How can I help you with your studies today?`;
      
      const formattedAiMessage: ChatMessage = {
        role: MessageRole.MODEL,
        text: aiResponse,
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