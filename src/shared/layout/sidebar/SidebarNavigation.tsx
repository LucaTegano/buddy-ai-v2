import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import {noteActions} from '@/features/notes/actions/note.actions';
import { useUIStore } from '@/shared/store/ui.store';
import { 
  MagnifyingGlassIcon, 
  PlusIcon,
  HomeIcon, 
  DocumentDuplicateIcon, 
  TrashIcon 
} from '@/shared/components/icons';
import NavItem from '@/shared/layout/sidebar/NavItem';
import { useCommandSearch } from '@/lib/hooks/use-command-search';

const SidebarNavigation: React.FC = () => {
  const { t } = useTranslation();
  const { isSidebarOpen } = useUIStore();
  const pathname = usePathname();
  const { onOpen } = useCommandSearch();

  const isRouteActive = (routePath: string) => {
  const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, '');
  
  return pathWithoutLang.startsWith(routePath);
};

const isHomeActive = isRouteActive('/home');
const isNotesActive = isRouteActive('/note');
//const isGroupsActive = isRouteActive('/groups') || isRouteActive('/group');
//const isInboxActive = isRouteActive('/inbox');
const isTrashActive = isRouteActive('/trash');

  return (
    <nav className="text-center flex-1 px-3 py-4">
      {isSidebarOpen && (
        <div className="px-3 mb-4">
          <button 
            onClick={noteActions.handleCreateNote}
            className="flex items-center justify-center w-full p-3 rounded-lg bg-brand-subtle-2 hover:bg-brand-subtle-2/60 transition-colors duration-200 shadow-sm"
          >
            <PlusIcon className="w-6 h-6" />
            {isSidebarOpen && <span className="ml-3 font-semibold">{t('sidebar.newNote')}</span>}
          </button>
        </div>
      )}
      <button 
        onClick={onOpen}
        className={`flex w-full items-center p-3 my-1 rounded-lg text-text-primary transition-colors duration-200 hover:bg-hover`}
      >
        <MagnifyingGlassIcon 
          className={`w-6 h-6 flex-shrink-0 text-text-secondary`} 
        />
        <span className={`overflow-hidden transition-all whitespace-nowrap ${isSidebarOpen ? 'w-40 ml-4' : 'w-0'}`}>
          {t('sidebar.search')}
        </span>
      </button>
      <NavItem 
        icon={<HomeIcon className="w-6 h-6 flex-shrink-0 text-text-secondary" />} 
        text={t('sidebar.home')}
        isOpen={isSidebarOpen} 
        active={isHomeActive} 
        href="/home"
      />
      <NavItem 
        icon={<DocumentDuplicateIcon className="w-6 h-6 flex-shrink-0 text-text-secondary" />} 
        text={t('sidebar.notes')}
        isOpen={isSidebarOpen} 
        active={isNotesActive}
        href="/note"
      />
      {/* <NavItem 
        icon={<UsersIcon className="w-6 h-6 flex-shrink-0 text-text-secondary" />} 
        text={t('sidebar.groups')}
        isOpen={isSidebarOpen}
        active={isGroupsActive}
        href="/groups"
      />
      <NavItem 
        icon={<InboxIcon className="w-6 h-6 flex-shrink-0 text-text-secondary" />} 
        text={t('sidebar.inbox')}
        isOpen={isSidebarOpen}
        active={isInboxActive}
        href="/inbox"
      /> */}
      <NavItem 
        icon={<TrashIcon className="w-6 h-6 flex-shrink-0 text-text-secondary" />} 
        text={t('sidebar.trash')}
        isOpen={isSidebarOpen}
        active={isTrashActive}
        href="/trash"
      />
    </nav>
  );
};

export default SidebarNavigation;