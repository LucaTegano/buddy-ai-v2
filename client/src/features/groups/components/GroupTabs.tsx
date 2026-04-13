"use client"
import React from 'react';

interface GroupTabsProps {
  activeTab: 'notes' |'tasks' | 'members';
  onTabChange: (tab: 'notes'| 'tasks' | 'members' ) => void;
}

export default function GroupTabs({ activeTab, onTabChange }: GroupTabsProps) {
  return (
    <div className="flex border-b border-border-subtle">
      <button
        className={`px-4 py-2 font-medium ${activeTab === 'notes' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-secondary'}`}
        onClick={() => onTabChange('notes')}
      >
        Notes
      </button>
      <button
        className={`px-4 py-2 font-medium ${activeTab === 'tasks' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-secondary'}`}
        onClick={() => onTabChange('tasks')}
      >
        Tasks
      </button>
      <button
        className={`px-4 py-2 font-medium ${activeTab === 'members' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-secondary'}`}
        onClick={() => onTabChange('members')}
      >
        Members
      </button>
    </div>
  );
}
