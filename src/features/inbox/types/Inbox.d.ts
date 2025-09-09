import { User } from './User';
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