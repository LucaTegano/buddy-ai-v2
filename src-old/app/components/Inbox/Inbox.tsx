import React from 'react';
import { InboxIcon } from '@/app/components/icons';
import Badge from '@/app/components/shared/Badge';

export const Inbox = () => {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
      <div className="flex items-center">
        <InboxIcon className="w-5 h-5 mr-3" />
        <span className="text-sm font-medium">Inbox</span>
      </div>
      <Badge>{3}</Badge>
    </div>
  );
};