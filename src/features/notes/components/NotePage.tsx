"use client"
import React, { useEffect } from 'react';
import { useNotesStore } from '@/features/notes/store/notes.store';
import { noteActions } from '@/features/notes/actions/note.actions';
import NoteEditor from './NoteEditor';
import { useChatStore } from '@/features/chat/store/chat.store';
import { useAuthStore } from '@/features/auth/store/auth.store';
import NoteDetailSkeleton from './NoteDetailSkeleton';

export default function NotePage({ noteId }: { noteId: string }) {
  const { notes, isLoading } = useNotesStore();
  const { isChatPanelOpen, toggleChatPanel } = useChatStore();
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  const note = notes.find(n => n.id === noteId);

  useEffect(() => {
    // Only load notes if the user is authenticated and not currently checking auth
    if (noteId && isAuthenticated && !isCheckingAuth) {
      noteActions.loadNotes();
    }
  }, [noteId, isAuthenticated, isCheckingAuth]);

  // Show loading state while checking auth or notes
  if (isCheckingAuth || isLoading) {
    return <NoteDetailSkeleton />;
  }

  // If user is not authenticated, show an error
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-text-primary">You must be logged in to view this note</div>
      </div>
    );
  }

  // Show note not found if we've loaded notes and this one doesn't exist
  if (!note && notes.length > 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-text-primary">Note not found</div>
      </div>
    );
  }

  // If we have the note, show it
  if (note) {
    return (
      <NoteEditor 
        note={note} 
        isChatPanelOpen={isChatPanelOpen} 
        toggleChatPanel={toggleChatPanel} 
      />
    );
  }

  // Fallback case - this shouldn't happen if auth is working properly
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-text-primary">Note not found</div>
    </div>
  );
}