import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import {  
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon 
} from '@/shared/components/icons';
import { UserMenuProps } from '@/shared/types/UI';

const UserMenu: React.FC<UserMenuProps> = ({ 
  user, 
  onCustomize, 
  onSettings, 
  onLogout, 
  onClose 
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      ref={menuRef} 
      className="absolute bottom-20 left-3 w-60 bg-surface rounded-lg shadow-2xl border border-border-subtle p-2 z-10 animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="px-3 py-2 border-b border-border-subtle mb-2">
        <p className="text-sm font-semibold text-text-primary truncate" title={user.username}>
          {user.username}
        </p>
        <p className="text-xs text-text-secondary truncate" title={user.email}>
          {user.email}
        </p>
      </div>
      <button 
        onClick={onCustomize} 
        className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-text-primary hover:bg-hover rounded-md transition-colors"
      >
        <Cog6ToothIcon className="w-5 h-5" />
        {t('sidebar.settings')}
      </button>
      <button 
        onClick={onLogout} 
        className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-text-primary hover:bg-hover rounded-md transition-colors"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        {t('sidebar.signOut')}
      </button>
    </div>
  );
};

export default UserMenu;