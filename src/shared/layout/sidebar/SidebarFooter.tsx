import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/shared/store/ui.store';

interface SidebarFooterProps {
  user: { username: string; email:string; picture: string };
  onUserMenuToggle: (e: React.MouseEvent) => void;
  isUserMenuOpen: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ 
  user, 
  onUserMenuToggle, 
  isUserMenuOpen 
}) => {
  const { t } = useTranslation();
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="p-3 border-t border-border-subtle">
      <div
        role="button"
        onClick={onUserMenuToggle}
        className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-hover"
        aria-haspopup="true"
        aria-expanded={isUserMenuOpen}
      >
        <div className="relative group flex-shrink-0">
          <img 
            src={user.picture} 
            alt={user.username} 
            className="w-10 h-10 rounded-full object-cover border-2 border-brand-primary/50" 
          />
          <div className="absolute inset-0 bg-overlay/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className={`flex justify-between items-center overflow-hidden transition-all ${isSidebarOpen ? 'w-40 ml-3' : 'w-0'}`}>
          <div className="leading-4">
            <h4 className="font-semibold text-sm whitespace-nowrap">{user.username}</h4>
            {/*<h4 className="text-xs whitespace-nowrap">{user.email}</h4>*/}
            {/* <span className="text-xs text-text-secondary">{user.email}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;