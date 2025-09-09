import { useNotesStore } from '@/features/notes/store/notes.store';
import { NoteOperationError } from '@/features/notes/utils/errorHandler';
import { toast } from 'sonner';
import { Note } from '../types/Note';

export const noteActions = {
  
  loadNotes: async () => {
    try {
      await useNotesStore.getState().loadNotes();
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : (error as Error).message || 'Failed to load notes';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  createNote: async (note: Partial<Note>) => {
    try {
      console.log('Creating note with data:', note);
      
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        console.error('Cannot create note: User is not authenticated');
        toast.error('You must be logged in to create a note');
        return { success: false, error: 'You must be logged in to create a note' };
      }
      
      const result = await useNotesStore.getState().createNote(note);
      console.log('Create note result:', result);
      toast.success('Note created successfully!');
      return { success: !!result, note: result };
    } catch (error: unknown) {
      console.error('Failed to create note:', error);
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : (error as any).response?.data?.message || (error as Error).message || 'Failed to create note';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  updateNote: async (noteId: string, updates: Partial<Note>) => {
    try {
      console.log(`Updating note ${noteId} with data:`, updates);
      const result = await useNotesStore.getState().updateNote(noteId, updates);
      console.log('Update note result:', result);
      if (result === null) {
        toast.error('Failed to update note - no data returned from server');
        return { success: false, error: 'Failed to update note - no data returned from server' };
      }
      toast.success('Note saved!');
      return { success: true, note: result };
    } catch (error: unknown) {
      console.error('Failed to update note:', error);
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : (error as Error).message || 'Failed to update note';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  deleteNote: async (noteId: string) => {
    try {
      await useNotesStore.getState().deleteNote(noteId);
      toast.success('Note deleted permanently.');
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : (error as Error).message || 'Failed to delete note';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  moveNoteToTrash: async (noteId: string) => {
    try {
      await useNotesStore.getState().moveNoteToTrash(noteId);
      toast.success('Note moved to trash.');
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : (error as Error).message || 'Failed to move note to trash';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  setActiveNoteId: (noteId: string | null) => {
    useNotesStore.getState().setActiveNoteId(noteId);
  },

  handleCreateNote : async () => {
    const newNoteData: Partial<Note> = {
      title: 'Untitled Note',
      content: '',
      tags: [],
      isCollaborative: false,
    };
    try {
      const result = await noteActions.createNote(newNoteData);
      return result;
    } catch (error) {
      console.error('Failed to create note:', error);
      toast.error('Failed to create new note');
      return { success: false, error: 'Failed to create new note' };
    }
  },
};