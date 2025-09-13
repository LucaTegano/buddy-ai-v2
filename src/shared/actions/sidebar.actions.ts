import { useUIStore } from '@/shared/store/ui.store';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
    router.push('/settings');
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
    logout
  };
};