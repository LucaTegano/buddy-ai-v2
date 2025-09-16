import { Note } from '@/features/notes/types/Note';

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
  moveNoteToTrash: (noteId: string, router: any) => Promise<void>;
  setActiveNoteId: (noteId: string | null) => void;
}