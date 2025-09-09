"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { SaveIcon, TrashIcon } from '@/shared/components/icons';

interface EditorHeaderProps {
  noteTitle: string;
  isNewNote: boolean;
  noteId?: string;
  onChangeTitle: (title: string) => void;
  onSaveNote: () => void;
  onDeleteNote: () => void;
  onTitleSave: (title: string) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ 
  noteTitle, 
  isNewNote, 
  noteId, 
  onChangeTitle, 
  onSaveNote, 
  onDeleteNote,
  onTitleSave
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between p-3 border-b border-border-subtle flex-shrink-0">
      <input
        type="text"
        value={noteTitle}
        onChange={(e) => onChangeTitle(e.target.value)}
        className="text-lg font-semibold text-text-primary bg-transparent focus:outline-none focus:ring-0 border-none p-0 w-full"
        placeholder={t('scratchpad.titlePlaceholder')}
        disabled={!noteId && !isNewNote}
      />
      {isNewNote && (
        <button
          onClick={onSaveNote}
          className="ml-2 p-2 rounded-md text-text-secondary hover:bg-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary transition-colors"
          aria-label={t('scratchpad.saveNote')}
          title={t('scratchpad.saveNote')}
        >
          <SaveIcon className="w-5 h-5" />
        </button>
      )}
      {!isNewNote && (
        <button
          onClick={onDeleteNote}
          disabled={!noteId}
          className="p-2 rounded-md text-text-secondary hover:bg-error-subtle hover:text-error focus:outline-none focus:ring-2 focus:ring-inset focus:ring-error disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label={t('scratchpad.moveToTrash')}
          title={t('scratchpad.moveToTrash')}
        >
          <TrashIcon className="w-5 h-5"/>
        </button>
      )}
    </div>
  );
};

export default EditorHeader;