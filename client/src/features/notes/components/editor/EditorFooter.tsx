"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChatBubbleLeftRightIcon, ChevronUpIcon, ChevronDownIcon } from '@/shared/components/icons';

interface EditorFooterProps {
  isChatPanelOpen: boolean;
  toggleChatPanel: () => void;
}

const EditorFooter: React.FC<EditorFooterProps> = ({ isChatPanelOpen, toggleChatPanel }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-auto p-4 border-t border-border-subtle flex-shrink-0">
      <button
        onClick={toggleChatPanel}
        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-text-primary bg-hover/80 rounded-lg hover:bg-hover transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-primary"
        aria-label={isChatPanelOpen ? t('scratchpad.hideChat') : t('scratchpad.showChat')}
      >
        <ChatBubbleLeftRightIcon className="w-5 h-5" />
        {t('scratchpad.chat')}
        {isChatPanelOpen ? <ChevronDownIcon className="w-5 h-5 ml-1" /> : <ChevronUpIcon className="w-5 h-5 ml-1" />}
      </button>
    </div>
  );
};

export default EditorFooter;