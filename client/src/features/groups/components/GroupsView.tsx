"use client"
import React, { useEffect } from 'react';
import { useGroupsStore } from '@/features/groups/store/groups.store';
import { groupActions } from '@/features/groups/actions/group.actions';
import GroupDetailView from './GroupDetailView';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import CreateGroupDialog from './CreateGroupDialog';
import GroupCard from './GroupCard';

export default function GroupsView() {
  const { groups, isLoading, error, activeGroupId } = useGroupsStore();
  const router = useRouter();

  useEffect(() => {
    groupActions.loadGroups();
  }, []);

  useEffect(() => {
    // If there's an authentication error, redirect to login
    if (error && (error.includes('authentication failed') || error.includes('not authenticated'))) {
      router.push('/login');
    }
  }, [error, router]);

  if (activeGroupId) {
    return <GroupDetailView groupId={activeGroupId} onBack={() => groupActions.setActiveGroupId(null)} />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-primary">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Study Groups</h1>
        <CreateGroupDialog />
      </div>

      {error && !error.includes('authentication failed') && !error.includes('not authenticated') && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {groups.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">No groups found. Create your first group to get started!</p>
          <div className="mt-4">
            <CreateGroupDialog trigger={<Button>Create Your First Group</Button>} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}