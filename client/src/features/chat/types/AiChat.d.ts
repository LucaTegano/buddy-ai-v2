export interface ChatState {
  messages: ChatMessage[];
  isChatPanelOpen: boolean;
  isLoading: boolean;
  noteId: number | null;
  setNoteId: (noteId: number) => void;
  loadChatHistory: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  toggleChatPanel: () => void;
}

export interface AiChatMessageDto {
  id: number;
  role: MessageRole;
  content: string;
  createdAt: string;
}
export interface SendMessageRequestDto {
  message: string;
}
// --- Enums and Interfaces (No Change) ---
export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}
export interface ChatMessage {
  role: MessageRole;
  text: string;
}
interface ChatPanelProps {
  noteId: number;
}
