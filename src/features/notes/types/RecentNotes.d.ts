export interface NoteListItem {
  id: string;
  title: string;
  lastActivity: string;
  formattedDate: string;
}

export interface RecentNotesResult {
  previous7Days: NoteListItem[];
  previous30Days: NoteListItem[];
  latestNotes: NoteListItem[];
}