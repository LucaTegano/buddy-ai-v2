import { InboxMessage } from '@/app/models/types';

export const mockInboxMessages: InboxMessage[] = [
  {
    id: '1',
    type: 'group-invitation',
    from: {
      id: 'user-2',
      name: 'Alice',
      email: "noreply@example.com",
      picture: 'https://i.pravatar.cc/150?u=alice',
    },
    group: {
      id: 'group-1',
      name: 'Project Alpha',
    },
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: '2',
    type: 'system-notification',
    message: 'Your storage is almost full. Please upgrade your plan.',
    timestamp: new Date(new Date().getTime() - 86400000).toISOString(), // 1 day ago
    read: true,
  },
  {
    id: '3',
    type: 'new-feature',
    title: 'New Feature: Dark Mode!',
    message: 'You can now enable dark mode in the settings.',
    timestamp: new Date(new Date().getTime() - 172800000).toISOString(), // 2 days ago
    read: false,
  },
];
