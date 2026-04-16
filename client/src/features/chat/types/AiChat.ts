export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
}

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
  role: string;
  content: string;
  createdAt: string;
}

export interface SendMessageRequestDto {
  message: string;
}

export interface ChatPanelProps {
  noteId: number;
}
