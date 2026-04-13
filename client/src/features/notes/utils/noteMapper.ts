import { Note } from '@/features/notes/types/Note';
import { NoteListItem } from '@/features/notes/types/RecentNotes';

export interface BackendNote {
  id: number;
  title: string;
  lastActivity?: string;
  formattedDate?: string;
  content?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  tags?: string[];
  collaborative?: boolean;
  participantCount?: number;
}

// Convert backend note list item to frontend note
export function backendNoteListItemToFrontendNote(backendNote: BackendNote): Note {
  return {
    id: backendNote.id.toString(), // Convert number to string
    title: backendNote.title,
    lastActivity: backendNote.lastActivity,
    formattedDate: backendNote.formattedDate,
    // Default values for fields not in list items
    content: '',
    tags: [],
    isCollaborative: false,
    participantCount: 1,
    createdAt: new Date(), // Default value
    updatedAt: new Date(), // Default value
    lastEdited: undefined, // Optional field
  };
}

// Convert backend note detail to frontend note
export function backendNoteDetailToFrontendNote(backendNote: BackendNote): Note {
  return {
    id: backendNote.id.toString(), // Convert number to string
    title: backendNote.title,
    content: backendNote.content || '',
    createdAt: backendNote.createdAt as Date | string,
    updatedAt: backendNote.updatedAt as Date | string,
    tags: backendNote.tags || [],
    isCollaborative: backendNote.collaborative || false,
    participantCount: backendNote.participantCount || 1,
  };
}

// Convert frontend note to backend note (for sending to API)
export function frontendNoteToBackendNote(frontendNote: Partial<Note>): Partial<BackendNote> {
  return {
    title: frontendNote.title,
    content: frontendNote.content || '',
    tags: frontendNote.tags || [],
    collaborative: frontendNote.isCollaborative,
    // Note: id, createdAt, updatedAt, and participantCount are managed by backend
  };
}

// Convert frontend note to NoteListItem for search results
export function noteToNoteListItem(note: Note): NoteListItem {
  return {
    id: note.id,
    title: note.title,
    lastActivity: note.lastActivity || new Date().toISOString(), // Provide default if undefined
    formattedDate: note.formattedDate || new Date().toLocaleDateString(), // Provide default if undefined
  };
}
