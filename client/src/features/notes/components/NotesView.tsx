"use client"
import React, { useEffect } from 'react';
import { useNotesStore } from '@/features/notes/store/notes.store';
import { noteActions } from '@/features/notes/actions/note.actions';
import NotesList from './NotesList';
import { useAuthStore } from '@/features/auth/store/auth.store';

export default function NotesView() {
  const { notes, isLoading } = useNotesStore();
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    // Only load notes if the user is authenticated and not currently checking auth
    if (isAuthenticated && !isCheckingAuth) {
      noteActions.loadNotes();
    }
  }, [isAuthenticated, isCheckingAuth]);
  
  // If user is not authenticated, show an error
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-text-primary">You must be logged in to view notes</div>
      </div>
    );
  }
  
  return <NotesList notes={notes} isLoading={isCheckingAuth || isLoading} />;
}