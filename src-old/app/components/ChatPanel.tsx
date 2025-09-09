"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ChatMessageComponent from '@/app/components/ChatMessage';
import { SendIcon, SparklesIcon } from './icons';
import { useChatStore } from '@/app/store/useChatStore';

const ChatPanel: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useChatStore();
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface backdrop-blur-sm border border-border-subtle rounded-2xl shadow-lg shadow-subtle">
      <div ref={chatHistoryRef} className="flex-grow p-4 sm:p-6 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessageComponent key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 my-4 justify-start">
             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary">
                <SparklesIcon className="w-5 h-5 animate-pulse" />
            </div>
            <div className="px-4 py-3 rounded-xl bg-surface">
                <p className="text-sm text-text-secondary">{t('chatPanel.thinking')}</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-border-subtle">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chatPanel.placeholder')}
            className="w-full px-4 py-2.5 text-sm bg-surface text-text-primary rounded-lg border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none transition-colors duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex-shrink-0 p-2.5 rounded-lg bg-brand-primary text-on-brand hover:bg-brand-hover disabled:bg-disabled disabled:text-text-disabled disabled:cursor-not-allowed transition-colors"
            aria-label={t('chatPanel.sendMessage')}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;