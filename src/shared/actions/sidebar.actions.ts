import { useUIStore } from '@/shared/store/ui.store';
import { useAuthStore } from '@/features/auth/store/auth.store';

// Actions for sidebar functionality
export const useSidebarActions = () => {
  const { 
    isSidebarOpen, 
    isUserMenuOpen, 
    setIsSidebarOpen, 
    setIsUserMenuOpen,
    toggleSidebar,
    toggleUserMenu
  } = useUIStore();
  
  const { logout } = useAuthStore();

  const handleUserMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleUserMenu();
  };

  const handleAsideClick = () => {
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  const openSettings = () => {
    console.log('Open settings');
    setIsUserMenuOpen(false);
  };

  const openCustomizeAI = () => {
    console.log('Open customize AI');
    setIsUserMenuOpen(false);
  };

  return {
    isSidebarOpen,
    isUserMenuOpen,
    setIsSidebarOpen,
    setIsUserMenuOpen,
    toggleSidebar,
    handleUserMenuToggle,
    handleAsideClick,
    openSettings,
    openCustomizeAI,
    logout
  };
};