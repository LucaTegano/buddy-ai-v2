import React, { useState, useRef, useEffect } from 'react';
import { PersonalTask, GroupTask, GroupMember, TaskListProps } from '../types/Task';
import { CheckCircle, Circle, Trash2, Edit, Save, X, Plus } from 'lucide-react';
import { 
  getAssignee,
  handleToggleCompletion,
  handleRemoveTask,
  saveTaskEdit,
  handleAddTask,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  startEditing,
  cancelEditing
} from '../actions/tasks.actions';
import { useUIStore } from '@/shared/store/ui.store';

const TaskList: React.FC<TaskListProps> = ({ title, tasks: initialTasks, members = [], isGroupTask = false, groupId, groupName }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [newTaskText, setNewTaskText] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);
  const newTaskInputRef = useRef<HTMLInputElement>(null);
  const focusTaskInput = useUIStore(state => state.focusTaskInput);
  const setFocusTaskInput = useUIStore(state => state.setFocusTaskInput);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  useEffect(() => {
    if (focusTaskInput && newTaskInputRef.current) {
      newTaskInputRef.current.focus();
      setFocusTaskInput(false); // Reset the flag
    }
  }, [focusTaskInput, setFocusTaskInput]);

  return (
    <div className="mb-8">
      <h3 className={`${isGroupTask ? 'text-lg font-semibold ' : 'text-xl font-bold text-brand-subtle-2'}  mb-4`}>{title}</h3>
      
      <div className="mb-3 flex">
        <input
          ref={newTaskInputRef}
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border-1 border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary mr-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddTask(newTaskText, isGroupTask, setNewTaskText, groupId, groupName);
          }}
        />
        <button
          onClick={() => handleAddTask(newTaskText, isGroupTask, setNewTaskText, groupId, groupName)}
          className="bg-brand-subtle-2 px-4 py-2 rounded-xl text-sm hover:bg-brand-primary-dark focus:outline-none"
        >
          <Plus className="h-4 w-4 text-primary" /> 
        </button>
      </div>
      
      {tasks.length === 0 ? (
        <div className="bg-surface rounded-xl shadow-sm overflow-hidden p-8 text-center">
          <p className="text-text-secondary">No tasks yet. Add a new task to get started!</p>
        </div>
      ) : (
        <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
          <ul className="divide-y divide-border-subtle">
            {tasks.map(task => {
              const assignee = isGroupTask ? getAssignee(members, (task as GroupTask).assigneeId) : null;
              const isEditing = editingTaskId === task.id;
              
              return (
                <li 
                  key={task.id} 
                  className={`p-4 flex items-center justify-between hover:bg-hover/30 transition-colors ${draggedTask === task.id ? 'opacity-50' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, setDraggedTask)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, task.id, draggedTask, tasks, setTasks, setDraggedTask)}
                  onDragEnd={() => handleDragEnd(setDraggedTask)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button 
                      onClick={() => handleToggleCompletion(task.id, isGroupTask, groupId, groupName)}
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
                            if (e.key === 'Enter') saveTaskEdit(task.id, editText, isGroupTask, setEditingTaskId, groupId, groupName);
                            if (e.key === 'Escape') cancelEditing(setEditingTaskId, setEditText);
                          }}
                        />
                        <button 
                          onClick={() => saveTaskEdit(task.id, editText, isGroupTask, setEditingTaskId, groupId, groupName)}
                          className="text-green-500 hover:text-green-600 focus:outline-none"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => cancelEditing(setEditingTaskId, setEditText)}
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
                        onClick={() => startEditing(task.id, task.text, setEditingTaskId, setEditText, editInputRef)}
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
                    
                    {!isGroupTask && !isEditing && (
                      <button 
                        onClick={() => handleRemoveTask(task.id, isGroupTask)}
                        className="text-gray-400 hover:text-red-500 focus:outline-none ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskList;