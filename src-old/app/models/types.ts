
export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
}

export type ScratchpadAction = 'summarize' | 'key-points' | 'proofread';

export type Personality = 'default' | 'robot' | 'nerd';

export interface User {
  id: string;
  name: string;
  picture: string;
  email: string;
}

export interface Note {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isCollaborative: boolean;
  lastEdited?: string;
  participantCount: number;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  team: { name: string; picture: string; }[];
  progress: number;
  lastActivity: string;
}

// Types for the new Groups feature
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

export interface GroupTask {
  id: string;
  text: string;
  completed: boolean;
  assigneeId?: string;
}

export interface PersonalTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Group {
  id: string;
  name: string;
  subject: string;
  members: GroupMember[];
  messages: GroupMessage[];
  files: GroupFile[];
  tasks: GroupTask[];
}

export type InboxMessageType = 'group-invitation' | 'system-notification' | 'new-feature';

export interface BaseInboxMessage {
  id: string;
  type: InboxMessageType;
  timestamp: string;
  read: boolean;
}

export interface GroupInvitationMessage extends BaseInboxMessage {
  type: 'group-invitation';
  from: User;
  group: {
    id: string;
    name: string;
  };
}

export interface SystemNotificationMessage extends BaseInboxMessage {
  type: 'system-notification';
  message: string;
}

export interface NewFeatureMessage extends BaseInboxMessage {
  type: 'new-feature';
  title: string;
  message: string;
}

export type InboxMessage = GroupInvitationMessage | SystemNotificationMessage | NewFeatureMessage;