// Utility functions for mapping between backend and frontend note types

// Convert backend note list item to frontend note
export function backendNoteListItemToFrontendNote(backendNote: any): any {
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
export function backendNoteDetailToFrontendNote(backendNote: any): any {
  return {
    id: backendNote.id.toString(), // Convert number to string
    title: backendNote.title,
    content: backendNote.content || '',
    createdAt: backendNote.createdAt,
    updatedAt: backendNote.updatedAt,
    tags: backendNote.tags || [],
    isCollaborative: backendNote.collaborative,
    participantCount: backendNote.participantCount
  };
}

// Convert frontend note to backend note (for sending to API)
export function frontendNoteToBackendNote(frontendNote: any): any {
  return {
    title: frontendNote.title,
    content: frontendNote.content || '',
    tags: frontendNote.tags || [],
    collaborative: frontendNote.isCollaborative,
    // Note: id, createdAt, updatedAt, and participantCount are managed by backend
  };
}