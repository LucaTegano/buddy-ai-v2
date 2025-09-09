import { create } from 'zustand';
import { NotesState } from '@/features/notes/types/NotesStore';
import notesService from '@/features/notes/services/notes.service';
import { NoteOperationError } from '@/features/notes/utils/errorHandler';

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  activeNoteId: null,
  isLoading: false,
  error: null,
  
  loadNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const notes = await notesService.getAllNotes();
      set({ notes, isLoading: false });
    } catch (error: any) {
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.message || 'Failed to load notes';
      set({ error: errorMessage, isLoading: false });
    }
  },
  
  getNoteById: async (id: string) => {
    try {
      const note = await notesService.getNoteById(id);
      return note;
    } catch (error: any) {
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.message || 'Failed to load note';
      set({ error: errorMessage });
      return null;
    }
  },
  
  createNote: async (note: any) => {
    try {
      console.log('Sending note creation request with data:', note);
      
      // Check authentication before proceeding
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        throw new NoteOperationError(
          'User is not authenticated. Please log in first.',
          'AUTH_REQUIRED'
        );
      }
      
      const newNote = await notesService.createNote(note);
      console.log('Received note creation response:', newNote);
      if (newNote) {
        set(state => ({ notes: [...state.notes, newNote] }));
        return newNote;
      } else {
        throw new NoteOperationError('Failed to create note', 'CREATE_FAILED');
      }
    } catch (error: any) {
      console.error('Error in createNote:', error);
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.message || 'Failed to create note';
      set({ error: errorMessage });
      return null;
    }
  },
  
  updateNote: async (noteId: string, updates: any) => {
    try {
      console.log(`Sending note update request for note ${noteId} with data:`, updates);
      const updatedNote = await notesService.updateNote(noteId, updates);
      
      console.log(`Updating note ${noteId} in store with:`, updatedNote);
      
      // Update the note in the store with the data returned from the server
      if (updatedNote) {
        set(state => ({
          notes: state.notes.map(note => 
            note.id === noteId ? updatedNote : note
          )
        }));
        return updatedNote;
      } else {
        // If no data returned, update with local data
        set(state => ({
          notes: state.notes.map(note => 
            note.id === noteId ? { ...note, ...updates } : note
          )
        }));
        return { ...get().notes.find(n => n.id === noteId), ...updates };
      }
    } catch (error: any) {
      console.error('Error in updateNote:', error);
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.message || 'Failed to update note';
      set({ error: errorMessage });
      return null;
    }
  },
  
  deleteNote: async (noteId: string) => {
    try {
      await notesService.deleteNote(noteId);
      set(state => ({
        notes: state.notes.filter(note => note.id !== noteId)
      }));
    } catch (error: any) {
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.message || 'Failed to delete note';
      set({ error: errorMessage });
    }
  },
  
  moveNoteToTrash: async (noteId: string) => {
    try {
      await notesService.moveNoteToTrash(noteId);
      set(state => ({
        notes: state.notes.filter(note => note.id !== noteId)
      }));
    } catch (error: any) {
      const errorMessage = error instanceof NoteOperationError 
        ? error.message 
        : error.message || 'Failed to move note to trash';
      set({ error: errorMessage });
    }
  },
  
  setActiveNoteId: (noteId: string | null) => {
    set({ activeNoteId: noteId });
  }
}));