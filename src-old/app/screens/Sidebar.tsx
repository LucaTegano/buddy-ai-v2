"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HomeIcon, DocumentDuplicateIcon, UsersIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, ChevronDoubleLeftIcon, SparklesIcon, TrashIcon, MagnifyingGlassIcon, XMarkIcon, InboxIcon, PlusIcon } from '@/shared/components/icons';
import { useAppStore } from '../store/useAppStore';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const NavItem = ({ icon, text, active, isOpen, href }: { icon: React.ReactNode, text: string, active?: boolean, isOpen: boolean, href: string }) => (
    <Link href={href} className={`flex w-full items-center p-3 my-1 rounded-lg text-text-primary transition-colors duration-200 ${active ? 'bg-brand-subtle font-semibold' : 'hover:bg-hover'}`}>
        {icon}
        <span className={`overflow-hidden transition-all whitespace-nowrap ${isOpen ? 'w-40 ml-4' : 'w-0'}`}>{text}</span>
    </Link>
);


const SearchInput = () => {
    const { t } = useTranslation();
    const { searchQuery, setSearchQuery, executeSearch } = useAppStore();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    return (
        <div className="p-3">
            <h3 className="px-1 text-lg font-bold text-text-primary mb-2">{t('sidebar.search')}</h3>
            <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                    type="text"
                    placeholder={t('sidebar.searchNotesPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-surface border border-border-subtle rounded-md py-2 pl-10 pr-8 text-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    autoFocus
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};


const Sidebar: React.FC = () => {
    const { t } = useTranslation();
    const { user, isSidebarOpen, setIsSidebarOpen, logout, openSettings } = useAppStore();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isSearchView = pathname === '/search';
    
    if (!user) return null;

    const handleUserMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsUserMenuOpen(prev => !prev);
    }

    const handleAsideClick = () => {
        if (!isSidebarOpen) {
            setIsSidebarOpen(true);
        }
    };

    // Special handler for the search icon
    const handleSearchClick = () => {
        router.push('/search');
        if (!isSidebarOpen) {
            setIsSidebarOpen(true);
        }
    };

    return (
        <aside 
            onClick={!isSearchView ? handleAsideClick : undefined}
            className={`relative h-screen bg-surface border-r border-border-subtle flex flex-col transition-all duration-300 ease-in-out shadow-lg ${isSidebarOpen ? 'w-60' : 'w-19'} ${!isSidebarOpen && !isSearchView ? 'cursor-pointer' : ''}`}
        >
            <div className="flex items-center justify-end p-4 h-[73px] border-b border-border-subtle">
                <button onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(!isSidebarOpen); }} className="p-2 rounded-lg hover:bg-hover">
                    <ChevronDoubleLeftIcon className={`w-6 h-6 text-text-secondary transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`} />
                </button>
            </div>
            
            {/* Conditional Rendering: Show Search Input or Nav Items */}
            {isSearchView && isSidebarOpen ? (
                <SearchInput />
            ) : (
                <nav className="text-center flex-1 px-3 py-4">
                    {isSidebarOpen && <div className="px-3 mb-4">
                        <button 
                            onClick={() => router.push('/note/new')}
                            className="flex items-center justify-center w-full p-3 rounded-lg bg-brand-subtle-2 hover:bg-brand-subtle-2/60 transition-colors duration-200 shadow-sm">
                            <PlusIcon className="w-6 h-6" />
                            {isSidebarOpen && <span className="ml-3 font-semibold">{t('sidebar.newNote')}</span>}
                        </button>
                    </div>}
                    <button 
                      onClick={handleSearchClick}
                      className={`flex w-full items-center p-3 my-1 rounded-lg text-text-primary transition-colors duration-200 ${pathname === '/search' ? 'bg-brand-subtle font-semibold' : 'hover:bg-hover'}`}>
                      <MagnifyingGlassIcon className={`w-6 h-6 flex-shrink-0 ${pathname === '/search' ? 'text-brand-primary' : 'text-text-secondary'}`} />
                      <span className={`overflow-hidden transition-all whitespace-nowrap ${isSidebarOpen ? 'w-40 ml-4' : 'w-0'}`}>{t('sidebar.search')}</span>
                    </button>
                    <NavItem 
                      icon={<HomeIcon className={`w-6 h-6 flex-shrink-0 ${pathname === '/home' ? 'text-brand-primary' : 'text-text-secondary'}`} />} 
                      text={t('sidebar.home')}
                      isOpen={isSidebarOpen} 
                      active={pathname === '/home'} 
                      href="/home"
                    />
                    <NavItem 
                      icon={<DocumentDuplicateIcon className={`w-6 h-6 flex-shrink-0 ${pathname === '/note' ? 'text-brand-primary' : 'text-text-secondary'}`} />} 
                      text={t('sidebar.notes')}
                      isOpen={isSidebarOpen} 
                      active={pathname.startsWith('/note')}
                      href="/note"
                    />
                    <NavItem 
                      icon={<UsersIcon className={`w-6 h-6 flex-shrink-0 ${pathname === '/groups' ? 'text-brand-primary' : 'text-text-secondary'}`} />} 
                      text={t('sidebar.groups')}
                      isOpen={isSidebarOpen}
                      active={pathname.startsWith('/groups')}
                      href="/groups"
                    />
                    <NavItem 
                      icon={<InboxIcon className={`w-6 h-6 flex-shrink-0 ${pathname === '/inbox' ? 'text-brand-primary' : 'text-text-secondary'}`} />} 
                      text={t('sidebar.inbox')}
                      isOpen={isSidebarOpen}
                      active={pathname === '/inbox'}
                      href="/inbox"
                    />
                    <NavItem 
                      icon={<TrashIcon className={`w-6 h-6 flex-shrink-0 ${pathname === '/trash' ? 'text-brand-primary' : 'text-text-secondary'}`} />} 
                      text={t('sidebar.trash')}
                      isOpen={isSidebarOpen}
                      active={pathname === '/trash'}
                      href="/trash"
                    />
                </nav>
            )}
            
            <div className="flex-grow"></div> {/* Spacer to push user menu to the bottom */}
            
            <div className="p-3 border-t border-border-subtle">
                 <div
                    role="button"
                    onClick={handleUserMenuToggle}
                    className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-hover"
                    aria-haspopup="true"
                    aria-expanded={isUserMenuOpen}
                >
                    <div className="relative group flex-shrink-0">
                        <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-brand-primary/50" />
                        <div className="absolute inset-0 bg-overlay/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${isSidebarOpen ? 'w-40 ml-3' : 'w-0'}`}>
                        <div className="leading-4">
                            <h4 className="font-semibold text-sm whitespace-nowrap">{user.name}</h4>
                            <span className="text-xs text-text-secondary">{t('sidebar.userRole')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;