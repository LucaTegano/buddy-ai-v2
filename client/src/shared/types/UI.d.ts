export interface UIState {
  isSidebarOpen: boolean;
  isUserMenuOpen: boolean;
  isSearchView: boolean;
  searchQuery: string;
  focusTaskInput: boolean;
}

export interface UIActions {
  setIsSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  setIsUserMenuOpen: (isOpen: boolean) => void;
  toggleUserMenu: () => void;
  setIsSearchView: (isSearch: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFocusTaskInput: (focus: boolean) => void;
}

export interface UserMenuProps {
  user: { username: string; email: string; picture: string };
  onSettings: () => void;
  onLogout: () => void;
  onClose: () => void;
}

export interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  isOpen: boolean;
  href: string;
}