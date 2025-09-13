import { create } from 'zustand';
import { User, Note, Project, Group, Personality, PersonalTask } from '../models/types';
import notesService from '../services/notesService';
import groupsService from '../services/groupsService';
import tasksService from '../services/tasksService';
import settingsService from '../services/settingsService';
import searchService from '../services/searchService';
import trashService from '../services/trashService';
import inboxService from '../services/inboxService';
import projectsService from '../services/projectsService';
import authService from '../services/authService';

type Theme = 'light' | 'dark';
type ActiveView = 'home' | 'notes' | 'groups' | 'trash' | 'search';

interface AppState {
  user: User | null;
  theme: Theme;
  isSidebarOpen: boolean;
  isChatPanelOpen: boolean;
  showTos: boolean;
  showPrivacyPolicy: boolean;
  showSettings: boolean;
  showCustomizeAI: boolean;
  activeView: ActiveView;
  notes: Note[];
  projects: Project[];
  groups: Group[];
  trash: Note[];
  personalTasks: PersonalTask[];
  activeNoteId: string | null;
  activeGroupId: string | null;
  personality: Personality;
  customInstructions: string;
  isCustomizationEnabled: boolean;
  
  isSearchResultsOpen: boolean;
  searchQuery: string;
  searchResults: Note[];

  // Add new action to the interface
  initializeTheme: () => void;

  login: () => Promise<void>;
  logout: () => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  toggleChatPanel: () => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  openTos: () => void;
  closeTos: () => void;
  openPrivacyPolicy: () => void;
  closePrivacyPolicy: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  setActiveView: (view: ActiveView) => void;
  setActiveNoteId: (id: string | null) => void;
  setActiveGroupId: (id: string | null) => void;
  updateNote: (noteId: string, newContent: string) => Promise<void>;
  updateNoteTitle: (noteId: string, newTitle: string) => Promise<void>;
  setPersonality: (p: Personality) => void;
  setCustomInstructions: (i: string) => void;
  setIsCustomizationEnabled: (e: boolean) => void;
  moveNoteToTrash: (noteId: string, router: any) => Promise<void>;
  restoreNoteFromTrash: (noteId: string) => Promise<void>;
  deleteNotePermanently: (noteId: string) => Promise<void>;
  emptyTrash: () => Promise<void>;

  // Personal task management
  togglePersonalTaskCompletion: (taskId: string) => Promise<void>;
  addPersonalTask: (text: string) => Promise<void>;
  removePersonalTask: (taskId: string) => Promise<void>;
  renamePersonalTask: (taskId: string, newText: string) => Promise<void>;
  
  // Group task management
  toggleGroupTaskCompletion: (groupId: string, taskId: string) => Promise<void>;
  renameGroupTask: (groupId: string, taskId: string, newText: string) => Promise<void>;
  addGroupTask: (groupId: string, text: string) => Promise<void>;

  setSearchQuery: (query: string) => void;
  executeSearch: () => void;
  closeSearchResults: () => void;
  leaveGroup: (groupId: string) => Promise<void>;
  addGroup: (name: string, subject: string) => Promise<void>;
  addNote: (note: Note) => Promise<void>;
  
  // New methods for API integration
  loadNotes: () => Promise<void>;
  loadGroups: () => Promise<void>;
  loadProjects: () => Promise<void>;
  loadPersonalTasks: () => Promise<void>;
  loadSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  theme: 'light',
  isSidebarOpen: false,
  isChatPanelOpen: true,
  showTos: false,
  showPrivacyPolicy: false,
  showSettings: false,
  showCustomizeAI: false,
  activeView: 'home',
  notes: [],
  projects: [],
  groups: [],
  trash: [],
  personalTasks: [],
  activeNoteId: null,
  activeGroupId: null,
  personality: 'default',
  customInstructions: '',
  isCustomizationEnabled: false,
  isSearchResultsOpen: false,
  searchQuery: '',
  searchResults: [],

  initializeTheme: () => {
    if (typeof window !== 'undefined') {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newTheme = isDarkMode ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', isDarkMode);
      set({ theme: newTheme });
    }
  },

