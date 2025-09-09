"use client"
import React, { useEffect, useState } from 'react';
import ChatPanel from '@/app/components/ChatPanel';
import ScratchpadPanel from '@/app/components/Notes/ScratchPadPanel';
import Login from '@/app/components/Login';
import TermsOfService from '@/app/screens/TermsOfService';
import PrivacyPolicy from '@/app/screens/PrivacyPolicy';
import Settings from '@/app/screens/Settings';
import CustomizeAI from '@/app/screens/CustomizeAI';
import Resizer from '@/app/components/Resizer';
import Sidebar from '@/app/screens/Sidebar';
import SearchResultsPanel from '@/app/components/SearchResultsPanel';
import { useAppStore } from '@/app/store/useAppStore';
import { useResizablePanel } from '@/app/hooks/useResizablePanel';
import { useHydrationSafe } from '@/app/hooks/useHydrationSafe';
import { useRouteSync } from '@/app/hooks/useRouteSync';
import { useApiError } from '@/app/hooks/useApiError';
import authService from '@/app/services/authService';

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => { 
  const isHydrated = useHydrationSafe();
  useRouteSync();
  const { 
    user, 
    showTos, 
    showPrivacyPolicy, 
    showSettings,
    showCustomizeAI,
    isChatPanelOpen,
    activeView,
    toggleChatPanel,
    login: appLogin,
    logout: appLogout
  } = useAppStore();
  
  const { isResizing, panelHeight, handleMouseDownOnResizer } = useResizablePanel(
    300,
    100,
    0.7,
    {
      onClose: toggleChatPanel
    }
  );
  
  const { error, clearError } = useApiError();
  const [loading, setLoading] = useState(true);
  
  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        console.log('Checking authentication status');
        const isAuthenticated = authService.isAuthenticated();
        console.log('Is authenticated:', isAuthenticated);
        if (isAuthenticated) {
          console.log('User is authenticated, calling appLogin');
          // User is authenticated, set user in app store
          await appLogin();
          console.log('App login completed');
          // Load user data
          useAppStore.getState().loadNotes();
          useAppStore.getState().loadGroups();
          useAppStore.getState().loadProjects();
          useAppStore.getState().loadPersonalTasks();
          useAppStore.getState().loadSettings();
        } else {
          console.log('User is not authenticated');
        }
      } catch (err) {
        console.error('Auth check error:', err);
        // If there's an error, clear auth and show login
        appLogout();
      } finally {
        setLoading(false);
      }
    };
    
    if (isHydrated) {
      checkAuth();
    }
  }, [isHydrated, appLogin, appLogout]);
  
  if (!isHydrated || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }

  if (showTos) return <TermsOfService />;
  if (showPrivacyPolicy) return <PrivacyPolicy />;
  if (showCustomizeAI && user) return <CustomizeAI />;
  if (showSettings && user) return <Settings />;
  if (!user) return <Login />;

  const shouldShowChat = ['notes', 'groups'].includes(activeView);

  return (
    <div className="flex h-screen font-sans text-text-primary bg-primary">
      {error && (
        <div className="fixed top-4 right-4 bg-error text-white p-4 rounded-md shadow-lg z-50">
          <div className="flex items-center">
            <span>{error}</span>
            <button 
              onClick={clearError}
              className="ml-4 text-white hover:text-gray-200"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <Sidebar />
      <SearchResultsPanel />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-grow flex flex-col min-h-0 px-0 pb-0 gap-2 overflow-hidden">
          <div className="min-h-0 flex flex-col flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;