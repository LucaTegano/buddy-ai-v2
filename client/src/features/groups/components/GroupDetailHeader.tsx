"use client"
import React from 'react';
import { ChevronLeftIcon } from 'lucide-react';

interface GroupDetailHeaderProps {
  groupName: string;
  onBack: () => void;
}

export default function GroupDetailHeader({ groupName, onBack }: GroupDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border-subtle">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
      >
        <ChevronLeftIcon className="w-5 h-5" />
        Back to Groups
      </button>
      <h1 className="text-xl font-bold text-text-primary">{groupName}</h1>
      <div></div> {/* Spacer */}
    </div>
  );
}
