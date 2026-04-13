"use client";

import React from 'react';
//import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useUIStore } from '@/shared/store/ui.store';
import { useSidebarActions } from '@/shared/actions/sidebar.actions';
import SidebarHeader from '@/shared/layout/sidebar/SidebarHeader';
import SidebarNavigation from '@/shared/layout/sidebar/SidebarNavigation';
import SidebarFooter from '@/shared/layout/sidebar/SidebarFooter';
import UserMenu from '@/shared/layout/sidebar/UserMenu';

const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const { isSidebarOpen, setIsSidebarOpen } = useUIStore();
  const { 
    isUserMenuOpen,
    handleUserMenuToggle,
    handleAsideClick,
    openSettings,
    logout
  } = useSidebarActions();
  
  if (!user) return null;

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside 
      onClick={handleAsideClick}
      className={`fixed top-0 left-0 h-screen z-30 bg-secondary border-r border-border-subtle flex flex-col transition-all duration-300 ease-in-out shadow-sm ${
        isSidebarOpen ? 'w-64' : 'w-20'
      } ${!isSidebarOpen ? 'cursor-pointer hover:bg-bg-hover' : ''}`}
    >
      <SidebarHeader onToggle={handleToggleSidebar} />
      
      <SidebarNavigation />
      
      <div className="flex-grow"></div>

      {isUserMenuOpen && (
        <UserMenu 
          user={user} 
          onSettings={openSettings} 
          onLogout={logout} 
          onClose={() => useUIStore.getState().setIsUserMenuOpen(false)} 
        />
      )}
      
      <SidebarFooter 
        user={{ username: user.username, email: user.email, picture: user.picture }}
        onUserMenuToggle={handleUserMenuToggle}
        isUserMenuOpen={isUserMenuOpen}
      />
    </aside>
  );
};

export default Sidebar;