import { GroupTask } from '../../../shared/types/Task';
export interface Group {
  id: string;
  name: string;
  subject: string;
  members: GroupMember[];
  messages: GroupMessage[];
  files: GroupFile[];
  tasks: GroupTask[];
}
export interface GroupMember {
  id: string;
  name: string;
  picture: string;
}

export interface GroupMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface GroupFile {
  id: string;
  name: string;
  type: 'PDF' | 'Word' | 'Image' | 'Other';
  size: string;
  uploadedBy: string;
  date: string;
}

