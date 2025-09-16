"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { noteActions } from '../actions/note.actions';
import NoteCard from './NoteCard';
import { EmptyNotes } from './EmptyNotes';
import { PlusIcon } from '@/shared/components/icons';
import NotesLoadingSkeleton from './NotesLoadingSkeleton';
import { Note } from '@/features/notes/types/Note';
interface NotesListProps {
  notes: Note[];
  isLoading: boolean;
}

const NotesList: React.FC<NotesListProps> = ({ notes, isLoading }) => {
  const { t } = useTranslation();
  
  if (isLoading) {
    return <NotesLoadingSkeleton />;
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">{t('noteList.note')}</h1>
        <button
          onClick={noteActions.handleCreateNote}
          className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-hover transition-colors flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          {t('noteList.newNote')}
        </button>
      </div>
      
      {notes.length === 0 ? (
        <EmptyNotes />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;