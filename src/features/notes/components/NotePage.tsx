"use client"
import React, { useEffect, useState } from 'react';
import { useNotesStore } from '@/features/notes/store/notes.store';
import { noteActions } from '@/features/notes/actions/note.actions';
import NoteEditor from './NoteEditor';
import { useChatStore } from '@/features/chat/store/chat.store';
import { useAuthStore } from '@/features/auth/store/auth.store';
import NoteDetailSkeleton from './NoteDetailSkeleton';

export default function NotePage({ noteId }: { noteId: string }) {
  const { notes, isLoading, getNoteById } = useNotesStore();
  const { isChatPanelOpen, toggleChatPanel } = useChatStore();
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  const [note, setNote] = useState<any>(null);
  const [isNoteLoading, setIsNoteLoading] = useState(false);

  useEffect(() => {
    // Only load notes if the user is authenticated and not currently checking auth
    if (noteId && isAuthenticated && !isCheckingAuth) {
      const loadNote = async () => {
        setIsNoteLoading(true);
        try {
          // Always fetch the full note data to ensure content is present
          const fetchedNote = await getNoteById(noteId);
          if (fetchedNote) {
            setNote(fetchedNote);
          }
        } catch (error) {
          console.error('Error loading note:', error);
        } finally {
          setIsNoteLoading(false);
        }
      };
      
      loadNote();
    }
  }, [noteId, isAuthenticated, isCheckingAuth, getNoteById]);

  // Show loading state while checking auth or notes
  if (isCheckingAuth || isLoading || isNoteLoading) {
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

  // Show note not found if we couldn't load the note
  if (!note) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-text-primary">Note not found</div>
      </div>
    );
  }

  // If we have the note, show it
  return (
    <NoteEditor 
      note={note} 
      isChatPanelOpen={isChatPanelOpen} 
      toggleChatPanel={toggleChatPanel} 
    />
  );
}