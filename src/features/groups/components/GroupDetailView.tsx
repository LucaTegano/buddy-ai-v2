"use client"
import React, { useEffect, useState } from 'react';
import { useGroupsStore } from '@/features/groups/store/groups.store';
import { groupActions } from '@/features/groups/actions/group.actions';
import { GroupTask } from '@/shared/types/Task';
import GroupDetailHeader from './GroupDetailHeader';
import GroupTabs from './GroupTabs';
import CreateGroupTask from './CreateGroupTask';
import GroupTaskList from './GroupTaskList';
import GroupMemberList from './GroupMemberList';

interface GroupDetailViewProps {
  groupId: string;
  onBack: () => void;
}

export default function GroupDetailView({ groupId, onBack }: GroupDetailViewProps) {
  const { groups } = useGroupsStore();
  const [activeTab, setActiveTab] = useState<'notes' | 'tasks' | 'members'>('notes');
  const [editingTask, setEditingTask] = useState<{ id: string; text: string } | null>(null);
  const [editText, setEditText] = useState('');

  const group = groups.find(g => g.id === groupId);

  useEffect(() => {
    if (groupId) {
      groupActions.loadGroupTasks(groupId);
      groupActions.loadGroupMembers(groupId);
    }
  }, [groupId]);

  const handleCreateTask = async (taskText: string) => {
    if (!taskText.trim() || !groupId) return;
    
    await groupActions.createGroupTask(groupId, taskText);
  };

  const handleUpdateTask = async (taskId: string, completed: boolean) => {
    if (!groupId || !group) return;
    
    const task = group.tasks?.find((t: GroupTask) => t.taskId === taskId);
    if (task) {
      await groupActions.updateGroupTask(groupId, taskId, task.text, completed);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!groupId) return;
    
    await groupActions.deleteGroupTask(groupId, taskId);
  };

  const startEditing = (taskId: string, text: string) => {
    setEditingTask({ id: taskId, text });
    setEditText(text);
  };

  const saveEdit = async () => {
    if (!editingTask || !groupId) return;
    
    await groupActions.updateGroupTask(groupId, editingTask.id, editText, false);
    setEditingTask(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  if (!group) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Group not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-primary">
      <GroupDetailHeader groupName={group.name} onBack={onBack} />
      <GroupTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 overflow-hidden">
        {activeTab === 'tasks' && (
          <div className="flex flex-col h-full">
            <CreateGroupTask onCreateTask={handleCreateTask} />
            <GroupTaskList
              tasks={group.tasks || []}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onStartEditing={startEditing}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
              editingTask={editingTask}
              editText={editText}
              setEditText={setEditText}
            />
          </div>
        )}

        {activeTab === 'members' && (
          <GroupMemberList members={group.members || []} />
        )}
      </div>
    </div>
  );
}
