"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useUIStore } from '@/shared/store/ui.store';
import { useSidebarActions } from '@/shared/actions/sidebar.actions';
import SearchInput from '@/shared/layout/sidebar/SearchInput';
import SidebarHeader from '@/shared/layout/sidebar/SidebarHeader';
import SidebarNavigation from '@/shared/layout/sidebar/SidebarNavigation';
import SidebarFooter from '@/shared/layout/sidebar/SidebarFooter';
import UserMenu from '@/shared/layout/sidebar/UserMenu';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { isSidebarOpen, setIsSidebarOpen } = useUIStore();
  const { 
    isUserMenuOpen,
    handleUserMenuToggle,
    handleAsideClick,
    openSettings,
    openCustomizeAI,
    logout
  } = useSidebarActions();
  
  const pathname = usePathname();
  const router = useRouter();
  const isSearchView = pathname === '/search';
  
  if (!user) return null;

  const handleSearchClick = () => {
    router.push('/search');
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  const handleNewNoteClick = () => {
    router.push('/note/new');
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside 
      onClick={!isSearchView ? handleAsideClick : undefined}
      className={`fixed top-0 left-0 h-screen z-30 bg-surface border-r border-border-subtle flex flex-col transition-all duration-300 ease-in-out shadow-lg ${
        isSidebarOpen ? 'w-60' : 'w-19'
      } ${!isSidebarOpen && !isSearchView ? 'cursor-pointer' : ''}`}
    >
      <SidebarHeader onToggle={handleToggleSidebar} />
      
      {isSearchView && isSidebarOpen ? (
        <SearchInput />
      ) : (
        <SidebarNavigation 
          onSearchClick={handleSearchClick}
          onNewNoteClick={handleNewNoteClick}
        />
      )}
      
      <div className="flex-grow"></div>

      {isUserMenuOpen && (
        <UserMenu 
          user={user} 
          onCustomize={openCustomizeAI}
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