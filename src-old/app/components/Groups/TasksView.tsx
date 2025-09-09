import React, { useState, useRef } from 'react';
import { GroupTask, GroupMember } from '@/app/models/types';
import { useAppStore } from '@/app/store/useAppStore';
import { CheckCircle, Circle, Edit, Plus, Save, X } from 'lucide-react';

interface TasksViewProps {
    tasks: GroupTask[];
    members: GroupMember[];
    groupId?: string;
}

const TasksView: React.FC<TasksViewProps> = ({ tasks: initialTasks, members, groupId }) => {
    const { 
        toggleGroupTaskCompletion,
        renameGroupTask,
        addGroupTask
    } = useAppStore();
    
    const [tasks, setTasks] = useState(initialTasks);
    const [draggedTask, setDraggedTask] = useState<string | null>(null);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');
    const [newTaskText, setNewTaskText] = useState('');
    const editInputRef = useRef<HTMLInputElement>(null);
    
    // Update local tasks when props change
    React.useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks]);
    
    if (!tasks.length && !groupId) {
        return null;
    }
    
    const getAssignee = (assigneeId?: string) => assigneeId ? members.find(m => m.id === assigneeId) : null;
    
    const handleToggleCompletion = (taskId: string) => {
        if (groupId) {
            toggleGroupTaskCompletion(groupId, taskId);
        }
    };
    
    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        setDraggedTask(taskId);
        e.dataTransfer.effectAllowed = 'move';
    };
    
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    
    const handleDrop = (e: React.DragEvent, targetTaskId: string) => {
        e.preventDefault();
        
        if (draggedTask === null || draggedTask === targetTaskId) return;
        
        const tasksCopy = [...tasks];
        const draggedIndex = tasksCopy.findIndex(task => task.id === draggedTask);
        const targetIndex = tasksCopy.findIndex(task => task.id === targetTaskId);
        
        if (draggedIndex === -1 || targetIndex === -1) return;
        
        const [draggedItem] = tasksCopy.splice(draggedIndex, 1);
        tasksCopy.splice(targetIndex, 0, draggedItem);
        
        setTasks(tasksCopy);
        setDraggedTask(null);
    };
    
    const handleDragEnd = () => {
        setDraggedTask(null);
    };
    
    const startEditing = (taskId: string, currentText: string) => {
        setEditingTaskId(taskId);
        setEditText(currentText);
        setTimeout(() => {
            if (editInputRef.current) {
                editInputRef.current.focus();
            }
        }, 0);
    };
    
    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditText('');
    };
    
    const saveTaskEdit = (taskId: string) => {
        if (editText.trim() === '' || !groupId) return;
        
        renameGroupTask(groupId, taskId, editText);
        setEditingTaskId(null);
    };
    
    const handleAddTask = () => {
        if (newTaskText.trim() === '' || !groupId) return;
        
        addGroupTask(groupId, newTaskText);
        setNewTaskText('');
    };
    
    return (
        <div className="flex-1 p-4 overflow-y-auto">
            {/* Add new task input */}
            <div className="mb-3 flex">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 p-2 border-1 border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary mr-2"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddTask();
                    }}
                />
                <button
                onClick={handleAddTask}
                className="bg-brand-subtle-2 px-4 py-2 rounded-xl text-sm hover:bg-brand-primary-dark focus:outline-none"
                >
                <Plus className="h-4 w-4 text-primary" /> 
                </button>
            </div>
            
            <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
                <ul className="divide-y divide-border-subtle">
                    {tasks.map(task => {
                        const assignee = getAssignee(task.assigneeId);
                        const isEditing = editingTaskId === task.id;
                        
                        return (
                            <li 
                                key={task.id} 
                                className={`p-4 flex items-center justify-between hover:bg-hover/30 transition-colors ${draggedTask === task.id ? 'opacity-50' : ''}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, task.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, task.id)}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <button 
                                        onClick={() => handleToggleCompletion(task.id)}
                                        className="focus:outline-none"
                                    >
                                        {task.completed ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <Circle className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                    
                                    {isEditing ? (
                                        <div className="flex-1 flex items-center gap-2">
                                            <input
                                                ref={editInputRef}
                                                type="text"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="flex-1 p-1 border rounded text-sm"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') saveTaskEdit(task.id);
                                                    if (e.key === 'Escape') cancelEditing();
                                                }}
                                            />
                                            <button 
                                                onClick={() => saveTaskEdit(task.id)}
                                                className="text-green-500 hover:text-green-600 focus:outline-none"
                                            >
                                                <Save className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={cancelEditing}
                                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`text-sm ${task.completed ? 'line-through text-text-secondary' : ''}`}>
                                            {task.text}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    {!isEditing && (
                                        <button 
                                            onClick={() => startEditing(task.id, task.text)}
                                            className="text-gray-400 hover:text-blue-500 focus:outline-none"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    )}
                                    
                                    {assignee && (
                                        <img 
                                            src={assignee.picture} 
                                            alt={assignee.name} 
                                            title={`Assigned to ${assignee.name}`} 
                                            className="w-7 h-7 rounded-full" 
                                        />
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default TasksView;