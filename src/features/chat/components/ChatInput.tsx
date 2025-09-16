// src/features/chat/components/ChatInput.tsx
import React, { RefObject, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { SendIcon } from '@/shared/components/icons';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  textareaRef: RefObject<HTMLTextAreaElement>;
}

export const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSubmit, handleKeyDown, isLoading, textareaRef }) => {
  const { t } = useTranslation();

  return (
    <div className="p-3 border-t border-border-subtle bg-surface">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chatPanel.placeholder')}
          className="w-full px-4 py-2.5 text-sm bg-hover text-text-primary rounded-lg border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all duration-300 resize-none max-h-40"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex-shrink-0 self-end p-2.5 rounded-lg bg-brand-primary text-on-brand hover:bg-brand-hover disabled:bg-disabled disabled:text-text-disabled disabled:cursor-not-allowed transition-colors"
          aria-label={t('chatPanel.sendMessage')}
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};