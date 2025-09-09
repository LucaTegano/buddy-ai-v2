// Custom hook to initialize the app with data from the backend
import { useEffect } from 'react';
import { useAppStore } from '@/app/store/useAppStore';
import { useChatStore } from '@/app/store/useChatStore';

export const useAppInitializer = () => {
  const {
    loadNotes,
    loadGroups,
    loadProjects,
    loadPersonalTasks,
    loadSettings,
    user,
  } = useAppStore();
  
  const { loadChatHistory } = useChatStore();

  useEffect(() => {
    if (user) {
      // Load all data from the backend when the user is authenticated
      loadNotes();
      loadGroups();
      loadProjects();
      loadPersonalTasks();
      loadSettings();
      loadChatHistory();
    }
  }, [user, loadNotes, loadGroups, loadProjects, loadPersonalTasks, loadSettings, loadChatHistory]);
};