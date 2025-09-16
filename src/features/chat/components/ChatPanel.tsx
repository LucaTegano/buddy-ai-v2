// src/features/chat/components/ChatPanel.tsx
"use client"
import React, { useState, useRef, useEffect, KeyboardEvent, RefObject } from 'react';
import { useChatStore } from '../store/chat.store';
import { ChatPanelProps } from '@/features/chat/types/AiChat';
import { useAutoScroll, useAutoResizeTextarea } from '@/lib/hooks';
import { ChatInput, EmptyState, MessageList, TypingIndicator } from './';

const ChatPanel: React.FC<ChatPanelProps> = ({ noteId }) => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, setNoteId, loadChatHistory } = useChatStore();
  
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Custom hooks for side-effects
  useAutoScroll(chatHistoryRef as RefObject<HTMLElement>, [messages, isLoading]);
  useAutoResizeTextarea(textareaRef as RefObject<HTMLTextAreaElement>, input);

  // Effect for initializing chat history
  useEffect(() => {
    setNoteId(noteId);
    loadChatHistory();
  }, [noteId, setNoteId, loadChatHistory]);

  // --- Event Handlers ---
  const handleSendMessage = (message: string) => {
    if (message.trim() && !isLoading) {
      sendMessage(message.trim());
      setInput('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface border border-border-subtle rounded-2xl shadow-lg shadow-subtle overflow-hidden">
      <div ref={chatHistoryRef} className="flex-grow p-4 sm:p-6 overflow-y-auto">
          <MessageList messages={messages} />
        {isLoading && <TypingIndicator />}
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
        isLoading={isLoading}
        textareaRef={textareaRef as RefObject<HTMLTextAreaElement>}
      />
    </div>
  );
};

export default ChatPanel;