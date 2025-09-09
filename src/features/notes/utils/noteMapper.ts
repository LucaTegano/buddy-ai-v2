// Utility functions for mapping between backend and frontend note types

// Backend note structure (from API response)
interface BackendNote {
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

// Convert backend note to frontend note
export function backendNoteToFrontendNote(backendNote: BackendNote): any {
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
    } else {
      return date as Date;
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
export function frontendNoteToBackendNote(frontendNote: any): Partial<BackendNote> {
  return {
    title: frontendNote.title,
    content: frontendNote.content,
    tags: frontendNote.tags,
    collaborative: frontendNote.isCollaborative, // Map isCollaborative to collaborative
    // Note: id, createdAt, updatedAt, and participantCount are managed by backend
  };
}