  login: async () => {
    console.log('App login called');
    // Get user from auth service
    const user = await authService.getCurrentUser();
    console.log('User from auth service:', user);
    if (user) {
      set({ user, activeView: 'home' });
      console.log('User set in store, loading data');
      // Load user data
      get().loadNotes();
      get().loadGroups();
      get().loadProjects();
      get().loadPersonalTasks();
      get().loadSettings();
    } else {
      console.log('No user found, logging out');
      // If we can't get user data, logout
      get().logout();
    }
  },
  
  logout: () => {
    authService.logout();
    set({ 
      user: null,
      notes: [],
      groups: [],
      projects: [],
      personalTasks: [],
      trash: []
    });
  },
  
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    set({ theme: newTheme });
    
    // Save theme preference
    const { personality, customInstructions, isCustomizationEnabled } = get();
    settingsService.updateSettings({
      theme: newTheme,
      language: 'en',
      personality,
      customInstructions,
      customizationEnabled: isCustomizationEnabled,
    });
  },

  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleChatPanel: () => set(state => ({ isChatPanelOpen: !state.isChatPanelOpen })),
  setIsSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
  openTos: () => set({ showTos: true, showSettings: false }),
  closeTos: () => set({ showTos: false }),
  openPrivacyPolicy: () => set({ showPrivacyPolicy: true, showSettings: false }),
  closePrivacyPolicy: () => set({ showPrivacyPolicy: false }),
  openSettings: () => set({ showSettings: true,}),
  closeSettings: () => set({ showSettings: false }),
  setActiveView: (view: ActiveView) => {
    set(state => ({
      activeView: view,
      isSearchResultsOpen: view === 'search' ? state.isSearchResultsOpen : false,
    }));
    
    if (typeof window !== 'undefined') {
      let path = '';
      if (view === 'home') {
        path = '/home';
      } else if (view === 'notes') {
        path = '/note';
      } else {
        path = `/${view}`;
      }
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
    }
  },
  
  syncRouteWithView: (pathname: string) => {
    const segment = pathname.split('/')[1] || 'home';
    const normalized = segment === 'note' ? 'notes' : segment;
    const validViews = ['home', 'notes', 'groups', 'trash', 'search'];
    
    if (validViews.includes(normalized)) {
      set({ activeView: normalized as ActiveView });
    }
  },
  setActiveNoteId: (id: string | null) => set({ activeNoteId: id }),
  setActiveGroupId: (id: string | null) => set({ activeGroupId: id }),
  updateNote: async (noteId: string, newContent: string) => {
    try {
      // Find the note to update
      const noteToUpdate = get().notes.find(note => note.id === noteId);
      if (!noteToUpdate) return;
      
      // Update the note in the backend
      const updatedNote = await notesService.updateNote(noteId, { 
        ...noteToUpdate, 
        content: newContent, 
        updatedAt: new Date()
      });
      
      // Update local state
      set(state => ({
        notes: state.notes.map(note =>
          note.id === noteId ? { ...note, content: newContent, updatedAt: updatedNote.updatedAt } : note
        )
      }));
    } catch (error) {
      console.error('Failed to update note:', error);
      throw error;
    }
  },
  updateNoteTitle: async (noteId: string, newTitle: string) => {
    try {
      // Find the note to update
      const noteToUpdate = get().notes.find(note => note.id === noteId);
      if (!noteToUpdate) return;
      
      // Update the note in the backend
      const updatedNote = await notesService.updateNote(noteId, { 
        ...noteToUpdate, 
        title: newTitle, 
        updatedAt: new Date()
      });
      
      // Update local state
      set(state => ({
        notes: state.notes.map(note =>
          note.id === noteId ? { ...note, title: newTitle, updatedAt: updatedNote.updatedAt } : note
        )
      }));
    } catch (error) {
      console.error('Failed to update note title:', error);
      throw error;
    }
  },
  setPersonality: (p: Personality) => set({ personality: p }),
  setCustomInstructions: (i: string) => set({ customInstructions: i }),
  setIsCustomizationEnabled: (e: boolean) => set({ isCustomizationEnabled: e }),
  moveNoteToTrash: async (noteId: string, router: any) => {
    try {
      // Move the note to trash in the backend
      const trashNote = await trashService.moveNoteToTrash(noteId);
      
      // Find the note to move
      const noteToTrash = get().notes.find(note => note.id === noteId);
      if (!noteToTrash) return;
      
      // Update local state
      set(state => ({
        notes: state.notes.filter(note => note.id !== noteId),
        trash: [...state.trash, { ...noteToTrash, id: trashNote.id.toString() }],
        activeNoteId: state.activeNoteId === noteId ? null : state.activeNoteId,
      }));
      
      if (router) {
        router.push('/note');
      }
    } catch (error) {
      console.error('Failed to move note to trash:', error);
      throw error;
    }
  },
  restoreNoteFromTrash: async (noteId: string) => {
    try {
      // Restore the note from trash in the backend
      const restoredNote = await trashService.restoreNoteFromTrash(noteId);
      
      // Find the note to restore
      const noteToRestore = get().trash.find(note => note.id === noteId);
      if (!noteToRestore) return;
      
      // Update local state
      set(state => ({
        trash: state.trash.filter(note => note.id !== noteId),
        notes: [...state.notes, { ...noteToRestore, id: restoredNote.id.toString() }],
      }));
    } catch (error) {
      console.error('Failed to restore note from trash:', error);
      throw error;
    }
  },
  deleteNotePermanently: async (noteId: string) => {
    try {
      // Delete the note permanently in the backend
      await trashService.deleteNotePermanently(noteId);
      
      // Update local state
      set(state => ({
        trash: state.trash.filter(note => note.id !== noteId),
      }));
    } catch (error) {
      console.error('Failed to delete note permanently:', error);
      throw error;
    }
  },

  emptyTrash: async () => {
    try {
      set({ trash: [] });
    } catch (error) {
      console.error('Failed to empty trash:', error);
      throw error;
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  executeSearch: async () => {
    const query = get().searchQuery.toLowerCase().trim();
    if (!query) {
        set({ searchResults: [], isSearchResultsOpen: true });
        return;
    };
    
    set({ searchResults: [], isSearchResultsOpen: true });
  },
  closeSearchResults: () => set({ isSearchResultsOpen: false, searchQuery: '' }),

  togglePersonalTaskCompletion: async (taskId: string) => {
    try {
      set(state => ({
        personalTasks: state.personalTasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }));
    } catch (error) {
      console.error('Failed to toggle personal task completion:', error);
      throw error;
    }
  },
  
  addPersonalTask: async (text: string) => {
    try {
      const newTask: PersonalTask = {
        id: `personal-task-${Date.now()}`,
        text,
        completed: false
      };
      set(state => ({
        personalTasks: [...state.personalTasks, newTask]
      }));
    } catch (error) {
      console.error('Failed to add personal task:', error);
      throw error;
    }
  },
  
  removePersonalTask: async (taskId: string) => {
    try {
      set(state => ({
        personalTasks: state.personalTasks.filter(task => task.id !== taskId)
      }));
    } catch (error) {
      console.error('Failed to remove personal task:', error);
      throw error;
    }
  },
  
  toggleGroupTaskCompletion: async (groupId: string, taskId: string) => {
    try {
      // Find the group and task to update
      const group = get().groups.find(g => g.id === groupId);
      if (!group) return;
      
      const taskToUpdate = group.tasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;
      
      // Toggle the task completion in the backend
      const updatedTask = await groupsService.updateGroupTask(groupId, taskId, { 
        ...taskToUpdate, 
        completed: !taskToUpdate.completed 
      });
      
      // Update local state
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                tasks: group.tasks.map(task =>
                  task.id === taskId ? { ...task, completed: updatedTask.completed } : task
                )
              }
            : group
      )
    }));
  } catch (error) {
    console.error('Failed to toggle group task completion:', error);
    throw error;
  }
},
  
  renamePersonalTask: async (taskId: string, newText: string) => {
    try {
      // Find the task to update
      const taskToUpdate = get().personalTasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;
      
      // Update the task in the backend
      const updatedTask = await tasksService.updateTask(taskId, { ...taskToUpdate, text: newText });
      
      // Update local state
      set(state => ({
        personalTasks: state.personalTasks.map(task =>
          task.id === taskId ? { ...task, text: newText } : task
        )
      }));
    } catch (error) {
      console.error('Failed to rename personal task:', error);
      throw error;
    }
  },
  
  renameGroupTask: async (groupId: string, taskId: string, newText: string) => {
    try {
      // Find the group and task to update
      const group = get().groups.find(g => g.id === groupId);
      if (!group) return;
      
      const taskToUpdate = group.tasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;
      
      // Update the task in the backend
      const updatedTask = await groupsService.updateGroupTask(groupId, taskId, { 
        ...taskToUpdate, 
        text: newText 
      });
      
      // Update local state
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                tasks: group.tasks.map(task =>
                  task.id === taskId ? { ...task, text: newText } : task
                )
              }
            : group
      )
    }));
  } catch (error) {
    console.error('Failed to rename group task:', error);
    throw error;
  }
},
  
  addGroupTask: async (groupId: string, text: string) => {
    try {
      // Create the task in the backend
      const newTask = await groupsService.createGroupTask(groupId, { text, completed: false });
      
      // Update local state
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                tasks: [...group.tasks, { ...newTask, id: newTask.id.toString() }]
              }
            : group
      )
    }));
  } catch (error) {
    console.error('Failed to add group task:', error);
    throw error;
  }
},
    leaveGroup: async (groupId: string) => {
    try {
      // Leave the group in the backend
      await groupsService.leaveGroup(groupId);
      
      // Update local state
      set(state => ({
        groups: state.groups.filter(g => g.id !== groupId),
        activeGroupId: state.activeGroupId === groupId ? null : state.activeGroupId,
      }));
    } catch (error) {
      console.error('Failed to leave group:', error);
      throw error;
    }
  },
    addGroup: async (name: string, subject: string) => {
    try {
      const { user } = get();
      if (!user) return;

      // Create the group in the backend
      const newGroup = await groupsService.createGroup({ name, subject });

      // Update local state
      set(state => ({
        groups: [{ ...newGroup, id: newGroup.id.toString() }, ...state.groups],
        activeGroupId: newGroup.id.toString(),
      }));
    } catch (error) {
      console.error('Failed to add group:', error);
      throw error;
    }
  },
  addNote: async (note: Note) => {
    try {
      // Create the note in the backend
      const newNote = await notesService.createNote(note);
      
      // Update local state
      set(state => ({
        notes: [{ ...newNote, id: newNote.id.toString() }, ...state.notes],
      }));
    } catch (error) {
      console.error('Failed to add note:', error);
      throw error;
    }
  },
  
  loadNotes: async () => {
    try {
      const notes = await notesService.getAllNotes();
      set({ notes });
    } catch (error) {
      console.error('Failed to load notes:', error);
      // Set empty array on error
      set({ notes: [] });
    }
  },
  
  loadGroups: async () => {
    try {
      const groups = await groupsService.getAllGroups();
      set({ groups });
    } catch (error) {
      console.error('Failed to load groups:', error);
      // Set empty array on error
      set({ groups: [] });
    }
  },
  
  loadProjects: async () => {
    try {
      const projects = await projectsService.getAllProjects();
      set({ projects });
    } catch (error) {
      console.error('Failed to load projects:', error);
      // Set empty array on error
      set({ projects: [] });
    }
  },
  
  loadPersonalTasks: async () => {
    try {
      const tasks = await tasksService.getAllTasks();
      set({ personalTasks: tasks });
    } catch (error) {
      console.error('Failed to load personal tasks:', error);
      // Set empty array on error
      set({ personalTasks: [] });
    }
  },
  
  loadSettings: async () => {
    try {
      const settings = await settingsService.getSettings();
      set({
        theme: (settings.theme as Theme) || 'light',
        personality: (settings.personality as Personality) || 'default',
        customInstructions: settings.customInstructions || '',
        isCustomizationEnabled: settings.customizationEnabled || false,
      });
      
      // Apply theme
      document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    } catch (error) {
      console.error('Failed to load settings:', error);
      // Use default settings on error
      set({
        theme: 'light',
        personality: 'default',
        customInstructions: '',
        isCustomizationEnabled: false,
      });
    }
  },
  
  saveSettings: async () => {
    try {
      const { theme, personality, customInstructions, isCustomizationEnabled } = get();
      await settingsService.updateSettings({
        theme,
        language: 'en',
        personality,
        customInstructions,
        customizationEnabled: isCustomizationEnabled,
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  },
}));