"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChatMessage, MessageRole } from '@/app/models/types';
import { SparklesIcon, PlusCircleIcon } from '@/app/components/icons';
import { useScratchpadStore } from '@/app/store/useScratchpadStore';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const { t } = useTranslation();
  const { addToScratchpad } = useScratchpadStore();
  const isModel = message.role === MessageRole.MODEL;

  const messageClasses = isModel
    ? 'bg-hover/80 text-text-primary'
    : 'bg-brand-primary text-white shadow';
  
  const containerClasses = isModel ? 'justify-start' : 'justify-end';

  return (
    <div className={`group flex items-start gap-2.5 my-4 ${containerClasses}`}>
      {isModel && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary">
          <SparklesIcon className="w-5 h-5" />
        </div>
      )}
      <div className={`flex flex-col ${isModel ? 'items-start' : 'items-end'}`}>
        <div className={`relative max-w-lg px-4 py-2.5 rounded-xl ${messageClasses}`}>
          <p className="text-sm break-words whitespace-pre-wrap leading-relaxed">{message.text}</p>
        </div>
        {isModel && message.text.length > 0 && (
          <button 
            onClick={() => addToScratchpad(message.text)}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-text-secondary hover:text-brand-primary transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label={t('chatMessage.addToNotes')}
          >
            <PlusCircleIcon className="w-4 h-4" />
            {t('chatMessage.addToNotes')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessageComponent;