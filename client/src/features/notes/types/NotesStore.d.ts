import { Note } from '@/features/notes/types/Note';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadNotes: () => Promise<void>;
  createNote: (note: Partial<Note>) => Promise<Note | null>;
  getNoteById: (id: string) => Promise<Note | null>;
  updateNote: (noteId: string, updates: Partial<Note>) => Promise<Note | null>;
  deleteNote: (noteId: string) => Promise<void>;
  moveNoteToTrash: (noteId: string, router: AppRouterInstance) => Promise<void>;
  setActiveNoteId: (noteId: string | null) => void;
}