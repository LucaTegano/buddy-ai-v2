import { useNotesStore } from '@/features/notes/store/notes.store';
import { NoteOperationError } from '@/features/notes/utils/errorHandler';

export const noteActions = {
  
  loadNotes: async () => {
    try {
      await useNotesStore.getState().loadNotes();
      return { success: true };
    } catch (error: any) {
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.message || 'Failed to load notes';
      return { success: false, error: errorMessage };
    }
  },

  createNote: async (note: any) => {
    try {
      console.log('Creating note with data:', note);
      
      // Check if user is authenticated before proceeding
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        console.error('Cannot create note: User is not authenticated');
        return { success: false, error: 'You must be logged in to create a note' };
      }
      
      const result = await useNotesStore.getState().createNote(note);
      console.log('Create note result:', result);
      return { success: !!result, note: result };
    } catch (error: any) {
      console.error('Failed to create note:', error);
      // Check for a detailed message from the server's response
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.response?.data?.message || error.message || 'Failed to create note';
      return { success: false, error: errorMessage };
    }
  },

  updateNote: async (noteId: string, updates: any) => {
    try {
      console.log(`Updating note ${noteId} with data:`, updates);
      const result = await useNotesStore.getState().updateNote(noteId, updates);
      console.log('Update note result:', result);
      if (result === null) {
        return { success: false, error: 'Failed to update note - no data returned from server' };
      }
      return { success: true, note: result };
    } catch (error: any) {
      console.error('Failed to update note:', error);
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.message || 'Failed to update note';
      return { success: false, error: errorMessage };
    }
  },

  deleteNote: async (noteId: string) => {
    try {
      await useNotesStore.getState().deleteNote(noteId);
      return { success: true };
    } catch (error: any) {
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.message || 'Failed to delete note';
      return { success: false, error: errorMessage };
    }
  },

  moveNoteToTrash: async (noteId: string) => {
    try {
      await useNotesStore.getState().moveNoteToTrash(noteId);
      return { success: true };
    } catch (error: any) {
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.message || 'Failed to move note to trash';
      return { success: false, error: errorMessage };
    }
  },

  setActiveNoteId: (noteId: string | null) => {
    useNotesStore.getState().setActiveNoteId(noteId);
  },

  handleCreateNote : async () => {
    // The server should handle defaults like timestamps, participantCount, etc.
    const newNoteData = {
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
      return { success: false, error: 'Failed to create new note' };
    }
  },
};