import { Note } from '@/features/notes/types/Note';

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
export function backendNoteListItemToFrontendNote(backendNote: BackendNote): Partial<Note> {
  return {
    id: backendNote.id.toString(), // Convert number to string
    title: backendNote.title,
    lastActivity: backendNote.lastActivity,
    formattedDate: backendNote.formattedDate,
    // Default values for fields not in list items
    content: '',
    tags: [],
    isCollaborative: false,
    participantCount: 1
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
