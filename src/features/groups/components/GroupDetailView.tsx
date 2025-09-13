"use client"
import React, { useEffect, useState } from 'react';
import { useGroupsStore } from '@/features/groups/store/groups.store';
import { groupActions } from '@/features/groups/actions/group.actions';
import { Group } from '@/features/groups/types/Group';
import { GroupTask } from '@/shared/types/Task';

interface GroupDetailViewProps {
  groupId: string;
  onBack: () => void;
}

export default function GroupDetailView({ groupId, onBack }: GroupDetailViewProps) {
  const { groups } = useGroupsStore();
  const [activeTab, setActiveTab] = useState<'tasks' | 'members'>('tasks');
  const [taskText, setTaskText] = useState('');
  const [editingTask, setEditingTask] = useState<{ id: string; text: string } | null>(null);
  const [editText, setEditText] = useState('');

  const group = groups.find(g => g.id === groupId);

  useEffect(() => {
    if (groupId) {
      groupActions.loadGroupTasks(groupId);
      groupActions.loadGroupMembers(groupId);
    }
  }, [groupId]);

  const handleCreateTask = async () => {
    if (!taskText.trim() || !groupId) return;
    
    await groupActions.createGroupTask(groupId, taskText);
    setTaskText('');
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button 
          onClick={onBack}
          className="text-blue-500 hover:text-blue-700"
        >
          ← Back to Groups
        </button>
        <h1 className="text-xl font-bold">{group.name}</h1>
        <div></div> {/* Spacer */}
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'tasks' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'members' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('members')}
        >
          Members
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'tasks' && (
          <div className="flex flex-col h-full">
            <div className="p-4">
              <div className="flex">
                <input
                  type="text"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateTask()}
                  className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none"
                  placeholder="Add a new task..."
                />
                <button
                  onClick={handleCreateTask}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {group.tasks && group.tasks.length > 0 ? (
                <ul className="space-y-2">
                  {group.tasks.map((task: GroupTask) => (
                    <li key={task.taskId} className="flex items-center">
                      {editingTask && editingTask.id === task.taskId ? (
                        <div className="flex w-full">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none"
                          />
                          <button
                            onClick={saveEdit}
                            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-r-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={(e) => handleUpdateTask(task.taskId, e.target.checked)}
                            className="mr-2"
                          />
                          <span className={task.completed ? 'line-through text-gray-500' : ''}>
                            {task.text}
                          </span>
                          <div className="ml-auto">
                            <button
                              onClick={() => startEditing(task.taskId, task.text)}
                              className="mr-2 text-blue-500 hover:text-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.taskId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No tasks yet. Add a new task to get started!
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="p-4">
            {group.members && group.members.length > 0 ? (
              <div className="space-y-2">
                {group.members.map((member) => (
                  <div key={member.id} className="flex items-center p-3 border rounded-lg">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div className="ml-4">
                      <h3 className="font-semibold">{member.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No members in this group yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}