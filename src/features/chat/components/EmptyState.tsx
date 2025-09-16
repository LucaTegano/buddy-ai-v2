// src/features/chat/components/EmptyState.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SparklesIcon } from '@/shared/components/icons';
import { CHAT_SUGGESTIONS_KEYS } from '../constants';

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onPromptClick }) => {
  const { t } = useTranslation();
  const suggestions = CHAT_SUGGESTIONS_KEYS.map(key => t(key));

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="p-3 bg-brand-subtle rounded-full mb-4">
        <SparklesIcon className="w-6 h-6 text-brand-primary" />
      </div>
      <h2 className="text-lg font-semibold text-text-primary mb-1">{t('chatPanel.welcomeTitle')}</h2>
      <p className="text-sm text-text-secondary mb-6 max-w-sm">{t('chatPanel.welcomeMessage')}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((text, i) => (
          <button key={i} onClick={() => onPromptClick(text)} className="px-3.5 py-2 text-sm bg-surface hover:bg-hover border border-border-subtle rounded-lg transition-colors">
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};