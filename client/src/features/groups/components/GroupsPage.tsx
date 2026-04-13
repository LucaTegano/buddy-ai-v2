"use client"
import React from 'react';
import { GroupsView } from '@/features/groups/components';

export default function GroupsPage() {
  return (
    <div className="flex flex-col h-full">
      <GroupsView />
    </div>
  );
}