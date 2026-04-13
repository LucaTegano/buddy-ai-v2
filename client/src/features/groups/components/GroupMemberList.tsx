"use client"
import React from 'react';
import { GroupMember } from '../types/Group';
import GroupMemberItem from './GroupMemberItem';
import InviteMemberDialog from './InviteMemberDialog';

interface GroupMemberListProps {
  members: GroupMember[];
}

export default function GroupMemberList({ members }: GroupMemberListProps) {
  const handleInvite = (username: string) => {
    // This is a placeholder for the actual invite logic
    console.log(`Inviting user: ${username}`);
    // In a real implementation, you would call an API to invite the user
    // For now, we'll just show an alert
    alert(`Invite sent to: ${username}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border-subtle">
        <h2 className="text-lg font-semibold">Members</h2>
        <InviteMemberDialog onInvite={handleInvite} />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {(!members || members.length === 0) ? (
          <div className="text-center py-8 text-text-secondary">
            No members in this group yet.
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {members.map((member) => (
              <GroupMemberItem key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}