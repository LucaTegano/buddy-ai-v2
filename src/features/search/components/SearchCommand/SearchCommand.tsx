"use client";

import React, {
  useEffect,
  useState,
  useMemo
} from 'react';
import {
  SquarePen,
  ClipboardPen,
  Notebook,
  Settings,
  
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useCommandSearch } from '@/lib/hooks/use-command-search';
import { useTranslation } from 'react-i18next';
import { noteActions } from '@/features/notes/actions/note.actions';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/shared/store/ui.store';
import { useSearchShortcuts } from './shortcuts';
import recentNotesService from '@/features/notes/services/recent-notes.service';
import { NoteListItem } from '@/features/notes/types/RecentNotes';
import notesService from '@/features/notes/services/notes.service';

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function SearchCommand() {
  const { isOpen, onClose, toggle } = useCommandSearch();
  const { t } = useTranslation();
  const router = useRouter();
  const setFocusTaskInput = useUIStore(state => state.setFocusTaskInput);
  const { shortcuts } = useSearchShortcuts(onClose);
  
  const [previous7DaysNotes, setPrevious7DaysNotes] = useState<NoteListItem[]>([]);
  const [previous30DaysNotes, setPrevious30DaysNotes] = useState<NoteListItem[]>([]);
  const [latestNotes, setLatestNotes] = useState<NoteListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NoteListItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  useEffect(() => {
    console.log('Debounced search query changed:', debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Check if any of our shortcuts match
      for (const shortcut of shortcuts) {
        if (
          e.key === shortcut.key &&
          !!e.metaKey === !!shortcut.metaKey &&
          !!e.ctrlKey === !!shortcut.ctrlKey &&
          !!e.shiftKey === !!shortcut.shiftKey &&
          !!e.altKey === !!shortcut.altKey
        ) {
          shortcut.handler(e);
          break;
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [shortcuts, toggle]);

  // Load recent notes when the dialog opens
  useEffect(() => {
    if (isOpen) {
      loadRecentNotes();
    }
  }, [isOpen]);

  // Search notes when debounced query changes
  useEffect(() => {
    let active = true;
    const search = async (query: string) => {
      setIsSearching(true);
      try {
        console.log('Searching for notes with query:', query);
        const results = await notesService.searchNotes(query);
        if (active) {
          console.log('Search results:', results);
          setSearchResults(results);
        }
      } catch (error) {
        console.error('Failed to search notes:', error);
        if (active) {
          setSearchResults([]);
        }
      } finally {
        if (active) {
          setIsSearching(false);
        }
      }
    };

    if (isOpen && debouncedSearchQuery && debouncedSearchQuery.trim() !== '') {
      console.log('Performing search for:', debouncedSearchQuery);
      search(debouncedSearchQuery);
    } else {
      console.log('Clearing search results');
      setSearchResults([]);
    }

    return () => {
      active = false;
    };
  }, [isOpen, debouncedSearchQuery]);

  const loadRecentNotes = async () => {
    setIsLoading(true);
    try {
      const { previous7Days, previous30Days, latestNotes } = await recentNotesService.getRecentNotes();
      setPrevious7DaysNotes(previous7Days || []);
      setPrevious30DaysNotes(previous30Days || []);
      setLatestNotes(latestNotes || []);
    } catch (error) {
      console.error('Failed to load recent notes:', error);
      // Set defaults to empty arrays to prevent null errors
      setPrevious7DaysNotes([]);
      setPrevious30DaysNotes([]);
      setLatestNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Reset search when closing the dialog
  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  const hasSearchQuery = searchQuery.trim() !== '';

  return (
    <CommandDialog open={isOpen} onOpenChange={handleClose}>
      <CommandInput
        placeholder={t('search.placeholder')}
        className="h-14 text-base mb-2"
        onValueChange={handleSearchChange}
        value={searchQuery}
      />
      <CommandList>
        {/* Search View */}
        <CommandGroup
          heading={t('search.results')}
          style={{ display: hasSearchQuery ? 'block' : 'none' }}
        >
          {searchResults.map((note) => (
            <CommandItem
              key={note.id}
              value={note.title}
              className="py-3 text-base"
              onSelect={() => {
                router.push(`/note/${note.id}`);
                handleClose();
              }}
            >
              <Notebook className="mr-3 h-5 w-5" />
              <span className="truncate max-w-xs">{note.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Default View */}
        <div style={{ display: hasSearchQuery ? 'none' : 'block' }}>
          <CommandGroup>
            <CommandItem
              className="py-3 text-base"
              onSelect={async () => {
                const result = await noteActions.handleCreateNote();
                if (result.success && result.note) {
                  router.push(`/note/${result.note.id}`);
                  handleClose();
                }
              }}
            >
              <SquarePen className="mr-3 h-5 w-5" />
              <span>{t('search.newNote')}</span>
            </CommandItem>
            <CommandItem
              className="py-3 text-base"
              onSelect={() => {
                router.push('/home');
                setFocusTaskInput(true);
                handleClose();
              }}
            >
              <ClipboardPen className="mr-3 h-5 w-5" />
              <span>{t('search.newTask')}</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup>
            <CommandItem
              className="py-3 text-base"
              onSelect={() => {
                router.push('/general-settings');
                handleClose();
              }}
            >
              <Settings className="mr-3 h-5 w-5" />
              <span>{t('search.settings')}</span>
              <CommandShortcut>{t('search.shortcutSettings')}</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          {previous7DaysNotes.length > 0 && (
            <CommandGroup heading={t('search.previous7Days')}>
              {previous7DaysNotes.map((note) => (
                <CommandItem
                  key={note.id}
                  value={note.title}
                  className="py-3 text-base"
                  onSelect={() => {
                    router.push(`/note/${note.id}`);
                    handleClose();
                  }}
                >
                  <Notebook className="mr-3 h-5 w-5" />
                  <span className="truncate max-w-xs">{note.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {previous30DaysNotes.length > 0 && (
            <CommandGroup heading={t('search.previous30Days')}>
              {previous30DaysNotes.map((note) => (
                <CommandItem
                  key={note.id}
                  value={note.title}
                  className="py-3 text-base"
                  onSelect={() => {
                    router.push(`/note/${note.id}`);
                    handleClose();
                  }}
                >
                  <Notebook className="mr-3 h-5 w-5" />
                  <span className="truncate max-w-xs">{note.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {latestNotes.length > 0 && (
            <CommandGroup heading={t('search.latestNotes')}>
              {latestNotes.map((note) => (
                <CommandItem
                  key={note.id}
                  value={note.title}
                  className="py-3 text-base"
                  onSelect={() => {
                    router.push(`/note/${note.id}`);
                    handleClose();
                  }}
                >
                  <Notebook className="mr-3 h-5 w-5" />
                  <span className="truncate max-w-xs">{note.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </div>

        {/* Empty States */}
        {hasSearchQuery && isSearching ? (
          <CommandEmpty>{t('search.searching')}</CommandEmpty>
        ) : hasSearchQuery && !isSearching && searchResults.length === 0 ? (
          <CommandEmpty>{t('search.noResults')}</CommandEmpty>
        ) : !hasSearchQuery && !isLoading && latestNotes.length === 0 && previous7DaysNotes.length === 0 && previous30DaysNotes.length === 0 ? (
          <CommandEmpty>{t('search.empty')}</CommandEmpty>
        ) : null}
      </CommandList>
    </CommandDialog>
  );
}
