export interface Note {
  id: string;
  title: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  formattedDate?: string;
  tags: string[];
  isCollaborative: boolean;
  lastEdited?: string;
  participantCount: number;
  content: string;
}