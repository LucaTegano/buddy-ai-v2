
export interface TrashItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  deletedAt: string;
  originalNoteId: number;
  participantCount: number;
}
