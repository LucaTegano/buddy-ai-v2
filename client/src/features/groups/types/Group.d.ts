import { GroupTask } from '../../../shared/types/Task';
import { Note } from '@/features/notes/types/Note';

export interface Group {
  id: string;
  name: string;
  subject: string;
  members: GroupMember[];
  messages: GroupMessage[];
  files: Note[];
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

