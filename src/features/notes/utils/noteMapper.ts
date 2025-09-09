// Utility functions for mapping between backend and frontend note types

// Backend note list item structure (from API response)
interface BackendNoteListItem {
  id: number;
  title: string;
  lastActivity: string; // ISO date string
  formattedDate: string; // Formatted date string from backend
}

// Backend note detail structure (from API response)
interface BackendNoteDetail {
  id: number;
  title: string;
  content: string;
  createdAt: [number, number, number, number, number, number, number] | string | Date; // Java LocalDateTime or string or Date
  updatedAt: [number, number, number, number, number, number, number] | string | Date; // Java LocalDateTime or string or Date
  tags: string[];
  collaborative: boolean;
  participantCount: number;
  user: any; // User object from backend
}

// Convert backend note list item to frontend note
export function backendNoteListItemToFrontendNote(backendNote: BackendNoteListItem): any {
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
export function backendNoteDetailToFrontendNote(backendNote: BackendNoteDetail): any {
  // Convert Java LocalDateTime to JavaScript Date
  const convertJavaDate = (javaDate: [number, number, number, number, number, number, number]): Date => {
    // Java months are 1-12, JavaScript months are 0-11
    return new Date(javaDate[0], javaDate[1] - 1, javaDate[2], javaDate[3], javaDate[4], javaDate[5], javaDate[6] / 1000000);
  };

  // Handle different date formats
  const processDate = (date: [number, number, number, number, number, number, number] | string | Date): Date => {
    if (Array.isArray(date)) {
      return convertJavaDate(date);
    } else if (typeof date === 'string') {
      return new Date(date);
    } else if (date instanceof Date) {
      return date;
    } else {
      // Handle invalid date formats by returning a default date
      console.warn('Invalid date format received:', date);
      return new Date(); // Return current date as fallback
    }
  };

  return {
    id: backendNote.id.toString(), // Convert number to string
    title: backendNote.title,
    content: backendNote.content,
    createdAt: processDate(backendNote.createdAt),
    updatedAt: processDate(backendNote.updatedAt),
    tags: backendNote.tags,
    isCollaborative: backendNote.collaborative, // Map collaborative to isCollaborative
    participantCount: backendNote.participantCount
  };
}

// Convert frontend note to backend note (for sending to API)
export function frontendNoteToBackendNote(frontendNote: any): Partial<BackendNoteDetail> {
  return {
    title: frontendNote.title,
    content: frontendNote.content,
    tags: frontendNote.tags,
    collaborative: frontendNote.isCollaborative, // Map isCollaborative to collaborative
    // Note: id, createdAt, updatedAt, and participantCount are managed by backend
  };
}