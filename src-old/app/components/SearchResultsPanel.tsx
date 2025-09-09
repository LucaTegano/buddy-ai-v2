"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation'; // 1. Import the Next.js router
import { useAppStore } from '../store/useAppStore';
import { XMarkIcon, DocumentTextIcon } from './icons';
import { Note } from '../models/types';

const SearchResultItem: React.FC<{ note: Note }> = ({ note }) => {
    const { setActiveView, setActiveNoteId, closeSearchResults } = useAppStore();
    const router = useRouter(); // 2. Initialize the router

    const handleClick = () => {
        // These state updates tell your app what to show
        setActiveView('notes');
        setActiveNoteId(note.id);
        
        // This closes the search panel
        closeSearchResults();
        
        // 3. Use the Next.js router to update the URL correctly.
        // This is the key fix.
        router.push(`/note/${note.id}`);
    };

    return (
        <button
            onClick={handleClick}
            className="w-full text-left p-3 flex items-start gap-3 rounded-lg hover:bg-hover/60 transition-colors"
        >
            <DocumentTextIcon className="w-5 h-5 mt-1 text-text-secondary flex-shrink-0" />
            <div>
                <p className="font-semibold text-text-primary">{note.title}</p>
                <p className="text-sm text-text-secondary line-clamp-2">
                    {note.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                </p>
            </div>
        </button>
    );
};

const SearchResultsPanel: React.FC = () => {
    const { t } = useTranslation();
    const { isSearchResultsOpen, searchResults, searchQuery, closeSearchResults } = useAppStore();

    if (!isSearchResultsOpen) {
        return null;
    }

    return (
        <aside className="h-screen w-80 bg-surface border-r border-border-subtle flex flex-col shadow-lg z-10 animate-in slide-in-from-left-5 duration-300">
            <div className="flex items-center justify-between p-4 h-[73px] border-b border-border-subtle flex-shrink-0">
                <h2 className="font-bold text-lg text-text-primary">
                    {t('search.title')}
                </h2>
                <button
                    onClick={closeSearchResults}
                    className="p-2 rounded-lg hover:bg-hover"
                    title={t('search.close')}
                >
                    <XMarkIcon className="w-6 h-6 text-text-secondary" />
                </button>
            </div>
            <div className="flex-1 p-2 overflow-y-auto">
                <p className="px-2 pb-2 text-sm text-text-secondary">
                    {t('search.resultsFound', { count: searchResults.length, query: searchQuery })}
                </p>
                {searchResults.length > 0 ? (
                    <div className="space-y-1">
                        {searchResults.map(note => <SearchResultItem key={note.id} note={note} />)}
                    </div>
                ) : (
                    <p className="px-2 pt-4 text-center text-text-secondary">{t('search.noResults')}</p>
                )}
            </div>
        </aside>
    );
};

export default SearchResultsPanel;