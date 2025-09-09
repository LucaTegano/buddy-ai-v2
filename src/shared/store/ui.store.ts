import { create } from 'zustand';
import { UIState, UIActions } from '@/shared/types/UI';

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: false,
  isUserMenuOpen: false,
  isSearchView: false,
  searchQuery: '',
  
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setIsUserMenuOpen: (isOpen) => set({ isUserMenuOpen: isOpen }),
  toggleUserMenu: () => set((state) => ({ isUserMenuOpen: !state.isUserMenuOpen })),
  setIsSearchView: (isSearch) => set({ isSearchView: isSearch }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));