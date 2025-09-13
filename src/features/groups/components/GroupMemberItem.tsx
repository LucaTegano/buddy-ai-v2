"use client"
import React from 'react';
import { GroupMember } from '../types/Group';

interface GroupMemberItemProps {
  member: GroupMember;
}

export default function GroupMemberItem({ member }: GroupMemberItemProps) {
  if (!member || !member.name) {
    return null;
  }

  return (
    <div className="flex items-center p-3 bg-surface rounded-lg border border-border-subtle">
      <div className="w-10 h-10 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary font-bold text-lg">
        {member.name.charAt(0).toUpperCase()}
      </div>
      <div className="ml-4">
        <h3 className="font-semibold text-text-primary">{member.name}</h3>
      </div>
    </div>
  );
}
